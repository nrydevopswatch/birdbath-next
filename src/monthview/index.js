import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import { fetchMonth } from "../actions";
import { columnsProp } from "./columnsprop";

class MonthView extends Component {
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
    this.props.dispatch(fetchMonth());
  }

  handlePrevious() {
    this.props.dispatch(fetchMonth(this.props.previousMonth));
  }

  handleNext() {
    this.props.dispatch(fetchMonth(this.props.nextMonth));
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
    const weeks = this.props.weeks == null ? [] : this.props.weeks;
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
          keyField="weekId"
          data={weeks}
          columns={columnsProp}
          cellEdit={this.cellEditProp}
        />
      </div>
    );
  }
}

function mapStateToPropsOffline(state) {
  const props = {
    title: "February 2019",
    nextMonth: "2019-03-17",
    previousMonth: "2019-01-17",
    weeks: [
      {
        weekId: 1,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: { day: 1 },
        sat: { day: 2 },
        sun: { day: 3 }
      },
      {
        weekId: 2,
        mon: { day: 4, value: "7:30", variant: "success" },
        tue: { day: 5, value: "7:30", variant: "success" },
        wed: { day: 6, value: "7:30", variant: "success" },
        thu: { day: 7, value: "7:30", variant: "success" },
        fri: { day: 8, value: "7:30", variant: "success" },
        sat: { day: 9 },
        sun: { day: 10 }
      },
      {
        weekId: 3,
        mon: { day: 11, value: "7:30", variant: "success" },
        tue: { day: 12, value: "7:00", variant: "danger" },
        wed: { day: 13, value: "7:30", variant: "success" },
        thu: { day: 14, value: "7:30", variant: "success" },
        fri: { day: 15, value: "7:30", variant: "success" },
        sat: { day: 16, value: "7:30", variant: "warning" },
        sun: { day: 17, value: "7:30", variant: "warning" }
      },
      {
        weekId: 4,
        mon: { day: 18, value: "7:30" },
        tue: { day: 19, value: "7:30" },
        wed: { day: 20, value: "7:30" },
        thu: { day: 21, value: "7:30" },
        fri: { day: 22, value: "7:30" },
        sat: { day: 23, value: "7:30" },
        sun: { day: 24, value: "7:30" }
      },
      {
        weekId: 5,
        mon: { day: 25, value: "7:30" },
        tue: { day: 26, value: "7:30" },
        wed: { day: 27, value: "7:30" },
        thu: { day: 28, value: "7:30" },
        fri: { day: 29, value: "7:30" },
        sat: { day: 30, value: "7:30" },
        sun: { day: 31, value: "7:30" }
      }
    ]
  };
  return props;
}

function mapStateToProps(state) {
  const props =
    state == null
      ? {}
      : Object.assign({}, { error: state.error }, state.monthview);
  return props;
}

export default connect(mapStateToProps)(MonthView);
