import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      //if (isAuthProtected && !localStorage.getItem("authUser")) {

      if (isAuthProtected && !sessionStorage.getItem("loggedIn")) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
      console.log({ ...rest }, "IN ROUTES", path)

      // if (path === "/patients") {
      //   return <Component {...props} />
      // }
      if (path === "/patients/showpatient/:id") {
        return <Component {...props} />
      }
      if (path === "/patients/edit-patient/:id") {
        return <Component {...props} />
      }
      if (path === "/doctors/create-doctor") {
        return <Component {...props} />
      }
      if (path === "/doctors/edit-doctor/:id") {
        return <Component {...props} />
      }
      if (path === "/doctors/delete-doctor/:id") {
        return <Component {...props} />
      }
      if (path === "/library/create-article") {
        return <Component {...props} />
      }
      if (path === "/library/edit-article/:id") {
        return <Component {...props} />
      }
      if (path === "/library/showlibrary/:id") {
        return <Component {...props} />
      }

      if (path === "/profile/edit-profile/:id") {
        return <Component {...props} />
      }
      if (path === "/appointments/viewappointment/:id") {
        return <Component {...props} />
      }
      if (path === "/appointments/edit-appointment/:id") {
        return <Component {...props} />
      }
      if (path === "/appointments/create-appointment") {
        return <Component {...props} />
      }
      if (path === "/appointments/existing") {
        return <Component {...props} />
      }
      // if (path === "/calender") {
      //   return <Component {...props} />
      // }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
