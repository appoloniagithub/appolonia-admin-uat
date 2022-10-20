import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import moment from "moment"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import images from "assets/images"
import {
  addMessage as onAddMessage,
  getChats as onGetChats,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  getMessages as onGetMessages,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const Chat = ({ patientMessages, patientInfo }) => {
  //meta title
  document.title = "Chat | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const { chats, groups, contacts, messages } = useSelector(state => ({
    chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
  }))

  const [messageBox, setMessageBox] = useState(null)
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "Henry Wells",
    isActive: true,
  })
  const [menu1, setMenu1] = useState(false)
  const [search_Menu, setsearch_Menu] = useState(false)
  const [settings_Menu, setsettings_Menu] = useState(false)
  const [other_Menu, setother_Menu] = useState(false)
  const [activeTab, setactiveTab] = useState("1")
  const [Chat_Box_Username, setChat_Box_Username] = useState("Steven Franklin")
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online")
  const [curMessage, setcurMessage] = useState("")

  useEffect(() => {
    dispatch(onGetChats())
    dispatch(onGetGroups())
    dispatch(onGetContacts())
    dispatch(onGetMessages(currentRoomId))
  }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, currentRoomId])

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom()
  }, [messages])

  // const toggleNotification = () => {
  //   setnotification_Menu(!notification_Menu)
  // }

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu)
  }

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu)
  }

  const toggleOther = () => {
    setother_Menu(!other_Menu)
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  //Use For Chat Box
  const userChatOpen = (id, name, status, roomId) => {
    setChat_Box_Username(name)
    setCurrentRoomId(roomId)
    dispatch(onGetMessages(roomId))
  }

  const addMessage = (roomId, sender) => {
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: curMessage,
      createdAt: new Date(),
    }
    setcurMessage("")
    dispatch(onAddMessage(message))
  }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      setcurMessage(value)
      addMessage(currentRoomId, currentUser.name)
    }
  }

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue
    input = document.getElementById("search-user")
    filter = input.value.toUpperCase()
    ul = document.getElementById("recent-list")
    li = ul.getElementsByTagName("li")
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0]
      txtValue = a.textContent || a.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = ""
      } else {
        li[i].style.display = "none"
      }
    }
  }
  return (
    <div className="w-100 user-chat">
      <Card>
        <div className="p-4 border-bottom ">
          <Row>
            <Col md="4" xs="9">
              <h5 className="font-size-15 mb-1">{`${patientInfo?.firstName} ${patientInfo?.lastName}`}</h5>

              <p className="text-muted mb-0">
                <i
                  className={
                    Chat_Box_User_Status === "online"
                      ? "mdi mdi-circle text-success align-middle me-1"
                      : Chat_Box_User_Status === "intermediate"
                      ? "mdi mdi-circle text-warning align-middle me-1"
                      : "mdi mdi-circle align-middle me-1"
                  }
                />
                {Chat_Box_User_Status}
              </p>
            </Col>
            {/* <Col md="8" xs="3">
              <ul className="list-inline user-chat-nav text-end mb-0">
                <li className="list-inline-item d-none d-sm-inline-block">
                  <Dropdown isOpen={search_Menu} toggle={toggleSearch}>
                    <DropdownToggle className="btn nav-btn" tag="i">
                      <i className="bx bx-search-alt-2" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-md">
                      <Form className="p-3">
                        <FormGroup className="m-0">
                          <InputGroup>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Search ..."
                              aria-label="Recipient's username"
                            />
                           
                            <Button color="primary" type="submit">
                              <i className="mdi mdi-magnify" />
                            </Button>
                       
                          </InputGroup>
                        </FormGroup>
                      </Form>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <li className="list-inline-item  d-none d-sm-inline-block">
                  <Dropdown isOpen={settings_Menu} toggle={toggleSettings}>
                    <DropdownToggle className="btn nav-btn" tag="i">
                      <i className="bx bx-cog" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="#">View Profile</DropdownItem>
                      <DropdownItem href="#">Clear chat</DropdownItem>
                      <DropdownItem href="#">Muted</DropdownItem>
                      <DropdownItem href="#">Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <li className="list-inline-item">
                  <Dropdown isOpen={other_Menu} toggle={toggleOther}>
                    <DropdownToggle className="btn nav-btn" tag="i">
                      <i className="bx bx-dots-horizontal-rounded" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem href="#">Action</DropdownItem>
                      <DropdownItem href="#">Another Action</DropdownItem>
                      <DropdownItem href="#">Something else</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </ul>
            </Col> */}
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
                  map(patientMessages, message => (
                    <li
                      key={"test_k" + message.id}
                      className={
                        message.senderId !== patientInfo?.patientId
                          ? "right"
                          : ""
                      }
                    >
                      <div className="conversation-list">
                        {/* <UncontrolledDropdown>
                          <DropdownToggle
                            href="#"
                            className="btn nav-btn"
                            tag="i"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem href="#">Copy</DropdownItem>
                            <DropdownItem href="#">Save</DropdownItem>
                            <DropdownItem href="#">Forward</DropdownItem>
                            <DropdownItem href="#">Delete</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown> */}
                        <div className="ctext-wrap">
                          <div className="conversation-name">
                            {message.sender}
                          </div>
                          <p>{message.message}</p>
                          <p className="chat-time mb-0">
                            <i className="bx bx-time-five align-middle me-1" />
                            {moment(message.createdAt).format("DD-MM-YY hh:mm")}
                          </p>
                        </div>
                      </div>
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
                    onKeyPress={onKeyPress}
                    onChange={e => setcurMessage(e.target.value)}
                    className="form-control chat-input"
                    placeholder="Enter Message..."
                  />
                  {/* <div className="chat-input-links">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <Link to="#">
                          <i
                            className="mdi mdi-emoticon-happy-outline"
                            id="Emojitooltip"
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target="Emojitooltip"
                          >
                            Emojis
                          </UncontrolledTooltip>
                        </Link>
                      </li>
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
                      <li className="list-inline-item">
                        <Link to="#">
                          <i
                            className="mdi mdi-file-document-outline"
                            id="Filetooltip"
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target="Filetooltip"
                          >
                            Add Files
                          </UncontrolledTooltip>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </Col>
              <Col className="col-auto">
                <Button
                  type="button"
                  color="primary"
                  onClick={() => addMessage(currentRoomId, currentUser.name)}
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
