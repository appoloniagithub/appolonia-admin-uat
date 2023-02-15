import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { useHistory, useLocation } from "react-router"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  let history = useHistory()
  const [menu, setMenu] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState("")
  const [open, setOpen] = useState(false)
  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.displayName)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.username)
  //     }
  //   }
  // }, [props.success])

  useEffect(() => {
    if (sessionStorage.getItem("firstName")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(sessionStorage.getItem("firstName"))
        setFirstName(obj.displayName)
        console.log(obj)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = sessionStorage.getItem("firstName")
        setFirstName(obj)
        console.log(obj)
      }
    }
    if (sessionStorage.getItem("lastName")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(sessionStorage.getItem("lastName"))
        setLastName(obj.displayName)
        console.log(obj)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = sessionStorage.getItem("lastName")
        setLastName(obj)
        console.log(obj)
      }
    }
    if (sessionStorage.getItem("image")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(sessionStorage.getItem("image"))
        setImage(obj.displayName)
        console.log(obj)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = sessionStorage.getItem("image")
        setImage(obj)
        console.log(obj)
      }
    }
  }, [props.success])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const Logout = () => {
    sessionStorage.clear()
    history.push("/")
  }
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={image}
            alt="Header Avatar"
          />
          <span
            style={{ color: "white" }}
            className="d-none d-xl-inline-block ms-2 me-1"
          >
            {firstName} {lastName}
          </span>
          <i
            style={{ color: "white" }}
            className="mdi mdi-chevron-down d-none d-xl-inline-block"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          {/* <Link to="/logout" className="dropdown-item"> */}
          <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger m-2 pl-3" />
          <span onClick={handleClickOpen}>{props.t("Logout")}</span>

          {/* </Link> */}
        </DropdownMenu>
      </Dropdown>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout?
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
            onClick={Logout}
          >
            LOGOUT
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
