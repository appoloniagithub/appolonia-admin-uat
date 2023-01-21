import React, { useEffect, useState } from "react"
import moment from "moment"
import { Button } from "reactstrap"
import user1 from "../../../assets/images/users/avatar-1.jpg"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import { clinicVerify } from "Connection/Patients"
import { updateClinicDetails } from "Connection/Patients"

const Patientinfo = ({ data, view, handleView, handleOpen }) => {
  const [clinic, setClinic] = useState({
    clinicVerified: false,
    active: false,
    connected: false,
  })
  const [fileData, setFileData] = useState("")

  console.log(data)
  let getPatientData = async () => {
    let res = await clinicVerify({ phoneNumber: data?.phoneNumber })

    if (res.data && res.data.data && res.data.data.foundFile) {
      console.log(res.data.data.foundFile)
      setFileData(res.data.data.foundFile)
      setClinic({
        ...clinic,
        clinicVerified: res.data.data.foundFile.clinicVerified,
        active: res.data.data.foundFile.active,
        connected: false,
      })
    }
  }
  useEffect(() => {
    getPatientData()
  }, [])

  const handleUpdate = async (type, value) => {
    console.log(clinic, "in update")
    let reqObj = { fileId: fileData?._id, [type]: value }

    let res = await updateClinicDetails(reqObj)
    console.log(res)
  }
  console.log(clinic, "clinicverify")
  console.log(fileData, "fileData")

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
                src={user1}
                alt="Header Avatar"
              />
              <div className="m-2">
                <h5>
                  {data?.firstName} {data?.lastName}
                </h5>
              </div>
            </div>

            <div className="m-2">
              <strong>Clinic Verify</strong>{" "}
              <BootstrapSwitchButton
                checked={clinic.clinicVerified}
                // onlabel=" Yes"
                // offlabel="No"
                onChange={checked => {
                  setClinic({ ...clinic, clinicVerified: checked })
                  handleUpdate("clinicVerified", checked)
                }}
              />
            </div>
            <div className="m-2">
              <strong>Active</strong>{" "}
              <BootstrapSwitchButton
                checked={clinic.active}
                // onlabel="Yes"
                // offlabel="No"
                onChange={checked => {
                  setClinic({ ...clinic, active: checked })
                  handleUpdate("active", checked)
                }}
              />
            </div>
            {/* <div className="m-2">
              <strong>Connected</strong>{" "}
              <BootstrapSwitchButton
                checked={clinic.connected}
                // onlabel="Yes"
                // offlabel="No"
                onChange={checked => {
                  setClinic({ ...clinic, connected: checked })
                }}
              />
            </div> */}
            <ul className="p-0" style={{ listStyle: "none" }}>
              <li>
                <strong>File Number</strong>:{" "}
                {data.fileNumber ? data?.fileNumber : "12345"}
              </li>
              <li>
                <strong>Registered On</strong>:
                {moment(data?.createdAt).format("DD-MM-YY hh:mm")}
              </li>
              <li>
                <strong>Last Scan Done</strong>:{" "}
                {moment(data?.lastScan).format("DD-MM-YY hh:mm")}
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
                <strong>Expiry</strong>: 29 oct
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
export default Patientinfo
