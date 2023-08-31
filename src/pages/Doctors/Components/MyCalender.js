// import React, { Fragment, useState, useCallback, useMemo } from "react"
// import PropTypes from "prop-types"
// import { Calendar, Views, DateLocalizer } from "react-big-calendar"
// //import DemoLink from "./DemoLink.component"
// //import events from '../../resources/events'

// export default function Selectable() {
//   //const [myEvents, setEvents] = useState(events)

//   //   const handleSelectSlot = useCallback(
//   //     ({ start, end }) => {
//   //       const title = window.prompt('New Event name')
//   //       if (title) {
//   //         setEvents((prev) => [...prev, { start, end, title }])
//   //       }
//   //     },
//   //     [setEvents]
//   //   )

//   const handleSelectEvent = useCallback(event => window.alert(event.title), [])

//   const { defaultDate, scrollToTime } = useMemo(
//     () => ({
//       defaultDate: new Date(2015, 3, 12),
//       scrollToTime: new Date(1970, 1, 1, 6),
//     }),
//     []
//   )

//   return (
//     <Fragment>
//       {/* <DemoLink fileName="selectable">
//         <strong>
//           Click an event to see more info, or drag the mouse over the calendar
//           to select a date/time range.
//         </strong>
//       </DemoLink> */}
//       <div className="height600">
//         <Calendar
//           defaultDate={defaultDate}
//           defaultView={Views.WEEK}
//           //events={myEvents}
//           //localizer={localizer}
//           onSelectEvent={handleSelectEvent}
//           //onSelectSlot={handleSelectSlot}
//           selectable
//           scrollToTime={scrollToTime}
//         />
//       </div>
//     </Fragment>
//   )
// }

// Selectable.propTypes = {
//   localizer: PropTypes.instanceOf(DateLocalizer),
// }
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
import "react-big-calendar/lib/css/react-big-calendar.css"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { deleteEvent, getAllEvents, monthlySchedule } from "Connection/Doctors"
import { useHistory } from "react-router-dom"
import { getBookingData } from "Connection/Appointments"

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => {
  const [open, setOpen] = useState(false)
  const [clinicName, setClinicName] = useState("")
  const [clinics, setClinics] = useState([])
  const [date, setDate] = useState("")
  const [tempstart, setTempStart] = useState("")
  const [tempend, setTempEnd] = useState("")
  const [time, setTime] = useState("")
  let history = useHistory()
  const [events, setEvents] = useState([])
  // const [myEvents, setMyEvents] = useState(events)
  const dateFormat = moment(tempstart).format("dd/mm/yyyy")
  console.log(dateFormat)
  const timeFormat = moment(tempstart).format("h:mm A")
  console.log(timeFormat, "start")
  const timeFormatEnd = moment(tempend).format("h:mm A")
  console.log(timeFormatEnd, "end")
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      // console.log(start, end)
      // const title = window.prompt("New Event name")
      // if (title) {
      //   setEvents(prev => [...prev, { start, end, title }])
      // }

      setTempStart(start)
      setTempEnd(end)
      setOpen(true)

      //setEvents(prev => [...prev, { start, end }])
    },
    [setTempStart || setTempEnd]
  )
  const handleSelectEvent = useCallback(event => window.alert(event.title), [])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleC = () => {
    history.push("/doctors")
  }
  const handleEvents = async () => {
    await monthlySchedule({
      title: clinicName,
      date: date,
      start: tempstart,
      end: tempend,
    }).then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
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

  const handleDeleteEvent = async (req, res) => {
    let response = await deleteEvent({ eventId })
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
  console.log(typeof date)
  console.log(events)
  console.log(tempstart, tempend)
  return (
    <>
      <Row>
        <div className="border border-secondary rounded  ">
          <div
            style={{
              backgroundColor: "#20507B",
              color: "white",
              height: "60px",
            }}
            className="d-flex justify-content-start align-items-center "
          >
            <div>
              <button onClick={handleC} className="btn text-light">
                <i className="fas fa-arrow-left" />
              </button>
            </div>

            <h5 className="mt-2 text-light">Work Calender</h5>
          </div>
        </div>
      </Row>
      <div
        className="myCustomHeight"
        style={{ top: "5px", position: "relative" }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          // startAccessor="start"
          startAccessor={event => {
            return new Date(event.start)
          }}
          //endAccessor="end"
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
          <DialogTitle>Please fill the details</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            {/* <TextField
              margin="dense"
              id="name"
              label="Clinic Name"
              type="text"
              fullWidth
              variant="standard"
              //value={clinicName}
              //onChange={e => setClinicName(e.target.value)}
              
            /> */}
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
            <Form.Group controlId="Clinic Name" className="">
              <Form.Label>Date</Form.Label>
              <Form.Control
                className=""
                id="date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </Form.Group>
            <TextField
              margin="dense"
              id="time"
              label="Time"
              type="text"
              fullWidth
              variant="standard"
              //value={time}
              value={`${timeFormat} - ${timeFormatEnd}`}
              // onChange={e => setTime(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEvents}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default MyCalendar
