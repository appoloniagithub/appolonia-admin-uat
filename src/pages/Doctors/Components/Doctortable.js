import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import axios from "axios"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { deleteDoctor } from "Connection/Doctors"
import { getDoctorById } from "Connection/Doctors"
import url from "../../../Connection/Api/api"
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

const Doctortable = ({ data }) => {
  const history = useHistory()
  console.log(data, "table")
  const [deleteId, setDeleteId] = useState("")

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = delId => {
    setOpen(true)
    setDeleteId(delId)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = async id => {
    console.log(id, "in delete")

    await deleteDoctor({ doctorId: id }).then(res => {
      console.log(res)
      history.push("/doctors")
      window.location.reload()
    })
  }
  return (
    <div>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Speciality</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(doctor => {
                  return (
                    <tr key={doctor?._id}>
                      <td>{doctor.firstName}</td>
                      <td>{doctor.lastName}</td>
                      <td>{doctor.role == "3" ? "Admin" : "Doctor"}</td>
                      <td>{doctor.speciality}</td>
                      <td>
                        <Link to={`/doctors/edit-doctor/${doctor?._id}`}>
                          <i
                            className="mdi mdi-square-edit-outline"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        {/* <Link to={`/doctors/delete-doctor/${doctor?._id}`}> */}
                        <i
                          onClick={() => handleClickOpen(doctor?._id)}
                          className="mdi mdi-delete-outline"
                          style={{ fontSize: "18px" }}
                        ></i>
                        {/* </Link> */}
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
                              onClick={() => deleteData(deleteId)}
                            >
                              {console.log(doctor?._id, "test")}
                              DELETE
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <div>
              {/* {openShowPatient && (
                <Showpatient
                  open={openShowPatient}
                  handleOpen={handleOpenShowPatient}
                  data={selectedPatient}
                  handleGetConversation={handleGetConversation}
                />
              )} */}
            </div>
            {/* {selectedPatient && } */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Doctortable
