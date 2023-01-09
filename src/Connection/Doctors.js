import axios from "axios"
import url from "./Api/api"

const getAllDoctors = async () => {
  let res = await axios.get(`${url}/api/doctors/getalldoctors`)

  console.log(res)
  return res
}
const getDoctorById = async data => {
  let res = await axios.post(`${url}/api/doctors/getDoctorById`, data)

  console.log(res, "in res")
  return res
}

const addDoctor = async data => {
  let res = await axios.post(`${url}/api/doctors/createdoctor`, data)

  console.log(res)
  return res
}
const updateDoctor = async data => {
  let res = await axios.put(`${url}/api/doctors/updatedoctor`, data)

  console.log(res)
  return res
}

const deleteDoctor = async data => {
  let res = await axios.post(`${url}/api/doctors/deletedoctor`, data)

  console.log(res)
  return res
}

export { getAllDoctors, addDoctor, updateDoctor, deleteDoctor, getDoctorById }
