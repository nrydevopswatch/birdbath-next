import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Collapse,
  ListGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import { postProjectPreferences } from "../actions/";

class ProjectPreferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerId: null
    };
  }

  componentDidMount() {
    this.props.dispatch(postProjectPreferences({}));
  }

  onChange(project) {
    console.log(project);
    const params = {
      projectId: project.projectId,
      selected: !project.selected
    };
    this.props.dispatch(postProjectPreferences(params));
  }

  render() {
    const customers =
      this.props.projectprefview == null ? [] : this.props.projectprefview;
    const customerId = this.state.customerId;
    return (
      <div>
        <Card>
          <Card.Header>
            <strong>Project Preferences</strong>
          </Card.Header>
        </Card>
        {customers.map(customer => {
          return (
            <Collapse
              in={customerId == null || customer.customerId === customerId}
            >
              <Card key={customer.customerId}>
                <Card.Body>
                  <Card.Title>
                    <Button
                      variant={customerId != null ? "light" : "secondary"}
                      onClick={() => {
                        this.setState({
                          customerId:
                            customerId == null ? customer.customerId : null
                        });
                      }}
                    >
                      {customer.name}
                    </Button>
                  </Card.Title>
                  <Collapse in={customerId != null}>
                    <ListGroup>
                      {customer.projects.map(project => {
                        return (
                          <ListGroup.Item
                            key={project.projectId}
                            onClick={() => this.onChange(project)}
                          >
                            <Form.Check
                              type="checkbox"
                              readOnly
                              checked={project.selected}
                              label={project.name}
                            />
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </Collapse>
                </Card.Body>
              </Card>
            </Collapse>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    error: state.error,
    projectprefview: state.projectprefview.customers
  };
  return props;
}

export default connect(mapStateToProps)(ProjectPreferences);
