import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = { projectId: 0, customerId: 0, name: "", notes: "" };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter customer name"
              value={this.state.name}
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter notes"
              value={this.state.notes}
              onChange={event => {
                this.setState({ notes: event.target.value });
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
              const project = this.state;
              this.setState({ projectId: 0, name: "", notes: "" });
              this.props.onSave(project);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
