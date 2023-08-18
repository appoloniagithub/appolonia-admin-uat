import React, { useEffect, useState } from "react"
import axios from "axios"
import url from "../../Connection/Api/api"
import { ImageGroup, Image } from "react-fullscreen-image"
import "lightgallery.js/dist/css/lightgallery.css"
import { cronSchedule, getConversations } from "Connection/Patients"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import Button from "react-bootstrap/Button"
import moment from "moment"
//import Modal from "./Components/Modal"
import {
  Container,
  Row,
  // Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardSubtitle,
  CardImg,
  CardHeader,
  CardImgOverlay,
  CardFooter,
  Spinner,
} from "reactstrap"
import Patientinfo from "./Components/Patientinfo"
import Patientnotes from "./Components/Patientnotes"
import classnames from "classnames"
import Tabs from "./Components/Toptab"
import Carousal from "./Components/Carousal"
import Chat from "./Components/Chat"
import Fullscreen from "./fullscreen"
import { ToastContainer, toast } from "react-toastify"
import { getPatientScans } from "Connection/Patients"
import Moment from "react-moment"
import dateFormat, { masks } from "dateformat"
import Timeline from "./Components/Timeline"
import Timelinematerial from "./Components/TImelinematerial"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Form from "react-bootstrap/Form"

