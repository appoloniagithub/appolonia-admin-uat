import React from "react"
import moment from "moment"

const Patientinfo = ({ data, view, handleView }) => {
  console.log(data)
  return (
    <div className="border border-secondary rounded bg-white p-2 ">
      <div className="d-flex justify-content-between">
        <h5>Patient Information</h5>
        <button className="btn" onClick={() => handleView("info")}>
          +
        </button>
      </div>

      <br />
      {view === true && (
        <div>
          <div>
            <p>
              <strong>File Number</strong>:{" "}
              {data.fileNumber ? data?.fileNumber : "12345"}
            </p>
            <p>
              <strong>Registered On</strong>:
              {moment(data?.createdAt).format("DD-MM-YY hh:mm")}
            </p>
            <p>
              <strong>Last Scan Done</strong>:{" "}
              {moment(data?.lastScan).format("DD-MM-YY hh:mm")}
            </p>
          </div>
          <br />
          <div>
            <h5>Personal Information</h5>
            <p>
              <strong>Date of Birth</strong>: {data?.dob}
            </p>
            <p>
              <strong>Gender</strong>: {data?.gender}
            </p>
            <p>
              <strong>City</strong>: {data?.city}
            </p>
            <p>
              <strong>Email Id</strong>: {data?.email}
            </p>
          </div>
          <br />
          <div>
            <h5>Insurance Information</h5>
            <p>
              <strong>Emirates Id</strong>: {data.emiratesId}
            </p>
            <p>
              <strong>Expiry</strong>: 29 oct
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default Patientinfo
