import React, { useState } from "react";
import styled from "styled-components";
import _ from 'lodash'

import Editor from "draft-js-plugins-editor";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import { draftToMarkdown } from "markdown-draft-js";
import { EditorState, convertToRaw } from "draft-js";

const plugins = [createMarkdownShortcutsPlugin()];
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
    this.state = {
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
    this.convertToMd()
  }

  convertToMd = _.throttle(() => {
    const rawObject = convertToRaw(this.state.editorState.getCurrentContent());
    var markdownString = draftToMarkdown(rawObject);
    console.log(markdownString);
  }, 3000, {leading: false, trailing: true})

  render() {
    return (
      <Page>
        <Editor
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
