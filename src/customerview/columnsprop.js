import React from "react";
import { Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

export const columnsProp = [
  {
    dataField: "customerId",
    text: "customerId",
    headerStyle: { width: "20%" },
    hidden: false
  },
  {
    dataField: "name",
    text: "Customer Name",
    headerStyle: { width: "60%" },
    editable: true
  },
  {
    dataField: "button",
    text: "",
    headerStyle: { width: "20%" },
    formatter: formatter,
    editable: false
  }
];

export function formatter(cell, row, rowIndex, formatExtraData) {
  const customerId = row == null ? "" : row.customerId;
  const to = "/admin/customer/" + customerId + "/projects";
  return (
    <IndexLinkContainer to={to}>
      <Button variant="light">Projects</Button>
    </IndexLinkContainer>
  );
}
