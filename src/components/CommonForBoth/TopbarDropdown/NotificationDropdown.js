import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import moment from "moment"
//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"
import { getAllNotifications, getNotifications } from "Connection/Patients"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [count, setCount] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      const adminId = sessionStorage.getItem("id")
      console.log(adminId)
      setId(adminId)
      if (adminId.length > 0) {
        getNotifications({ userId: adminId }).then(res => {
          console.log(res)
          if (res.data.data.success === 1) {
            setCount(res.data.data.allNotifications)
          }
        })
      }
    }
  }, [])
  const handleNotifications = async () => {
    //setMenu(true)

    if (id.length > 0) {
      await getAllNotifications({ userId: id }).then(res => {
        console.log(res)
        if (res.data.data.success === 1) {
          setNotifications(res.data.data.allNotifications)
        }
      })
    }
  }
  console.log(notifications, "noti")
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
        style={{ color: "white" }}
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i
            onClick={handleNotifications}
            style={{ color: "white" }}
            className="bx bx-bell bx-tada"
          />
          <span className="badge bg-danger rounded-pill">{count}</span>
        </DropdownToggle>

        <DropdownMenu
          style={{ width: "400px" }}
          className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
        >
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              {/* <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div> */}
            </Row>
          </div>

          <SimpleBar style={{ height: "500px" }}>
            <div className="text-reset notification-item">
              {notifications.length === 0 && (
                <p>No Notifications are available</p>
              )}
              {notifications.length > 0 &&
                notifications.map(notification => {
                  return (
                    <div key={notification?._id} className="d-flex">
                      <div>
                        <div className="avatar-xs me-3">
                          <span className="avatar-title bg-primary rounded-circle font-size-16">
                            <i className="bx bx-bell bx-tada" />
                          </span>
                        </div>
                      </div>

                      <div className="flex-grow-1">
                        <h6 className="mt-0 mb-1">
                          {props.t(`${notification.title}`)}
                        </h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            {props.t(`${notification.body}`)}
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline" />{" "}
                            {props.t(
                              moment(`${notification.created}`).format(
                                "DD-MM-YYYY hh:mm A"
                              )
                            )}{" "}
                          </p>
                        </div>
                      </div>

                      {notification?.actionName === "Sign Up" && (
                        <Link to="/patients" className="small">
                          View
                        </Link>
                      )}
                      {notification?.actionName === "Appointment" && (
                        <Link to="/appointments" className="small">
                          View
                        </Link>
                      )}
                      {notification?.actionName === "Family" && (
                        <Link to="/patients" className="small">
                          View
                        </Link>
                      )}
                      {notification?.actionName === "Help" && (
                        <Link to="/contact-issues" className="small">
                          View
                        </Link>
                      )}
                      {notification?.actionName === "Chat" && (
                        <Link
                          to={`/patients/showpatient/${notification.patientId}`}
                          className="small"
                        >
                          View
                        </Link>
                      )}
                    </div>
                  )
                })}
            </div>
          </SimpleBar>
          {/* <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span key="t-view-more">{props.t("View More..")}</span>
            </Link>
          </div> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
