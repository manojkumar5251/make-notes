import React from "react"
import { Input, Divider } from "antd"

const NotesView = props => {
  return (
    <div style={{ height: "100%" }}>
      <Input
        value={props.note.title}
        onChange={props.onTitleChange}
        placeholder="Type your title here"
        bordered={false}
        style={{ fontSize: "24px" }}
      />
      <Divider style={{ margin: "0.1rem 0rem" }} />
      <div style={{ overflowY: "auto", height: "92.5%" }}>
        <Input.TextArea
          value={props.note.description}
          onChange={props.onDescriptionChange}
          placeholder="Type your notes here"
          style={{ height: "100%" }}
          bordered={false}
        />
      </div>
    </div>
  )
}

export default NotesView
