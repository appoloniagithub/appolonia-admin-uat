import React, { useState, useEffect } from "react"
import Navbar from "./Navbar"

export default function Menubar(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState("")
  useEffect(() => {
    let getLoggedIn = sessionStorage.getItem("loggedIn")
    if (getLoggedIn) {
      setLoggedIn(getLoggedIn)
      let role = sessionStorage.getItem("role")
      setRole(role)
    } else {
      props.history.push("/")
    }
  }, [])
  return (
    <div>
      {loggedIn && (
        <div className="">
          <Navbar role={role} />
          <div></div>
        </div>
      )}
    </div>
  )
}
