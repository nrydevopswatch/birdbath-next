import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Card, Form, TextInput, Button, Modal } from "react-bootstrap";

import { postChangePassword, dismissPasswordDialog } from "../actions";

class PasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = this.clearState();

    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  clearState() {
    return {
      modal: false,
      currentPassword: "",
      currentPasswordInvalid: false,
      newPassword: "",
      newPasswordValid: false,
      newPasswordInvalid: false,
      newPassword2: "",
      newPassword2Valid: false,
      newPassword2Invalid: false
    };
  }

  onChangeNewPassword(e) {
    const newpass = e.target.value;
    const valid =
      newpass.length > 7 &&
      /[A-Z]/.test(newpass) &&
      /[a-z]/.test(newpass) &&
      /[0-9]/.test(newpass);
    const invalid = !valid && newpass.length > 0;
    this.setState({
      newPassword: newpass,
      newPasswordValid: valid,
      newPasswordInvalid: invalid,
      newPassword2: "",
      newPassword2Valid: false,
      newPassword2Invalid: false
    });
  }

  onChangeRepeatPassword(e) {
    const repeat = e.target.value;
    const valid =
      this.state.newPasswordValid && this.state.newPassword == repeat;
    const invalid =
      this.state.newPasswordValid && this.state.newPassword != repeat;

    this.setState({
      newPassword2: repeat,
      newPassword2Valid: valid,
      newPassword2Invalid: invalid
    });
  }

  onSubmit() {
    const params = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2
    };
    this.setState(this.clearState());
    this.props.dispatch(postChangePassword(params));
  }

  handleClose() {
    this.props.dispatch(dismissPasswordDialog());
  }

  render() {
    const passwordview = this.props.passwordview;
    const success = passwordview.successMessage;
    const error = passwordview.errorMessage;
    const dialogOpen = success != null || error != null;
    console.log(passwordview);
    console.log(success);
    console.log(error);
    console.log(dialogOpen);
    return (
      <div>
        {this.props.error && (
          <Alert variant="danger">
            <strong>{this.props.error}</strong>
          </Alert>
        )}

        <Alert show={success != null} variant="success">
          <Alert.Heading>Success</Alert.Heading>
          <p>{success}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={this.handleClose}>
              Close
            </Button>
          </div>
        </Alert>

        <Alert show={error != null} variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>
          </div>
        </Alert>
        <Card>
          <Card.Header>
            <strong>Change Password</strong>
          </Card.Header>
          <Card.Body>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.currentPassword}
                onChange={e => {
                  this.setState({ currentPassword: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.newPassword}
                isValid={this.state.newPasswordValid}
                isInvalid={this.state.newPasswordInvalid}
                onChange={this.onChangeNewPassword}
              />
              <Form.Control.Feedback type="invalid">
                At least 8 characters with both caps and numbers
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formNewPassword2">
              <Form.Label>Verify new password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.newPassword2}
                isValid={this.state.newPassword2Valid}
                isInvalid={this.state.newPassword2Invalid}
                onChange={this.onChangeRepeatPassword}
              />
              <Form.Control.Feedback type="invalid">
                New passwords does not match
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              onClick={this.onSubmit}
              variant="primary"
              disabled={
                !this.state.newPasswordValid ||
                !this.state.newPassword2Valid ||
                this.state.currentPasswordInvalid
              }
            >
              Change
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToPropsOffline(state) {
  const props = {
    error: null,
    passwordview: {}
  };
  return props;
}

function mapStateToProps(state) {
  const props = {
    error: state.error,
    passwordview: state.passwordview
  };

  return props;
}

export default connect(mapStateToProps)(PasswordView);
