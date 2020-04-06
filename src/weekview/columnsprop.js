export const columnsProp = [
  { dataField: "projectId", text: "projectId", hidden: true },
  {
    dataField: "customerName",
    text: "Customer",
    editable: false,
    headerStyle: { width: "15%" },
    headerClasses: "weekview-customer-column col-xs-2",
    classes: "weekview-customer-column"
  },
  {
    dataField: "projectName",
    text: "Project",
    editable: false,
    headerStyle: { width: "15%" },
    headerClasses: "weekview-project-column col-xs-3",
    classes: "weekview-project-column"
  },
  {
    dataField: "mon",
    text: "Mon",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-day-header col-xs-1",
    classes: "weekview-day-column",
    editCellClasses: "col-xs-1"
  },
  {
    dataField: "tue",
    text: "Tue",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-day-header col-xs-1",
    classes: "weekview-day-column",
    editCellClasses: "col-xs-1"
  },
  {
    dataField: "wed",
    text: "Wed",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-day-header col-xs-1",
    classes: "weekview-day-column",
    editCellClasses: "col-xs-1"
  },
  {
    dataField: "thu",
    text: "Thu",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-day-header col-xs-1",
    classes: "weekview-day-column",
    editCellClasses: "col-xs-1"
  },
  {
    dataField: "fri",
    text: "Fri",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-day-header col-xs-1",
    classes: "weekview-day-column",
    editCellClasses: "col-xs-1"
  },
  {
    dataField: "sat",
    text: "Sat",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-saturday-header col-xs-1",
    classes: "weekview-saturday-column",
    editCellClasses: "col-xs-1"
  },
  {
    dataField: "sun",
    text: "Sun",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "weekview-sunday-header col-xs-3",
    classes: "weekview-sunday-column",
    editCellClasses: "col-xs-1"
  }
];
