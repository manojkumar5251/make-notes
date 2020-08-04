import React from "react"
import { Row, Col } from "antd"
import TitleList from "./components/TitleList"
import NotesView from "./components/NotesView"

const App = () => {
  const [index, setIndex] = React.useState(null)
  const [notes, setNotes] = React.useState([])

  React.useEffect(() => {
    localStorage.getItem("notes") === null && saveNotes([])
  }, [])

  React.useEffect(() => {
    let notesCopy = notes.length
      ? notes
      : JSON.parse(localStorage.getItem("notes"))

    notesCopy = notesCopy.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )

    saveNotes(notesCopy)
    setIndex(0)
  }, [notes])

  const saveNotes = data => {
    setNotes(data)
    localStorage.setItem("notes", JSON.stringify(data))
  }

  const onDescriptionChange = note => {
    let notesCopy = [...notes]
    notesCopy[index].description = note.target.value
    notesCopy[index].updatedAt = JSON.parse(JSON.stringify(new Date()))
    saveNotes(notesCopy)
  }

  const onTitleChange = note => {
    let notesCopy = [...notes]
    notesCopy[index].title = note.target.value
    notesCopy[index].updatedAt = JSON.parse(JSON.stringify(new Date()))
    saveNotes(notesCopy)
  }

  const addNewNote = () => {
    if (notes.length && notes[0]["title"] === "") {
      return
    }
    let date = new Date()
    saveNotes([
      {
        _id: Date.now(),
        title: "",
        description: "",
        createdAt: date,
        updatedAt: date
      },
      ...notes
    ])
    setIndex(0)
  }

  return (
    <Row style={{ height: "100vh", overflowY: "hidden" }}>
      <Col style={{ border: "1px solid #555" }} md={6}>
        <TitleList
          notes={notes}
          onClick={i => setIndex(i)}
          addNewNote={addNewNote}
        />
      </Col>

      <Col style={{ border: "1px solid #555" }} md={18}>
        {index !== null && notes.length ? (
          <NotesView
            note={notes[index]}
            onTitleChange={onTitleChange}
            onDescriptionChange={onDescriptionChange}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "10rem"
            }}
          >
            Create notes by clicking
            <span
              style={{
                marginLeft: "10px",
                fontSize: "1.5rem"
              }}
            >
              +
            </span>
            <br />
            or <br />
            Click on any title to view or edit them.
          </div>
        )}
      </Col>
    </Row>
  )
}

export default App
