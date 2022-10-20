import React from "react"
import {
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"

const Tabs = ({ toggleIconCustom, customIconActiveTab }) => {
  return (
    <Nav className="icon-tab nav-justified">
      <NavItem>
        <NavLink
          style={{ cursor: "pointer" }}
          className={classnames({
            active: customIconActiveTab === "1",
          })}
          onClick={() => {
            toggleIconCustom("1")
          }}
        >
          <span className="d-none d-sm-block">
            {/* <i className="fas fa-home"></i>  */}
            Scan View
          </span>
          {/* <span className="d-block d-sm-none">
                      <i className="fas fa-home"></i>
                    </span> */}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          style={{ cursor: "pointer" }}
          className={classnames({
            active: customIconActiveTab === "2",
          })}
          onClick={() => {
            toggleIconCustom("2")
          }}
        >
          <span className="d-none d-sm-block">
            {/* <i className="fas fa-user"></i>  */}
            Scan Settings
          </span>
          {/* <span className="d-block d-sm-none">
                      <i className="fas fa-user"></i>
                    </span> */}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          style={{ cursor: "pointer" }}
          className={classnames({
            active: customIconActiveTab === "3",
          })}
          onClick={() => {
            toggleIconCustom("3")
          }}
        >
          <span className="d-none d-sm-block">
            {/* <i className="fab fa-facebook-messenger"></i>  */}
            Treatment Plan
          </span>
          {/* <span className="d-block d-sm-none">
                      <i className="fab fa-facebook-messenger"></i>
                    </span> */}
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
