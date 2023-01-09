import axios from "axios"
import url from "./Api/api"

const getAllPatients = async () => {
  let res = await axios.get(`${url}/api/patient/getallpatients`)

  console.log(res)
  return res
}
const getPatientById = async data => {
  let res = await axios.post(`${url}/api/patient/getpatient`, data)

  console.log(res)
  return res
}

const getPatientScans = async data => {
  let res = await axios.post(`${url}/api/scans/getmyscans`, data)

  console.log(res)
  return res
}

const getConversations = async data => {
  let res = await axios.post(`${url}/api/chat/getconversations`, data)

  console.log(res)
  return res
}

const getConversationMessages = async data => {
  let res = await axios.post(`${url}/api/chat/getconversationmessages`, data)

  console.log(res)
  return res
}

const newMessage = async data => {
  let res = await axios.post(`${url}/api/chat/newmessage`, data)

  console.log(res)
  return res
}

const addNewNote = async data => {
  let res = await axios.post(`${url}/api/patient/addpatientnotes`, data)

  console.log(res)
  return res
}

const getNotes = async data => {
  console.log(data)
  let res = await axios.post(`${url}/api/patient/getnotes`, data)

  console.log(res)
  return res
}

const getAllDoctors = async data => {
  console.log(data)
  let res = await axios.post(`${url}/api/user/getalldoctors`, data)

  console.log(res)
  return res
}

export {
  getAllPatients,
  getPatientById,
  getPatientScans,
  getConversations,
  getConversationMessages,
  addNewNote,
  getNotes,
  newMessage,
  getAllDoctors,
}
