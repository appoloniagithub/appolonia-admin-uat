import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react"
import { Row, Col } from "reactstrap"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import Form from "react-bootstrap/Form"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import {
  deleteEvent,
  editEvent,
  getAllEvents,
  getEvent,
  monthlySchedule,
} from "Connection/Doctors"
import { useHistory } from "react-router-dom"
import { getBookingData } from "Connection/Appointments"
import { getAllDoctors } from "Connection/Doctors"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [clinicName, setClinicName] = useState("")
  const [clinics, setClinics] = useState([])
  const [date, setDate] = useState("")
  const [tempstart, setTempStart] = useState("")
  const [tempend, setTempEnd] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState("")
  const [eventId, setEventId] = useState("")
  let history = useHistory()
  const [events, setEvents] = useState([])
  // const [myEvents, setMyEvents] = useState(events)
  const dateFormat = moment(tempstart).format("MM/DD/YYYY hh:mm a")
  console.log(dateFormat)
  const timeFormat = moment(tempstart).format("h:mm A")
  console.log(timeFormat, "start")
  const timeFormatEnd = moment(tempend).format("h:mm A")
  console.log(timeFormatEnd, "end")
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      console.log(typeof start, end)
      // const title = window.prompt("New Event name")
      // if (title) {
      //   setEvents(prev => [...prev, { start, end, title }])
      // }

      // setTempStart(start)
      // setTempEnd(end)
      setStartTime("")
      setEndTime("")
      setClinicName("")
      setDoctorId("")
      setOpen(true)

      //setEvents(prev => [...prev, { start, end }])
    },
    [setTempStart || setTempEnd]
    //[setStartTime || setEndTime]
  )
  const handleSelectEvent = async eve => {
    //window.alert("Clinic Name: " + eve._id),
    setEditOpen(true)
    setEventId(eve._id)
  }
  useEffect(() => {
    getEvent({ eventId }).then(res => {
      console.log(res)
      if (res.data.data.success == 1) {
        setClinicName(res.data.data.event[0].title)
        setStartTime(res.data.data.event[0].start)
        setEndTime(res.data.data.event[0].end)
        setDoctorId(res.data.data.event[0].doctorId)
      }
    })
  }, [eventId])
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setEditOpen(false)
  }

  const handleEvents = async () => {
    await monthlySchedule({
      title: clinicName,
      //date: date,
      //start: tempstart,
      //end: tempend,
      start: startTime,
      end: endTime,
      doctorId: doctorId,
    }).then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        handleClose()
        window.location.reload()
      }
    })
  }
  const handleEditEvent = async () => {
    await editEvent({
      eventId: eventId,
      title: clinicName,
      //date: date,
      //start: tempstart,
      //end: tempend,
      start: startTime,
      end: endTime,
      doctorId: doctorId,
    }).then(res => {
      console.log(res)
      if (res.data.success === 1) {
        handleClose()
        window.location.reload()
      }
    })
  }
  useEffect(() => {
    getAllEvents().then(res => {
      console.log(res.data.data.events)
      setEvents(res.data.data.events)
    })
  }, [])
  useEffect(() => {
    getBookingData().then(res => {
      console.log(res)
      // setServices(res.data.data.services)
      setClinics(res.data.data.clinic)
    })
  }, [])
  useEffect(() => {
    getAllDoctors().then(res => {
      if (res.data && res.data.data.doctors) {
        for (let i = 0; i < res.data.data.doctors.length; i++) {
          console.log(res.data.data.doctors)
          setDoctors(res.data.data.doctors)
        }
      }
    })
  }, [])

  const handleDeleteEvent = async (req, res) => {
    await deleteEvent({ eventId: eventId }).then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        handleClose()
        toast.success("Event Deleted")
        window.location.reload()
        //alert("event deleted")
      }
    })
  }

  const eventStyleGetter = async (event, start, end, isSelected) => {
    let current_time = moment().format("YYYY MM DD")
    let event_time = moment(event.start).format("YYYY MM DD")
    let background = current_time > event_time ? "#DE6987" : "#8CBD4C"
    return {
      style: {
        backgroundColor: background,
      },
    }
  }

  console.log(events)
  console.log(tempstart, tempend)
  console.log(startTime.$d, "start time")
  const stime = moment(startTime.$d).format("MM/DD/YYYY hh:mm a")
  console.log(stime)
  console.log(endTime.$d, "end time")
  const etime = moment(endTime.$d).format("MM/DD/YYYY hh:mm a")
  console.log(etime)
  console.log(eventId, "eventId")
  console.log(typeof startTime)
  console.log(doctorId)
  return (
    <>
      {/* <Form.Group className="mb-2" controlId="Assign a Doctor">
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
          <option>All doctors</option>
        </select>
      </Form.Group> */}

      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={events}
          // startAccessor="start"
          startAccessor={event => {
            return new Date(event.start)
          }}
          // endAccessor="end"
          endAccessor={event => {
            return new Date(event.end)
          }}
          onSelectEvent={handleSelectEvent}
          // onSelectSlot={handleClickOpen}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          selectable
        />
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="text-center">New Event</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <Form.Group controlId="Clinic Name" className="mb-2">
              <Form.Label>Clinic Name</Form.Label>

              <select
                className="form-select"
                aria-label="Default select example"
                value={clinicName}
                onChange={e => setClinicName(e.target.value)}
              >
                <option>Select</option>
                {clinics.map(value => (
                  <option value={value.address} key={value.address}>
                    {value.address}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mt-2" controlId="Assign a Doctor">
              <Form.Label>
                Assign a Doctor<sup className="text-danger">*</sup>
              </Form.Label>
              {/* {doctorId == "All doctors" ? ( */}
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
              {/* ) : (
                <select
                  className="form-select"
                  aria-label="Default select example"
                  disabled={true}
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
              )} */}
            </Form.Group>

            <Form.Group className="mt-2" controlId="Start Time">
              <Form.Label>
                Start Time<sup className="text-danger">*</sup>
              </Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    value={startTime}
                    onChange={e => setStartTime(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {/* <DatePicker
                selected={startTime}
                onChange={date => setStartTime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              /> */}
            </Form.Group>
            <Form.Group className="mt-2" controlId="End Time">
              <Form.Label>
                End Time<sup className="text-danger">*</sup>
              </Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    minDate={dayjs(startTime)}
                    value={endTime}
                    onChange={e => setEndTime(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEvents}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={editOpen} onClose={handleClose}>
          <div
            className="d-flex justify-content-between"
            style={{ padding: "0 16px" }}
          >
            <Button onClick={handleClose}>Cancel</Button>

            <DialogTitle>Edit Event</DialogTitle>
            <Button onClick={handleEditEvent}>Save</Button>
          </div>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <Form.Group controlId="Clinic Name" className="mb-2">
              <Form.Label>Clinic Name</Form.Label>

              <select
                className="form-select"
                aria-label="Default select example"
                value={clinicName}
                onChange={e => setClinicName(e.target.value)}
              >
                <option>Select</option>
                {clinics.map(value => (
                  <option value={value.address} key={value.address}>
                    {value.address}
                  </option>
                ))}
              </select>
            </Form.Group>

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
            </Form.Group>

            <Form.Group className="mt-2" controlId="Start Time">
              <Form.Label>
                Start Time<sup className="text-danger">*</sup>
              </Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    value={startTime ? dayjs(startTime) : null}
                    onChange={e => setStartTime(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {/* <DatePicker
                selected={startTime}
                onChange={date => setStartTime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              /> */}
            </Form.Group>
            <Form.Group className="mt-2" controlId="End Time">
              <Form.Label>
                End Time<sup className="text-danger">*</sup>
              </Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    minDate={dayjs(startTime)}
                    value={endTime ? dayjs(endTime) : null}
                    onChange={e => setEndTime(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>
          </DialogContent>
          <DialogActions></DialogActions>

          <Button
            style={{
              borderColor: "#f5504e",
              border: "1px solid",
              margin: "0 22px 10px 22px",
            }}
            className="text-danger"
            onClick={handleDeleteEvent}
          >
            Delete Event
          </Button>
        </Dialog>
      </div>
    </>
  )
}

export default MyCalendar
