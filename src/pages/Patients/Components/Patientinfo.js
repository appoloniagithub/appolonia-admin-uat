import React, { useEffect, useState } from "react"
import moment from "moment"
import { Button } from "reactstrap"
import user1 from "../../../assets/images/users/avatar-1.jpg"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import { clinicVerify } from "Connection/Patients"
import { updateClinicDetails } from "Connection/Patients"
import { getPatientById } from "Connection/Patients"
import profilePic from "../../../assets/images/profile.png"
import url from "Connection/Api/api"
const Patientinfo = ({ data, view, handleView, handleOpen }) => {
  const [clinic, setClinic] = useState({
    clinicVerified: false,
    active: false,
    connected: false,
  })
  const [fileData, setFileData] = useState("")
  const [id, setId] = useState(true)
  const [image, setImage] = useState("")
  const [conn, setConn] = useState(false)
  console.log(data)
  let getPatientData = async userId => {
    console.log(userId, "in get patient")
    let tempData = data
    let res = await clinicVerify({ phoneNumber: data?.phoneNumber })

    if (res.data && res.data.data && res.data.data.foundFile) {
      console.log(res.data.data.foundFile)
      setFileData(res.data.data.foundFile)
      let getConnected = false
      for (let i = 0; i < res.data.data.foundFile.familyMembers.length; i++) {
        console.log(userId)
        console.log(res.data.data.foundFile.familyMembers[i]?.userId)
        if (userId === res.data.data.foundFile.familyMembers[i]?.userId) {
          getConnected = res.data.data.foundFile.familyMembers[i]?.connected
          console.log("get in if", getConnected)
          setConn(res.data.data.foundFile.familyMembers[i]?.connected)
        }
      }
      setClinic({
        ...clinic,
        clinicVerified: res.data.data.foundFile.clinicVerified,
        active: res.data.data.foundFile.active,
        connected: getConnected,
      })
    }
  }
  useEffect(() => {
    let splitData = location.pathname.split("/")
    console.log(splitData)

    if (splitData && splitData.length === 4) {
      let userId = splitData[3]
      setId(userId)
      getPatientData(userId)
    }
  }, [])
  useEffect(() => {
    let splitData = location.pathname.split("/")
    console.log(splitData)

    if (splitData && splitData.length === 4) {
      let userId = splitData[3]
      setId(userId)
      getPatientById({ userId }).then(async res => {
        setImage(res.data.data.foundPatient.image[0])
        console.log(res.data.data.foundPatient)
      })
    }
  }, [])

  const handleUpdate = async (type, value) => {
    console.log(clinic, "in update")
    let reqObj
    if (type === "connected") {
      let updatedData = fileData?.familyMembers.map(member =>
        member.userId === id ? { ...member, connected: value } : member
      )
      reqObj = { fileId: fileData?._id, familyMembers: updatedData }
      console.log(updatedData, "updateddata")
    } else {
      reqObj = { fileId: fileData?._id, [type]: value }
    }
    let res = await updateClinicDetails(reqObj)
    console.log(res)
  }
  console.log(clinic, "clinicverify")
  console.log(fileData, "fileData")
  //console.log(conn, "conn")
  return (
    <div className="border border-secondary rounded  ">
      <div
        style={{ backgroundColor: "#20507B", color: "white" }}
        className="d-flex justify-content-between p-1"
      >
        {/* <div>
          <button onClick={handleOpen} className="btn text-light">
            <i className="fas fa-arrow-left" />
          </button>
        </div> */}

        <h5 className="mt-2 text-light">Patient Information</h5>
        {/* <button className="btn text-light" onClick={() => handleView("info")}>
          +
        </button> */}
        {view === true ? (
          <button className="btn text-light" onClick={() => handleView(false)}>
            -
          </button>
        ) : (
          <button className="btn text-light" onClick={() => handleView("info")}>
            +
          </button>
        )}
      </div>

      {/* <br /> */}
      {view === true && (
        <div className="p-2">
          <div>
            <div className="d-flex">
              <img
                className="rounded-circle header-profile-user"
                src={image ? `${url}/api/${image}` : profilePic}
                width="100"
                height="100"
                alt="Header Avatar"
              />
              <div className="m-2">
                <h5>
                  {data?.firstName} {data?.lastName}
                </h5>
              </div>
            </div>

            <ul className="p-0" style={{ listStyle: "none" }}>
              <li>
                <strong>File Number</strong>:{" "}
                {data.fileNumber ? data?.fileNumber : "NA"}
              </li>
              <li>
                <strong>Registered On</strong>:
                {moment(data?.createdAt).format("DD-MM-YY hh:mm")}
              </li>
              <li>
                <strong>Last Scan Done</strong>:{" "}
                {data?.lastScan
                  ? moment(data?.lastScan).format("DD-MM-YY hh:mm")
                  : ""}
              </li>
            </ul>
          </div>
          {/* <br /> */}
          <div>
            <h5>Personal Information</h5>
            <ul className="p-0" style={{ listStyle: "none" }}>
              <li>
                <strong>Date of Birth</strong>: {data?.dob}
              </li>
              <li>
                <strong>Gender</strong>: {data?.gender}
              </li>
              <li>
                <strong>City</strong>: {data?.city}
              </li>
              <li>
                <strong>Email Id</strong>: {data?.email}
              </li>
            </ul>
          </div>
          {/* <br /> */}
          <div>
            <h5>Insurance Information</h5>
            <ul className="p-0" style={{ listStyle: "none" }}>
              <li>
                <strong>Emirates Id</strong>: {data.emiratesId}
              </li>
              <li>
                <strong>Expiry</strong>:
              </li>
            </ul>
          </div>
          {data?.isHead === "1" ? (
            <div>
              <div className="m-2">
                <strong>Clinic Verify</strong>{" "}
                <BootstrapSwitchButton
                  checked={clinic.clinicVerified}
                  onChange={checked => {
                    setClinic({ ...clinic, clinicVerified: checked })
                    handleUpdate("clinicVerified", checked)
                  }}
                />
              </div>
              <div className="m-2">
                <strong className="mr-4">Active</strong>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <BootstrapSwitchButton
                  checked={clinic.active}
                  onChange={checked => {
                    setClinic({ ...clinic, active: checked })
                    handleUpdate("active", checked)
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="m-2">
              <strong>Clinic Verify</strong>{" "}
              <BootstrapSwitchButton
                checked={clinic.connected}
                onChange={checked => {
                  setClinic({ ...clinic, connected: checked })
                  handleUpdate("connected", checked)
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default Patientinfo
