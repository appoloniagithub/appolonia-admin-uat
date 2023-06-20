import React, { useState, useEffect } from "react"
import { Row, Col } from "reactstrap"
import { useHistory } from "react-router-dom"
import Divider from "@mui/material/Divider"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { getAllDoctors } from "Connection/Doctors"
import { getAllPatients } from "Connection/Patients"

export default function SendNotification() {
  const [heading, setHeading] = useState("")
  const [message, setMessage] = useState("")
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [sendTo, setSendTo] = useState([])
  const options = ["All patients", "All Doctors"]
  //const options = [doctors, patients]

  useEffect(() => {
    getAllDoctors().then(res => {
      console.log(res.data.data.doctors)
      setDoctors(res.data.data.doctors)
    })
    getAllPatients().then(res => {
      console.log(res.data.data.allPatients)
      setPatients(res.data.data.allPatients)
      // if (res.data && res.data.data && res.data.data.allPatients) {
      //   for (let i = 0; i <= res.data.data.allPatients.length; i++) {
      //     setPatients(res.data.data.allPatients[i]._id)
      //   }
      // }
    })
  }, [])
  console.log(patients, doctors)
  console.log(sendTo)
  return (
    <>
      <div className="page-content">
        {/* <Row>
          <div className="border border-secondary rounded">
            <div
              style={{
                backgroundColor: "#20507B",
                color: "white",
                height: "60px",
              }}
              className="d-flex justify-content-start align-items-center "
            >
              <div>
                <button onClick={handleClose} className="btn text-light">
                  <i className="fas fa-arrow-left" />
                </button>
              </div>

              <h5 className="mt-2 text-light">Send Notification</h5>
            </div>
          </div>
        </Row> */}
        <Row>
          <Col>
            <div className="">
              <div className="justify-content-between m-4">
                <h5>New Notification</h5>
                <Divider style={{ border: "0.5px solid" }} />
                <br />
                <Form.Group controlId="Heading">
                  <Form.Label>Heading</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    value={heading}
                    onChange={e => setHeading(e.target.value)}
                    name="heading"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group controlId="Message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    className="mb-4"
                    //style={{ lineHeight: "9.5" }}
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    name="Message"
                  />
                </Form.Group>
                <Form.Group controlId="Send To">
                  <Form.Label>Send To</Form.Label>
                  <div>
                    <select
                      name="Consultation Type"
                      className="form-select"
                      aria-label="Default select example"
                      value={sendTo}
                      onChange={e => {
                        setSendTo(e.target.value)
                      }}
                    >
                      <option value={patients}>All patients</option>
                      <option value={doctors}>All doctors</option>

                      {/* {patients.map(value => (
                        <option value={value._id} key={value._id}>
                          All patients
                        </option>
                      ))} */}
                    </select>
                  </div>
                </Form.Group>
                <br /> <br />
                <Button
                  type="submit"
                  color="primary"
                  className="btn btn-primary mt-2 mr-4"
                  // onClick={postData}
                >
                  SAVE
                </Button>
                <Button
                  //onClick={handleClose}
                  color="primary"
                  className="btn btn-primary mt-2 "
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
