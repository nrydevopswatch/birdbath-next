import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import { fetchCustomers, postCustomer } from "../actions";
import { columnsProp } from "./columnsprop";
import AddCustomerModal from "./addcustomermodal";

class CustomerView extends Component {
  constructor(props) {
    super(props);

    this.onHide = this.onHide.bind(this);
    this.onAddCustomer = this.onAddCustomer.bind(this);
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
      addCustomer: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCustomers());
  }

  onHide() {
    this.setState({ addCustomer: false });
  }

  onAfterSaveCell(oldValue, newValue, row, column) {
    const newstate = {
      name: newValue,
      customerId: row.customerId
    };
    row[column.dataField] = "---";
    this.props.dispatch(postCustomer(newstate));
  }

  onAddCustomer(customer) {
    console.log(customer);
    this.setState({ addCustomer: false });
    this.props.dispatch(postCustomer(customer));
  }

  render() {
    return (
      <div>
        {this.props.error && (
          <Alert variant="danger">
            <strong>{this.props.error}</strong>
          </Alert>
        )}
        <AddCustomerModal
          show={this.state.addCustomer}
          onHide={this.onHide}
          onSave={this.onAddCustomer}
        />
        <BootstrapTable
          keyField="customerId"
          data={this.props.customerview}
          columns={columnsProp}
          cellEdit={this.cellEditProp}
        />
        <Button
          onClick={() => {
            this.setState({ addCustomer: true });
          }}
        >
          Add customer
        </Button>
      </div>
    );
  }
}

function mapStateToPropsOffline(state) {
  const props = {
    customerview: [
      {
        customerId: 1,
        name: "AtoZ",
        locked: false,
        visible: true,
        projects: [{ projectId: 1, name: "Sisäinen" }]
      },
      {
        customerId: 2,
        name: "Exadeci"
      }
    ]
  };
  return props;
}

function mapStateToProps(state) {
  const props =
    state == null
      ? { customerview: [] }
      : Object.assign(
          {},
          { error: state.error },
          { customerview: state.customerview }
        );
  return props;
}

export default connect(mapStateToProps)(CustomerView);
