import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";

import { fetchReportPreview, getExcel } from "../actions/";
import TimeRange from "./timerange";
import Filter from "./filter";
import { columnsProp } from "./columnsprop";

Moment.locale("fi");
momentLocalizer();

class ReportView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      begin: Moment(this.props.reportview.beginDay).toDate(),
      end: Moment(this.props.reportview.endDay).toDate()
    };

    this.onChangeTimeRange = this.onChangeTimeRange.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.postParametersAndGetExcel = this.postParametersAndGetExcel.bind(this);
  }

  onChangeTimeRange(range) {
    const parameters = {
      beginDay: Moment(range.begin).format("YYYY-MM-DD"),
      endDay: Moment(range.end).format("YYYY-MM-DD"),
      customerFilter: this.props.reportview.customerFilter,
      projectFilter: this.props.reportview.projectFilter,
      personFilter: this.props.reportview.personFilter
    };
    console.log(parameters);
    this.props.dispatch(fetchReportPreview(parameters));
  }

  onChangeFilter(filter) {
    const parameters = {
      beginDay: this.props.reportview.beginDay,
      endDay: this.props.reportview.endDay,
      customerFilter: filter.customerFilter,
      projectFilter: filter.projectFilter,
      personFilter: filter.personFilter
    };
    console.log(parameters);
    this.props.dispatch(fetchReportPreview(parameters));
  }

  postParametersAndGetExcel() {
    const parameters = {
      beginDay: this.props.reportview.beginDay,
      endDay: this.props.reportview.endDay,
      customerFilter: this.props.reportview.customerFilter,
      personFilter: this.props.reportview.projectFilter,
      projectFilter: this.props.reportview.personFilter
    };
    this.props.dispatch(getExcel(parameters));
  }

  componentDidMount() {
    this.props.dispatch(fetchReportPreview({}));
  }

  render() {
    const begin = Moment(this.props.reportview.beginDay).toDate();
    const end = Moment(this.props.reportview.endDay).toDate();
    const data = this.props.reportview;
    const preview = data == null || data.preview == null ? [] : data.preview;
    console.log(data);
    console.log(preview);
    return (
      <div>
        {this.props.error && (
          <Alert variant="danger">
            <strong>{this.props.error}</strong>
          </Alert>
        )}
        <Card body>
          <h4>Reporting</h4>
        </Card>
        <TimeRange begin={begin} end={end} onChange={this.onChangeTimeRange} />
        <Filter
          value={data}
          onChange={this.onChangeFilter}
          customerOptions={data.customerOptions}
          personOptions={data.personOptions}
          projectOptions={data.projectOptions}
        />
        <Card>
          <Card.Header>
            <strong>Preview</strong>
          </Card.Header>
          <BootstrapTable
            bordered
            striped
            bootstrap4
            keyField="id"
            data={preview}
            columns={columnsProp}
          />
        </Card>
        <Card>
          <Card.Body>
            <Button onClick={this.postParametersAndGetExcel}>
              Generate Excel Report
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const props = {
    error: state.error,
    reportview: state.reportview
  };
  return props;
}

export default connect(mapStateToProps)(ReportView);
