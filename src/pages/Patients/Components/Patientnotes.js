import React from "react"
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap"
import { addNewNote, getNotes } from "../../../Connection/Patients"

const Patientnotes = ({ view, handleView, data }) => {
  const [notes, setNotes] = React.useState([])
  const [newNote, setNewNote] = React.useState("")

  const handleChange = evt => {
    setNewNote(evt.target.value)
  }

  const handleNewNote = async () => {
    console.log(newNote, "i am nbew note")
    let res = await addNewNote({
      doctorId: "635144fb35155fec28aa679b",
      userId: data?.patientId,
      point: newNote,
    })
    console.log(res)
    if (res.data.data.success === 1) {
      handleGetNotes()
      setNewNote("")
    } else {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleGetNotes = async () => {
    let res = await getNotes({
      doctorId: "635144fb35155fec28aa679b",
      userId: data?.patientId,
    })
    console.log(res)
    if (res.data.data.success === 1) {
      setNotes(res.data.data.notes.points)
    }
  }

  React.useEffect(() => {
    if (data) {
      handleGetNotes()
    }
  }, [data])
  return (
    <div
      style={{
        // minHeight: "100px",
        height: "auto",
        position: "relative",
      }}
      className="border border-secondary rounded text-dark  text-white"
    >
      <div
        style={{ backgroundColor: "#20507B", color: "white" }}
        className="d-flex justify-content-between p-1"
      >
        <h5 className="text-white mt-2">Patient Notes</h5>
        <button className="btn text-light" onClick={() => handleView("notes")}>
          +
        </button>
      </div>

      {view === false && (
        <div className="text-dark p-1">
          {notes.length === 0 && (
            <div>
              <p>Notes not found</p>
            </div>
          )}
          {notes.length > 0 && (
            <div>
              {notes?.map((note, i) => {
                return (
                  <p key={i}>
                    {i} {note}
                  </p>
                )
              })}
            </div>
          )}

          <div>
            <FormGroup className="d-flex ">
              <div className="">
                <Input
                  id="exampleEmail"
                  name="newNote"
                  placeholder="Add a Note"
                  type="text"
                  value={newNote}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button onClick={handleNewNote} className="btn btn-primary">
                  Save
                </button>
              </div>
            </FormGroup>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patientnotes
