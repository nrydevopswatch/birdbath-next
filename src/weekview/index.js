import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import { fetchWeek, postWeek } from "../actions";
import { isValidHourString } from "../components";
import { columnsProp } from "./columnsprop";

class WeekView extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);

    this.cellEditProp = cellEditFactory({
      mode: "click",
      blurToSave: true,
      nonEditableRows: function() {
        return [0];
      },
      afterSaveCell: this.onAfterSaveCell // a hook for after saving cell
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchWeek());
  }

  handlePrevious() {
    this.props.dispatch(fetchWeek(this.props.previousWeek));
  }

  handleNext() {
    this.props.dispatch(fetchWeek(this.props.nextWeek));
  }

  dayToIndex(basedate, value) {
    switch (value) {
      case "mon":
        return basedate;
      case "tue":
        return basedate + 1;
      case "wed":
        return basedate + 2;
      case "thu":
        return basedate + 3;
      case "fri":
        return basedate + 4;
      case "sat":
        return basedate + 5;
      case "sun":
        return basedate + 6;
      default:
        return basedate;
    }
  }

  onAfterSaveCell(oldValue, newValue, row, column) {
    if (isValidHourString(newValue)) {
      const newstate = {
        value: newValue,
        projectId: row.projectId,
        day: this.dayToIndex(row.baseDate, column.dataField)
      };
      row[column.dataField] = "---";
      this.props.dispatch(postWeek(newstate));
    } else {
      row[column.dataField] = oldValue;
    }
  }

  render() {
    const projects = this.props.rows == null ? [] : this.props.rows;
    return (
      <div>
        {this.props.error && (
          <Alert variant="danger">
            <strong>{this.props.error}</strong>
          </Alert>
        )}
        <Container style={{ padding: "15px" }}>
          <Row>
            <Col xs={3}>
              <Button variant="outline-primary" onClick={this.handlePrevious}>
                &larr; Previous
              </Button>
            </Col>
            <Col xs={6} style={{ textAlign: "center" }}>
              {this.props.title}
            </Col>
            <Col xs={3} style={{ textAlign: "right" }}>
              <Button variant="outline-primary" onClick={this.handleNext}>
                Next &rarr;
              </Button>
            </Col>
          </Row>
        </Container>
        <BootstrapTable
          bordered
          striped
          keyField="projectId"
          data={projects}
          columns={columnsProp}
          cellEdit={this.cellEditProp}
        />
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
      }
    ]
  };
  return props;
}

function mapStateToProps(state) {
  const props =
    state == null
      ? {}
      : Object.assign({}, { error: state.error }, state.weekview);
  return props;
}

export default connect(mapStateToProps)(WeekView);
