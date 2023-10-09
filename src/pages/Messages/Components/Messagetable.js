import React from "react"
import moment from "moment"
import { Table, Row, Col, Card, CardBody, Button } from "reactstrap"

const Messagetable = ({ data }) => {
  console.log(data)
  return (
    <>
      <div>
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Platform</th>
                    <th>OS</th>
                    <th>App Version</th>
                    <th>Logged In</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map(contact => {
                    return (
                      <tr key={contact?._id}>
                        <td>{contact.name}</td>
                        <td>{contact.contactInfo}</td>
                        <td>{contact.subject}</td>
                        <td>{contact.source}</td>
                        <td>{contact.appOsVersion}</td>
                        <td>{contact.appVersion}</td>
                        <td>{}</td>
                        <td>
                          {moment(contact.created).format("DD-MM-YYYY hh:mm A")}
                        </td>
                        <td>
                          <a
                            href={`/contact-issues/view-issue/${contact?._id}`}
                          >
                            <Button
                              color="primary"
                              className="btn btn-primary "
                            >
                              View
                            </Button>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Messagetable
