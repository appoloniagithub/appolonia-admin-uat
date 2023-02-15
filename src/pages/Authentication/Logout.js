import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const Logout = props => {
  //const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(logoutUser(props.history))
  // }, [dispatch])
  useEffect(() => {
    sessionStorage.clear()
  })

  return (
    <>
      <div>Logout</div>
    </>
  )
}

// Logout.propTypes = {
//   history: PropTypes.object,
// }

export default withRouter(Logout)
