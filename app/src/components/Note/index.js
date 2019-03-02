import React, { useState } from "react";
import styled from "styled-components";
import { ipcRenderer } from "electron";
import _ from "lodash";
const moment = require('moment')

import Editor from "draft-js-plugins-editor";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import { draftToMarkdown } from "markdown-draft-js";
import { EditorState, convertToRaw } from "draft-js";

const plugins = [createMarkdownShortcutsPlugin()];
const FILE_DATE_FORMAT = 'YYYYMMDD_HHmmss'
const Page = styled.div`
  padding: 8px;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`;

export default class DemoEditor extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    const now = new Date().getTime()
    this.state = {
      createdAt: now,
      filename: moment(now).format(FILE_DATE_FORMAT),
      editorState: EditorState.createEmpty()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.editor.focus();
  }
  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    return type;
  }
  handleChange(editorState) {
    this.setState({
      editorState
    });
    this.convertToMd();
  }

  convertToMd = _.throttle(
    () => {
      const rawObject = convertToRaw(
        this.state.editorState.getCurrentContent()
      );
      var markdownString = draftToMarkdown(rawObject);
      console.log(markdownString);
      ipcRenderer.send("note-updated", {
        createdAt: this.state.createdAt,
        content: markdownString,
        filename: this.state.filename
      });
    },
    3000,
    { leading: false, trailing: true }
  );

  render() {
    return (
      <Page>
        <Editor
          label={this.state.createdAt}
          ref={c => (this.editor = c)}
          blockStyleFn={this.myBlockStyleFn}
          editorState={this.state.editorState}
          onChange={this.handleChange}
          plugins={plugins}
        />
      </Page>
    );
  }
}
