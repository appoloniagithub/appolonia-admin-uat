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

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/patients", component: Allpatients },
  {
    path: "/patients/showpatient/:id",
    component: props => <PatientDetails {...props} />,
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
  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/users", component: User },
]

export { publicRoutes, authProtectedRoutes }
