import { useHistory, useLocation } from "react-router"
import React, { useState, useEffect, useRef } from "react"
import { Row, Col } from "reactstrap"
import JoditEditor from "jodit-react"
import Divider from "@mui/material/Divider"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { getSingleArticle } from "Connection/Libraries"
import { updateArticle } from "Connection/Libraries"
import url from "Connection/Api/api"
import axios from "axios"
import { toast } from "react-toastify"

const EditArticle = () => {
  const editor = useRef(null)
  let history = useHistory()
  const location = useLocation()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [date, setDate] = useState("")
  const [id, setId] = useState("")

  const handleClose = () => {
    history.push("/library")
  }
  const hiddenFileInput = React.useRef(null)

  const handleChange = event => {
    setImage(event.target.files[0])
  }

  const handleClick = event => {
    hiddenFileInput.current.click()
  }
  useEffect(() => {
    console.log(location, "article loc")
    let splitData = location.pathname.split("/")
    console.log(splitData, "article split")
    if (splitData && splitData.length === 4) {
      let articleId = splitData[3]
      console.log(articleId)
      setId(articleId)
      getSingleArticle({ articleId }).then(async res => {
        console.log(res.data.data.article)
        if (res.data.data.article) {
          setTitle(res.data.data.article.title)
          setContent(res.data.data.article.content)
          //setDescription(window.tinymce.activeEditor.setDescription(""))

          setImage(res.data.data.article.image[0])
          setAuthorName(res.data.data.article.author.authorName)
          setDate(res.data.data.article.date)
        } else {
          console.log("no article found")
        }
      })
    }
  }, [])

  const updateData = async () => {
    console.log(typeof image)
    let reqObj
    if (typeof image === "object") {
      var formdata = new FormData()
      formdata.append("_id", id)
      formdata.append("title", title)
      formdata.append("content", content)
      formdata.append("image", image)
      formdata.append("authorName", authorName)
      //formdata.append("authorImage", "img")
      formdata.append("date", date)
      console.log(formdata)
      reqObj = formdata
    } else {
      let updateImage = [image]
      let tempObj = {
        _id: id,
        title,
        content,
        image: updateImage,
        authorName,
        date,
      }
      console.log(tempObj, "temp")
      reqObj = tempObj
    }

    await updateArticle(reqObj)
      .then(res => {
        console.log(res)
        history.push("/library")
        toast.success("Article successfully updated")
      })
      .catch(err => {
        toast.error("Error while updating a article")
      })
  }

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
        <Row>
          <Col>
            <div className="">
              <div className="justify-content-between m-4">
                <h5>Edit Article</h5>
                <Divider style={{ border: "0.5px solid" }} />
                <br />
                <Form.Group controlId="Title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    name="title"
                    autoFocus
                  />
                </Form.Group>
                {/* <Form.Group controlId="Content">
                  <Form.Label>Content</Form.Label>

                  <textarea
                    className="form-control mb-4"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  ></textarea>
                </Form.Group> */}
                <Form.Group controlId="Content">
                  <Form.Label>Content</Form.Label>

                  <JoditEditor
                    className="mb-4"
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)}
                  />
                </Form.Group>
                <Form.Group controlId="Image">
                  <Form.Label>Image</Form.Label>
                  <div>
                    <img
                      className="m-2"
                      src={`${url}/api/${image}`}
                      width="100"
                      height="100"
                    />
                    <div>
                      <Button
                        color="primary"
                        className="btn btn-primary m-2"
                        onClick={handleClick}
                      >
                        CHOOSE FILE
                      </Button>
                    </div>
                    <input
                      type="file"
                      //value={image}
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="Author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="mb-4"
                    type="text"
                    name="Author"
                  />
                </Form.Group>
                {/* <Form.Group controlId="Date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    name="Date"
                  />
                </Form.Group> */}

                <Button
                  type="submit"
                  color="primary"
                  className="btn btn-primary m-2 "
                  onClick={updateData}
                >
                  Update Article
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
          </Col>
        </Row>
      </div>
    </>
  )
}
export default EditArticle
