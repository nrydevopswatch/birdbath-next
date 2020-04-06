import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Container, Row, Col, Button, Table } from "react-bootstrap";

class NewDayView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container style={{ padding: "15px" }}>
          <Row>
            <Col xs={3}>
              <Button variant="outline-primary">&larr; Previous</Button>
            </Col>
            <Col xs style={{ textAlign: "center" }}>
              {this.props.title}
            </Col>
            <Col xs={3} style={{ textAlign: "right" }}>
              <Button variant="outline-primary">Next &rarr;</Button>
            </Col>
          </Row>
        </Container>
        <Table>
          <thead>
            <tr>
              <th className="d-none d-lg-table-cell col-lg-2">Customer</th>
              <th className="d-table-cell col-3 col-lg-3">Project</th>
              <th className="d-table-cell col-2 col-lg-1">Time</th>
              <th className="d-table-cell col-7 col-lg-4">Notes</th>
              <th className="d-none d-lg-table-cell col-lg-1">Week</th>
              <th className="d-none d-lg-table-cell col-lg-1">Month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToPropsOffline(state) {
  const props = {
    today: "1.1.2019",
    projects: [
      {
        projectId: 1,
        time: "1:00",
        project: "Project",
        customer: "Customer",
        week: "1:00",
        month: "1:00"
      },
      {
        projectId: 2,
        time: "6:30",
        project: "Harjoitus",
        customer: "Customer",
        week: "12:00",
        month: "75:00"
      },
      {
        projectId: 0,
        time: "1:00",
        week: "12:00",
        month: "75:00"
      }
    ]
  };
  return props;
}

function mapStateToProps(state) {
  const props =
    state == null
      ? {}
      : Object.assign({}, { error: state.error }, state.dayview);
  return props;
}

export default connect(mapStateToPropsOffline)(NewDayView);
