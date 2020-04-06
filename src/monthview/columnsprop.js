import React from "react";
import { Badge } from "react-bootstrap";

export function formatterNew(cell, row, rowIndex, formatExtraData) {
  return cell.value;
}

export function formatter(cell, row, rowIndex, formatExtraData) {
  const variant =
    cell != null && cell.variant != null ? cell.variant : "secondary";
  const value = cell == null || cell.value == null ? " " : cell.value;
  if (cell == null) {
    return;
  } else {
    return (
      <div style={{ textAlign: "left" }}>
        <Badge pill variant={variant}>
          {cell.day}
        </Badge>
        <div style={{ textAlign: "center", whiteSpace: "pre" }}>{value}</div>
      </div>
    );
  }
}

export const columnsProp = [
  { dataField: "weekId", text: "weekId", hidden: true },
  {
    dataField: "mon",
    text: "Mon",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-day-header col-xs-2",
    classes: "monthview-day-column"
  },
  {
    dataField: "tue",
    text: "Tue",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-day-header col-xs-2",
    classes: "monthview-day-column"
  },
  {
    dataField: "wed",
    text: "Wed",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-day-header col-xs-2",
    classes: "monthview-day-column"
  },
  {
    dataField: "thu",
    text: "Thu",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-day-header col-xs-2",
    classes: "monthview-day-column"
  },
  {
    dataField: "fri",
    text: "Fri",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-day-header col-xs-2",
    classes: "monthview-day-column"
  },
  {
    dataField: "sat",
    text: "Sat",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-saturday-header col-xs-1",
    classes: "monthview-saturday-column"
  },
  {
    dataField: "sun",
    text: "Sun",
    editable: false,
    formatter: formatter,
    headerClasses: "monthview-sunday-header col-xs-1",
    classes: "monthview-sunday-column"
  }
];
