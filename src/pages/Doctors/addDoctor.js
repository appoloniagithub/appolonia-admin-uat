import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Row, Col, Spinner } from "reactstrap"
import Divider from "@mui/material/Divider"
import profilePic from "../../assets/images/profile.png"
import { Select, MenuItem } from "@material-ui/core"
import countries from "i18n-iso-countries"
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json"
import itLocale from "i18n-iso-countries/langs/it.json"
import { toast } from "react-toastify"
import url from "../../Connection/Api/api"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { getBookingData } from "Connection/Appointments"
import { addDoctor } from "Connection/Doctors"
import * as Yup from "yup"
import { Input } from "reactstrap"
import { yupResolver } from "@hookform/resolvers/yup"
import showPwdImg from "../../assets/images/show-password.svg"
import hidePwdImg from "../../assets/images/hide-password.svg"
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
  const options = [
    "Select",
    "Orthodontics",
    "Pediatric Dentistry",
    "Endodontics",
    "Oral Surgery",
    "Admin",
  ]
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [emiratesId, setEmiratesId] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [image, setImage] = useState("")
  const [role, setRole] = useState(roleOptions[2])
  const [gender, setGender] = useState("male")
  const [nationality, setNationality] = useState("")
  const [totalExperience, setTotalExperience] = useState("")
  const [certifications, setCertifications] = useState("")
  const [education, setEducation] = useState("")
  const [profile, setProfile] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCPassword] = useState("")
  const [isRole, setIsRole] = useState(false)
  const [isSpeciality, setIsSpeciality] = useState(false)
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [response, setResponse] = useState("")
  const [clinicName, setClinicName] = useState("")
  const [clinics, setClinics] = useState([])
  const [file, setFile] = useState("")
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [loading, setLoading] = useState()
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = event => {
        setSelectedImage(event.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    firstName: Yup.string()
      .required("First Name is required")
      .min(4, "Length should be at least 4 characters")
      .max(12, "Length cannot exceed more than 12 characters"),
    lastName: Yup.string().required("Last Name is required"),
    // .min(4, "Length should be at least 4 characters")
    // .max(12, "Length cannot exceed more than 12 characters"),
    email: Yup.string().required("Email is required"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  })
  //password = watch("password", "")

  console.log(errors)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

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
    if (!speciality) {
      setIsSpeciality(true)
    }
    if (!phoneNumber) {
      setIsPhoneNumber(true)
    }
  }
  const hiddenFileInput = React.useRef(null)

  const handleChange = event => {
    setFile(URL.createObjectURL(event.target.files[0]))
    setImage(event.target.files[0])
  }

  const handleClick = event => {
    hiddenFileInput.current.click()
  }
  const handleClose = () => {
    history.push("/doctors")
  }

  useEffect(() => {
    getBookingData().then(res => {
      console.log(res)
      // setServices(res.data.data.services)
      setClinics(res.data.data.clinic)
    })
  }, [])

  const postData = e => {
    e.preventDefault()
    setLoading("adding")
    console.log("test in postdata")
    console.log(role, "above if")
    if (speciality && phoneNumber) {
      var formdata = new FormData()
      formdata.append("firstName", firstName)
      formdata.append("lastName", lastName)
      formdata.append("role", role)
      formdata.append("email", email)
      formdata.append("speciality", speciality)
      formdata.append("clinicName", clinicName)
      formdata.append("emiratesId", emiratesId)
      formdata.append("password", password)
      formdata.append("phoneNumber", phoneNumber)
      formdata.append("image", image)
      formdata.append("gender", gender)
      formdata.append("nationality", nationality)
      formdata.append("totalExperience", totalExperience)
      formdata.append("profile", profile)
      formdata.append("certifications", certifications)
      formdata.append("education", education)
      console.log(formdata)
      axios
        .post(`${url}/api/doctors/createdoctor`, formdata)
        .then(res => {
          setFirstName(""),
            setLastName(""),
            setEmail(""),
            setPhoneNumber(""),
            setEmiratesId(""),
            setSpeciality(""),
            setClinicName("")
          setImage(""),
            setPassword(""),
            setRole(""),
            setGender(""),
            setNationality(""),
            setTotalExperience(""),
            setProfile(""),
            setCertifications(""),
            setEducation(""),
            console.log(res)
          console.log(res.data.success)

          if (res.data.success === 1) {
            history.push("/doctors")
            toast.success("Doctor successfully created")
          }
          // if (res.data.data.status === 400) {
          //   toast.error("Please enter all the mandatory fields")
          // }
          if (res.data.data.status === 409) {
            toast.error(
              "Doctor with this email ID (or) phone number already exists"
            )
          }
        })
        .catch(err => {
          console.log(err)
          toast.error("Error while creating Doctor")
        })
    } else {
      //setIsRole(true)
      setIsSpeciality(true)
      setIsPhoneNumber(true)
      console.log("else in false data", isRole)
    }
  }
  console.log(image, file)
  console.log(gender)

  return (
    <>
      {loading === "adding" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <p>Doctor is being added.</p>
          <Spinner className="ms-2" color="primary" />
        </div>
      ) : (
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

                <h5 className="mt-2 text-light">Doctor Details</h5>
              </div>
            </div>
          </Row>
          <Row>
            <Col sm="4">
              <div className="border border-secondary rounded mt-4 ml-4 p-2">
                <div className="justify-content-between p-2">
                  <h5>Add New Doctor</h5>
                  <Divider />
                  {file.length > 0 ? (
                    <div>
                      <img
                        src={file}
                        className="m-2"
                        width="100"
                        height="100"
                        style={{ borderRadius: "50px" }}
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
                    </div>
                  ) : (
                    <div>
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
                    </div>
                  )}

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
                      <Form.Group controlId="Emirates ID">
                        <Form.Label className="mt-2">
                          Emirates ID
                          {/* <sup className="text-danger">*</sup> */}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="emiratesId"
                          // {...register("emiratesId", {
                          //   required: true,
                          // })}
                          value={emiratesId}
                          onChange={e => setEmiratesId(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  {/* {isRole && <p className="text-danger"> please select role</p>} */}
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
                            <p className="text-danger">
                              Please Enter First Name
                            </p>
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
                            <p className="text-danger">
                              Please Enter Last Name
                            </p>
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
                        {errors.email && errors.email.type === "pattern" && (
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
                          <p className="text-danger">
                            Please Enter phone number
                          </p>
                        )}
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="6">
                        <Form.Group controlId="Gender">
                          <Form.Label className="mt-4">Gender</Form.Label>
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
                      </Col>
                      <Col sm="6">
                        <Form.Group controlId="Nationality">
                          <Form.Label className="mt-2">Nationality</Form.Label>
                          <div>
                            {/* <Select
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
                          </Select> */}

                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="nationality"
                              value={nationality}
                              onChange={e => setNationality(e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="afghan">Afghan</option>
                              <option value="albanian">Albanian</option>
                              <option value="algerian">Algerian</option>
                              <option value="american">American</option>
                              <option value="andorran">Andorran</option>
                              <option value="angolan">Angolan</option>
                              <option value="antiguans">Antiguans</option>
                              <option value="argentinean">Argentinean</option>
                              <option value="armenian">Armenian</option>
                              <option value="australian">Australian</option>
                              <option value="austrian">Austrian</option>
                              <option value="azerbaijani">Azerbaijani</option>
                              <option value="bahamian">Bahamian</option>
                              <option value="bahraini">Bahraini</option>
                              <option value="bangladeshi">Bangladeshi</option>
                              <option value="barbadian">Barbadian</option>
                              <option value="barbudans">Barbudans</option>
                              <option value="batswana">Batswana</option>
                              <option value="belarusian">Belarusian</option>
                              <option value="belgian">Belgian</option>
                              <option value="belizean">Belizean</option>
                              <option value="beninese">Beninese</option>
                              <option value="bhutanese">Bhutanese</option>
                              <option value="bolivian">Bolivian</option>
                              <option value="bosnian">Bosnian</option>
                              <option value="brazilian">Brazilian</option>
                              <option value="british">British</option>
                              <option value="bruneian">Bruneian</option>
                              <option value="bulgarian">Bulgarian</option>
                              <option value="burkinabe">Burkinabe</option>
                              <option value="burmese">Burmese</option>
                              <option value="burundian">Burundian</option>
                              <option value="cambodian">Cambodian</option>
                              <option value="cameroonian">Cameroonian</option>
                              <option value="canadian">Canadian</option>
                              <option value="cape verdean">Cape Verdean</option>
                              <option value="central african">
                                Central African
                              </option>
                              <option value="chadian">Chadian</option>
                              <option value="chilean">Chilean</option>
                              <option value="chinese">Chinese</option>
                              <option value="colombian">Colombian</option>
                              <option value="comoran">Comoran</option>
                              <option value="congolese">Congolese</option>
                              <option value="costa rican">Costa Rican</option>
                              <option value="croatian">Croatian</option>
                              <option value="cuban">Cuban</option>
                              <option value="cypriot">Cypriot</option>
                              <option value="czech">Czech</option>
                              <option value="danish">Danish</option>
                              <option value="djibouti">Djibouti</option>
                              <option value="dominican">Dominican</option>
                              <option value="dutch">Dutch</option>
                              <option value="east timorese">
                                East Timorese
                              </option>
                              <option value="ecuadorean">Ecuadorean</option>
                              <option value="egyptian">Egyptian</option>
                              <option value="emirian">Emirian</option>
                              <option value="equatorial guinean">
                                Equatorial Guinean
                              </option>
                              <option value="eritrean">Eritrean</option>
                              <option value="estonian">Estonian</option>
                              <option value="ethiopian">Ethiopian</option>
                              <option value="fijian">Fijian</option>
                              <option value="filipino">Filipino</option>
                              <option value="finnish">Finnish</option>
                              <option value="french">French</option>
                              <option value="gabonese">Gabonese</option>
                              <option value="gambian">Gambian</option>
                              <option value="georgian">Georgian</option>
                              <option value="german">German</option>
                              <option value="ghanaian">Ghanaian</option>
                              <option value="greek">Greek</option>
                              <option value="grenadian">Grenadian</option>
                              <option value="guatemalan">Guatemalan</option>
                              <option value="guinea-bissauan">
                                Guinea-Bissauan
                              </option>
                              <option value="guinean">Guinean</option>
                              <option value="guyanese">Guyanese</option>
                              <option value="haitian">Haitian</option>
                              <option value="herzegovinian">
                                Herzegovinian
                              </option>
                              <option value="honduran">Honduran</option>
                              <option value="hungarian">Hungarian</option>
                              <option value="icelander">Icelander</option>
                              <option value="indian">Indian</option>
                              <option value="indonesian">Indonesian</option>
                              <option value="iranian">Iranian</option>
                              <option value="iraqi">Iraqi</option>
                              <option value="irish">Irish</option>
                              <option value="israeli">Israeli</option>
                              <option value="italian">Italian</option>
                              <option value="ivorian">Ivorian</option>
                              <option value="jamaican">Jamaican</option>
                              <option value="japanese">Japanese</option>
                              <option value="jordanian">Jordanian</option>
                              <option value="kazakhstani">Kazakhstani</option>
                              <option value="kenyan">Kenyan</option>
                              <option value="kittian and nevisian">
                                Kittian and Nevisian
                              </option>
                              <option value="kuwaiti">Kuwaiti</option>
                              <option value="kyrgyz">Kyrgyz</option>
                              <option value="laotian">Laotian</option>
                              <option value="latvian">Latvian</option>
                              <option value="lebanese">Lebanese</option>
                              <option value="liberian">Liberian</option>
                              <option value="libyan">Libyan</option>
                              <option value="liechtensteiner">
                                Liechtensteiner
                              </option>
                              <option value="lithuanian">Lithuanian</option>
                              <option value="luxembourger">Luxembourger</option>
                              <option value="macedonian">Macedonian</option>
                              <option value="malagasy">Malagasy</option>
                              <option value="malawian">Malawian</option>
                              <option value="malaysian">Malaysian</option>
                              <option value="maldivan">Maldivan</option>
                              <option value="malian">Malian</option>
                              <option value="maltese">Maltese</option>
                              <option value="marshallese">Marshallese</option>
                              <option value="mauritanian">Mauritanian</option>
                              <option value="mauritian">Mauritian</option>
                              <option value="mexican">Mexican</option>
                              <option value="micronesian">Micronesian</option>
                              <option value="moldovan">Moldovan</option>
                              <option value="monacan">Monacan</option>
                              <option value="mongolian">Mongolian</option>
                              <option value="moroccan">Moroccan</option>
                              <option value="mosotho">Mosotho</option>
                              <option value="motswana">Motswana</option>
                              <option value="mozambican">Mozambican</option>
                              <option value="namibian">Namibian</option>
                              <option value="nauruan">Nauruan</option>
                              <option value="nepalese">Nepalese</option>
                              <option value="new zealander">
                                New Zealander
                              </option>
                              <option value="ni-vanuatu">Ni-Vanuatu</option>
                              <option value="nicaraguan">Nicaraguan</option>
                              <option value="nigerien">Nigerien</option>
                              <option value="north korean">North Korean</option>
                              <option value="northern irish">
                                Northern Irish
                              </option>
                              <option value="norwegian">Norwegian</option>
                              <option value="omani">Omani</option>
                              <option value="pakistani">Pakistani</option>
                              <option value="palauan">Palauan</option>
                              <option value="panamanian">Panamanian</option>
                              <option value="papua new guinean">
                                Papua New Guinean
                              </option>
                              <option value="paraguayan">Paraguayan</option>
                              <option value="peruvian">Peruvian</option>
                              <option value="polish">Polish</option>
                              <option value="portuguese">Portuguese</option>
                              <option value="qatari">Qatari</option>
                              <option value="romanian">Romanian</option>
                              <option value="russian">Russian</option>
                              <option value="rwandan">Rwandan</option>
                              <option value="saint lucian">Saint Lucian</option>
                              <option value="salvadoran">Salvadoran</option>
                              <option value="samoan">Samoan</option>
                              <option value="san marinese">San Marinese</option>
                              <option value="sao tomean">Sao Tomean</option>
                              <option value="saudi">Saudi</option>
                              <option value="scottish">Scottish</option>
                              <option value="senegalese">Senegalese</option>
                              <option value="serbian">Serbian</option>
                              <option value="seychellois">Seychellois</option>
                              <option value="sierra leonean">
                                Sierra Leonean
                              </option>
                              <option value="singaporean">Singaporean</option>
                              <option value="slovakian">Slovakian</option>
                              <option value="slovenian">Slovenian</option>
                              <option value="solomon islander">
                                Solomon Islander
                              </option>
                              <option value="somali">Somali</option>
                              <option value="south african">
                                South African
                              </option>
                              <option value="south korean">South Korean</option>
                              <option value="spanish">Spanish</option>
                              <option value="sri lankan">Sri Lankan</option>
                              <option value="sudanese">Sudanese</option>
                              <option value="surinamer">Surinamer</option>
                              <option value="swazi">Swazi</option>
                              <option value="swedish">Swedish</option>
                              <option value="swiss">Swiss</option>
                              <option value="syrian">Syrian</option>
                              <option value="taiwanese">Taiwanese</option>
                              <option value="tajik">Tajik</option>
                              <option value="tanzanian">Tanzanian</option>
                              <option value="thai">Thai</option>
                              <option value="togolese">Togolese</option>
                              <option value="tongan">Tongan</option>
                              <option value="trinidadian or tobagonian">
                                Trinidadian or Tobagonian
                              </option>
                              <option value="tunisian">Tunisian</option>
                              <option value="turkish">Turkish</option>
                              <option value="tuvaluan">Tuvaluan</option>
                              <option value="ugandan">Ugandan</option>
                              <option value="ukrainian">Ukrainian</option>
                              <option value="uruguayan">Uruguayan</option>
                              <option value="uzbekistani">Uzbekistani</option>
                              <option value="venezuelan">Venezuelan</option>
                              <option value="vietnamese">Vietnamese</option>
                              <option value="welsh">Welsh</option>
                              <option value="yemenite">Yemenite</option>
                              <option value="zambian">Zambian</option>
                              <option value="zimbabwean">Zimbabwean</option>
                            </select>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Form.Group controlId="Password">
                          <Form.Label className="mt-2">
                            Password<sup className="text-danger">*</sup>
                          </Form.Label>

                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <input
                              style={{
                                //width: "433px",
                                height: "36px",
                                border: "1px solid #ced4da",
                                borderRadius: "5px",
                              }}
                              className="form-control"
                              type={isRevealPwd ? "text" : "password"}
                              name="password"
                              placeholder="Enter Password"
                              {...register("password")}
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
                                isRevealPwd ? "Hide password" : "Show password"
                              }
                              src={isRevealPwd ? hidePwdImg : showPwdImg}
                              onClick={() =>
                                setIsRevealPwd(prevState => !prevState)
                              }
                            />
                            {/* <div>{errors?.password?.message}</div> */}
                          </div>
                        </Form.Group>
                        <p className="text-danger">
                          {errors.password?.message}
                        </p>

                        {/* <div className="Button">
                          <button type="submit">Submit</button>
                        </div> */}

                        {/* <Form.Group controlId="Password">
                        <Form.Label className="mt-2">
                          Password<sup className="text-danger">*</sup>
                        </Form.Label>
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
                      {!password &&
                        errors.password &&
                        errors.password.type === "required" && (
                          <p className="text-danger">Please Enter password</p>
                        )}
                      {errors.password &&
                        errors.password.type === "pattern" && (
                          <p className="text-danger">Invalid password</p>
                        )} */}
                      </Col>
                      <Col sm="6">
                        {/* <Form.Group controlId="Repeat Password">
                        <Form.Label className="mt-2">
                          Repeat Password<sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group> */}
                        <Form.Group controlId="Password">
                          <Form.Label className="mt-2">
                            Confirm Password<sup className="text-danger">*</sup>
                          </Form.Label>
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <input
                              style={{
                                height: "36px",
                                border: "1px solid #ced4da",
                                borderRadius: "5px",
                              }}
                              className="form-control"
                              type={isRevealPwd ? "text" : "password"}
                              name="cpassword"
                              placeholder="Enter Confirm Password"
                              {...register("cpassword")}
                              value={cpassword}
                              onChange={e => setCPassword(e.target.value)}
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
                                isRevealPwd ? "Hide password" : "Show password"
                              }
                              src={isRevealPwd ? hidePwdImg : showPwdImg}
                              onClick={() =>
                                setIsRevealPwd(prevState => !prevState)
                              }
                            />
                          </div>
                        </Form.Group>
                        <p className="text-danger">
                          {errors.cpassword?.message}
                        </p>
                      </Col>
                    </Row>
                    <br />
                    <h5>Professional Information</h5>
                    <br />
                    <Row>
                      <Col sm="6">
                        <Form.Group controlId="Speciality">
                          <Form.Label>
                            Speciality<sup className="text-danger">*</sup>
                          </Form.Label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={speciality}
                            onChange={e => {
                              setSpeciality(e.target.value)
                              setIsSpeciality(false)
                            }}
                          >
                            {options.map(value => (
                              <option value={value} key={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </Form.Group>

                        {isSpeciality && (
                          <p className="text-danger">
                            {" "}
                            Please select speciality
                          </p>
                        )}
                      </Col>

                      <Col sm="6">
                        <Form.Group controlId="Clinic Name">
                          <Form.Label>Clinic Name</Form.Label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={clinicName}
                            onChange={e => setClinicName(e.target.value)}
                          >
                            <option>Select</option>
                            {clinics.map(value => (
                              <option value={value.address} key={value.address}>
                                {value.address}
                              </option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Form.Group controlId="Total Experience">
                          <Form.Label className="mt-2">
                            Total Experience
                          </Form.Label>

                          <textarea
                            className="form-control mb-4"
                            id="exampleFormControlTextarea1"
                            value={totalExperience}
                            onChange={e => setTotalExperience(e.target.value)}
                          ></textarea>
                          {/* <textarea
                              className="form-control mb-4"
                              id="exampleFormControlTextarea1"
                              rows="4"
                              value={content}
                              onChange={e => setContent(e.target.value)}
                            ></textarea> */}
                        </Form.Group>
                      </Col>
                      <Col sm="6">
                        <Form.Group controlId="Profile">
                          <Form.Label className="mt-2">Profile</Form.Label>

                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={profile}
                            onChange={e => setProfile(e.target.value)}
                          ></textarea>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Form.Group controlId="Certifications">
                          <Form.Label className="mt-2">
                            Certifications
                          </Form.Label>

                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={certifications}
                            onChange={e => setCertifications(e.target.value)}
                          ></textarea>
                        </Form.Group>
                      </Col>
                      <Col sm="6">
                        <Form.Group controlId="Education">
                          <Form.Label className="mt-2">Education</Form.Label>

                          <textarea
                            className="form-control"
                            id="floatingTextarea"
                            value={education}
                            onChange={e => setEducation(e.target.value)}
                          ></textarea>
                        </Form.Group>
                      </Col>
                    </Row>

                    <br />
                    <Button
                      onClick={e => {
                        handleSubmit(postData(e))
                      }}
                      type="submit"
                      color="primary"
                      className="btn btn-primary m-2 "
                    >
                      <span onClick={handleValidation}>Add New Doctor</span>
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
        </div>
      )}
    </>
  )
}
export default CreateDoctor
