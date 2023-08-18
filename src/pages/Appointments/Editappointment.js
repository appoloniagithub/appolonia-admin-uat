import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import { Row, Col } from "reactstrap"
import DatePicker from "react-datepicker"
import { Button } from "reactstrap"
import "react-datepicker/dist/react-datepicker.css"
import Divider from "@mui/material/Divider"
import { useHistory, useLocation } from "react-router"
import { getAllDoctors } from "Connection/Doctors"
import { getAppointmentById, updateBooking } from "Connection/Appointments"
import moment from "moment"
import { toast } from "react-toastify"

export default function Editappointment() {
  let history = useHistory()

  const timeOptions = [
    "Select",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
  ]
  const [doctors, setDoctors] = useState([])
  const [doctorName, setDoctorName] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [id, setId] = useState("")
  // const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState("")
  const [time, setTime] = useState()
  const [status, setStatus] = useState("")
  const [startTime, setStartTime] = useState("")

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
        setStatus(res.data.data.foundAppointement[0].status)
        setStartDate(res.data.data.foundAppointement[0]?.date)
        setStartTime(res.data.data.foundAppointement[0].time)
        // setTime(
        //   moment(res.data.data.foundAppointement[0].time).format(
        //     "yyyy-mm-ddThh:mm:ss.sssZ"
        //   )
        // )
      })
    }
  }, [])

  const handleUpdateBooking = async () => {
    await updateBooking({
      bookingId: id,
      doctorId: doctorId,
      doctorName,
      date: startDate,
      time: startTime,
    }).then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        history.push("/appointments")
        toast.success("Appointment rescheduled successfully")
      } else {
        toast.error("Error rescheduling an appointment")
      }
    })
  }
  const handleClose = () => {
    history.push("/appointments")
  }
  console.log(startDate)
  // console.log(moment(time).format("yyyy-mm-ddThh:mm:ss.sssZ"))
  console.log(startTime)

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
              {status == "Reschedule" ? (
                <h5 className="mt-2">Reschedule Appointment</h5>
              ) : (
                <h5 className="mt-2">Edit Appointment</h5>
              )}
              <Divider />
              <Form.Group className="mt-2" controlId="Assign a Doctor">
                <Form.Label>
                  Assign a Doctor<sup className="text-danger">*</sup>
                </Form.Label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  disabled={false}
                  value={doctorId}
                  onChange={e => setDoctorId(e.currentTarget.value)}
                >
                  <option>Select</option>
                  {doctors.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.firstName} {item.lastName}
                    </option>
                  ))}
                </select>
                {/* <div className="border border-secondary rounded mb-2">
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
                </div> */}
              </Form.Group>
              <Form.Group className="mt-2" controlId="Date">
                <Form.Label className="mt-2">Select Date</Form.Label>
                {/* <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                /> */}
                <Form.Control
                  className="mb-2"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  name="Date"
                />
              </Form.Group>
              {/* <Form.Group className="mt-2" controlId="Date">
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
              </Form.Group> */}
              <Form.Group className="mt-2" controlId="Date">
                <Form.Label className="mt-2">Select Time</Form.Label>
                <select
                  name="Select Time"
                  className="form-select"
                  aria-label="Default select example"
                  value={startTime}
                  onChange={e => {
                    setStartTime(e.target.value)
                  }}
                >
                  {timeOptions.map(value => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          </Row>
          {status == "Reschedule" ? (
            <Button
              color="primary"
              className="btn btn-primary mt-4"
              onClick={handleUpdateBooking}
            >
              Reschedule Appointment
            </Button>
          ) : (
            <Button
              color="primary"
              className="btn btn-primary mt-4"
              onClick={handleUpdateBooking}
            >
              Edit Appointment
            </Button>
          )}
        </section>
      </div>
    </>
  )
}
