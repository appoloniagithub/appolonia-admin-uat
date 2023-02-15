import axios from "axios"
import url from "./Api/api"

const getAllArticles = async () => {
  let res = await axios.get(`${url}/api/library/getarticles`)

  console.log(res)
  return res
}

const getSingleArticle = async data => {
  let res = await axios.post(`${url}/api/library/getsinglearticle`, data)

  console.log(res)
  return res
}

const updateArticle = async data => {
  let res = await axios.put(`${url}/api/library/updatearticle`, data)

  console.log(res)
  return res
}
const deleteArticle = async data => {
  let res = await axios.post(`${url}/api/library/deletearticle`, data)

  console.log(res)
  return res
}
export { getAllArticles, getSingleArticle, updateArticle, deleteArticle }