import Chart from "react-apexcharts"
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import HorizontalScroll from "react-horizontal-scrolling"
import Horizental from "./Components/Horizental"
import {
  getAllPatients,
  getConversationMessages,
} from "../../Connection/Patients"
import Zoom from "./zoom"
import Thumbnail from "./thumbnail"
import { getCon } from "Connection/Patients"
import { element } from "prop-types"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Showpatient({
  data,
  open,
  handleOpen,

  //handleGetConversation,
  //isConversations,
}) {
  //location.reload(true)
  console.log(data, "i am selected")
  // const [open, setOpen] = React.useState(false)
  const [active, setActive] = useState("")
  const [activeScan, setActiveScan] = useState("")
  const [customActiveTab, setcustomActiveTab] = useState("1")
  const [customIconActiveTab, setcustomIconActiveTab] = useState("1")
  const [conversations, setConversations] = useState([])
  const [patientInfo, setPatientInfo] = useState({
    userId: data?._id,
    fileNumber: data?.uniqueId1,
    regisDate: data?.created,
    lastScan: data?.lastScan,
    dob: data?.dob,
    gender: data?.gender,
    city: data?.city,
    email: data?.email,
    emiratesId: data?.uniqueId1,
    firstName: data?.firstName,
    lastName: data?.lastName,
    phoneNumber: data?.phoneNumber,
    isHead: data?.isHead,
  })
  const [patientScans, setPatientScans] = React.useState()
  const [scan1Images, setScan1Images] = React.useState({})
  const [scan2Images, setScan2Images] = React.useState({})
  const [selectedScanImages1, setSelectedScanImages1] = React.useState([])
  const [selectedScanImages2, setSelectedScanImages2] = React.useState([])
  const [patientInfoView, setPatientInfoView] = React.useState(false)
  const [patientNoteView, setPatientNoteView] = React.useState(true)
  const [checked, setChecked] = React.useState(false)
  const [faceView, setFaceView] = React.useState(true)
  const [patientConversation, setPatientConversation] = React.useState()
  const [adminConversation, setAdminConversation] = React.useState()
  const [messages, setMessages] = React.useState([])
  const [frequency, setFrequency] = React.useState()
  const [scanType, setScanType] = React.useState()
  const [adminMessages, setAdminMessages] = useState([])
  const [con, setCon] = React.useState()
  const [role, setRole] = useState()
  const [show, setShow] = useState(false)
  const options = [
    { label: "Everyday", value: 1 },
    { label: "7 days", value: 7 },
    { label: "15 days", value: 15 },
    { label: "Monthly", value: 30 },
    { label: "Quarterly", value: 120 },
    { label: "Half Yearly", value: 183 },
    { label: "Yearly", value: 365 },
  ]
  const scans = ["Face Only", "Teeth Only", "Face & Teeth Only"]
  const [scanDate, setScanDate] = useState()

  const toggleIconCustom = tab => {
    if (customIconActiveTab !== tab) {
      setcustomIconActiveTab(tab)
    }
    if (tab === "4") {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }
  const handlePatientInfoView = doer => {
    if (doer === "info") {
      setPatientInfoView(true)
    } else {
      setPatientInfoView(false)
    }
  }
  const handlePatientNoteView = doer => {
    if (doer === "notes") {
      setPatientNoteView(true)
    } else {
      setPatientNoteView(false)
    }
  }

  const handleGetMyScans = async () => {
    let res = await getPatientScans({ userId: data?._id })
    try {
      console.log(res)
      if (res?.data?.data?.success === 1) {
        setPatientScans(res.data.data.scans)
        console.log(res.data.data.scans)
        console.log(
          res.data.data.scans[res.data.data.scans?.length - 1].faceScanImages
        )
        handleScan1(
          res.data.data.scans[res.data.data.scans?.length - 1].faceScanImages,
          res.data.data.scans[res.data.data.scans?.length - 1].teethScanImages
        )
      } else {
        setPatientScans(res.data.data.scans)
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (err) {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleScan1 = (faceScan, teethScan, id) => {
    console.log("i am clicked")
    setScan1Images({
      faceScan,
      teethScan,
    })
    setActive(id)
    setSelectedScanImages1(faceScan)
    setFaceView(true)
  }

  const handleSelectedScanImages1 = type => {
    if (type === "face") {
      setSelectedScanImages1(scan1Images.faceScan)
      setFaceView(true)
    } else {
      setSelectedScanImages1(scan1Images.teethScan)
      setFaceView(false)
    }
  }

  const handleScan2 = (faceScan, teethScan, id) => {
    console.log("i am clicked")
    setScan2Images({
      faceScan,
      teethScan,
    })
    setActiveScan(id)
    setSelectedScanImages2(faceScan)
  }
  const handleSelectedScanImages2 = type => {
    if (type === "face") {
      setSelectedScanImages2(scan2Images.faceScan)
    } else {
      setSelectedScanImages2(scan2Images.teethScan)
    }
  }

  const handleChange = event => {
    console.log(event.target.checked)
    setChecked(event.target.checked)
  }
  useEffect(() => {
    if (sessionStorage.getItem("role")) {
      const role = sessionStorage.getItem("role")
      console.log(role)
      setRole(role)
    }
  }, [])
  // let handleGetCon = async () => {
  //   if (sessionStorage.getItem("id")) {
  //     const doctorId = sessionStorage.getItem("id")
  //     console.log(doctorId)
  //     let res = await getCon({
  //       //doctorId: "63f70a84bf696efe6d604035",
  //       doctorId: doctorId,
  //       patId: data?._id,
  //     })
  //     console.log(res)
  //     try {
  //       if (res.data.data.success === 1) {
  //         console.log(res.data.data.conversations, "con")
  //         setCon(res.data.data.conversations)
  //         return res.data.data.conversations
  //       }
  //     } catch (err) {
  //       toast.error(res.data.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       })
  //     }
  //   }
  // }
  React.useEffect(() => {
    setPatientInfo({
      fileNumber: data?.uniqueId1,
      regisDate: data?.created,
      lastScan: data?.lastScan,
      dob: data?.dob,
      gender: data?.gender,
      city: data?.city,
      email: data?.email,
      emiratesId: data?.uniqueId2,
      patientId: data?._id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      isHead: data?.isHead,
    })
  }, [open === true])

  useEffect(() => {
    //console.log(isConversations)
    // if (isConversations == "yes") {
    handleGetMyScans()
    handleGetConversations()
    handleGetPatientConversation()
    // handleGetCon()
    //handleGetPatientConversation()

    // }
  }, [])
  let handleGetConversations = async () => {
    let res = await getConversations({ userId: data?._id })
    console.log(res)
    // setIsconversations("yes")
    try {
      if (res.data.data.success === 1) {
        console.log(res.data.data.conversations)
        setConversations(res.data.data.conversations)
        return res.data.data.conversations
      }
    } catch (err) {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  const handleGetPatientConversation = async () => {
    // if (sessionStorage.getItem("id")) {
    //   const doctorId = sessionStorage.getItem("id")
    //   console.log(doctorId)
    // let foundConversation = await handleGetCon({
    //   doctorId: "63f70a84bf696efe6d604035",
    //   doctorId: doctorId,
    //   patId: data?._id,
    // })
    let foundConversations = await handleGetConversations({
      userId: data?._id,
    })
    console.log(foundConversations)
    if (foundConversations) {
      setPatientConversation(foundConversations[1])
      let res = await getConversationMessages({
        bottomHit: 1,
        conversationId: foundConversations[1]?.conversationId,
        //conversationId: con?._id,
        userId: data?._id,
      })
      console.log(res, "i am messages")
      if (res.data.data.success === 1) {
        setMessages(res.data.data.messages)
      } else {
        // toast.error(res.data.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
      }
    }
    //}
  }
  const handleGetAdminConversation = async () => {
    // let foundConversations = await handleGetConversations({
    //   userId: data?._id,
    // })
    // console.log(foundConversations)
    //if (foundConversations) {
    setAdminConversation(conversations[0])
    let res = await getConversationMessages({
      bottomHit: 1,
      //conversationId: foundConversations[0]?.conversationId,
      conversationId: conversations[0]?.conversationId,
      userId: data?._id,
    })
    console.log(res, "i am messages")
    if (res.data.data.success === 1) {
      setAdminMessages(res.data.data.messages)
    } else {
      console.log("error")
      // toast.error(res.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // })
    }
    //}
    //}
  }

  // function handlefoundConversation(patientId) {
  //   console.log(patientId)
  //   console.log(conversations, "i am conversations")
  //   let foundConversation = conversations?.find(convo => {
  //     return convo?.otherMemberId === patientId
  //   })
  //   console.log(foundConversation)
  //   return foundConversation
  // }

  useEffect(() => {
    handleGetAdminConversation()
  }, [conversations[0]?.conversationId])
  console.log(conversations)

  // const handleClose = () => {
  //   history.push("/patients")
  // }

  const handleCronSchedule = async () => {
    await cronSchedule({
      userId: patientInfo?.patientId,
      days: frequency,
      scanType: scanType,
    })
  }

  const date = new Date(patientInfo?.lastScan)
  //const date = moment(patientInfo?.lastScan).format("YYYY/D/MM GMT")
  console.log(date)
  let d1 = Date.parse(date)
  console.log(d1)
  console.log(typeof date)
  let d2 = date.setDate(date.getDate() + 15)
  let d3 = new Date(d2)
  //setScanDate(d3)
  console.log(d3)

  console.log(moment(patientInfo?.lastScan).format("DD-MM-YYYY"))
  console.log(new Date())
  console.log(patientInfo)
  return (
    <div>
      {role === "Admin" ? (
        <div>
          <Row className="mb-2">
            <div className="border border-secondary rounded  ">
              <div
                style={{
                  backgroundColor: "#20507B",
                  color: "white",
                  height: "60px",
                }}
                className="d-flex justify-content-start align-items-center "
              >
                <div>
                  <button onClick={handleOpen} className="btn text-light">
                    <i className="fas fa-arrow-left" />
                  </button>
                </div>

                <h5 className="mt-2 text-light">Patient Details</h5>
              </div>
            </div>
          </Row>

          <div className="m-2">
            {/* <Container fluid> */}
            {/* <h4>Patient Details</h4>
            <br /> */}
            <Row>
              <Col sm="12" md="2">
                <Row>
                  <Col sm="12">
                    <Patientinfo
                      view={patientInfoView === true ? true : false}
                      data={patientInfo}
                      handleView={handlePatientInfoView}
                      handleOpen={handleOpen}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm="12">
                    <Patientnotes
                      view={patientNoteView === true ? true : false}
                      handleView={handlePatientNoteView}
                      data={patientInfo}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <div>
                  <Chat
                    patientConversation={adminConversation}
                    patientMessages={adminMessages}
                    patientInfo={patientInfo}
                    handleGetPatientConversation={handleGetAdminConversation}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <div>
          {/* <Button
          onClick={handleOpen}
          color="primary"
          className="btn btn-primary "
        >
          View
        </Button> */}
          {/* <Dialog
          fullScreen
          open={open}
          onClose={handleOpen}
          TransitionComponent={Transition}
        > */}
          <React.Fragment>
            <Row className="mb-2">
              <div className="border border-secondary rounded  ">
                <div
                  style={{
                    backgroundColor: "#20507B",
                    color: "white",
                    height: "60px",
                  }}
                  className="d-flex justify-content-start align-items-center "
                >
                  <div>
                    <button onClick={handleOpen} className="btn text-light">
                      <i className="fas fa-arrow-left" />
                    </button>
                  </div>

                  <h5 className="mt-2 text-light">Patient Details</h5>
                </div>
              </div>
            </Row>

            <div className="m-2">
              {/* <Container fluid> */}
              {/* <h4>Patient Details</h4>
            <br /> */}
              <Row>
                <Col sm="12" md="2">
                  <Row>
                    <Col sm="12">
                      <Patientinfo
                        view={patientInfoView === true ? true : false}
                        data={patientInfo}
                        handleView={handlePatientInfoView}
                        handleOpen={handleOpen}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col sm="12">
                      <Patientnotes
                        view={patientNoteView === true ? true : false}
                        handleView={handlePatientNoteView}
                        data={patientInfo}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" md="7">
                  <Tabs
                    toggleIconCustom={toggleIconCustom}
                    customIconActiveTab={customIconActiveTab}
                  />
                  <br />
                  {customIconActiveTab === "1" && (
                    <div>
                      {/* <div className="d-flex justify-content-between">
                    <h5>Compare scans of 2 different timelines </h5>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Check this switch"
                        onChange={handleChange}
                        // checked={checked}
                        value={checked}
                      />
                    </Form>
                  </div> */}

                      <br />

                      <Row>
                        <Col sm="12" md={`${checked === false ? "12" : "6"}`}>
                          <Row>
                            <Col
                              sm="12"
                              // md="6"
                              // className="d-flex justify-content-center"
                            >
                              <div>
                                <Horizental
                                  content={patientScans?.map(
                                    (singleScan, i) => {
                                      return (
                                        <div key={i}>
                                          <div className="d-flex">
                                            <div
                                              style={{
                                                width: "25px",
                                                height: "25px",
                                                // backgroundColor: "black",
                                                borderRadius: "50%",
                                              }}
                                              className={
                                                active === singleScan._id
                                                  ? "bg-secondary mx-2"
                                                  : "bg-primary mx-2"
                                              }
                                              onClick={() =>
                                                handleScan1(
                                                  singleScan?.faceScanImages,
                                                  singleScan?.teethScanImages,
                                                  singleScan?._id
                                                )
                                              }
                                            ></div>
                                            {i !== patientScans?.length - 1 && (
                                              <div
                                                style={{
                                                  width: "50px",
                                                  height: "5px",
                                                  // backgroundColor: "black",
                                                  // borderRadius: "50%",
                                                  marginTop: "10px",
                                                }}
                                                className="bg-primary mx-2"
                                              ></div>
                                            )}
                                          </div>
                                          <p>
                                            {dateFormat(
                                              singleScan?.created,
                                              "mmm dS, yy"
                                            )}
                                          </p>
                                        </div>
                                      )
                                    }
                                  )}
                                />
                              </div>
                            </Col>
                            <Col sm="12">
                              <div className="border border-secondary bg-white rounded p-2">
                                {/* <br /> */}
                                <div className="">
                                  <div>
                                    <button
                                      onClick={() =>
                                        handleSelectedScanImages1("face")
                                      }
                                      className="btn btn-primary btn-sm"
                                    >
                                      Face Scan
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleSelectedScanImages1("teeth")
                                      }
                                      className="btn btn-primary btn-sm mx-1"
                                    >
                                      Teeth Scan
                                    </button>
                                  </div>
                                  <br />

                                  {faceView === false && checked === false && (
                                    <div>
                                      {selectedScanImages1?.length > 0 && (
                                        <div>
                                          <Thumbnail
                                            scanImages={selectedScanImages1}
                                          />
                                          <Carousal
                                            scanImages={selectedScanImages1}
                                          />
                                          <Zoom
                                            scanImages={selectedScanImages1}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {checked === true && (
                                    <div>
                                      {selectedScanImages1?.length > 0 && (
                                        <Carousal
                                          scanImages={selectedScanImages1}
                                        />
                                      )}
                                    </div>
                                  )}

                                  {faceView === true && checked === false && (
                                    <div className="text-center">
                                      <Fullscreen
                                        selectedScanImages1={
                                          selectedScanImages1
                                        }
                                        imageId={
                                          selectedScanImages1 &&
                                          selectedScanImages1.length > 0 &&
                                          selectedScanImages1[0].split(".")[0]
                                        }
                                      />
                                      {/* {selectedScanImages1?.map((image, i) => {
                                        return (
                                          <img
                                            key={i}
                                            style={{
                                              transform: `rotate(${0}deg)`,
                                              // minHeight: "200px",
                                              // height: "auto",
                                              width: "32%",
                                              height: "32%",
                                            }}
                                            className="mx-1 rounded"
                                            src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
                                          />
                                        )
                                      })} */}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        {checked === true && (
                          <Col sm="12" md="6">
                            <Row>
                              <Col sm="12">
                                <div>
                                  <Horizental
                                    content={patientScans?.map(
                                      (singleScan, i) => {
                                        console.log(i, "i am index")
                                        return (
                                          <div key={i} className="">
                                            <div className="d-flex">
                                              <div
                                                style={{
                                                  width: "25px",
                                                  height: "25px",
                                                  // backgroundColor: "black",
                                                  borderRadius: "50%",
                                                }}
                                                className={
                                                  active === singleScan._id
                                                    ? "bg-secondary mx-2"
                                                    : "bg-primary mx-2"
                                                }
                                                onClick={() =>
                                                  handleScan2(
                                                    singleScan?.faceScanImages,
                                                    singleScan?.teethScanImages,
                                                    singleScan?._id
                                                  )
                                                }
                                              ></div>
                                              {i !==
                                                patientScans?.length - 1 && (
                                                <div
                                                  style={{
                                                    width: "50px",
                                                    height: "5px",
                                                    // backgroundColor: "black",
                                                    // borderRadius: "50%",
                                                    marginTop: "10px",
                                                  }}
                                                  className="bg-primary mx-2"
                                                ></div>
                                              )}
                                            </div>
                                            <p>
                                              {dateFormat(
                                                singleScan?.created,
                                                "mmm dS, yy"
                                              )}
                                            </p>
                                          </div>
                                        )
                                      }
                                    )}
                                  />
                                </div>
                              </Col>

                              <Col
                                // className={`${checked === true ? "" : "d-none"}`}
                                sm="12"
                                // md="6"
                              >
                                <div className="border border-secondary bg-white rounded p-2">
                                  <br />
                                  <div className="">
                                    <div>
                                      <button
                                        onClick={() =>
                                          handleSelectedScanImages2("face")
                                        }
                                        className="btn btn-primary btn-sm"
                                      >
                                        Face Scan
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleSelectedScanImages2("teeth")
                                        }
                                        className="btn btn-primary btn-sm mx-1"
                                      >
                                        Teeth Scan
                                      </button>
                                    </div>
                                    <br />
                                    {selectedScanImages2?.length > 0 && (
                                      <Carousal
                                        scanImages={selectedScanImages2}
                                      />
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        )}
                      </Row>
                      <br />
                      {!patientScans && (
                        <Spinner className="ms-2" color="primary" />
                      )}
                      {patientScans?.length === 0 && <p>No Scans Found</p>}
                    </div>
                  )}
                  {customIconActiveTab === "4" && (
                    <div>
                      <div className="d-flex justify-content-between">
                        <h5>Compare scans of 2 different timelines </h5>
                        {/* <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="Check this switch"
                          onChange={handleChange}
                          // checked={checked}
                          value={checked}
                        />
                      </Form> */}
                      </div>

                      <br />

                      <Row>
                        <Col sm="12" md={`${checked === false ? "12" : "6"}`}>
                          <Row>
                            <Col
                              sm="12"
                              // md="6"
                              // className="d-flex justify-content-center"
                            ></Col>
                            <Col sm="12">
                              <div className="border border-secondary bg-white rounded p-2">
                                <br />
                                <div>
                                  <Horizental
                                    content={patientScans?.map(
                                      (singleScan, i) => {
                                        return (
                                          <div key={i}>
                                            <div className="d-flex">
                                              <div
                                                style={{
                                                  width: "25px",
                                                  height: "25px",
                                                  // backgroundColor: "black",
                                                  borderRadius: "50%",
                                                }}
                                                className={
                                                  active === singleScan._id
                                                    ? "bg-secondary mx-2"
                                                    : "bg-primary mx-2"
                                                }
                                                onClick={() =>
                                                  handleScan1(
                                                    singleScan?.faceScanImages,
                                                    singleScan?.teethScanImages,
                                                    singleScan?._id
                                                  )
                                                }
                                              ></div>
                                              {i !==
                                                patientScans?.length - 1 && (
                                                <div
                                                  style={{
                                                    width: "50px",
                                                    height: "5px",
                                                    // backgroundColor: "black",
                                                    // borderRadius: "50%",
                                                    marginTop: "10px",
                                                  }}
                                                  className="bg-primary mx-2"
                                                ></div>
                                              )}
                                            </div>
                                            <p>
                                              {dateFormat(
                                                singleScan?.created,
                                                "mmm dS, yy"
                                              )}
                                            </p>
                                          </div>
                                        )
                                      }
                                    )}
                                  />
                                </div>
                                {/* <br /> */}
                                <div className="">
                                  <div>
                                    <button
                                      onClick={() =>
                                        handleSelectedScanImages1("face")
                                      }
                                      className="btn btn-primary btn-sm"
                                    >
                                      Face Scan
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleSelectedScanImages1("teeth")
                                      }
                                      className="btn btn-primary btn-sm mx-1"
                                    >
                                      Teeth Scan
                                    </button>
                                  </div>
                                  <br />
                                  <Thumbnail scanImages={selectedScanImages1} />
                                  {/* <Fullscreen
                                  selectedScanImages1={selectedScanImages1}
                                /> */}
                                  {faceView === false && checked === false && (
                                    <div>
                                      {selectedScanImages1?.length > 0 && (
                                        <div>
                                          <Carousal
                                            scanImages={selectedScanImages1}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  {checked === true && (
                                    <div>
                                      {selectedScanImages1?.length > 0 && (
                                        <Carousal
                                          scanImages={selectedScanImages1}
                                        />
                                      )}
                                    </div>
                                  )}

                                  {faceView === true && checked === false && (
                                    <div className="text-center">
                                      {selectedScanImages1?.map((image, i) => {
                                        return (
                                          <img
                                            key={i}
                                            style={{
                                              transform: `rotate(${0}deg)`,
                                              // minHeight: "200px",
                                              // height: "auto",
                                              width: "32%",
                                              height: "32%",
                                            }}
                                            className="mx-1 rounded"
                                            //src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
                                            src={`${url}/api/${image}`}
                                            // alt={item.altText}
                                          />
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        {checked === true && (
                          <Col sm="12" md="6">
                            <Row>
                              <Col sm="12"></Col>

                              <Col
                                // className={`${checked === true ? "" : "d-none"}`}
                                sm="12"
                                // md="6"
                              >
                                <div
                                  style={{
                                    maxHeight: "760px",
                                    height: "auto",
                                  }}
                                  className="border border-secondary bg-white rounded p-2"
                                >
                                  <br />
                                  <div>
                                    <Horizental
                                      content={patientScans?.map(
                                        (singleScan, i) => {
                                          console.log(i, "i am index")
                                          return (
                                            <div key={i} className="">
                                              <div className="d-flex">
                                                <div
                                                  style={{
                                                    width: "25px",
                                                    height: "25px",
                                                    // backgroundColor: "black",
                                                    borderRadius: "50%",
                                                  }}
                                                  className={
                                                    activeScan ===
                                                    singleScan._id
                                                      ? "bg-secondary mx-2"
                                                      : "bg-primary mx-2"
                                                  }
                                                  onClick={() =>
                                                    handleScan2(
                                                      singleScan?.faceScanImages,
                                                      singleScan?.teethScanImages,
                                                      singleScan?._id
                                                    )
                                                  }
                                                ></div>
                                                {i !==
                                                  patientScans?.length - 1 && (
                                                  <div
                                                    style={{
                                                      width: "50px",
                                                      height: "5px",
                                                      // backgroundColor: "black",
                                                      // borderRadius: "50%",
                                                      marginTop: "10px",
                                                    }}
                                                    className="bg-primary mx-2"
                                                  ></div>
                                                )}
                                              </div>
                                              <p>
                                                {dateFormat(
                                                  singleScan?.created,
                                                  "mmm dS, yy"
                                                )}
                                              </p>
                                            </div>
                                          )
                                        }
                                      )}
                                    />
                                  </div>
                                  <div className="">
                                    <div>
                                      <button
                                        onClick={() =>
                                          handleSelectedScanImages2("face")
                                        }
                                        className="btn btn-primary btn-sm"
                                      >
                                        Face Scan
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleSelectedScanImages2("teeth")
                                        }
                                        className="btn btn-primary btn-sm mx-1"
                                      >
                                        Teeth Scan
                                      </button>
                                    </div>
                                    <br />
                                    <Thumbnail
                                      scanImages={selectedScanImages2}
                                    />
                                    {selectedScanImages2?.length > 0 && (
                                      <Carousal
                                        scanImages={selectedScanImages2}
                                      />
                                    )}
                                    {selectedScanImages2?.length === 0 && (
                                      <p className="text-center text-muted mt-5">
                                        Select Date To View Scan
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        )}
                      </Row>
                      <br />
                      {!patientScans && (
                        <Spinner className="ms-2" color="primary" />
                      )}
                      {patientScans?.length === 0 && <p>No Scans Found</p>}
                    </div>
                  )}
                  {customIconActiveTab === "2" && (
                    <div>
                      <h5 className="text-center">Scan Frequency</h5>
                      <br />

                      <div className="border border-secondary bg-white rounded p-2">
                        <br />
                        <div className=" justify-content-between">
                          <div className="d-flex text-center">
                            <h6 className="mt-2">Scan Alert</h6>{" "}
                            &nbsp;&nbsp;&nbsp;
                            <BootstrapSwitchButton
                              className=""
                              checked={d3 === new Date() ? !show : show}
                              // checked={show}
                              onChange={e => setShow(!show)}
                            />
                          </div>
                          <br />
                          {show === true ? (
                            <div>
                              <Form.Group
                                className="mt-2"
                                controlId="Frequency"
                              >
                                <Form.Label className="mb-2">
                                  Frequency
                                </Form.Label>
                                <select
                                  name="Frequency"
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={frequency}
                                  onChange={e => {
                                    setFrequency(e.target.value)
                                  }}
                                >
                                  <option>Select</option>
                                  {options.map(ele => (
                                    <option value={ele.value} key={ele.value}>
                                      {ele.label}
                                    </option>
                                  ))}
                                </select>
                              </Form.Group>
                              <br />
                              <Form.Group
                                className="mt-2"
                                controlId="Type of Scan"
                              >
                                <Form.Label className="mb-2">
                                  Type of Scan
                                </Form.Label>
                                <select
                                  name="Type of Scan"
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={scanType}
                                  onChange={e => {
                                    setScanType(e.target.value)
                                  }}
                                >
                                  {scans.map(value => (
                                    <option value={value} key={value}>
                                      {value}
                                    </option>
                                  ))}
                                </select>
                              </Form.Group>
                              <br />
                              <Button
                                type="submit"
                                color="primary"
                                className="btn btn-primary mt-2"
                                onClick={handleCronSchedule}
                              >
                                SAVE
                              </Button>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
                <Col sm="12" md="3">
                  <div>
                    <Chat
                      patientConversation={patientConversation}
                      patientMessages={messages}
                      patientInfo={patientInfo}
                      handleGetPatientConversation={
                        handleGetPatientConversation
                      }
                    />
                  </div>
                </Col>
              </Row>
              {/* </Container> */}
            </div>
          </React.Fragment>
          {/* </Dialog> */}
        </div>
      )}
    </div>
  )
}

// export default Showpatient
