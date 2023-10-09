import React, { useEffect, useState } from "react"

import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import { getContacts } from "Connection/Patients"
import Messagetable from "./Components/Messagetable"

const Messages = () => {
  const [contacts, setContacts] = useState([])
  const handleContacts = async () => {
    await getContacts().then(res => {
      console.log(res)
      if (res.data.data.success === 1) {
        setContacts(res.data.data.foundContacts)
      }
    })
  }
  useEffect(() => {
    handleContacts()
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <h4 style={{ paddingLeft: "30px" }}>Messages</h4>
        {contacts.length > 0 && <Messagetable data={contacts} />}
      </div>
    </React.Fragment>
  )
}

export default Messages
