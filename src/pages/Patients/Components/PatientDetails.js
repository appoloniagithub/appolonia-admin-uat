import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { getPatientById, getConversations, getCon } from "Connection/Patients"
import Showpatient from "../Showpatient"
import { ToastContainer, toast } from "react-toastify"

export default function PatientDetails() {
  const [patientData, setPatientData] = useState(null)
  //let [conversations, setConversations] = useState()
  //let [con, setCon] = useState()
  //const [id, setId] = useState()
  //const [isConversations, setIsconversations] = useState("no")
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    console.log(location)
    let splitData = location.pathname.split("/")
    console.log(splitData)
    if (splitData && splitData.length === 4) {
      let userId = splitData[3]
      console.log(userId)
      //setId(userId)
      getPatientById({ userId }).then(async res => {
        setPatientData(res.data.data.foundPatient)
        console.log(res.data.data.foundPatient)
        //await handleGetConversations()
        // await handleGetCon()
      })
    }
  }, [])
  // function handlefoundConversation(patientId) {
  //   console.log(patientId)
  //   console.log(conversations, "i am conversations")
  //   let foundConversation = conversations?.find(convo => {
  //     return convo?.otherMemberId === patientId
  //   })
  //   console.log(foundConversation)
  //   return foundConversation
  // }
  // let handleGetConversations = async () => {
  //   let res = await getConversations({ userId: "63ee224ec5678c965903d225" })
  //   console.log(res)
  //   setIsconversations("yes")
  //   try {
  //     if (res.data.data.success === 1) {
  //       console.log(res.data.data.conversations)
  //       setConversations(res.data.data.conversations)
  //       return res.data.data.conversations
  //     }
  //   } catch (err) {
  //     toast.error(res.data.data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     })
  //   }
  // }

  // let handleGetCon = async () => {
  //   let res = await getCon({
  //     doctorId: "63ee224ec5678c965903d225",
  //     patId: id,
  //   })
  //   console.log(res)

  //   try {
  //     if (res.data.data.success === 1) {
  //       console.log(res.data.data.conversations, "con")
  //       setCon(res.data.data.conversations)
  //       return res.data.data.conversations
  //     }
  //   } catch (err) {
  //     toast.error(res.data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     })
  //   }
  // }
  // useEffect(() => {
  //   handleGetCon()
  // }, [])

  function handleOpen() {
    // history.push("/patients")
    window.location.href = "/patients"
  }
  //console.log(isConversations, patientData?._id)
  return (
    <div>
      {patientData && (
        <Showpatient
          open={true}
          handleOpen={handleOpen}
          data={patientData}
          //isConversations={isConversations}
          //handleGetConversation={handlefoundConversation}
          // handleGetConversation={con}
        />
      )}
    </div>
  )
}
