import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Button, Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import { fetchCustomerProjects, postCustomerProject } from "../actions/";
import { columnsProp } from "./columnsprop";
import AddProjectModal from "./addprojectmodal";

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.onHide = this.onHide.bind(this);
    this.onAddProject = this.onAddProject.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);

    this.cellEditProp = cellEditFactory({
      mode: "click",
      blurToSave: true,
      nonEditableRows: function() {
        return [0];
      },
      afterSaveCell: this.onAfterSaveCell // a hook for after saving cell
    });
    this.state = {
      addProject: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCustomerProjects(this.props.match.params.id));
  }

  onHide() {
    this.setState({ addProject: false });
  }

  onAddProject(project) {
    project.customerId = this.props.projectview.customerId;
    this.setState({ addProject: false });
    this.props.dispatch(postCustomerProject(project));
  }

  onAfterSaveCell(oldValue, newValue, row, column) {
    const name = column.dataField === "name" ? newValue : row.name;
    const notes = column.dataField === "notes" ? newValue : row.notes;
    const project = {
      customerId: row.customerId,
      projectId: row.projectId,
      name: name,
      notes: notes
    };
    row[column.dataField] = "---";
    this.props.dispatch(postCustomerProject(project));
  }

  render() {
    const projects =
      this.props.projectview == null || this.props.projectview.projects == null
        ? []
        : this.props.projectview.projects;
    return (
      <div>
        {this.props.error && (
          <Alert variant="danger">
            <strong>{this.props.error}</strong>
          </Alert>
        )}
        <AddProjectModal
          show={this.state.addProject}
          onHide={this.onHide}
          onSave={this.onAddProject}
        />
        <Card>
          <Card.Header>
            <h4>Projects for {this.props.projectview.name}</h4>
          </Card.Header>
          <Card.Body>
            <BootstrapTable
              keyField="projectId"
              data={projects}
              columns={columnsProp}
              cellEdit={this.cellEditProp}
            />
            <Button
              onClick={() => {
                this.setState({ addProject: true });
              }}
            >
              Add project
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props =
    state == null
      ? { projectview: {} }
      : Object.assign(
          {},
          { error: state.error },
          { projectview: state.projectview }
        );
  return props;
}

export default connect(mapStateToProps)(ProjectView);
