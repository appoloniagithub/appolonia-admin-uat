import axios from "axios"
import url from "./Api/api"

const getAllAppointments = async () => {
  let res = await axios.get(`${url}/api/user/getallappointments`)

  console.log(res)
  return res
}
const confirmBooking = async data => {
  let res = await axios.post(`${url}/api/user/confirmbooking`, data)

  console.log(res)
  return res
}

const getAppointmentById = async data => {
  let res = await axios.post(`${url}/api/user/getappointmentbyid`, data)

  console.log(res)
  return res
}

const createBooking = async data => {
  let res = await axios.post(`${url}/api/user/createbooking`, data)

  console.log(res)
  return res
}

const newBooking = async data => {
  let res = await axios.post(`${url}/api/user/newbooking`, data)

  console.log(res)
  return res
}

const updateBooking = async data => {
  let res = await axios.post(`${url}/api/user/updatebooking`, data)

  console.log(res)
  return res
}

const deleteBooking = async data => {
  let res = await axios.post(`${url}/api/user/deletebooking`, data)

  console.log(res)
  return res
}
const cancelBooking = async data => {
  let res = await axios.post(`${url}/api/user/cancelbooking`, data)

  console.log(res)
  return res
}
const getBookingData = async () => {
  let res = await axios.get(`${url}/api/user/getbookingdata`)

  console.log(res)
  return res
}

const getAllBookings = async () => {
  let res = await axios.post(`${url}/api/user/getallbookings`, data)

  console.log(res)
  return res
}

const pendingAppointments = async () => {
  let res = await axios.get(`${url}/api/user/pending`)

  console.log(res)
  return res
}

export {
  getAllAppointments,
  confirmBooking,
  getAppointmentById,
  createBooking,
  newBooking,
  updateBooking,
  deleteBooking,
  getBookingData,
  getAllBookings,
  pendingAppointments,
  cancelBooking,
}
