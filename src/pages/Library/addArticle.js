import React, { useState, useEffect, useRef } from "react"
import { Row, Col, Spinner } from "reactstrap"
import { useHistory } from "react-router-dom"
import Divider from "@mui/material/Divider"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import url from "Connection/Api/api"
import axios from "axios"
import { toast } from "react-toastify"
import JoditEditor from "jodit-react"

const CreateArticle = props => {
  const editor = useRef(null)
  const [content, setContent] = useState("")
  let history = useHistory()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [date, setDate] = useState("")
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [loading, setLoading] = useState()
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
    if (sessionStorage.getItem("firstName")) {
      const firstName = sessionStorage.getItem("firstName")
      console.log(firstName)
      setFName(firstName)
    }
    if (sessionStorage.getItem("lastName")) {
      const lastName = sessionStorage.getItem("lastName")
      console.log(lastName)
      setLName(lastName)
    }
    setAuthorName(`${fName} ${lName}`)
  }, [fName, lName])

  const postData = e => {
    e.preventDefault()
    setLoading("adding")
    var formdata = new FormData()
    formdata.append("title", title)
    formdata.append("content", content)
    formdata.append("image", image)
    formdata.append("authorName", authorName)
    //formdata.append("authorImage", "img")
    formdata.append("date", date)
    console.log(formdata)
    axios.post(`${url}/api/library/addarticle`, formdata).then(res => {
      setTitle("")
      setContent("")
      setImage("")
      setAuthorName("")
      setDate("")
      console.log(res)
      console.log(res.data.success)

      if (res.data.data.success === 1) {
        history.push("/library")
        toast.success("Article added")
      }
    })
  }
  const stripHtmlTags = html => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }
  const strippedContent = stripHtmlTags(content)

  console.log(strippedContent)
  console.log(image, "image")
  return (
    <>
      {loading === "adding" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <p>Your article is being added.</p>
          <Spinner className="ms-2" color="primary" />
        </div>
      ) : (
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
                  <h5>Add New Article</h5>
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
                      <Button
                        color="primary"
                        className="btn btn-primary m-2"
                        onClick={handleClick}
                      >
                        CHOOSE FILE
                      </Button>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      &nbsp; <span>{image.name}</span>
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

                  <Button
                    type="submit"
                    color="primary"
                    className="btn btn-primary m-2 "
                    onClick={e => {
                      postData(e)
                    }}
                  >
                    Add Article
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
      )}
    </>
  )
}

export default CreateArticle
