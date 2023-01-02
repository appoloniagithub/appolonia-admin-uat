import React, { useEffect, useState, useRef } from "react"
import moment from "moment"
import { Button, Card, Col, Row, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { newMessage } from "../../../Connection/Patients"
import { io } from "socket.io-client"

const Chat = ({
  patientMessages,
  patientInfo,
  patientConversation,
  handleGetPatientConversation,
}) => {
  //meta title
  document.title = "Patient View | Appolonia Dental Care"

  const [messageBox, setMessageBox] = useState(null)
  const [curMessage, setCurMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)
  const socket = useRef()
  const scroll = useRef()

  useEffect(() => {
    setChatMessages(patientMessages)
  }, [patientMessages])

  //connect to Socket.io
  useEffect(() => {
    socket.current = io("https://socket-uat.herokuapp.com/", {
      transports: ["websocket"],
    })
    socket.current.emit("new-user-add", "6351452835155fec28aa67b1")
    socket.current.on("get-users", users => {
      console.log(users, "connected users")
    })
  }, [])

  // Send Message
  const handleSend = async e => {
    e.preventDefault()
    const message = {
      senderId: "6351452835155fec28aa67b1",
      receiverId: patientInfo?.patientId,
      message: curMessage,
      conversationId: patientConversation?.conversationId,
      format: "text",
      scanId: "",
      createdAt: moment(Date.now()).format("DD-MM-YY hh:mm"),
    }
    console.log(patientInfo?.patientId)
    // send message to socket server
    setSendMessage({ ...message })
    //setSendMessage(Object.assign(message))
    // send message to database
    try {
      let res = await newMessage({
        conversationId: patientConversation?.conversationId,
        senderId: "6351452835155fec28aa67b1",
        message: curMessage,
        format: "text",
        scanId: "",
      })

      setChatMessages([...chatMessages, res.data])
      setCurMessage("")
      if (res.data.data.success === 1) {
        handleGetPatientConversation()
      } else {
        toast.error(res.data.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } catch (err) {
      console.log("error")
    }
  }
  //Send message to socket server
  useEffect(() => {
    console.log(sendMessage, "send message in useeffect")
    if (sendMessage !== null) {
      socket.current.emit(
        "send-message",
        sendMessage,
        patientConversation?.conversationId
      )
    }
  }, [sendMessage])

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", data => {
      console.log(data,"in receive-f")
      setReceivedMessage(data.message)
    })
  }, [])

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage)
    if (
      receivedMessage !== null &&
      receivedMessage.conversationId === patientConversation?.conversationId
    ) {
      setChatMessages([...chatMessages, receivedMessage])
    }
  }, [receivedMessage])

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900")

  //   socket.current.on("getMessage", data => {
  //     console.log("get message", data)
  //     setArrivalMessage(data.message)
  //   })
  // }, [])

  // useEffect(() => {
  //   setChatMessages(prev => [...prev, arrivalMessage])
  // }, [arrivalMessage])

  // useEffect(() => {
  //   socket.current.emit("addUser", "6351452835155fec28aa67b1")
  //   socket.current.on("getUsers", users => {
  //     console.log(users, "connected users")
  //   })
  // }, [])

  // const sendMessage = async e => {
  //   e.preventDefault()
  //   setcurMessage("")
  //   setChatMessages(prev => [...prev, curMessage])

  //   socket.current.emit("sendMessage", {
  //     senderId: "6351452835155fec28aa67b1",
  //     receiverId: patientInfo?.patientId,
  //     message: curMessage,
  //   })

  //   let res = await newMessage({
  //     conversationId: patientConversation?.conversationId,
  //     senderId: "6351452835155fec28aa67b1",
  //     message: curMessage,
  //     format: "text",
  //     scanId: "",
  //   })
  //   setChatMessages([...chatMessages, res.data])
  //   setcurMessage("")
  //   console.log(res)
  //   if (res.data.data.success === 1) {
  //     handleGetPatientConversation()
  //   } else {
  //     toast.error(res.data.data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     })
  //   }
  // }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  return (
    <div className="w-100 user-chat border border-secondary rounded ">
      <Card>
        <div
          style={{ backgroundColor: "#20507B", color: "white" }}
          className="p-3 "
        >
          <Row>
            <Col md="4" xs="9">
              <h5 className="font-size-15 mb-1 text-light">{`Chat`}</h5>
            </Col>
          </Row>
        </div>

        <div>
          <div className="chat-conversation p-3">
            <ul className="list-unstyled">
              <PerfectScrollbar
                style={{ height: "470px" }}
                containerRef={ref => setMessageBox(ref)}
              >
                <li>
                  <div className="chat-day-title">
                    <span className="title">Today</span>
                  </div>
                </li>
                {patientMessages?.length === 0 && <p>No Messages found</p>}
                {patientMessages &&
                  patientMessages.map((message, i) => (
                    <li
                      key={"test_k" + i}
                      className={
                        message.senderId !== patientInfo?.patientId
                          ? "right"
                          : ""
                      }
                    >
                      {message.format === "image" ? (
                        <div className="ctext-wrap">
                          <div className="conversation-name">
                            {message.sender}
                          </div>
                          <img
                            style={{ width: "40px" }}
                            className=""
                            src={message.message}
                            onClick={() =>
                              window.open(
                                message.message,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                          />
                          <p className="chat-time mb-0">
                            <i className="bx bx-time-five align-middle me-1" />
                            {moment(message.createdAt).format("DD-MM-YY hh:mm")}
                          </p>
                        </div>
                      ) : (
                        <div className="conversation-list">
                          <div className="ctext-wrap">
                            <div className="conversation-name">
                              {message.sender}
                            </div>
                            <p>{message.message}</p>
                            <p className="chat-time mb-0">
                              <i className="bx bx-time-five align-middle me-1" />
                              {moment(message.createdAt).format(
                                "DD-MM-YY hh:mm"
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
              </PerfectScrollbar>
            </ul>
          </div>
          <div className="p-3 chat-input-section">
            <Row>
              <Col>
                <div className="position-relative">
                  <input
                    type="text"
                    value={curMessage}
                    onChange={e => setCurMessage(e.target.value)}
                    className="form-control chat-input"
                    placeholder="Enter Message..."
                  />
                  {curMessage?.length === 0 && (
                    <div className="chat-input-links">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
                              className="mdi mdi-file-image-outline"
                              id="Imagetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="Imagetooltip"
                            >
                              Images
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </Col>
              <Col className="col-auto">
                <Button
                  type="button"
                  color="primary"
                  onClick={handleSend}
                  className="btn btn-primary btn-rounded chat-send w-md "
                >
                  <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
                  <i className="mdi mdi-send" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Chat
