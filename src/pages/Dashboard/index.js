import React, { useState, useEffect } from "react"
import { Container, Table } from "reactstrap"
import { getAllDoctors } from "Connection/Doctors"
import { getAllPatients } from "Connection/Patients"

const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Appolonia Dental Care"
  const [patients, setPatients] = useState("")
  const [doctors, setDoctors] = useState("")
  useEffect(() => {
    getAllDoctors().then(res => {
      console.log(res.data.data.doctors)
      setDoctors(res.data.data.doctors)
    })
    getAllPatients().then(res => {
      console.log(res.data.data.allPatients)
      setPatients(res.data.data.allPatients)
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
              2
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
              55
            </h1>
          </div>
        </div>
        <br />
        <div className="mt-4 mb-4">
          <div className="d-flex justify-content-around">
            <div>
              <h4 className="text-primary">Messages</h4>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>File Number</th>
                      <th>Patient Name</th>

                      <th>Description</th>
                      <th>Date/Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>123</td>
                      <td>Supraja</td>
                      <td>description</td>
                      <td>18-04-2023 2:00 PM</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1234</td>
                      <td>Supraja</td>
                      <td>description</td>
                      <td>17-04-2023 3:00 PM</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div>
              <h4 className="text-primary">Consultation Requests</h4>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>File Number</th>
                      <th>Patient Name</th>

                      <th>Department</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>123</td>
                      <td>Supraja</td>
                      <td>Orthodontics</td>
                      <td>Remote</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1234</td>
                      <td>Supraja</td>
                      <td>Orthodontics</td>
                      <td>Face-to-Face</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-around">
            <div className="ml-2">
              <h4 className="text-primary">New Scans</h4>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>File Number</th>
                      <th>Patient Name</th>

                      <th>Department</th>
                      <th>Date/Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>123</td>
                      <td>Supraja</td>
                      <td>Orthodontics</td>
                      <td>18-04-2023 2:00 PM</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1234</td>
                      <td>Supraja</td>
                      <td>description</td>
                      <td>17-04-2023 3:00 PM</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-primary">New Patient Requests</h4>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>

                      <th>Patient Name</th>
                      <th>Emirates ID</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>

                      <td>Supraja</td>
                      <td>123</td>
                      <td>Dubai City</td>
                      <td>Scans submitted</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1234</td>
                      <td>Supraja</td>
                      <td>Khalifa City</td>
                      <td>Scans submitted</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
