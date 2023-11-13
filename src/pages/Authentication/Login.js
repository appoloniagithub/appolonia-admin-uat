import PropTypes from "prop-types"
import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import url from "Connection/Api/api"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Spinner,
} from "reactstrap"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { withRouter, Link } from "react-router-dom"

// import images
import profile from "assets/images/profile-img.png"

import applogo from "../../assets/images/applogo.png"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Box from "@mui/material/Box"
import showPwdImg from "../../assets/images/show-password.svg"
import hidePwdImg from "../../assets/images/hide-password.svg"

//import Input from "@material-ui/core/Input"

const Login = props => {
  //meta title
  document.title = "Login | Appolonia Dental Care"
  let history = useHistory()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [pwd, setPwd] = useState("")
  const [message, setMessage] = useState("")
  const [emiratesId, setEmiratesId] = useState("")
  const [isEmiratesId, setIsEmiratesId] = useState(false)
  const [isPhoneNumber, setIsPhoneNumber] = useState("1")
  const [isPhoneNum, setIsPhoneNum] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [value, setValue] = React.useState("1")
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isLoading, setIsLoading] = useState()

  const handleLoginDetails = e => {
    e.preventDefault()
    setIsLoading("logging in")
    if (phoneNumber || password || emiratesId || isPhoneNumber) {
      const axios = require("axios")
      const data = JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
        emiratesId: emiratesId,
        isPhoneNumber: isPhoneNumber,
      })

      const config = {
        method: "post",
        url: `${url}/api/doctors/doctorlogin`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }

      axios(config)
        .then(response => {
          console.log(response.data)
          if (response.data && response.data.success === 1) {
            setPhoneNumber("")
            setPassword("")
            setEmiratesId("")
            sessionStorage.setItem("id", response.data.doctorFound._id)
            sessionStorage.setItem("loggedIn", true)
            sessionStorage.setItem("role", response.data.doctorFound.role)
            sessionStorage.setItem("token", response.data.access_token)
            sessionStorage.setItem(
              "firstName",
              response.data.doctorFound.firstName
            )
            sessionStorage.setItem(
              "lastName",
              response.data.doctorFound.lastName
            )
            sessionStorage.setItem("image", response.data.doctorFound.image[0])
            sessionStorage.setItem(
              "phoneNumber",
              response.data.doctorFound.phoneNumber
            )
            sessionStorage.setItem("email", response.data.doctorFound.email)
            history.push("/dashboard")
            // if (response.data.doctorFound.role == "Doctor") {
            //   history.push("/patients")
            // } else {
            //   history.push("/patients")
            // }
          }
          setMessage(response.data.message)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setMessage("No field should be empty.")
    }
  }
  console.log(phoneNumber, emiratesId, password, "in login")

  const handleValidation = () => {
    if (!password) {
      setIsPassword(true)
    }
    if (!phoneNumber) {
      setIsPhoneNum(true)
    }
  }
  const handleValidation1 = () => {
    if (!emiratesId) {
      setIsEmiratesId(true)
    }
    if (!password) {
      setIsPassword(true)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleBack = () => {
    history.push("/forgot-password")
  }
  if (sessionStorage.getItem("loggedIn")) {
    history.push("/patients")
    return
  }
  return (
    <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div> */}
      {isLoading === "logging in" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h6>Logging in...</h6>
          <Spinner className="ms-2" color="primary" />
        </div>
      ) : (
        <div className="account-pages">
          <Container>
            <Row
              className="justify-content-center mt-4"
              style={{ paddingTop: "10px" }}
            >
              <Col style={{ width: "48.78%" }} md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col xs={7}>
                        <div className="text-primary p-4">
                          <h5 className="text-primary">
                            Appolonia Dental Care
                          </h5>
                          <p>Sign in to Doctor Portal.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-2">
                          <span
                            style={{ backgroundColor: "#20507B" }}
                            className="avatar-title rounded-circle "
                          >
                            <img
                              src={applogo}
                              alt=""
                              className=""
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            className="text-primary"
                            style={{ width: "50%" }}
                            label="Phone Number"
                            value="1"
                            onClick={() => setIsPhoneNumber("1")}
                          />
                          <Tab
                            className="text-primary"
                            style={{ width: "50%" }}
                            label="Emirates ID"
                            value="2"
                            onClick={() => setIsPhoneNumber("0")}
                          />
                        </TabList>
                      </Box>
                      {/* {isPhoneNumber === true && ( */}
                      <TabPanel value="1">
                        <div className="p-2">
                          <Form className="form-horizontal">
                            {message && <Alert color="danger">{message}</Alert>}
                            <div className="mb-3">
                              <Label className="form-label">Phone Number</Label>
                              {/* <Input
                          name="phone number"
                          className="form-control"
                          placeholder="Enter phone number"
                          type="number"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        /> */}

                              <PhoneInput
                                country={"ae"}
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                              />
                              {!phoneNumber && isPhoneNum && (
                                <p className="text-danger">
                                  Please Enter phone number
                                </p>
                              )}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Password</Label>
                              <div
                                style={{
                                  position: "relative",
                                }}
                              >
                                <Input
                                  name="password"
                                  placeholder="Enter Password"
                                  type={isRevealPwd ? "text" : "password"}
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <img
                                  style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    width: "20px",
                                    right: "10px",
                                    top: "8px",
                                  }}
                                  title={
                                    isRevealPwd
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                                  onClick={() =>
                                    setIsRevealPwd(prevState => !prevState)
                                  }
                                />
                              </div>
                              {/* <div
                              style={{
                                position: "relative",
                              }}
                            >
                              <Input
                                className=""
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                              />
                              <i
                                style={{
                                  position: "absolute",
                                  top: "11px",
                                  fontSize: "16px",
                                  right: "4%",
                                  cursor: "pointer",
                                  //color: "lightgray",
                                }}
                                className="fa fa-eye icon"
                                onClick={() => {
                                  setToggle1(!toggle1)
                                }}
                              ></i>
                            </div> */}

                              {!password && isPassword && (
                                <p className="text-danger">
                                  Please Enter password
                                </p>
                              )}
                              {/* {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null} */}
                              <a
                                className="d-flex justify-content-end mt-2"
                                //style={{ paddingLeft: "11.5rem" }}
                                // href="/forgot-password"
                              >
                                <p onClick={handleBack}> Forgot password?</p>
                              </a>
                            </div>

                            {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input mt-2"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label mt-2"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div> */}

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                onClick={e => {
                                  e.preventDefault()
                                  handleLoginDetails(e)
                                  handleValidation()
                                }}
                              >
                                Log In
                              </button>
                              <br />
                            </div>
                          </Form>
                        </div>
                      </TabPanel>
                      {/* )} */}
                      {/* {isPhoneNumber === false && ( */}
                      <TabPanel value="2">
                        <div className="p-2">
                          <Form className="form-horizontal">
                            {message && <Alert color="danger">{message}</Alert>}
                            <div className="mb-3">
                              <Label className="form-label">Emirates ID</Label>

                              <Input
                                name="Emirates ID"
                                className="form-control"
                                placeholder="Enter emirates ID"
                                type="number"
                                value={emiratesId}
                                onChange={e => setEmiratesId(e.target.value)}
                              />
                              {!emiratesId && isEmiratesId && (
                                <p className="text-danger">
                                  Please Enter emirates Id
                                </p>
                              )}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Password</Label>
                              <div
                                style={{
                                  position: "relative",
                                }}
                              >
                                <Input
                                  name="password"
                                  placeholder="Enter Password"
                                  type={isRevealPwd ? "text" : "password"}
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <img
                                  style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    width: "20px",
                                    right: "10px",
                                    top: "8px",
                                  }}
                                  title={
                                    isRevealPwd
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                                  onClick={() =>
                                    setIsRevealPwd(prevState => !prevState)
                                  }
                                />
                              </div>
                              {/* <div
                              style={{
                                position: "relative",
                              }}
                            >
                              <Input
                                className=""
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                              />
                              <i
                                style={{
                                  position: "absolute",
                                  top: "11px",
                                  fontSize: "16px",
                                  right: "4%",
                                  cursor: "pointer",
                                  //color: "lightgray",
                                }}
                                className="fa fa-eye icon"
                                onClick={() => {
                                  setToggle1(!toggle1)
                                }}
                              ></i>
                            </div> */}

                              {!password && isPassword && (
                                <p className="text-danger">
                                  Please Enter password
                                </p>
                              )}
                              {/* {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null} */}
                              <a
                                className="d-flex justify-content-end mt-2"
                                //style={{ paddingLeft: "11.5rem" }}
                                // href="/forgot-password"
                              >
                                <p onClick={handleBack}> Forgot password?</p>
                              </a>
                            </div>

                            {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input "
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label "
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div> */}

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                onClick={e => {
                                  e.preventDefault()
                                  handleLoginDetails()
                                  handleValidation1()
                                }}
                              >
                                Log In
                              </button>
                              <br />
                            </div>
                          </Form>
                        </div>
                      </TabPanel>
                      {/* )} */}
                    </TabContext>

                    {/* 
                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li>
                          <li className="list-inline-item">
                            <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => {}}
                            />
                          </li>
                        </ul>
                      </div>*/}

                    {/* <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}
                    <div className="mt-2 text-center">
                      <p>
                        © {new Date().getFullYear()} Appolonia Dental Care{" "}
                        {/* <i className="mdi mdi-heart text-danger" /> by Themesbrand */}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
