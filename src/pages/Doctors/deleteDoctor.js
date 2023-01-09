import React, { useState, useEffect } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { deleteDoctor } from "Connection/Doctors"
import { Button } from "reactstrap"
import { getDoctorById } from "Connection/Doctors"
import { useHistory } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const DelDoctor = () => {
  let history = useHistory()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    history.push("/doctors")
  }
  useEffect(() => {
    console.log(location, "doctor loc")
    let splitData = location.pathname.split("/")
    console.log(splitData, "doc split")
    if (splitData && splitData.length === 4) {
      let doctorId = splitData[3]
      console.log(doctorId)
      setId(doctorId)
      getDoctorById({ doctorId }).then(async res => {
        console.log(res)
      })
      //   deleteDoctor({ doctorId }).then(() => {
      //     history.push("/doctors")
      //     console.log(id, "in delete")
      //   })
    }
  })
  const deleteData = async () => {
    await deleteDoctor({ doctorId: id })
      .then(() => {
        history.push("/doctors")
        toast.success("Doctor successfully deleted")
      })
      .catch(err => {
        history.push("/doctors")
        toast.error("Error while deleting a doctor")
      })
  }
  return (
    <div className="align-items-center m-4 ">
      <h4>Are you sure you want to delete?</h4>
      <br />
      <Button
        color="primary"
        className="btn btn-primary m-2 "
        onClick={deleteData}
      >
        {" "}
        YES, DELETE
      </Button>
      <Button
        color="primary"
        className="btn btn-primary m-2 "
        onClick={handleClose}
      >
        CANCEL
      </Button>
    </div>
  )
}
export default DelDoctor
