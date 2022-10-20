import React from "react"
import { Container } from "reactstrap"
import Showpatient from "../Showpatient"

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"

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

const Patienttable = ({ data, conversations }) => {
  console.log(conversations, data)
  const [selectedPatient, setSelectedPatient] = React.useState()
  const [openShowPatient, setOpenShowPatient] = React.useState(false)

  const handleSelectPatient = patientData => {
    setSelectedPatient(patientData)
    handleOpenShowPatient()
  }

  const handleOpenShowPatient = () => {
    console.log("clicked")
    setOpenShowPatient(!openShowPatient)
  }

  function handleGetConversation(patientId) {
    console.log(patientId)
    console.log(conversations, "i am conversations")
    let foundConversation = conversations?.find(convo => {
      return convo?.otherMemberId === patientId
    })
    console.log(foundConversation)
    return foundConversation
  }
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Patients Table</CardTitle>
          {/* <CardSubtitle className="mb-3">
            For basic styling—light padding and only horizontal dividers—add the
            base className <code>.table</code> to any
            <code>&lt;table&gt;</code>.
          </CardSubtitle> */}

          <div className="table-responsive">
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Emirates Id</th>
                  <th>File Number</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(patient => {
                  return (
                    <tr key={patient?._id}>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.email}</td>
                      <td>{patient.phoneNumber}</td>
                      <td>{patient.uniqueId1}</td>
                      <td>{patient.uniqueId2}</td>

                      <td>
                        <Button
                          color="primary"
                          className="btn btn-primary "
                          onClick={() => handleSelectPatient(patient)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <div>
              {openShowPatient && (
                <Showpatient
                  open={openShowPatient}
                  handleOpen={handleOpenShowPatient}
                  data={selectedPatient}
                  handleGetConversation={handleGetConversation}
                />
              )}
            </div>
            {/* {selectedPatient && } */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Patienttable
