import React from "react"
import { Container } from "reactstrap"

const Library = () => {
  //meta title
  document.title = "Library | Appolonia Dental Care"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Library</h4>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Library
