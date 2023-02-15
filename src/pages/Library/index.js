import React, { useEffect, useState } from "react"
import { Container, Spinner } from "reactstrap"
import { getAllArticles } from "Connection/Libraries"
import { ToastContainer, toast } from "react-toastify"
import Librarytable from "./Components/Librarytable"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"

const Allarticles = () => {
  //meta title
  document.title = "Library | Appolonia Dental Care"
  let [articles, setArticles] = useState([])

  let handleGetAllArticles = async () => {
    let res = await getAllArticles()
    console.log(res)
    try {
      if (res.data.data.success === 1) {
        console.log(res.data.data.articles)
        setArticles(res.data.data.articles)
      }
    } catch (err) {
      toast.error(res.data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  useEffect(() => {
    handleGetAllArticles()
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="d-flex justify-content-between">
          <h4 style={{ paddingLeft: "30px" }}>Library</h4>

          <Link to="/library/create-article">
            <Button color="primary" className="btn btn-primary mr-4">
              Add Article
            </Button>
          </Link>
        </div>
        <br />
        {articles?.length === 0 && <Spinner className="ms-2" color="primary" />}
        {articles?.length > 0 && <Librarytable data={articles} />}
      </div>
    </React.Fragment>
  )
}

export default Allarticles
