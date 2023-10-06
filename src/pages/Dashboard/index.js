import React, { useState, useEffect } from "react"
//import { Table } from "reactstrap"
import { getAllDoctors } from "Connection/Doctors"
import Divider from "@mui/material/Divider"
//import "bootstrap/dist/css/bootstrap.min.css"
import {
  activePatients,
  doctorScans,
  getAllPatients,
  newPatientRequests,
  unSeenMessages,
} from "Connection/Patients"
import {
  getAllAppointments,
  pendingAppointments,
} from "Connection/Appointments"
import moment from "moment"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { withStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  tableRow: {
    height: 10,
  },
  tableCell: {
    padding: "0px 16px",
  },
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 10,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))
const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Appolonia Dental Care"
  const classes = useStyles()

  const [patients, setPatients] = useState("")
  const [pending, setPending] = useState([])
  const [newPatient, setNewPatient] = useState([])
  const [newScans, setNewScans] = useState([])
  const [actPatients, setActPatients] = useState("")
  const [doctors, setDoctors] = useState("")
  const [messages, setMessages] = useState([])
  const [appointments, setAppointments] = useState("")
  const [displayedRows, setDisplayedRows] = useState(5)
  const [display, setDisplay] = useState(3)
  useEffect(() => {
    getAllDoctors().then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        setDoctors(res.data.data.doctors)
      }
    })
    getAllPatients().then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        setPatients(res.data.data.allPatients)
      }
    })
    getAllAppointments().then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        setAppointments(res.data.data.appointments)
      }
    })
    activePatients().then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        setActPatients(res.data.data.foundPatients)
      }
    })
    newPatientRequests().then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        setNewPatient(res.data.data.foundPatients)
      }
    })
    pendingAppointments().then(res => {
      console.log(res)
      setPending(res.data.data.pending)
    })
    doctorScans().then(res => {
      console.log(res)
      setNewScans(res.data.data.scans)
    })
    unSeenMessages().then(res => {
      console.log(res)
      setMessages(res.data.data.messages)
    })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <h4 style={{ paddingLeft: "30px" }}>Dashboard</h4>
        <br />
        <div className="d-flex justify-content-center">
          <div
            className="border border-2 border-warning mr-2"
            style={{ padding: "5px", width: "330px" }}
          >
            <h4 className="text-primary mb-4">Total Patients</h4>
            <h1 className="text-start" style={{ color: "rgb(32,80,123)" }}>
              {patients.length}
            </h1>
          </div>
          <div
            className="border border-2 border-warning mr-2"
            style={{ padding: "5px", width: "330px" }}
          >
            <h4 className="text-primary mb-4">Active Patients</h4>
            <h1 className="text-start" style={{ color: "rgb(32,80,123)" }}>
              {actPatients.length}
            </h1>
          </div>
          <div
            className="border border-2 border-warning mr-2"
            style={{ padding: "5px", width: "330px" }}
          >
            <h4 className="text-primary mb-4">Total Doctors</h4>
            <h1 className="text-start" style={{ color: "rgb(32,80,123)" }}>
              {doctors.length}
            </h1>
          </div>
          <div
            className="border border-2 border-warning mr-2"
            style={{ padding: "5px", width: "330px" }}
          >
            <h4 className="text-primary mb-4">Total Consultations</h4>
            <h1 className="text-start" style={{ color: "rgb(32,80,123)" }}>
              {appointments.length}
            </h1>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <div
            className="border rounded"
            style={{
              display: "block",
              width: 650,
              height: 400,
              backgroundColor: "#fff",
              //overflow: "scroll",
              //padding: 30,
            }}
          >
            <div style={{ padding: "12px" }}>
              <h4 className="text-primary">Chat Messages</h4>
            </div>
            <Divider />
            <TableContainer
              className="border rounded mt-2"
              style={{ border: "none" }}
              component={Paper}
            >
              <Table
                //sx={{ minWidth: 500, minHeight: 300 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Patient Name</StyledTableCell>
                    <StyledTableCell align="left">Message</StyledTableCell>
                    <StyledTableCell align="left">Received To</StyledTableCell>
                    <StyledTableCell align="left">Date/Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.slice(0, displayedRows).map(msg => {
                    return (
                      <StyledTableRow key={msg._id}>
                        <StyledTableCell align="left">
                          {msg?.patientName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {msg?.message}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {msg?.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {msg?.createdAt}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Table striped>
              <thead>
                <tr>
                  <th>Patient Name</th>

                  <th>Message</th>
                  <th>Received To</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody >
              {messages.slice(0, displayedRows).map(msg => {
                  return (
                    <tr key={msg?._id}>
                      <td>{msg?.patientName}</td>
                      <td>{msg?.message}</td>
                      <td>{msg?.name}</td>
                      <td>{msg?.createdAt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table> */}
          </div>

          <div
            className="border rounded"
            style={{
              display: "block",
              width: 650,
              height: 400,
              backgroundColor: "#fff",
              //overflow: "scroll",
              //padding: 30,
            }}
          >
            <div style={{ padding: "12px" }}>
              <h4 className="text-primary">Consultation Requests</h4>
            </div>
            <Divider />
            <TableContainer
              className="border rounded mt-2"
              style={{ border: "none" }}
              component={Paper}
            >
              <Table
                //sx={{ minWidth: 500, minHeight: 300 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Patient Name</StyledTableCell>
                    <StyledTableCell align="left">Phone Number</StyledTableCell>
                    <StyledTableCell align="left">Clinic Name</StyledTableCell>
                    <StyledTableCell align="left">Department</StyledTableCell>
                    <StyledTableCell align="left">Type</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pending.slice(0, display).map(appointment => {
                    return (
                      <StyledTableRow key={appointment?._id}>
                        <StyledTableCell align="left">
                          {appointment?.patientName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {appointment?.phoneNumber}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {appointment?.clinicName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {appointment?.serviceName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {appointment?.consultationType}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <div
            className="border rounded"
            style={{
              display: "block",
              width: 650,
              height: 400,
              backgroundColor: "#fff",
              //overflow: "scroll",
              //padding: 30,
            }}
          >
            <div style={{ padding: "12px" }}>
              <h4 className="text-primary">New Scans</h4>
            </div>
            <Divider />
            <TableContainer
              className="border rounded mt-2"
              style={{ border: "none" }}
              component={Paper}
            >
              <Table
                //sx={{ minWidth: 500, minHeight: 300 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Patient Name</StyledTableCell>

                    <StyledTableCell align="left">Doctor Name</StyledTableCell>
                    <StyledTableCell align="left">Speciality</StyledTableCell>
                    <StyledTableCell align="left">Date/Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newScans.slice(0, displayedRows).map(scan => {
                    return (
                      <StyledTableRow key={scan?._id}>
                        <StyledTableCell align="left">
                          {scan?.patientName}
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          {scan?.doctorName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {scan?.Department}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {moment(scan?.created).format("DD-MM-YYYY hh:mm A")}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Table
              className=".dashboard-table-class"
              style={{ border: "2px solid" }}
            >
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Speciality</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody style={{ height: "200px" }}>
                {newScans.slice(0, displayedRows).map(scan => {
                  return (
                    <tr key={scan?._id} className="row-height">
                      <td>{scan?.patientName}</td>
                      <td>{scan?.doctorName}</td>
                      <td>{scan?.Department}</td>
                      <td>
                        {moment(scan?.created).format("DD-MM-YYYY hh:mm A")}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table> */}
          </div>

          <div
            className="border rounded"
            style={{
              display: "block",
              width: 650,
              height: 400,
              backgroundColor: "#fff",

              //overflow: "scroll",
              //padding: 30,
            }}
          >
            <div style={{ padding: "12px" }}>
              <h4 className="text-primary">New Patient Requests</h4>
            </div>
            <Divider />
            <TableContainer
              className="border rounded mt-2"
              style={{ border: "none" }}
              component={Paper}
            >
              <Table
                //sx={{ minWidth: 500, minHeight: 300 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Patient Name</StyledTableCell>
                    <StyledTableCell align="left">Emirates ID</StyledTableCell>
                    <StyledTableCell align="left">Phone Number</StyledTableCell>

                    <StyledTableCell align="left">City</StyledTableCell>
                    <StyledTableCell align="left">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newPatient.slice(0, displayedRows).map(patient => {
                    return (
                      <StyledTableRow key={patient?._id}>
                        <StyledTableCell align="left">
                          {" "}
                          {patient?.firstName}&nbsp;{patient?.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {patient?.uniqueId}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {patient?.phoneNumber}
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          {patient?.city}
                        </StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <Table style={{ border: "2px solid " }}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Emirates ID</th>
                  <th>Phone Number</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ height: "200px" }}>
                {newPatient.slice(0, displayedRows).map(patient => {
                  return (
                    <tr key={patient?._id}>
                      <td>
                        {patient?.firstName}&nbsp;{patient?.lastName}
                      </td>
                      <td>{patient?.uniqueId}</td>
                      <td>{patient?.phoneNumber}</td>
                      <td>{patient?.city}</td>
                      <td></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table> */}
          </div>
        </div>
        <br />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
