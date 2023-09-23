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

const Appointmenttable = ({ data }) => {
  console.log(data)
  const history = useHistory()
  const [appointmentData, setAppointmentData] = useState(data)
  const [apptId, setApptId] = useState("")
  const [status, setStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const socket = useRef()

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

  const handleClose = () => {
    history.push("/appointments")
    setOpen(false)
    setShow(false)
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

  //connect to Socket.io
  // useEffect(() => {
  //   socket.current = io("http://localhost:8000", {
  //     transports: ["websocket"],
  //   })
  // }, [])
  const handleVideoCall = async () => {
    try {
      return navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then(stream => {
          localStream = stream
          localVideo.srcObject = stream

          return createConnectionAndAddStream()
        })
        .catch(function (e) {
          alert("getUserMedia() error: " + e.name)
        })
    } catch (error) {
      console.log("JavaScript exception occurred:", error)
    }
  }
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
                  <th>Status</th>
                  <th>Action</th>
                  <th>Cancel</th>
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
                        {appointment.status === "Confirmed" ? (
                          <p className="text-success">{appointment.status}</p>
                        ) : (
                          <p className="text-danger">{appointment.status}</p>
                        )}

                        {/* <BootstrapSwitchButton
                          //   onlabel="Confirmed"
                          //   offlabel="Pending"
                          checked={
                            appointment.status === "Confirmed" ? true : false
                          }
                          onChange={checked => {
                            setStatus({ status: checked })
                            handleConfirmBooking(appointment?._id, checked)
                          }}
                        /> */}
                      </td>
                      <td>
                        {appointment.status === "Pending" && (
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
                        )}
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
                        {appointment.consultationType === "Remote" &&
                          appointment.status === "Confirmed" && (
                            <a
                              // href={`http://localhost:8000/chat?roomId=${appointment.roomId}`}
                              //href={`https://13.51.48.146/chat?roomId=${appointment.roomId}`}
                              href={`https://appolonia-rtc-d4683cd32c2c.herokuapp.com/chat?roomId=${appointment.roomId}`}
                              //target="__blank"
                            >
                              <Button
                                color="primary"
                                className="btn btn-primary "
                                // onClick={() => handleSelectPatient(patient)}
                              >
                                Start VideoCall
                              </Button>
                            </a>
                          )}
                      </td>
                      {/* <td>
                        {" "}
                        {appointment.status === "Pending" ? (
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
                        ) : (
                          <Button
                            disabled
                            color="primary"
                            className="btn btn-primary "
                            // onClick={() => handleSelectPatient(patient)}
                          >
                            Confirm
                          </Button>
                        )}
                      </td> */}
                      {/* <td>
                        {
                          appointment.status === "Pending" && (
                            <i
                              disabled
                              className="mdi mdi-square-edit-outline"
                              style={{ fontSize: "18px", color: "transparent" }}
                            ></i>
                          )

                          // <Link
                          //   to={`/appointments/edit-appointment/${appointment?._id}`}
                          // >
                          //   <i
                          //     className="mdi mdi-square-edit-outline"
                          //     style={{ fontSize: "18px" }}
                          //   ></i>
                          // </Link>
                        }
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
                      </td> */}
                      {/* <td>
                        {appointment.consultationType === "Remote" && (
                          <a
                            // href={`http://localhost:8000/chat?roomId=${appointment.roomId}`}
                            //href={`https://13.51.48.146/chat?roomId=${appointment.roomId}`}
                            href={`https://appolonia-rtc-d4683cd32c2c.herokuapp.com/chat?roomId=${appointment.roomId}`}
                            target="__blank"
                          >
                            <Button
                              color="primary"
                              className="btn btn-primary "
                              // onClick={() => handleSelectPatient(patient)}
                            >
                              Start VideoCall
                            </Button>
                          </a>
                        )}
                      </td> */}
                      <td>
                        {appointment.status === "Cancelled" ? (
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
                        )}
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
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Appointmenttable
