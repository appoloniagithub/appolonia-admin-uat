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
} from "reactstrap"

import { withRouter, Link } from "react-router-dom"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"

import applogo from "../../assets/images/applogo.png"

const Login = props => {
  //meta title
  document.title = "Login | Appolonia Dental Care"
  let history = useHistory()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const handleLoginDetails = () => {
    if (phoneNumber && password) {
      const axios = require("axios")
      const data = JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
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
          console.log(response.data.message)
          if (response.data && response.data.success === 1) {
            setPhoneNumber("")
            setPassword("")
            sessionStorage.setItem("loggedIn", true)
            sessionStorage.setItem("role", response.data.doctorFound.role)
            history.push("/patients")
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
  console.log(phoneNumber, password, "in login")

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Appolonia Dental Care</h5>
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
                      <div className="avatar-md profile-user-wid mb-4">
                        <span
                          style={{ backgroundColor: "#20507B" }}
                          className="avatar-title rounded-circle "
                        >
                          <img src={applogo} alt="" className="" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form className="form-horizontal">
                      {/* <Alert color="danger"></Alert> */}

                      <div className="mb-3">
                        <Label className="form-label">Phone Number</Label>
                        <Input
                          name="phone number"
                          className="form-control"
                          placeholder="Enter phone number"
                          type="number"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}

                          // invalid={
                          //   validation.touched.email && validation.errors.email
                          //     ? true
                          //     : false
                          // }
                        />

                        <FormFeedback type="invalid"></FormFeedback>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}

                          // invalid={
                          //   validation.touched.password &&
                          //   validation.errors.password
                          //     ? true
                          //     : false
                          // }
                        />
                        {/* {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null} */}
                        <a href="/forgot-password">Forgot password?</a>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          onClick={e => {
                            e.preventDefault()
                            handleLoginDetails()
                          }}
                        >
                          Log In
                        </button>
                        <br />
                        {message && (
                          <span className="text-danger">{message}</span>
                        )}
                      </div>
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
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                {/* <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p> */}
                <p>
                  © {new Date().getFullYear()} Appolonia Dental Care{" "}
                  {/* <i className="mdi mdi-heart text-danger" /> by Themesbrand */}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
