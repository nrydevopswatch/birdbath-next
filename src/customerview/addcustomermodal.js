import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default class AddCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { customerId: 0, name: "" };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Custom Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter customer name"
              value={this.state.name}
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const customer = this.state;
              this.setState({ customerId: 0, name: "" });
              this.props.onSave(customer);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
