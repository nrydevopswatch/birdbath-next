import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";

import { Multiselect } from "react-widgets";

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <strong>Filter</strong>
        </Card.Header>
        <Card.Body>
          <Container>
            <Form.Group as={Row} controlId="begin">
              <Form.Label column sm="3">
                By Customer
              </Form.Label>
              <Col sm="9">
                <Multiselect
                  textField="label"
                  value={this.props.value.customerFilter}
                  data={this.props.customerOptions}
                  onChange={filter =>
                    this.props.onChange({
                      customerFilter: filter,
                      personFilter: this.props.value.personFilter,
                      projectFilter: []
                    })
                  }
                />
              </Col>
              <Form.Label column sm="3">
                By Person
              </Form.Label>
              <Col sm="9">
                <Multiselect
                  textField="label"
                  value={this.props.value.personFilter}
                  data={this.props.personOptions}
                  onChange={filter =>
                    this.props.onChange({
                      customerFilter: this.props.value.customerFilter,
                      personFilter: filter,
                      projectFilter: this.props.value.projectFilter
                    })
                  }
                />
              </Col>
              <Form.Label column sm="3">
                By Project
              </Form.Label>
              <Col sm="9">
                <Multiselect
                  textField="label"
                  value={this.props.value.projectFilter}
                  data={this.props.projectOptions}
                  onChange={filter =>
                    this.props.onChange({
                      customerFilter: [],
                      personFilter: this.props.value.personFilter,
                      projectFilter: filter
                    })
                  }
                />
              </Col>
            </Form.Group>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default Filter;
