import React, { useState, useEffect } from "react"
import { Table } from "reactstrap"
import { getAllDoctors } from "Connection/Doctors"
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

const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Appolonia Dental Care"
  const [patients, setPatients] = useState("")
  const [pending, setPending] = useState([])
  const [newPatient, setNewPatient] = useState([])
  const [newScans, setNewScans] = useState([])
  const [actPatients, setActPatients] = useState("")
  const [doctors, setDoctors] = useState("")
  const [messages, setMessages] = useState([])
  const [appointments, setAppointments] = useState("")
  useEffect(() => {
    getAllDoctors().then(res => {
      console.log(res.data.data.doctors)
      setDoctors(res.data.data.doctors)
    })
    getAllPatients().then(res => {
      console.log(res.data.data.allPatients)
      setPatients(res.data.data.allPatients)
    })
    getAllAppointments().then(res => {
      console.log(res.data.appointments)
      setAppointments(res.data.appointments)
    })
    activePatients().then(res => {
      console.log(res.data.data.foundPatients)
      setActPatients(res.data.data.foundPatients)
    })
    newPatientRequests().then(res => {
      console.log(res.data.data.foundPatients)
      setNewPatient(res.data.data.foundPatients)
    })
    pendingAppointments().then(res => {
      console.log(res)
      setPending(res.data.data.pending)
    })
    doctorScans().then(res => {
      console.log(res.data.data.scans)
      setNewScans(res.data.data.scans)
    })
    unSeenMessages().then(res => {
      console.log(res.data.data.messages)
      setMessages(res.data.data.messages)
    })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <br />
        <div className="d-flex justify-content-around">
          <div>
            <h4 className="text-primary mb-4">Total Patients</h4>
            <h1 className="text-center" style={{ color: "rgb(32,80,123)" }}>
              {patients.length}
            </h1>
          </div>
          <div>
            <h4 className="text-primary mb-4">Active Patients</h4>
            <h1 className="text-center" style={{ color: "rgb(32,80,123)" }}>
              {actPatients.length}
            </h1>
          </div>
          <div>
            <h4 className="text-primary mb-4">Total Doctors</h4>
            <h1 className="text-center" style={{ color: "rgb(32,80,123)" }}>
              {doctors.length}
            </h1>
          </div>
          <div>
            <h4 className="text-primary mb-4">Total Consultations</h4>
            <h1 className="text-center" style={{ color: "rgb(32,80,123)" }}>
              {appointments.length}
            </h1>
          </div>
        </div>
        <br />
        <div className="d-flex">
          <div
            style={{
              display: "block",
              width: 700,
              padding: 30,
              height: 300,
              overflow: "scroll",
              // border: "solid 0.5px",
            }}
          >
            <h4 className="text-primary">Messages</h4>
            <Table bordered={true}>
              <thead>
                <tr>
                  <th>Patient Name</th>

                  <th>Message</th>
                  <th>Received To</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => {
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
            </Table>
          </div>
          <div
            style={{
              display: "block",
              width: 700,
              height: 300,
              overflow: "scroll",
              padding: 30,
            }}
          >
            <h4 className="text-primary">Consultation Requests</h4>
            <Table bordered={true}>
              <thead>
                <tr>
                  {/* <th>File Number</th> */}
                  <th>Patient Name</th>
                  <th>Phone Number</th>
                  <th>Clinic Name</th>
                  <th>Department</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(appointment => {
                  return (
                    <tr key={appointment?._id}>
                      {/* <td>123</td> */}

                      <td>{appointment?.patientName}</td>
                      <td>{appointment?.phoneNumber}</td>
                      <td>{appointment?.clinicName}</td>
                      <td>{appointment?.serviceName}</td>
                      <td>{appointment?.consultationType}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="d-flex">
          <div
            style={{
              display: "block",
              width: 700,
              padding: 30,
              height: 300,
              overflow: "scroll",
            }}
          >
            <h4 className="text-primary">New Scans</h4>
            <Table bordered={true}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Speciality</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {newScans.map(scan => {
                  return (
                    <tr key={scan?._id}>
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
            </Table>
          </div>

          <div
            style={{
              display: "block",
              width: 700,
              padding: 30,
              height: 300,
              overflow: "scroll",
            }}
          >
            <h4 className="text-primary">New Patient Requests</h4>
            <Table bordered={true}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Emirates ID</th>
                  <th>Phone Number</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newPatient?.map(patient => {
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
            </Table>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
