import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import User from "../pages/Authentication/User"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Showpatient from "../pages/Patients/Showpatient"
import Allpatients from "../pages/Patients/index"
import PatientDetails from "pages/Patients/Components/PatientDetails"
import Alldoctors from "pages/Doctors/index"
import CreateDoctor from "../pages/Doctors/addDoctor"
import EditDoctor from "pages/Doctors/updateDoctor"
import DelDoctor from "pages/Doctors/deleteDoctor"
import Menubar from "components/HorizontalLayout/Menubar"
import Fullscreen from "pages/Patients/fullscreen"
import Zoom from "pages/Patients/zoom"
import Thumbnail from "pages/Patients/thumbnail"
import Library from "pages/Library"
import Allarticles from "pages/Library"
import CreateArticle from "pages/Library/addArticle"
import EditArticle from "pages/Library/updateArticle"
import Showlibrary from "pages/Library/Showlibrary"
import EditPatient from "pages/Patients/updatePatient"
import EditProfile from "pages/Authentication/edit-profile"
import Allappointments from "pages/Appointments/index"
import Showappointment from "pages/Appointments/Showappointment"
import Editappointment from "pages/Appointments/Editappointment"
import Createappointment from "pages/Appointments/Createappointment"
import SendNotification from "pages/Notification"
import Existing from "pages/Appointments/Existing"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // {
  //   path: "/menubar",
  //   component: props => <Menubar {...props} />,
  // },

  {
    path: "/patients",
    component: props => <Allpatients {...props} />,
  },
  {
    path: "/patients/showpatient/:id",
    component: props => <PatientDetails {...props} />,
  },
  {
    path: "/patients/edit-patient/:id",
    component: props => <EditPatient {...props} />,
  },

  { path: "/doctors", component: Alldoctors },
  {
    path: "/doctors/create-doctor",
    component: props => <CreateDoctor {...props} />,
  },
  {
    path: "/doctors/edit-doctor/:id",
    component: props => <EditDoctor {...props} />,
  },
  {
    path: "/doctors/delete-doctor/:id",
    component: props => <DelDoctor {...props} />,
  },
  { path: "/library", component: Allarticles },
  {
    path: "/library/create-article",
    component: props => <CreateArticle {...props} />,
  },
  {
    path: "/library/edit-article/:id",
    component: props => <EditArticle {...props} />,
  },
  {
    path: "/library/showlibrary/:id",
    component: props => <Showlibrary {...props} />,
  },
  //appointments
  {
    path: "/appointments",
    component: props => <Allappointments {...props} />,
  },
  {
    path: "/appointments/create-appointment",
    component: props => <Createappointment {...props} />,
  },
  {
    path: "/appointments/viewappointment/:id",
    component: props => <Showappointment {...props} />,
  },
  {
    path: "/appointments/edit-appointment/:id",
    component: props => <Editappointment {...props} />,
  },
  {
    path: "/appointments/existing",
    component: props => <Existing {...props} />,
  },
  {
    path: "/send-notification",
    component: props => <SendNotification {...props} />,
  },
  // //profile
  { path: "/profile", component: UserProfile },
  { path: "/profile/edit-profile/:id", component: EditProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/users", component: User },
  { path: "/fullscreen", component: Fullscreen },
  { path: "/zoom", component: Zoom },
  { path: "/thumbnail", component: Thumbnail },
]

export { publicRoutes, authProtectedRoutes }
