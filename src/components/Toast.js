import React from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
  Spinner,
} from "reactstrap"

const Toastbar = ({ msg, color }) => {
  return (
    <div className={`p-3 bg-${color} my-2 rounded`}>
      <Toast>
        <ToastHeader></ToastHeader>
        <ToastBody>{msg}</ToastBody>
      </Toast>
    </div>
  )
}

export default Toastbar
