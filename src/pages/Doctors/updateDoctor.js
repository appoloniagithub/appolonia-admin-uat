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
import { getDoctorById } from "Connection/Doctors"
import { updateDoctor } from "Connection/Doctors"
import { ToastContainer, toast } from "react-toastify"

const EditDoctor = () => {
  let history = useHistory()
  const location = useLocation()
  const roleOptions = ["Select", "Admin", "Doctor"]
  const options = ["Select", "Orthodontist", "Pediatric Dentist"]
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [speciality, setSpeciality] = useState(options[0])
  const [image, setImage] = useState("")
  const [role, setRole] = useState(roleOptions[0])
  const [gender, setGender] = useState("")
  const [nationality, setNationality] = useState("")
  const [totalExperience, setTotalExperience] = useState("")
  const [certifications, setCertifications] = useState("")
  const [education, setEducation] = useState("")
  const [profile, setProfile] = useState("")
  const [password, setPassword] = useState("")
  const [id, setId] = useState("")

  // const [APIData, setAPIData] = useState([])

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/doctors/getalldoctors")
  //     .then(response => {
  //       setAPIData(response.data)
  //     })
  // }, [])
  // const setData = data => {
  //   console.log(data)
  // }
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

  const hiddenFileInput = React.useRef(null)

  const handleChange = event => {
    const fileUploaded = event.target.files[0]

    setImage(fileUploaded)
  }

  const handleClick = event => {
    hiddenFileInput.current.click()
    uploadFile(image)
  }

  useEffect(() => {
    console.log(location, "doctor loc")
    let splitData = location.pathname.split("/")
    console.log(splitData, "doc split")
    if (splitData && splitData.length === 4) {
      let doctorId = splitData[3]
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
          setImage(res.data.data.foundDoctor.image)
          setPassword(res.data.data.foundDoctor.password)
          setGender(res.data.data.foundDoctor.gender)
          setNationality(res.data.data.foundDoctor.nationality)
          setTotalExperience(res.data.data.foundDoctor.totalExperience)
          setProfile(res.data.data.foundDoctor.profile)
          setCertifications(res.data.data.foundDoctor.certifications)
          setEducation(res.data.data.foundDoctor.education)
          setRole(res.data.data.foundDoctor.role)
          //console.log(res.data.data.found.firstName)
        } else {
          console.log("no doctor found")
        }
      })
    }
  }, [])

  const updateData = async () => {
    await updateDoctor({
      _id: id,
      firstName,
      lastName,
      email,
      phoneNumber,
      speciality,
      image,
      password,
      role,
      gender,
      nationality,
      totalExperience,
      profile,
      certifications,
      education,
    })
      .then(() => {
        history.push("/doctors")
        toast.success("Doctor successfully updated")
      })
      .catch(err => {
        toast.error("Error while updating a doctor")
      })
  }
  console.log(gender)
  return (
    <>
      <div className="form-wrapper">
        <Row>
          <Col sm="4">
            <div className="border border-secondary rounded mt-4 ml-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Edit Doctor</h5>
                <Divider />
                <img
                  className="m-2"
                  style={{ borderRadius: "50px" }}
                  src={profilePic}
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
                <div className="form-wrapper">
                  <Form>
                    <Form.Group controlId="Role">
                      <Form.Label>Role</Form.Label>
                      <div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={role}
                          onChange={e => setRole(e.target.value)}
                          required
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
                </div>
              </div>
            </div>
          </Col>
          <Col sm="8">
            <div className="border border-secondary rounded mt-4 mr-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Edit Doctor Information</h5>
                <Divider />
                <div className="form-wrapper">
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="First Name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          {...register("firstName", {
                            required: true,
                            maxLength: 10,
                          })}
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    {errors.firstName && <p>Please check the First Name</p>}
                    <Col sm="6">
                      <Form.Group controlId="Last Name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("lastName", {
                            required: true,
                            maxLength: 10,
                          })}
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </Form.Group>
                      {errors.lastName && <p>Please check the Last Name</p>}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Phone Number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="number"
                          {...register("phoneNumber")}
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="Speciality">
                    <Form.Label>Speciality</Form.Label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={speciality}
                      onChange={e => setSpeciality(e.target.value)}
                    >
                      {options.map(value => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </Form.Group>

                  <Form.Group controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                    &nbsp;&nbsp;&nbsp;
                    <div className="form-check form-check-inline">
                      <br />
                      <input
                        type="radio"
                        value="male"
                        id="male"
                        onClick={e => setGender(e.target.value)}
                        checked={gender === "male"}
                        name={gender}
                      />{" "}
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        value="female"
                        id="female"
                        onClick={e => setGender(e.target.value)}
                        checked={gender === "female"}
                        name={gender}
                      />{" "}
                      <label htmlFor="female">Female</label>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="Nationality">
                    <Form.Label>Nationality</Form.Label>
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
                  </Form.Group>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Total Experience">
                        <Form.Label>Total Experience</Form.Label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={totalExperience}
                            onChange={e => setTotalExperience(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Profile">
                        <Form.Label>Profile</Form.Label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={profile}
                            onChange={e => setProfile(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Certifications">
                        <Form.Label>Certifications</Form.Label>

                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={certifications}
                            onChange={e => setCertifications(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Education">
                        <Form.Label>Education</Form.Label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={education}
                            onChange={e => setEducation(e.target.value)}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          {...register("password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                          })}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Repeat Password">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Button
                    onClick={updateData}
                    type="submit"
                    color="primary"
                    className="btn btn-primary m-2 "
                  >
                    Update Doctor
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default EditDoctor
