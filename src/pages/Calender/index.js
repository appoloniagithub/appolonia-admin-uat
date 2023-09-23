import React, { useEffect, useState } from "react"

import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import MyCalendar from "./MyCalender"

const workCalender = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MyCalendar />
        <br />
        <br />
      </div>
    </React.Fragment>
  )
}

export default workCalender
