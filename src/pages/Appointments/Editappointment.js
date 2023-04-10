import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import { Row, Col } from "reactstrap"
import DatePicker from "react-datepicker"
import { Button } from "reactstrap"
import "react-datepicker/dist/react-datepicker.css"
import Divider from "@mui/material/Divider"
import { useHistory, useLocation } from "react-router"
import { getAllDoctors } from "Connection/Doctors"
import { getAppointmentById } from "Connection/Appointments"
import moment from "moment"

export default function Editappointment() {
  let history = useHistory()

  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState("")
  const [id, setId] = useState("")
  // const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    console.log(location, "appt loc")
    let splitData = location.pathname.split("/")
    console.log(splitData, "appt split")
    if (splitData && splitData.length === 4) {
      let appointmentId = splitData[3]
      setId(appointmentId)
      console.log(appointmentId)
      getAllDoctors().then(res => {
        if (res.data && res.data.data.doctors) {
          for (let i = 0; i < res.data.data.doctors.length; i++) {
            console.log(res.data.data.doctors)
            setDoctors(res.data.data.doctors)
          }
        }
      })
      getAppointmentById({ bookingId: appointmentId }).then(res => {
        console.log(res.data.data.foundAppointement)
        setDoctorId(res.data.data.foundAppointement[0].doctorId)

        //setStartDate(res.data.data.foundAppointement[0]?.date)
        // setTime(
        //   moment(res.data.data.foundAppointement[0].time).format("h:mm A")
        // )
      })
    }
  }, [])

  const handleClose = () => {
    history.push("/appointments")
  }
  console.log(startDate, time)
  return (
    <>
      <div className="form-wrapper">
        <Row>
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

              <h5 className="mt-2 text-light">Appointment Details</h5>
            </div>
          </div>
        </Row>
        <br />
        <section style={{ padding: "0 25%" }}>
          <Row>
            <Col>
              <h5 className="mt-2">Confirm Appointment</h5>

              <Divider />
              <Form.Group className="mt-2" controlId="Assign a Doctor">
                <Form.Label>
                  Assign a Doctor<sup className="text-danger">*</sup>
                </Form.Label>

                <div className="border border-secondary rounded mb-2">
                  <div className="form-check">
                    <br />
                    <input
                      type="radio"
                      value={doctors[0]?._id}
                      checked={doctorId === doctors[0]?._id}
                      id="doctors"
                      onClick={e => setDoctorId(e.target.value)}
                      name={doctorId}
                    />{" "}
                    <label style={{ marginBottom: "0" }} htmlFor="doctors">
                      {doctors[0]?.firstName} {doctors[0]?.lastName}
                    </label>
                    <p className="pl-3">{doctors[0]?.speciality}</p>
                  </div>
                </div>
                <div className="border border-secondary rounded mb-2">
                  <div className="form-check ">
                    <br />
                    <input
                      type="radio"
                      value={doctors[1]?._id}
                      checked={doctorId === doctors[1]?._id}
                      id="doctors"
                      onClick={e => setDoctorId(e.target.value)}
                      name={doctorId}
                    />{" "}
                    <label style={{ marginBottom: "0" }} htmlFor="doctors">
                      {doctors[1]?.firstName} {doctors[1]?.lastName}
                    </label>
                    <p className="pl-3">{doctors[1]?.speciality}</p>
                  </div>
                </div>
                <div className="border border-secondary rounded mb-2">
                  <div className="form-check ">
                    <br />
                    <input
                      type="radio"
                      value={doctors[2]?._id}
                      checked={doctorId === doctors[2]?._id}
                      id="doctors"
                      onClick={e => setDoctorId(e.target.value)}
                      name={doctorId}
                    />{" "}
                    <label style={{ marginBottom: "0" }} htmlFor="doctors">
                      {doctors[2]?.firstName} {doctors[2]?.lastName}
                    </label>
                    <p className="pl-3">{doctors[2]?.speciality}</p>
                  </div>
                </div>
                <div className="border border-secondary rounded mb-2">
                  <div className="form-check ">
                    <br />
                    <input
                      type="radio"
                      value={doctors[3]?._id}
                      checked={doctorId === doctors[3]?._id}
                      id="doctors"
                      onClick={e => setDoctorId(e.target.value)}
                      name={doctorId}
                    />{" "}
                    <label style={{ marginBottom: "0" }} htmlFor="doctors">
                      {doctors[3]?.firstName} {doctors[3]?.lastName}
                    </label>
                    <p className="pl-3">{doctors[3]?.speciality}</p>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mt-2" controlId="Date">
                <Form.Label className="mt-2">Select Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </Form.Group>
              <Form.Group className="mt-2" controlId="Date">
                <Form.Label className="mt-2">Select Time</Form.Label>
                <DatePicker
                  selected={time}
                  onChange={time => setTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            color="primary"
            className="btn btn-primary mt-4"
            //onClick={handleConfirmBooking}
          >
            Update Appointment
          </Button>
        </section>
      </div>
    </>
  )
}
