import React from "react"
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap"

const Patientnotes = ({ view, handleView }) => {
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
          <div>
            <p>1. I am point 1</p>
            <p>2. I am point 2</p>
            <p>2. I am point 2</p>
            <p>2. I am point 2</p>
            <p>2. I am point 2</p>
            <p>2. I am point 2</p>
          </div>

          <div>
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
                <button className="btn btn-primary">Save</button>
              </div>
            </FormGroup>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patientnotes
