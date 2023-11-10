import { React, useState } from "react"
import { Container } from "reactstrap"
import { Link } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
const moment = require("moment")
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap"
import { deleteArticle } from "Connection/Libraries"
import Showlibrary from "../Showlibrary"
import Modal from "../Modal"
import DialogModal from "../Modal"
import url from "Connection/Api/api"
const Librarytable = ({ data }) => {
  console.log(data)
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [selectedLibrary, setSelectedLibrary] = useState()
  const [openShowLibrary, setOpenShowLibrary] = useState(false)
  const [image, setImage] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const handleSelectLibrary = libraryData => {
    console.log(libraryData, "lib data")
    setSelectedLibrary(libraryData)
    handleOpenShowLibrary()
  }

  const handleOpenShowLibrary = () => {
    console.log("clicked")
    setOpenShowLibrary(!openShowLibrary)
  }
  const handleClickOpen = delId => {
    setOpen(true)
    setDeleteId(delId)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const deleteData = async id => {
    console.log(id, "in delete")
    await deleteArticle({ articleId: id }).then(res => {
      console.log(res)
      history.push("/library")
      window.location.reload()
    })
  }
  console.log(selectedLibrary, "selected library")
  return (
    <div>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  {/* <th>Description</th> */}
                  <th>Author</th>
                  <th>Date</th>

                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(article => {
                  return (
                    <tr key={article?._id}>
                      <td>
                        {/* <a href={article.image[0]}> */}
                        <img
                          src={`${url}/api/${article?.image[0]}`}
                          width="100"
                          height="100"
                        />
                        {/* </a> */}
                      </td>
                      <td
                        style={{
                          width: "300px",
                          overflowY: "hidden",
                        }}
                      >
                        {article.title}
                      </td>
                      {/* <td>{article.description}</td> */}
                      <td>{article.author.authorName}</td>
                      <td>
                        {" "}
                        {moment(article.created).format("DD-MM-YY HH:mm")}
                      </td>
                      {/* <td>
                        {moment(article.created).format("DD-MM-YY HH:mm")}
                      </td> */}

                      <td>
                        <Link to={`/library/showlibrary/${article?._id}`}>
                          <Button
                            onClick={() => handleSelectLibrary(article)}
                            color="primary"
                            className="btn btn-primary "
                          >
                            View
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/library/edit-article/${article?._id}`}>
                          <i
                            className="mdi mdi-square-edit-outline"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          onClick={() => handleClickOpen(article?._id)}
                          className="mdi mdi-delete-outline"
                          style={{ fontSize: "18px" }}
                        ></i>

                        {/* <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to delete?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              className="btn btn-primary m-2 "
                              color="primary"
                              onClick={handleClose}
                            >
                              CANCEL
                            </Button>
                            <Button
                              className="btn btn-primary m-2 "
                              color="primary"
                              onClick={() => deleteData(article?._id)}
                            >
                              {console.log(article?._id, "test")}
                              DELETE
                            </Button>
                          </DialogActions>
                        </Dialog> */}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <DialogModal
              open={open}
              handleClose={() => handleClose()}
              deleteData={id => deleteData(id)}
              articleId={deleteId}
            />
            <div>
              {openShowLibrary && (
                <Showlibrary
                  open={openShowLibrary}
                  handleOpen={handleOpenShowLibrary}
                  data={selectedLibrary}
                  //handleGetConversation={handleGetConversation}
                />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Librarytable
