import React, { useEffect, useState } from "react"
import { getSingleArticle } from "Connection/Libraries"
import { Row, Col } from "reactstrap"
import { useHistory, useLocation } from "react-router"
import url from "Connection/Api/api"
const moment = require("moment")

export default function Showlibrary() {
  let history = useHistory()
  const [data, setData] = useState("")
  const [image, setImage] = useState("")
  useEffect(() => {
    console.log(location, "article loc")
    let splitData = location.pathname.split("/")
    console.log(splitData, "article split")
    if (splitData && splitData.length === 4) {
      let articleId = splitData[3]
      console.log(articleId)
      //setId(articleId)
      getSingleArticle({ articleId }).then(async res => {
        console.log(res.data.data.article)
        setData(res.data.data.article)
        setImage(res.data.data.article.image[0])
      })
    }
  }, [])
  const handleClose = () => {
    history.push("/library")
  }
  console.log(data)
  const stripHtmlTags = html => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }
  const strippedContent = stripHtmlTags(data.content)

  console.log(strippedContent)
  return (
    <>
      <div className="form-wrapper">
        <Row>
          <div className="border border-secondary rounded">
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

              <h5 className="mt-2 text-light">Article Details</h5>
            </div>
          </div>
        </Row>
        <br />
        <section style={{ padding: "0 25%" }}>
          <h1 style={{ fontSize: "25px" }} className="text-primary pt-4 pb-4">
            {data.title}
          </h1>

          <img src={`${url}/api/${image}`} width="700" height="500" />

          <h5 className="pt-4 pb-4">
            {moment(data.created).format("MMM Do YYYY, h:mm a")}
          </h5>
          <div
            style={{
              fontSize: "18px",
              color: "#707070",
              fontWeight: "300",
              lineHeight: "2",
            }}
          >
            {strippedContent}
          </div>
        </section>
      </div>
    </>
  )
}
