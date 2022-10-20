import React, { useEffect, useState } from "react"
import { Container, Spinner } from "reactstrap"
import Patientstable from "./Components/Patienttable"
import Toastbar from "../../components/Toast"
import { ToastContainer, toast } from "react-toastify"

//Import Breadcrumb
import { getAllPatients, getConversations } from "../../Connection/Patients"
import { Handler } from "leaflet"

const Allpatients = () => {
  let [patients, setPatients] = useState([])
  let [conversations, setConversations] = useState()
  let handleGetAllPatients = async () => {
    try {
      let res = await getAllPatients()
      console.log(res)
      if (res.data.data.success === 1) {
        console.log(res.data.data.allPatients)
        setPatients(res.data.data.allPatients)
      }
    } catch (err) {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  let handleGetConversations = async () => {
    try {
      let res = await getConversations({ userId: "632c2f19f114bb4be6e1d226" })
      console.log(res)
      if (res.data.data.success === 1) {
        console.log(res.data.data.conversations)
        setConversations(res.data.data.conversations)
      }
    } catch (err) {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  useEffect(() => {
    handleGetAllPatients()
    handleGetConversations()
  }, [])
  return (
    <React.Fragment>
      {console.log(conversations)}
      <div className="page-content">
        {/* <Container fluid> */}
        <h4>All Patients</h4>
        {patients?.length === 0 && <Spinner className="ms-2" color="primary" />}
        {patients?.length > 0 && conversations && (
          <Patientstable data={patients} conversations={conversations} />
        )}
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default Allpatients
