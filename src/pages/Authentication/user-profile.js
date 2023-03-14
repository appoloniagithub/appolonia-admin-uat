import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { getDoctorById } from "Connection/Doctors"
import url from "Connection/Api/api"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
} from "reactstrap"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Form from "react-bootstrap/Form"
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
import { updateDoctor } from "Connection/Doctors"
import profilePic from "../../assets/images/profile.png"

const UserProfile = props => {
  //meta title
  document.title = "Profile | Appolonia Dental Care"

  //const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const [password, setPassword] = useState("")
  const [isPassword, setIsPassword] = useState(false)
  const [id, setId] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // const { error, success } = useSelector(state => ({
  //   error: state.Profile.error,
  //   success: state.Profile.success,
  // }))

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      const doctorId = sessionStorage.getItem("id")
      console.log(doctorId)
      setId(doctorId)
      getDoctorById({ doctorId }).then(async res => {
        if (res.data.data.foundDoctor) {
          //setDoctorData(res.data.data.foundDoctor)
          setFirstName(res.data.data.foundDoctor.firstName)
          setLastName(res.data.data.foundDoctor.lastName)
          setEmail(res.data.data.foundDoctor.email)
          setPhoneNumber(res.data.data.foundDoctor.phoneNumber)
          setSpeciality(res.data.data.foundDoctor.speciality)
          setImage(res.data.data.foundDoctor.image[0])
        }
      })
    }
  }, [])
  // if (sessionStorage.getItem("firstName")) {
  //   const firstname = sessionStorage.getItem("firstName")
  //   console.log(firstname)
  //   setFirstName(firstname)
  // }
  // if (sessionStorage.getItem("lastName")) {
  //   const lastname = sessionStorage.getItem("lastName")
  //   console.log(lastname)
  //   setLastName(lastname)
  // }
  // if (sessionStorage.getItem("image")) {
  //   const img = sessionStorage.getItem("image")
  //   console.log(img)

  //   setImage(img)

  //   // setidx(uid)
  // }
  // if (sessionStorage.getItem("email")) {
  //   const mail = sessionStorage.getItem("email")
  //   console.log(mail)

  //   setEmail(mail)

  //   // setidx(uid)
  // }
  // if (sessionStorage.getItem("phoneNumber")) {
  //   const phoneNumber = sessionStorage.getItem("phoneNumber")
  //   console.log(phoneNumber)

  //   setPhoneNumber(phoneNumber)

  //   // setidx(uid)
  // }

  const handleValidation = () => {
    if (!phoneNumber) {
      setIsPhoneNumber(true)
    }
  }
  console.log(image, "image")
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {/* {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}

              <Card style={{ width: "90%" }}>
                <CardBody>
                  <div className="d-flex justify-content-around">
                    <div className="ms-3">
                      <img
                        src={image ? `${url}/api/${image}` : profilePic}
                        alt=""
                        //className="avatar-md rounded-circle img-thumbnail"
                        width="300"
                        height="300"
                        style={{ borderRadius: "50px" }}
                      />
                    </div>
                    <div className="m-4">
                      <div
                        style={{ paddingRight: "146px" }}
                        className="text-muted"
                      >
                        <h5>
                          {" "}
                          Name : {firstName}&nbsp;
                          {lastName}
                        </h5>
                        <h5 className="mb-2">Email : {email}</h5>
                        {/* <p className="mb-0">Id no: #{idx}</p> */}
                        <h5 className="mb-2">Phone Number : {phoneNumber}</h5>
                        <h5 className="mb-2">Speciality : {speciality} </h5>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to={`/profile/edit-profile/${id}`}>
                          <Button
                            style={{ width: "65%" }}
                            //onClick={updateData}
                            type="submit"
                            color="primary"
                            className="btn btn-primary  p-2 "
                          >
                            Edit Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <h4 className="card-title mb-4">Change Profile</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                // onSubmit={e => {
                //   e.preventDefault()
                //   validation.handleSubmit()
                //   return false
                // }}
              >
                <div className="form-wrapper">
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="First Name">
                        <Form.Label>
                          First Name<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          {...register("firstName", {
                            required: true,
                            maxLength: 20,
                          })}
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          autoFocus
                        />
                      </Form.Group>
                      {!firstName &&
                        errors.firstName &&
                        errors.firstName.type === "required" && (
                          <p className="text-danger">Please Enter First Name</p>
                        )}
                      {errors.firstName &&
                        errors.firstName.type === "maxLength" && (
                          <p className="text-danger">
                            Please check the First Name
                          </p>
                        )}
                    </Col>

                    <Col sm="6">
                      <Form.Group controlId="Last Name">
                        <Form.Label>
                          Last Name<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          {...register("lastName", {
                            required: true,
                            maxLength: 20,
                          })}
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </Form.Group>
                      {!lastName &&
                        errors.lastName &&
                        errors.lastName.type === "required" && (
                          <p className="text-danger">Please Enter Last Name</p>
                        )}
                      {errors.lastName &&
                        errors.lastName.type === "maxLength" && (
                          <p className="text-danger">
                            Please check the Last Name
                          </p>
                        )}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Email">
                        <Form.Label className="mt-2">
                          Email<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      {!email &&
                        errors.email &&
                        errors.email.type === "required" && (
                          <p className="text-danger">Please Enter email</p>
                        )}
                      {!email &&
                        errors.email &&
                        errors.email.type === "pattern" && (
                          <p className="text-danger">Invalid email</p>
                        )}
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Phone Number">
                        <Form.Label className="mt-2">
                          Phone Number<sup className="text-danger">*</sup>
                        </Form.Label>

                        <PhoneInput
                          country={"ae"}
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                        />
                      </Form.Group>
                      {!phoneNumber && isPhoneNumber && (
                        <p className="text-danger">Please Enter phone number</p>
                      )}
                    </Col>
                  </Row>
                 
                </div>
                <div className="text-center mt-4">
                  <Button
                    onClick={() => handleValidation(updateProfile)}
                    type="submit"
                    color="danger"
                  >
                    Update Profile
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>  */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserProfile
