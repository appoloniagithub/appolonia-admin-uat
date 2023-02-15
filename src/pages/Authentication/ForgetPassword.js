import PropTypes from "prop-types"
import React from "react"
import { useState } from "react"
import applogo from "../../assets/images/applogo.png"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"
import { toast } from "react-toastify"
import { withRouter, Link } from "react-router-dom"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import { useHistory } from "react-router-dom"
import { forgotPassword } from "Connection/Doctors"
import url from "Connection/Api/api"

const ForgetPasswordPage = props => {
  //meta title
  document.title = "Forget Password | Appolonia Dental Care"
  let history = useHistory()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const [message, setMessage] = useState("")
  const handleForgotPassword = () => {
    if (phoneNumber) {
      const axios = require("axios")
      const data = JSON.stringify({
        phoneNumber: phoneNumber,
      })

      const config = {
        method: "post",
        url: `${url}/api/doctors/forgotpwd`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }

      axios(config)
        .then(response => {
          console.log(response)
          if (response.data.data && response.data.data.success === 1) {
            setPhoneNumber("")
            history.push("/")
            toast.success(
              "Password has been sent to your email Id, Please Login now."
            )
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
  const handleValidation = () => {
    if (!phoneNumber) {
      setIsPhoneNumber(true)
    }
  }
  console.log(phoneNumber, "in forgotpwd")
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
            <Col style={{ width: "44.66%" }} md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Appolonia Dental Care</h5>
                        <p>Forgot Password?</p>
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
                    {/* <Alert color="danger" style={{ marginTop: "13px" }}></Alert>

                    <Alert
                      color="success"
                      style={{ marginTop: "13px" }}
                    ></Alert> */}

                    <Form className="form-horizontal">
                      <div className="mb-3">
                        <Label className="form-label">Phone Number</Label>
                        {/* <Input
                          name="phonenumber"
                          className="form-control"
                          placeholder="Enter phone number"
                          type="number"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        /> */}
                        <PhoneInput
                          style={{ width: "400px" }}
                          country={"ae"}
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                        />
                        {!phoneNumber && isPhoneNumber && (
                          <p className="text-danger">
                            Please Enter phone number
                          </p>
                        )}
                      </div>

                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                            onClick={e => {
                              e.preventDefault()
                              handleForgotPassword()
                              handleValidation()
                            }}
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Appolonia Dental Care </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
