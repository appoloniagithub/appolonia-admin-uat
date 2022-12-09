import PropTypes from "prop-types"
import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import profile from "assets/images/profile-img.png"
import applogo from "../../assets/images/applogo.png"
import { Redirect } from "react-router-dom"

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

export default class Login extends Component {
  constructor(props) {
    super(props)
    let loggedIn = false
    this.state = {
      email: "",
      password: "",
      loggedIn,
    }

    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  submitForm(e) {
    e.preventDefault()
    const { email, password } = this.state

    if (email === "admin@appolonia.ae" && password === "123456") {
      this.setState({
        loggedIn: true,
      })
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />
    }
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
                        <div className="avatar-md profile-user-wid mb-4">
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
                    <div className="p-2">
                      <Form
                        onSubmit={this.submitForm}
                        className="form-horizontal"
                      >
                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onChange}
                          />
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
                          >
                            Log In
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>© {new Date().getFullYear()} Appolonia Dental Care </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
