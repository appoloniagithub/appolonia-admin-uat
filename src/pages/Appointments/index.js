import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap"
import Appointmenttable from "./Components/Appointmenttable"
import Toastbar from "../../components/Toast"
import { ToastContainer, toast } from "react-toastify"
import Navbar from "components/HorizontalLayout/Navbar"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import { getAllAppointments } from "Connection/Appointments"

const Allappointments = props => {
  let [appointments, setAppointments] = useState([])

  let handleGetAllAppointments = async () => {
    let res = await getAllAppointments()
    console.log(res)
    try {
      if (res.data.data.success === 1) {
        console.log(res.data)
        setAppointments(res.data.data.appointments)
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
        <div className="d-flex justify-content-between">
          <h4 style={{ paddingLeft: "30px" }}>Appointments</h4>
          <div>
            <Link to="/appointments/existing">
              <Button color="primary" className="btn btn-primary mr-4">
                Existing Patient
              </Button>
            </Link>
            <Link to="/appointments/create-appointment">
              <Button color="primary" className="btn btn-primary mr-4">
                New
              </Button>
            </Link>
          </div>
        </div>
        <br />
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
