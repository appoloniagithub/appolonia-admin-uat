import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap"
import Doctortable from "./Components/Doctortable"
import { toast } from "react-toastify"
import { getAllDoctors } from "../../Connection/Doctors"
//import { getConversations } from "Connection/Patients"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"

const Alldoctors = () => {
  let [doctors, setDoctors] = useState([])
  //let [conversations, setConversations] = useState()
  let handleGetAllDoctors = async () => {
    let res = await getAllDoctors()
    console.log(res.data.data)
    try {
      if (res.data.data.success === 1) {
        console.log(res.data.data.doctors)
        setDoctors(res.data.data.doctors)
      }
    } catch (err) {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  //   let handleGetConversations = async () => {
  //     let res = await getConversations({ userId: "6351452835155fec28aa67b1" })
  //     console.log(res)
  //     try {
  //       if (res.data.data.success === 1) {
  //         console.log(res.data.data.conversations)
  //         setConversations(res.data.data.conversations)
  //       }
  //     } catch (err) {
  //       toast.error(res.data.data.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       })
  //     }
  //   }
  useEffect(() => {
    handleGetAllDoctors()
    //handleGetConversations()
  }, [])
  //console.log(conversations)
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container fluid> */}
        <div className="d-flex justify-content-between">
          <h4 style={{ paddingLeft: "30px" }}>Doctors</h4>
          <Link to="/doctors/create-doctor">
            <Button color="primary" className="btn btn-primary mr-4">
              Add Doctor
            </Button>
          </Link>
        </div>
        <br />
        {doctors?.length === 0 && <Spinner className="ms-2" color="primary" />}
        {doctors?.length > 0 && (
          <Doctortable
            data={doctors}
            //conversations={conversations}
          />
        )}
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default Alldoctors
