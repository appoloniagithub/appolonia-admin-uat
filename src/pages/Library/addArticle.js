import React, { useState } from "react"
import { Row, Col } from "reactstrap"
import { useHistory } from "react-router-dom"
import Divider from "@mui/material/Divider"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import url from "Connection/Api/api"
import axios from "axios"
import { toast } from "react-toastify"
import Footer from "components/HorizontalLayout/Footer"

const CreateArticle = props => {
  let history = useHistory()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [date, setDate] = useState("")

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
  const postData = () => {
    var formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("image", image)
    formdata.append("authorName", authorName)
    //formdata.append("authorImage", "img")
    formdata.append("date", date)
    console.log(formdata)
    axios.post(`${url}/api/library/addarticle`, formdata).then(res => {
      setTitle("")
      setDescription("")
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
  console.log(image, "image")
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
                <Form.Group controlId="Description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    className="mb-4"
                    style={{ lineHeight: "9.5" }}
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    name="Description"
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
                <Form.Group controlId="Date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    name="Date"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  color="primary"
                  className="btn btn-primary m-2 "
                  onClick={postData}
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
    </>
  )
}

export default CreateArticle
