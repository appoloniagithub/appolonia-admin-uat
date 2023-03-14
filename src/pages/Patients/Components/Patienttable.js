import { React, useEffect, useState } from "react"
import { Container } from "reactstrap"
import Showpatient from "../Showpatient"
import { Link } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { useHistory, useLocation } from "react-router-dom"
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
import {
  clinicVerify,
  deleteAccount,
  deletePatient,
  getPatientById,
} from "Connection/Patients"

const Patienttable = ({ data, conversations }) => {
  console.log(data)
  const history = useHistory()
  const [selectedPatient, setSelectedPatient] = useState()
  const [openShowPatient, setOpenShowPatient] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [deleteId, setDeleteId] = useState("")
  const [patData, setPatData] = useState("")
  const [fileData, setFileData] = useState("")

  const handleSelectPatient = patientData => {
    console.log(patientData)
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
  const handleClickOpen = delId => {
    setOpen(true)
    setDeleteId(delId)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const userData = async () => {
    await getPatientById({ userId: deleteId }).then(res => {
      if (res.data && res.data.data && res.data.data.foundPatient) {
        console.log(res)
        setPatData(res.data.data.foundPatient.phoneNumber)
      }
    })
  }
  const userFileData = async () => {
    await clinicVerify({ phoneNumber: patData }).then(res => {
      if (res.data && res.data.data && res.data.data.foundFile) {
        console.log(res.data.data.foundFile)
        setFileData(res.data.data.foundFile?._id)
      }
    })
  }
  useEffect(() => {
    userData()
  }, [deleteId])
  useEffect(() => {
    userFileData()
  }, [patData])

  // const deleteData = async id => {
  //   console.log(id, "in delete")

  //   await deletePatient({ patientId: id }).then(res => {
  //     console.log(res)
  //     history.push("/patients")
  //     window.location.reload()
  //   })
  // }

  const deleteData = async () => {
    //console.log(fileData, "in delete")

    await deleteAccount({ fileId: fileData }).then(res => {
      console.log(res)
      history.push("/patients")
      window.location.reload()
    })
  }
  console.log(deleteId, fileData)
  return (
    <div>
      <Card>
        <CardBody>
          {/* <CardTitle>Patients Table</CardTitle> */}
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
                  <th>Edit</th>
                  <th>Delete</th>
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
                      <td>{patient.uniqueId2}</td>
                      <td>{patient.uniqueId1}</td>

                      <td>
                        <a href={`/patients/showpatient/${patient?._id}`}>
                          <Button
                            color="primary"
                            className="btn btn-primary "
                            onClick={() => handleSelectPatient(patient)}
                          >
                            View
                          </Button>
                        </a>
                      </td>
                      <td>
                        <Link to={`/patients/edit-patient/${patient?._id}`}>
                          <i
                            className="mdi mdi-square-edit-outline"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          onClick={() => handleClickOpen(patient?._id)}
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
            {/* <div>
              {openShowPatient && (
                <Showpatient
                  open={openShowPatient}
                  handleOpen={handleOpenShowPatient}
                  data={selectedPatient}
                  handleGetConversation={handleGetConversation}
                />
              )}
            </div> */}
            {/* {selectedPatient && } */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Patienttable
