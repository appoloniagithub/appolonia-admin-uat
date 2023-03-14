import React, { useEffect, useState } from "react"
import { Container, Spinner } from "reactstrap"
import Patientstable from "./Components/Patienttable"
import Toastbar from "../../components/Toast"
import { ToastContainer, toast } from "react-toastify"
import Navbar from "components/HorizontalLayout/Navbar"

//Import Breadcrumb
import { getAllPatients, getConversations } from "../../Connection/Patients"
import { Handler } from "leaflet"

const Allpatients = props => {
  let [patients, setPatients] = useState([])
  let [conversations, setConversations] = useState()
  let handleGetAllPatients = async () => {
    let res = await getAllPatients()
    console.log(res)
    try {
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
  // let handleGetConversations = async () => {
  //   let res = await getConversations({ userId: "63ee224ec5678c965903d225" })
  //   console.log(res)
  //   try {
  //     if (res.data.data.success === 1) {
  //       console.log(res.data.data.conversations)
  //       setConversations(res.data.data.conversations)
  //     }
  //   } catch (err) {
  //     toast.error(res.data.data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     })
  //   }
  // }
  useEffect(() => {
    handleGetAllPatients()
    //handleGetConversations()
  }, [])
  //console.log(conversations)
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container fluid> */}
        <h4 style={{ paddingLeft: "30px" }}>Patients</h4>
        {patients?.length === 0 && <Spinner className="ms-2" color="primary" />}
        {patients?.length > 0 && (
          <Patientstable data={patients} conversations={conversations} />
        )}
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default Allpatients
