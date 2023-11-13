import React, { useState, useEffect } from "react"
import { Row, Col, Spinner } from "reactstrap"
import { useHistory } from "react-router-dom"
import Divider from "@mui/material/Divider"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import url from "Connection/Api/api"
import axios from "axios"
import { toast } from "react-toastify"
import Footer from "components/HorizontalLayout/Footer"
import { Editor } from "@tinymce/tinymce-react"
//import TinyMCE from "react-tinymce"

const CreateArticle = props => {
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
  }, [])
  const postData = e => {
    e.preventDefault()
    setLoading("adding")
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
                  <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    {/* <div>
                    <label htmlFor="content">Description:</label>

                    <Editor
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      tinymceScriptSrc={
                        process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                      }
                      id="content"
                      apiKey="lr6omlalxf5cdr3r7iwodlyvf16622x2xrosm5odqburg1tf"
                      init={{
                        height: 300,
                        plugins: [
                          "a11ychecker advcode advlist advtable anchor autocorrect autosave editimage image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify lineheight | removeformat | link ",
                        menubar: false,
                        block_formats:
                          "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3",
                        content_style: `
            body {
              font-family: Arial, sans-serif;
              margin: 12px;
            }
            h1, h2, h3, p {
              color: #4D66CB;
              margin: 10px;
            }
            `,
                      }}
                    />
                  </div> */}

                    <textarea
                      className="form-control mb-4"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    {/* <Form.Control
                    className="mb-4"
                    style={{ lineHeight: "9.5" }}
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    name="Description"
                  /> */}
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
                      disabled
                      value={`${fName} ${lName}`}
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
