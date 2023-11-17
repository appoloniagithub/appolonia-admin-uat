import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react"
import { Row, Col } from "reactstrap"
import { useForm } from "react-hook-form"
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
import { StyledEngineProvider } from "@mui/material/styles"
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"

//import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [clinicName, setClinicName] = useState("")
  const [isClinicName, setIsClinicName] = useState(false)
  const [isDoctorId, setIsDoctorId] = useState(false)
  const [clinics, setClinics] = useState([])
  const [date, setDate] = useState("")
  const [tempstart, setTempStart] = useState("")
  const [tempend, setTempEnd] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState("")
  const [eventId, setEventId] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)
  let history = useHistory()
  const [events, setEvents] = useState([])
  // const [myEvents, setMyEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      console.log(start, end)
      // const title = window.prompt("New Event name")
      // if (title) {
      //   setEvents(prev => [...prev, { start, end, title }])
      // }

      //setTempStart(start)
      //setTempEnd(end)
      setStartDate(start)
      setEndDate(end)
      setStartTime("")
      setEndTime("")
      setClinicName("")
      setDoctorId("")
      setOpen(true)

      //setEvents(prev => [...prev, { start, end }])
    },
    // [setTempStart || setTempEnd]
    [setStartDate || setEndDate]
  )
  const handleSelectEvent = async eve => {
    console.log(eve)
    //window.alert("Clinic Name: " + eve._id),
    setSelectedEvent(eve._id)
    setEditOpen(true)
    setEventId(eve._id)
  }

  const sdate = moment(startDate).format("MM/DD/YYYY")
  console.log(sdate)

  useEffect(() => {
    getEvent({ eventId: eventId }).then(res => {
      console.log(res)
      if (res.data.data.success == 1) {
        setClinicName(res.data.data.event[0].title)
        setStartDate(res.data.data.event[0].start)
        setEndDate(res.data.data.event[0].end)
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
    setSelectedEvent(null)
  }

  const handleEvents = async e => {
    if (clinicName && doctorId) {
      await monthlySchedule({
        title: clinicName,
        //date: date,
        start: time,
        end: time1,
        //start: startTime,
        //end: endTime,
        doctorId: doctorId,
      }).then(res => {
        console.log(res)
        if (res.data.data.success === 1) {
          handleClose()
          window.location.reload()
        }
      })
    } else {
      setIsClinicName(true)
      setIsDoctorId(true)
    }
  }
  const handleEditEvent = async () => {
    await editEvent({
      eventId: eventId,
      title: clinicName,
      //date: date,
      //start: tempstart,
      //end: tempend,
      start: time,
      end: time1,
      doctorId: doctorId,
    }).then(res => {
      console.log(res)
      if (res.data.success === 1) {
        handleClose()
        window.location.reload()
      }
    })
  }
  const handleValidation = () => {
    if (!clinicName) {
      setIsClinicName(true)
    }
    if (!doctorId) {
      setIsDoctorId(true)
    }
    // if (!phoneNumber) {
    //   setIsPhoneNumber(true)
    // }
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
  const MyCustomEvent = ({ event, onSelectEvent, open }) => (
    <div>
      <strong>{event.title}</strong>
      <br />

      {`Time: ${moment(event.start).format("HH:mm")} - ${moment(
        event.end
      ).format("HH:mm")}`}
    </div>
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(events)
  const t = new Date(endDate)
  console.log(startDate, endDate)
  const t1 = t.getTime() - 1
  console.log(t1)

  const edate = moment(t1).format("MM/DD/YYYY")
  console.log(edate)
  console.log(eventId, "eventId")
  console.log(doctorId)
  console.log(startTime.$d, endTime.$d, "start time and end time")
  const stime = moment(startTime.$d).format("hh:mm a")
  console.log(stime)
  const etime = moment(endTime.$d).format("hh:mm a")
  console.log(etime)
  const time = `${sdate} ${stime}`
  const time1 = `${edate} ${etime}`
  console.log(time, time1)

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
          // components={{
          //   event: props => (
          //     <MyCustomEvent {...props} onSelectEvent={handleSelectEvent} />
          //   ),
          // }}
          onSelectEvent={handleSelectEvent}
          // onSelectSlot={handleClickOpen}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          selectable
          //showAllEvents
          //showMultiDayTimes
          views={{ month: true, week: true, day: true, agenda: false }}
          formats={{
            timeGutterFormat: "h:mm A",

            eventTimeRangeFormat: ({ start, end }) =>
              `${moment(start).format("h:mm A")} - ${moment(end).format(
                "h:mm A"
              )}`,
            agendaTimeRangeFormat: ({ start, end }) =>
              `${moment(start).format("h:mm A")} - ${moment(end).format(
                "h:mm A"
              )}`,
          }}
        />
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="text-center">Add Schedule</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <Form.Group controlId="Clinic Name" className="mb-2">
              <Form.Label>Clinic Name</Form.Label>

              <select
                className="form-select"
                aria-label="Default select example"
                value={clinicName}
                {...register("title", {
                  required: true,
                })}
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
            {!clinicName && isClinicName && (
              <p className="text-danger">Please select Clinic Name</p>
            )}
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
                {...register("doctorId", {
                  required: true,
                })}
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
            {!doctorId && isDoctorId && (
              <p className="text-danger">Please select Doctor Name</p>
            )}
            <Row>
              <Col sm="6">
                <Form.Group className="mt-2" controlId="Start Date">
                  <Form.Label>
                    Start Date<sup className="text-danger">*</sup>
                  </Form.Label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        readOnly
                        //value={startTime}
                        value={dayjs(sdate)}
                        onChange={e => setStartDate(e)}
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
              </Col>
              <Col sm="6">
                {" "}
                <Form.Group className="mt-2" controlId="End Date">
                  <Form.Label>
                    End Date<sup className="text-danger">*</sup>
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        readOnly
                        // minDate={dayjs(startTime)}
                        //value={endTime}
                        value={dayjs(edate)}
                        onChange={e => setEndDate(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group className="mt-2" controlId="Start Time">
                  <Form.Label>
                    Start Shift Time<sup className="text-danger">*</sup>
                  </Form.Label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={startTime}
                        onChange={e => setStartTime(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
              <Col sm="6">
                {" "}
                <Form.Group className="mt-2" controlId="End Time">
                  <Form.Label>
                    End Shift Time<sup className="text-danger">*</sup>
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={endTime}
                        onChange={e => setEndTime(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={e => {
                handleSubmit(handleEvents(e))
              }}
            >
              Save
            </Button>
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

            <DialogTitle>Edit Schedule</DialogTitle>
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
            <Row>
              <Col sm="6">
                <Form.Group className="mt-2" controlId="Start Date">
                  <Form.Label>
                    Start Date<sup className="text-danger">*</sup>
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={startDate ? dayjs(startDate) : null}
                        onChange={e => setStartDate(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mt-2" controlId="End Date">
                  <Form.Label>
                    End Date<sup className="text-danger">*</sup>
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        minDate={dayjs(startDate)}
                        value={endDate ? dayjs(endDate) : null}
                        onChange={e => setEndDate(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group className="mt-2" controlId="Start Shift Time">
                  <Form.Label>
                    Start Shift Time<sup className="text-danger">*</sup>
                  </Form.Label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={dayjs(startTime)}
                        onChange={e => setStartTime(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
              <Col sm="6">
                {" "}
                <Form.Group className="mt-2" controlId="End Shift Time">
                  <Form.Label>
                    End Shift Time<sup className="text-danger">*</sup>
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={dayjs(endTime)}
                        onChange={e => setEndTime(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
            </Row>
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
