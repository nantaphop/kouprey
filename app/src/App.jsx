import React, { Component, useState } from "react";
import { render } from "react-dom";
import "easymde/dist/easymde.min.css"


import Note from './components/Note'

export default function App() {
  const [count, setCount] = useState(1);

  return <div>
    <Note />
    </div>
}
