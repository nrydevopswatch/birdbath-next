import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Alert,
  Card,
  Form,
  TextInput,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";

import { fetchWhoAmI, postPreferences } from "../actions";

class PrefView extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchWhoAmI());
  }

  handleChange(value, event) {
    const params = {
      decimalPreference: value == 1
    };
    this.props.dispatch(postPreferences(params));
  }

  render() {
    const isdisabled = this.props.error != null;
    const selectedValue = this.props.decimalPreference ? 1 : 2;
    return (
      <Card>
        <Card.Header>
          <strong>Preferences</strong>
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Time format</Form.Label>
          </Form.Group>

          <ToggleButtonGroup
            type="radio"
            name="hourformat"
            value={selectedValue}
            onChange={this.handleChange}
          >
            <ToggleButton disabled={isdisabled} value={1}>
              Decimal-presentation
            </ToggleButton>
            <ToggleButton disabled={isdisabled} value={2}>
              Minute-presentation
            </ToggleButton>
          </ToggleButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToPropsOffline(state) {
  const props = {
    error: null,
    decimalPreference: true
  };
  return props;
}

function mapStateToProps(state) {
  const props = {
    error: state.error,
    decimalPreference:
      state.whoami == null ? null : state.whoami.decimalPreference
  };

  return props;
}

export default connect(mapStateToProps)(PrefView);
