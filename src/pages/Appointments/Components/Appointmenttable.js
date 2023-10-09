import { React, useEffect, useState, useRef } from "react"
import { Container } from "reactstrap"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import { Link } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { useHistory, useLocation } from "react-router-dom"
import {
  cancelBooking,
  completeBooking,
  confirmBooking,
  deleteBooking,
} from "Connection/Appointments"
import { io } from "socket.io-client"
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap"
import moment from "moment"

const Appointmenttable = ({ data }) => {
  console.log(data)
  const history = useHistory()
  const [appointmentData, setAppointmentData] = useState(data)
  const [apptId, setApptId] = useState("")
  const [status, setStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [view, setView] = useState(false)
  const socket = useRef()
  const [currentTime, setCurrentTime] = useState("")
  const [dateObject, setDateObject] = useState(null)
  const [oneHourBefore, setOneHourBefore] = useState("")
  const [oneHourAfter, setOneHourAfter] = useState("")
  const [date, setDate] = useState("")

  const handleConfirmBooking = async appointmentId => {
    await confirmBooking({ bookingId: appointmentId }).then(res => {
      console.log(res.data.data.appointment[0].status)
      setStatus(res.data.data.appointment[0].status)
      let tempData = appointmentData.map(item =>
        item._id === appointmentId ? { ...item, status: "Confirmed" } : item
      )
      console.log(tempData, "temp")
      setAppointmentData([...tempData])
    })
  }

  const handleClickOpen = appointmentId => {
    setOpen(true)
    setApptId(appointmentId)
  }

  const handleClick = appointmentId => {
    setShow(true)
    setApptId(appointmentId)
  }
  const handleView = appointmentId => {
    setView(true)
    setApptId(appointmentId)
  }

  const handleClose = () => {
    history.push("/appointments")
    setOpen(false)
    setShow(false)
    setView(false)
  }

  const deleteData = async () => {
    //console.log(fileData, "in delete")

    await deleteBooking({ bookingId: apptId }).then(res => {
      console.log(res)
      history.push("/appointments")
      window.location.reload()
    })
  }

  const cancelData = async () => {
    //console.log(fileData, "in delete")

    await cancelBooking({ bookingId: apptId }).then(res => {
      console.log(res)
      history.push("/appointments")
      window.location.reload()
    })
  }

  const complete = async () => {
    await completeBooking({ bookingId: apptId }).then(res => {
      console.log(res)
      history.push("/appointments")
      window.location.reload()
    })
  }

  console.log(appointmentData)
  useEffect(() => {
    let tempArr = []
    for (let i = 0; i < appointmentData.length; i++) {
      let t1 = appointmentData[i].time
      //setCurrentTime(t1)
      let tempObj = appointmentData[i]
      if (
        appointmentData[i].status === "Confirmed" &&
        appointmentData[i].date === moment(new Date()).format("YYYY-MM-DD")
      ) {
        let obj = convertTimeStringToDate(t1)
        console.log(t1, typeof t1, obj)
        if (obj?.newHourBefore && obj?.newHourAfter) {
          const curTime = moment(new Date()).format("hh:mm A")
          console.log(curTime)
          let curTimeMin = convertTo24Hour(curTime)
          let newHourBeforeMin = convertTo24Hour(obj?.newHourBefore)
          let newHourAfterMin = convertTo24Hour(obj?.newHourAfter)
          console.log(newHourBeforeMin, newHourAfterMin, "min")
          let beforeHrs = (curTimeMin - newHourBeforeMin) / 60
          let afterHrs = (newHourAfterMin - curTimeMin) / 60
          console.log(beforeHrs, afterHrs, "before,after")
          tempObj = {
            ...tempObj,
            // newHourBefore: obj?.newHourBefore,
            // newHourAfter: obj?.newHourAfter,
            isStarted: beforeHrs >= 0 && afterHrs >= 0 ? true : false,
          }
        }
      }
      tempArr.push(tempObj)
    }
    setAppointmentData([...tempArr])
  }, [])

  function convertTo24Hour(time12) {
    const [time, period] = time12.split(" ")
    let [hours, minutes] = time.split(":")
    hours = parseInt(hours, 10)
    minutes = parseInt(minutes, 10)

    if (period === "PM" && hours !== 12) {
      hours += 12
    } else if (period === "AM" && hours === 12) {
      hours = 0
    }

    return hours * 60 + minutes // Convert to minutes for easier calculations
  }

  const convertTimeStringToDate = timeString => {
    const parts = timeString.split(" ") // Split the time and AM/PM
    console.log(parts.length, parts, "parts")
    if (parts.length !== 2) {
      // throw new Error(
      //   "Invalid time format. Please include both time and AM/PM."
      // )
      return null
    }

    const time = parts[0] // Extract the time part
    const ampm = parts[1] // Extract the AM/PM part

    const [hours, minutes] = time.split(":").map(Number)

    // Convert 12-hour format to 24-hour format
    let hours24 = hours
    if (ampm) {
      if (ampm.toLowerCase() === "pm" && hours < 12) {
        hours24 += 12
      } else if (ampm.toLowerCase() === "am" && hours === 12) {
        hours24 = 0
      }
    }

    const currentDate = new Date()
    currentDate.setHours(hours24, minutes, 0, 0)
    console.log(currentDate)

    const before = new Date(currentDate)
    const after = new Date(currentDate)

    const oneHrBefore = before.setHours(currentDate.getHours() - 1)
    const oneHrAfter = after.setHours(currentDate.getHours() + 1)
    const hrBefore = new Date(oneHrBefore)
    const hrAfter = new Date(oneHrAfter)
    const today = new Date()
    const todayDate = moment(today).format("YYYY-MM-DD")
    setDate(todayDate)
    console.log(todayDate)
    const newHourBefore = moment(hrBefore).format("hh:mm A")
    const newHourAfter = moment(hrAfter).format("hh:mm A")
    //setOneHourBefore(newHourBefore)
    //setOneHourAfter(newHourAfter)

    return { newHourBefore, newHourAfter }
  }
  // useEffect(() => {
  //   //convertTimeStringToDate("7:30 PM")
  //   convertTimeStringToDate(currentTime)
  // }, [])
  console.log(appointmentData)
  return (
    <>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  {/* <th>Email</th> */}
                  <th>Phone Number</th>
                  {/* <th>Emirates Id</th> */}
                  <th>Clinic Name</th>
                  <th>Service Name</th>
                  <th>Consultation Type</th>
                  <th>Preferred Date/Time</th>
                  <th>Preferred Doctor</th>
                  <th>Status</th>
                  <th>Action</th>
                  {/* <th>Cancel</th> */}
                  {/* <th>Confirm</th>
                  <th>Reschedule</th>

                  <th>Video call</th> */}
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData?.map(appointment => {
                  return (
                    <tr key={appointment?._id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.phoneNumber}</td>
                      <td>{appointment.clinicName}</td>
                      <td>{appointment.serviceName}</td>
                      <td>{appointment.consultationType}</td>

                      <td>
                        {appointment.status == "Pending" && (
                          <p>
                            {" "}
                            {appointment.pdate} {appointment.ptime}
                          </p>
                        )}
                        {appointment.status == "Reschedule" && (
                          <p>
                            {" "}
                            {appointment.pdate} {appointment.ptime}
                          </p>
                        )}
                      </td>
                      <td>
                        {appointment.status == "Pending" && (
                          <p> {appointment.pdoctorName}</p>
                        )}
                        {appointment.status == "Reschedule" && (
                          <p> {appointment.pdoctorName}</p>
                        )}
                      </td>
                      <td>
                        {appointment.status === "Confirmed" ? (
                          <p className="text-success">{appointment.status}</p>
                        ) : (
                          <p className="text-danger">{appointment.status}</p>
                        )}
                      </td>
                      <td>
                        {appointment.status === "Pending" && (
                          <div>
                            <span>
                              <a
                                href={`/appointments/viewappointment/${appointment?._id}`}
                              >
                                <Button
                                  color="primary"
                                  className="btn btn-primary "
                                  // onClick={() => handleSelectPatient(patient)}
                                >
                                  Confirm
                                </Button>
                              </a>
                            </span>
                            &nbsp;
                            <span>
                              <Button
                                color="primary"
                                className="btn btn-primary "
                                onClick={() => handleClick(appointment?._id)}
                              >
                                Cancel
                              </Button>
                            </span>
                          </div>
                        )}
                        <div className="d-flex">
                          {appointment.status === "Confirmed" && (
                            <div className="d-flex">
                              <a
                              //href={`/appointments/viewappointment/${appointment?._id}`}
                              >
                                <Button
                                  color="primary"
                                  className="btn btn-primary "
                                  onClick={() => handleView(appointment?._id)}
                                >
                                  Complete
                                </Button>
                              </a>
                              &nbsp;
                              <Button
                                color="primary"
                                className="btn btn-primary "
                                onClick={() => handleClick(appointment?._id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                          &nbsp;
                          {appointment.consultationType === "Remote" &&
                            appointment.status === "Confirmed" &&
                            appointment?.isStarted &&
                            appointment.date ===
                              moment(new Date()).format("YYYY-MM-DD") && (
                              <a
                                href={`https://appolonia-rtc-d4683cd32c2c.herokuapp.com/chat?roomId=${appointment.roomId}`}
                                target="__blank"
                              >
                                <Button
                                  color="primary"
                                  className="btn btn-primary "
                                >
                                  Start VideoCall
                                </Button>
                              </a>
                            )}
                        </div>
                        {appointment.status === "Reschedule" && (
                          <Link
                            to={`/appointments/edit-appointment/${appointment?._id}`}
                          >
                            <Button
                              color="primary"
                              className="btn btn-primary "
                              // onClick={() => handleSelectPatient(patient)}
                            >
                              Reschedule
                            </Button>
                          </Link>
                        )}

                        {/* </td>

                      <td> */}
                        {/* {appointment.status === "Cancelled" ? (
                          <Button
                            disabled
                            color="primary"
                            className="btn btn-primary "
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            className="btn btn-primary "
                            onClick={() => handleClick(appointment?._id)}
                          >
                            Cancel
                          </Button>
                        )} */}
                      </td>
                      <td>
                        <Link
                          to={`/appointments/edit-appointment/${appointment?._id}`}
                        >
                          <i
                            className="mdi mdi-square-edit-outline"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          onClick={() => handleClickOpen(appointment?._id)}
                          className="mdi mdi-delete-outline"
                          style={{ fontSize: "18px" }}
                        ></i>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="btn btn-primary m-2 "
                  color="primary"
                  onClick={handleClose}
                >
                  CANCEL
                </Button>
                <Button
                  className="btn btn-primary m-2 "
                  color="primary"
                  onClick={() => deleteData()}
                >
                  DELETE
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={show}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to cancel?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="btn btn-primary m-2 "
                  color="primary"
                  onClick={handleClose}
                >
                  NO
                </Button>
                <Button
                  className="btn btn-primary m-2 "
                  color="primary"
                  onClick={() => cancelData()}
                >
                  YES
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={view}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to complete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="btn btn-primary m-2 "
                  color="primary"
                  onClick={handleClose}
                >
                  NO
                </Button>
                <Button
                  className="btn btn-primary m-2 "
                  color="primary"
                  onClick={() => complete()}
                >
                  YES
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Appointmenttable
