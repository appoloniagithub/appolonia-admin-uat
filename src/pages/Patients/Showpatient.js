import React, { useState } from "react"
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

import Button from "@mui/material/Button"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Showpatient({
  data,
  open,
  handleOpen,
  handleGetConversation,
}) {
  console.log(data, "i am selected")
  // const [open, setOpen] = React.useState(false)
  const [customActiveTab, setcustomActiveTab] = useState("1")
  const [customIconActiveTab, setcustomIconActiveTab] = useState("1")
  const [patientInfo, setPatientInfo] = useState({
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
  })
  const [patientScans, setPatientScans] = React.useState()
  const [scan1Images, setScan1Images] = React.useState({})
  const [scan2Images, setScan2Images] = React.useState({})
  const [selectedScanImages1, setSelectedScanImages1] = React.useState([])
  const [selectedScanImages2, setSelectedScanImages2] = React.useState([])
  const [patientInfoView, setPatientInfoView] = React.useState(true)
  const [checked, setChecked] = React.useState(false)
  const [faceView, setFaceView] = React.useState(true)
  const [patientConversation, setPatientConversation] = React.useState()
  const [messages, setMessages] = React.useState([])

  // const chartOptions1 = {
  //   series: [
  //     {
  //       name: "Scans",
  //       data: [12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     },
  //     // {
  //     //   name: "Store Customers",
  //     //   data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
  //     // }
  //   ],
  //   options: {
  //     chart: {
  //       background: "white",
  //       toolbar: {
  //         show: false,
  //       },
  //       type: "line",
  //       events: {
  //         dataPointMouseEnter: function (event, chartContext, config) {
  //           // ...
  //           console.log("i am mouse")
  //         },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: true,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     yaxis: {
  //       show: false,
  //       labels: {
  //         show: false,
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },

  //     xaxis: {
  //       categories: [
  //         "Jan",
  //         "Feb",
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //         "Oct",
  //         "Nov",
  //         "Dec",
  //       ],
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     grid: {
  //       show: false,
  //     },
  //   },
  // }

  // const [chartOptions2, setChartOptions2] = React.useState({
  //   series: [
  //     {
  //       name: "Scans",
  //       data: [48, 70, 20, 90, 36, 80, 30, 91, 60],
  //     },
  //     // {
  //     //   name: "Store Customers",
  //     //   data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
  //     // }
  //   ],
  //   options: {
  //     chart: {
  //       background: "white",
  //       toolbar: {
  //         show: false,
  //       },
  //       events: {
  //         dataPointSelection: (event, chartContext, config) => {
  //           console.log(chartContext, config)
  //           alert(chartContext, config)
  //         },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     yaxis: {
  //       show: false,
  //       labels: {
  //         show: false,
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },

  //     xaxis: {
  //       categories: [
  //         "Jan",
  //         "Feb",
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //         "Oct",
  //         "Nov",
  //         "Dec",
  //       ],
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     grid: {
  //       show: false,
  //     },
  //   },
  // })

  const toggleIconCustom = tab => {
    if (customIconActiveTab !== tab) {
      setcustomIconActiveTab(tab)
    }
  }
  const handlePatientInfoView = doer => {
    if (doer === "info") {
      setPatientInfoView(true)
    } else {
      setPatientInfoView(false)
    }
  }

  const handleGetMyScans = async () => {
    try {
      let res = await getPatientScans({ userId: data?._id })
      console.log(res)
      if (res?.data?.data?.success === 1) {
        setPatientScans(res.data.data.scans)
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

  const handleScan1 = (faceScan, teethScan) => {
    console.log("i am clicked")
    setScan1Images({
      faceScan,
      teethScan,
    })
    setSelectedScanImages1(faceScan)
    // if (checked === false && faceView === true) {
    setFaceView(true)
    // }
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

  const handleScan2 = (faceScan, teethScan) => {
    console.log("i am clicked")
    setScan2Images({
      faceScan,
      teethScan,
    })
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

  const handleGetPatientConversation = async () => {
    let foundConversation = handleGetConversation(data?._id)
    console.log(foundConversation)
    if (foundConversation) {
      setPatientConversation(foundConversation)
      let res = await getConversationMessages({
        bottomHit: 1,
        conversationId: foundConversation?.conversationId,
        userId: data?._id,
      })
      console.log(res, "i am messages")
      if (res.data.data.success === 1) {
        setMessages(res.data.data.messages)
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    }
  }

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
    })
    handleGetMyScans()
    handleGetPatientConversation()
  }, [open === true])

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Open full-screen dialog
      </Button> */}
      <Button onClick={handleOpen} color="primary" className="btn btn-primary ">
        View
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleOpen}
        TransitionComponent={Transition}
      >
        {/* <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Patient Details
            </Typography>
          </Toolbar>
        </AppBar> */}
        <React.Fragment>
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
                      view={patientInfoView === true ? true : false}
                      handleView={handlePatientInfoView}
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
                <div className="d-flex justify-content-between">
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
                </div>

                <br />

                {/* <Row>
                  <Col sm="12" md="6">
                    <Chart
                      options={chartOptions1.options}
                      series={chartOptions1.series}
                      type="line"
                      height="100%"
                      className="dashboard__first__right__card__area__content__graphic"
                    />
                  </Col>
                </Row> */}
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
                            content={patientScans?.map((singleScan, i) => {
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
                                      className="bg-primary"
                                      onClick={() =>
                                        handleScan1(
                                          singleScan?.faceScanImages,
                                          singleScan?.teethScanImages
                                        )
                                      }
                                    ></div>
                                    <div
                                      style={{
                                        width: "45px",
                                        height: "5px",
                                        // backgroundColor: "black",
                                        // borderRadius: "50%",
                                        marginTop: "10px",
                                      }}
                                      className="bg-primary mx-2"
                                    ></div>
                                  </div>
                                  <p>
                                    {dateFormat(
                                      singleScan?.created,
                                      "mmm dS, yy"
                                    )}
                                  </p>
                                </div>
                              )
                            })}
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
                                  <Carousal scanImages={selectedScanImages1} />
                                )}
                              </div>
                            )}
                            {checked === true && (
                              <div>
                                {selectedScanImages1?.length > 0 && (
                                  <Carousal scanImages={selectedScanImages1} />
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
                                      src={`data:image/jpeg;base64,${image}`}

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
                        <Col sm="12">
                          <div>
                            <Horizental
                              content={patientScans?.map((singleScan, i) => {
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
                                        className="bg-primary"
                                        onClick={() =>
                                          handleScan2(
                                            singleScan?.faceScanImages,
                                            singleScan?.teethScanImages
                                          )
                                        }
                                      ></div>
                                      <div
                                        style={{
                                          width: "90px",
                                          height: "5px",
                                          // backgroundColor: "black",
                                          // borderRadius: "50%",
                                          marginTop: "10px",
                                        }}
                                        className="bg-primary mx-2"
                                      ></div>
                                    </div>
                                    <p>
                                      {dateFormat(
                                        singleScan?.created,
                                        "mmmm dS, yyyy"
                                      )}
                                    </p>
                                  </div>
                                )
                              })}
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
                                <Carousal scanImages={selectedScanImages2} />
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>

                <br />
                {!patientScans && <Spinner className="ms-2" color="primary" />}
                {patientScans?.length === 0 && <p>No Scans Found</p>}
              </Col>
              <Col sm="12" md="3">
                <div>
                  <Chat patientMessages={messages} patientInfo={patientInfo} />
                </div>
              </Col>
            </Row>
            {/* </Container> */}
          </div>
        </React.Fragment>
      </Dialog>
    </div>
  )
}

// export default Showpatient
