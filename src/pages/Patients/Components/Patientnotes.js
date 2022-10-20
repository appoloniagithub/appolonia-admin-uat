import React from "react"
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap"

const Patientnotes = ({ view, handleView }) => {
  return (
    <div
      style={{
        minHeight: "100px",
        height: "auto",
        position: "relative",
      }}
      className="border border-secondary rounded bg-warning p-2 text-white"
    >
      <div className="d-flex justify-content-between">
        <h5 className="text-white">Patient Notes</h5>
        <button className="btn" onClick={() => handleView("notes")}>
          +
        </button>
      </div>
      <br></br>
      {view === false && (
        <div>
          <p>1. I am point 1</p>
          <p>2. I am point 2</p>
          <p>2. I am point 2</p>
          <p>2. I am point 2</p>
          <p>2. I am point 2</p>
          <p>2. I am point 2</p>

          <div style={{ position: "absolute", bottom: 0 }}>
            <FormGroup className="d-flex ">
              <div className="">
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Add a Note"
                  type="text"
                />
              </div>

              <div>
                <button className="btn btn-primary">Add Note</button>
              </div>
            </FormGroup>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patientnotes
