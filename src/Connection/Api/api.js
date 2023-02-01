import axios from "axios"
// import url from "./API/api"

//let url = "https://appolonia-api-uat.herokuapp.com"
// let url = "http://localhost:3001"
let url = "http://doctors.appolonia.ae:7051"

const instance = axios.create({
  baseURL: url,
})

instance.interceptors.request.use(
  async config => {
    const token = sessionStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default url
