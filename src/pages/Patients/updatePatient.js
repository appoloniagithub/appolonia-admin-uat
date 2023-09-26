import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Row, Col } from "reactstrap"
import Divider from "@mui/material/Divider"
import profilePic from "../../assets/images/profile.png"
import { Select, MenuItem } from "@material-ui/core"
import countries from "i18n-iso-countries"
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json"
import itLocale from "i18n-iso-countries/langs/it.json"
import { useHistory, useLocation } from "react-router"
import { ToastContainer, toast } from "react-toastify"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { getPatientById } from "Connection/Patients"
import { updateUserProfile } from "Connection/Patients"
import { clinicVerify } from "Connection/Patients"
import Footer from "components/HorizontalLayout/Footer"
import url from "Connection/Api/api"
const EditPatient = props => {
  let history = useHistory()
  const location = useLocation()
  const [patientData, setPatientData] = useState("")

  //const roleOptions = ["Select", "Admin", "Doctor"]
  const options = ["Select", "Abu Dhabi", "Dubai", "Sharjah", "Ajman"]
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [city, setCity] = useState("")
  const [image, setImage] = useState("")
  const [emiratesId, setEmiratesId] = useState("")
  const [fileNumber, setFileNumber] = useState("")
  //const [role, setRole] = useState(roleOptions[2])
  const [gender, setGender] = useState("")
  const [fileId, setFileId] = useState("")
  const [id, setId] = useState("")
  const [isRole, setIsRole] = useState(false)
  const [isCity, setIsCity] = useState(false)
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const selectCountryHandler = value => setNationality(value)

  // Have to register the languages you want to use
  countries.registerLocale(enLocale)
  countries.registerLocale(itLocale)

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" })
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    }
  })
  const handleValidation = () => {
    // if (!role) {
    //   setIsRole(true)
    // }
    if (!city) {
      setIsCity(true)
    }
    if (!phoneNumber) {
      setIsPhoneNumber(true)
    }
  }
  const hiddenFileInput = React.useRef(null)

  const handleChange = event => {
    setImage(event.target.files[0])
  }

  const handleClick = event => {
    hiddenFileInput.current.click()
  }
  const handleClose = () => {
    history.push("/patients")
  }
  useEffect(() => {
    console.log(location)
    let splitData = location.pathname.split("/")
    console.log(splitData)
    if (splitData && splitData.length === 4) {
      let userId = splitData[3]
      console.log(userId)
      setId(userId)
      getPatientById({ userId }).then(async res => {
        setPatientData(res.data.data.foundPatient.phoneNumber)
        console.log(res.data.data.foundPatient)
        if (res.data.data.foundPatient) {
          setFirstName(res.data.data.foundPatient.firstName)
          setLastName(res.data.data.foundPatient.lastName)
          setEmail(res.data.data.foundPatient.email)
          setPhoneNumber(res.data.data.foundPatient.phoneNumber)
          setCity(res.data.data.foundPatient.city)
          setImage(res.data.data.foundPatient.image[0])
          setEmiratesId(res.data.data.foundPatient.uniqueId2)
          setGender(res.data.data.foundPatient.gender)
          setFileNumber(res.data.data.foundPatient.uniqueId1)
        } else {
          console.log("no patient found")
        }
      })
    }
  }, [])

  let getPatientData = () => {
    //   console.log(userId, "in get patient")

    clinicVerify({ phoneNumber: patientData }).then(async res => {
      console.log(res)
      console.log(res.data.data.foundFile._id)
      setFileId(res.data.data.foundFile._id)
    })
  }
  useEffect(() => {
    getPatientData()
  }, [phoneNumber])
  const updateData = async () => {
    var formdata = new FormData()
    formdata.append("fileId", fileId)
    formdata.append("isFileNumberChanged", "0")
    formdata.append("isFamilyHead", "1")
    formdata.append("isEmiratesIdChanged", "0")
    formdata.append("city", city)
    formdata.append("fileNumber", fileNumber)
    formdata.append("emiratesId", emiratesId)
    formdata.append("email", email)
    formdata.append("phoneNumber", phoneNumber)
    formdata.append("lastName", lastName)
    formdata.append("firstName", firstName)
    formdata.append("gender", gender)
    formdata.append("userId", id)
    formdata.append("image", image)

    console.log(formdata)
    await updateUserProfile(formdata)
      .then(res => {
        console.log(res)
        history.push("/patients")
        toast.success("Patient successfully updated")
      })
      .catch(err => {
        toast.error("Error while updating a patient")
      })
  }

  console.log(patientData, "phone")
  return (
    <>
      <div className="form-wrapper">
        <Row>
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
                <button onClick={handleClose} className="btn text-light">
                  <i className="fas fa-arrow-left" />
                </button>
              </div>

              <h5 className="mt-2 text-light">Patient Details</h5>
            </div>
          </div>
        </Row>
        <Row>
          <Col sm="4">
            <div className="border border-secondary rounded mt-4 ml-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Edit Patient</h5>
                <Divider />
                <img
                  className="m-2"
                  style={{ borderRadius: "50px" }}
                  src={image ? `${url}/api/${image}` : profilePic}
                  width="100"
                  height="100"
                />
                <div>
                  <Button
                    color="primary"
                    className="btn btn-primary m-2"
                    onClick={handleClick}
                  >
                    Upload Photo
                  </Button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />

                  <p>Only .png .jpg allowed</p>
                </div>
                {/* <div className="form-wrapper">
                  <Form>
                    <Form.Group controlId="Role">
                      <Form.Label>
                        Role<sup className="text-danger">*</sup>
                      </Form.Label>
                      <div>
                        <select
                          name="role"
                          className="form-select"
                          aria-label="Default select example"
                          value={role}
                          onChange={e => {
                            setRole(e.target.value)
                            //setIsRole(false)
                          }}
                        >
                          {roleOptions.map(value => (
                            <option value={value} key={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                  </Form>
                </div> */}
                {/* {isRole && <p className="text-danger"> please select role</p>} */}
                <div className="form-wrapper">
                  <Form>
                    <Form.Group controlId="Emirates ID">
                      <Form.Label>
                        Emirates ID<sup className="text-danger">*</sup>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="emiratesId"
                        {...register("emiratesId", {
                          required: true,
                          //maxLength: 20,
                        })}
                        value={emiratesId}
                        onChange={e => setEmiratesId(e.target.value)}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group controlId="File Number">
                      <Form.Label className="mt-2">
                        File Number<sup className="text-danger">*</sup>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fileNumber"
                        // {...register("fileNumber", {
                        //   required: true,
                        //   //maxLength: 20,
                        // })}
                        value={fileNumber}
                        onChange={e => setFileNumber(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
          <Col sm="8">
            <div className="border border-secondary rounded mt-4 mr-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Personal Information</h5>
                <Divider />
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

                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Gender">
                        <Form.Label>Gender</Form.Label>
                        &nbsp;&nbsp;&nbsp;
                        <div className="form-check form-check-inline">
                          <br />
                          <input
                            type="radio"
                            value="Male"
                            checked={gender === "Male"}
                            id="Male"
                            onClick={e => setGender(e.target.value)}
                            name={gender}
                          />{" "}
                          <label htmlFor="Male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            value="Female"
                            checked={gender === "Female"}
                            id="Female"
                            onClick={e => setGender(e.target.value)}
                            name={gender}
                          />{" "}
                          <label htmlFor="Female">Female</label>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      {/* <Form.Group controlId="Nationality">
                        <Form.Label className="mt-2">Nationality</Form.Label>
                        <div>
                          <Select
                            style={{ width: "150px" }}
                            value={nationality}
                            onChange={e => selectCountryHandler(e.target.value)}
                          >
                            {!!countryArr?.length &&
                              countryArr.map(({ label, value }) => (
                                <MenuItem key={value} value={value}>
                                  {label}
                                </MenuItem>
                              ))}
                          </Select>
                        </div>
                      </Form.Group> */}
                    </Col>
                  </Row>

                  {/* <br />
                  <h5>Professional Information</h5> */}
                  <br />
                  <Form.Group controlId="City">
                    <Form.Label>
                      City<sup className="text-danger">*</sup>
                    </Form.Label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={city}
                      onChange={e => {
                        setCity(e.target.value)
                        setIsCity(false)
                      }}
                    >
                      {options.map(value => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                  {isCity && <p className="text-danger"> Please select city</p>}

                  <br />
                  <Button
                    onClick={updateData}
                    type="submit"
                    color="primary"
                    className="btn btn-primary m-2 "
                  >
                    <span onClick={handleValidation}>Update Patient</span>
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    className="btn btn-primary m-2 "
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    </>
  )
}
export default EditPatient
