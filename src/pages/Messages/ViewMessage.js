import React, { useEffect, useState } from "react"
import { Table, Row, Col, Card, CardBody, Button } from "reactstrap"
import { useHistory, useLocation } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Divider from "@mui/material/Divider"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { getContactById } from "Connection/Patients"
import url from "Connection/Api/api"

const ViewMessage = () => {
  const [contact, setContact] = useState("")
  const [name, setName] = useState("")
  const [os, setOs] = useState("")
  const [appVersion, setAppVersion] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const [email, setEmail] = useState("")
  const [source, setSource] = useState("")
  const [platform, setPlatform] = useState("")
  const [files, setFiles] = useState("")
  const history = useHistory()

  const handleClose = () => {
    history.push("/contact-issues")
  }

  useEffect(() => {
    console.log(location)
    let splitData = location.pathname.split("/")
    console.log(splitData)
    if (splitData && splitData.length === 4) {
      let contactId = splitData[3]
      console.log(contactId)
      getContactById({ contactId: contactId }).then(res => {
        console.log(res)
        if (res.data.data.success === 1) {
          setContact(res.data.data.foundContact)
          setName(res.data.data.foundContact[0]?.name)
          setAppVersion(res.data.data.foundContact[0]?.appVersion)
          setSubject(res.data.data.foundContact[0]?.subject)
          setEmail(res.data.data.foundContact[0]?.contactInfo)
          setMessage(res.data.data.foundContact[0]?.message)
          setOs(res.data.data.foundContact[0]?.appOsVersion)
          setPlatform(res.data.data.foundContact[0]?.source)
          setFiles(res.data.data.foundContact[0]?.files[0])
        }
      })
    }
  }, [])
  return (
    <>
      <div className="form-wrapper">
        <Row className="mb-2">
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

              <h5 className="mt-2 text-light">Message Details</h5>
            </div>
          </div>
        </Row>

        <section style={{ padding: "0 17%" }}>
          <br />
          <h4 className="">View Message</h4>
          <div
            style={{ backgroundColor: " #fff" }}
            className="border border-gray rounded mt-4 ml-4 p-2"
          >
            <Row>
              <Col>
                <h5 className="mt-2">Contact Info</h5>

                <Divider />
                <Form className="m-2">
                  <Row>
                    <Col sm="6">
                      <Form.Group className="mt-2" controlId="Name">
                        <Form.Label className="mt-2">Name</Form.Label>
                        <Form.Control
                          readOnly
                          type="text"
                          name="name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group className="mt-2" controlId="Platform">
                        <Form.Label className="mt-2">Platform</Form.Label>
                        <Form.Control
                          readOnly
                          type="text"
                          name="Platform"
                          value={platform}
                          onChange={e => setPlatform(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Email">
                        <Form.Label className="mt-2">Email</Form.Label>
                        <Form.Control
                          readOnly
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="OS">
                        <Form.Label className="mt-2">OS</Form.Label>

                        <Form.Control
                          readOnly
                          type="text"
                          value={os}
                          onChange={e => setOs(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Phone Number">
                        <Form.Label className="test mt-2">Mobile</Form.Label>

                        <PhoneInput
                          disabled
                          country={"ae"}
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="App Version">
                        <Form.Label className="mt-2">App Version</Form.Label>
                        <Form.Control
                          readOnly
                          type="text"
                          value={appVersion}
                          onChange={e => setAppVersion(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <br />
          </div>
        </section>

        <section className="mt-2" style={{ padding: "0 17%" }}>
          <div
            style={{ backgroundColor: " #fff" }}
            className="border border-gray rounded ml-4 p-2"
          >
            <Row>
              <Col>
                <h5 className="mt-2">Message</h5>

                <Divider />
                <Form className="m-2">
                  <Row>
                    <Form.Group className="mt-2" controlId="Subject">
                      <Form.Label className="">Subject</Form.Label>
                      <Form.Control
                        readOnly
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="" controlId="Message">
                      <Form.Label className="mt-2">Message</Form.Label>
                      <div className="form-floating">
                        <textarea
                          readOnly
                          className="form-control"
                          id="floatingTextarea"
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                        ></textarea>
                      </div>
                    </Form.Group>
                    <Form.Group className="" controlId="Files">
                      <Form.Label className="mt-2">Files</Form.Label>
                      <div className="form-floating">
                        <img
                          width="100"
                          height="100"
                          src={`${url}/api/${files}`}
                          //onChange={e => setFiles(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
            </Row>
            <br />
          </div>
        </section>
      </div>
    </>
  )
}

export default ViewMessage
