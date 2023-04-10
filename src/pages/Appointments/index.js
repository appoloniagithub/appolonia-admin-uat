import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap"
import Appointmenttable from "./Components/Appointmenttable"
import Toastbar from "../../components/Toast"
import { ToastContainer, toast } from "react-toastify"
import Navbar from "components/HorizontalLayout/Navbar"
import { getAllAppointments } from "Connection/Appointments"

const Allappointments = props => {
  let [appointments, setAppointments] = useState([])

  let handleGetAllAppointments = async () => {
    let res = await getAllAppointments()
    console.log(res)
    try {
      if (res.data.data.success === 1) {
        console.log(res.data.appointments)
        setAppointments(res.data.appointments)
      }
    } catch (err) {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  useEffect(() => {
    handleGetAllAppointments()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container fluid> */}
        <h4 style={{ paddingLeft: "30px" }}>Appointments</h4>
        {appointments?.length === 0 && (
          <Spinner className="ms-2" color="primary" />
        )}
        {appointments?.length > 0 && <Appointmenttable data={appointments} />}
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default Allappointments
