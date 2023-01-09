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
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
      console.log({ ...rest }, "IN ROUTES", path)
      if (path === "/patients/showpatient/:id") {
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
