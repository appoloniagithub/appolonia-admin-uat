import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
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
import { ToastContainer, toast } from "react-toastify"

import { addDoctor } from "Connection/Doctors"

//window.Buffer = window.Buffer || require("buffer").Buffer

const CreateDoctor = props => {
  // constructor(props) {
  //   super(props)
  //   // Setting up functions
  //   this.onChangeFirstName = this.onChangeFirstName.bind(this)
  //   this.onChangeLastName = this.onChangeLastName.bind(this)
  //   this.onChangeEmail = this.onChangeEmail.bind(this)
  //   this.onChangeImage = this.onChangeImage.bind(this)
  //   this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
  //   this.onChangeSpeciality = this.onChangeSpeciality.bind(this)
  //   this.onChangePassword = this.onChangePassword.bind(this)
  //   this.onChangeRole = this.onChangeRole.bind(this)
  //   this.onChangeGender = this.onChangeGender.bind(this)
  //   this.onChangeNationality = this.onChangeNationality.bind(this)
  //   this.onChangeTotalExperience = this.onChangeTotalExperience.bind(this)
  //   this.onChangeProfile = this.onChangeProfile.bind(this)
  //   this.onChangeCertifications = this.onChangeCertifications.bind(this)
  //   this.onChangeEducation = this.onChangeEducation.bind(this)
  //   this.onSubmit = this.onSubmit.bind(this)
  //   // Setting up state
  //   this.state = {
  // firstName: "",
  // lastName: "",
  // email: "",
  // phoneNumber: "",
  // speciality: "",
  // image: "",
  // password: "",
  // role: "",
  // gender: "",
  // nationality: "",
  // totalExperience: "",
  // profile: "",
  // certifications: "",
  // education: "",
  //     loggedIn: false,
  //   }
  // }

  // componentDidMount = () => {
  //   let getLoggedIn = sessionStorage.getItem("loggedIn")
  //   if (getLoggedIn) {
  //     let role = sessionStorage.getItem("role")
  //     this.setState({
  //       loggedIn: getLoggedIn,
  //       role: role,
  //     })
  //   } else {
  //     this.props.history.push("/")
  //   }
  // }

  // onChangeFirstName(e) {
  //   this.setState({ firstName: e.target.value })
  // }
  // onChangeLastName = e => {
  //   this.setState({ lastName: e.target.value })
  // }
  // onChangeEmail = e => {
  //   this.setState({ email: e.target.value })
  // }
  // onChangeImage = e => {
  //   this.setState({ image: e.target.value })
  // }
  // onChangePhoneNumber = e => {
  //   this.setState({ phoneNumber: e.target.value })
  // }
  // onChangeSpeciality = e => {
  //   this.setState({ speciality: e.target.value })
  // }
  // onChangePassword = e => {
  //   this.setState({ password: e.target.value })
  // }
  // onChangeRole = e => {
  //   this.setState({ role: e.target.value })
  // }
  // onChangeGender = e => {
  //   this.setState({ gender: e.target.value })
  // }
  // onChangeNationality = e => {
  //   this.setState({ nationality: e.target.value })
  // }
  // onChangeTotalExperience = e => {
  //   this.setState({ totalExperience: e.target.value })
  // }
  // onChangeProfile = e => {
  //   this.setState({ profile: e.target.value })
  // }
  // onChangeCertifications = e => {
  //   this.setState({ certifications: e.target.value })
  // }
  // onChangeEducation = e => {
  //   this.setState({ education: e.target.value })
  // }

  // onSubmit = e => {
  //   e.preventDefault()
  //   const docObj = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     email: this.state.email,
  //     phoneNumber: this.state.phoneNumber,
  //     speciality: this.state.speciality,
  //     image: this.state.image,
  //     password: this.state.password,
  //     role: this.state.role,
  //     gender: this.state.gender,
  //     nationality: this.state.nationality,
  //     totalExperience: this.state.totalExperience,
  //     profile: this.state.profile,
  //     certifications: this.state.certifications,
  //     education: this.state.education,
  //   }
  //   axios
  //     .post("http://localhost:3001/api/doctors/createdoctor", docObj)
  //     .then(res => console.log(res.data))
  //   this.setState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phoneNumber: "",
  //     speciality: "",
  //     image: "",
  //     password: "",
  //     role: "",
  //     gender: "",
  //     nationality: "",
  //     totalExperience: "",
  //     profile: "",
  //     certifications: "",
  //     education: "",
  //   })
  //   //alert("Doctor created successfully");
  // }
  let history = useHistory()
  const roleOptions = ["Select", "Admin", "Doctor"]
  const options = ["Select", "Orthodontist", "Pediatric Dentist"]
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [speciality, setSpeciality] = useState(options[0])
  const [image, setImage] = useState("")
  const [role, setRole] = useState("")
  const [gender, setGender] = useState("")
  const [nationality, setNationality] = useState("")
  const [totalExperience, setTotalExperience] = useState("")
  const [certifications, setCertifications] = useState("")
  const [education, setEducation] = useState("")
  const [profile, setProfile] = useState("")
  const [password, setPassword] = useState("")
  const [isRole, setIsRole] = useState(false)

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
  const handleRole = () => {
    if (!role) {
      setIsRole(true)
    }
  }
  const hiddenFileInput = React.useRef(null)

  const handleChange = event => {
    setImage(event.target.files[0])
  }
  // const uploadFile = async file => {
  //   console.log(file)
  //   const config = {
  //     bucketName: process.env.REACT_APP_BUCKET_NAME,
  //     dirName: "doctor-images",
  //     region: process.env.REACT_APP_REGION,
  //     accessKeyId: process.env.REACT_APP_ACCESS,
  //     secretAccessKey: process.env.REACT_APP_SECRET,
  //   }
  //   // const ReactS3Client = new S3(config)
  //   // the name of the file uploaded is used to upload it to S3
  //   if (file && file.name) {
  //     console.log(config, file)
  //     S3.uploadFile(file, config)
  //       .then(data => console.log(data.location))
  //       .catch(err => console.error(err, "error"))
  //   }
  // }
  const handleClick = event => {
    hiddenFileInput.current.click()
    //uploadFile(image)
  }

  const postData = () => {
    console.log(role, "above if")
    if (role) {
      axios
        .post("http://localhost:3001/api/doctors/createdoctor", {
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
        .then(res => {
          setFirstName(""),
            setLastName(""),
            setEmail(""),
            setPhoneNumber(""),
            setSpeciality(""),
            setImage(""),
            setPassword(""),
            setRole(""),
            setGender(""),
            setNationality(""),
            setTotalExperience(""),
            setProfile(""),
            setCertifications(""),
            setEducation(""),
            console.log(res.data)
          history.push("/doctors")
          toast.success("Doctor successfully created")
        })
        .catch(err => {
          toast.error("Error while creating a doctor")
        })
    } else {
      setIsRole(true)
      console.log("else in false data", isRole)
    }
  }
  console.log(image.name)
  console.log(gender)

  return (
    <>
      <div className="form-wrapper">
        <Row>
          <Col sm="4">
            <div className="border border-secondary rounded mt-4 ml-4 p-2">
              <div className="justify-content-between p-2">
                <h5>Add New Doctor</h5>
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
                            setIsRole(false)
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
                </div>
                {isRole && <p className="text-danger"> please select role</p>}
              </div>
            </div>
          </Col>
          <Col sm="8">
            <div className="border border-secondary rounded mt-4 mr-4 p-2">
              <div className="justify-content-between p-2">
                <h5>New Doctor Information</h5>
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
                        />
                      </Form.Group>
                      {errors.firstName &&
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
                      {errors.lastName &&
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
                        <Form.Label>
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
                      {errors.email && errors.email.type === "required" && (
                        <p className="text-danger">Please Enter email</p>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <p className="text-danger">Invalid email</p>
                      )}
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Phone Number">
                        <Form.Label>
                          Phone Number<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          {...register("phoneNumber", {
                            required: true,
                            minLength: 10,
                          })}
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        />
                      </Form.Group>
                      {errors.phoneNumber && (
                        <p className="text-danger">
                          Please check your phone number
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Form.Group controlId="Speciality">
                    <Form.Label>
                      Speciality<sup className="text-danger">*</sup>
                    </Form.Label>
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
                        checked={gender === "male"}
                        id="male"
                        onClick={e => setGender(e.target.value)}
                        name={gender}
                      />{" "}
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        value="female"
                        checked={gender === "female"}
                        id="female"
                        onClick={e => setGender(e.target.value)}
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
                        <Form.Label>
                          Password<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          // {...register("password", {
                          //   required: true,
                          //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                          // })}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="Repeat Password">
                        <Form.Label>
                          Repeat Password<sup className="text-danger">*</sup>
                        </Form.Label>
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
                    onClick={handleSubmit(postData)}
                    type="submit"
                    color="primary"
                    className="btn btn-primary m-2 "
                  >
                    <span onClick={handleRole}>Add New Doctor</span>
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
export default CreateDoctor
