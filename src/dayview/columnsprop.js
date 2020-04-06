export const columnsProp = [
  { dataField: "projectId", text: "projectId", hidden: true },
  {
    dataField: "customer",
    text: "Customer",
    editable: false,
    /* headerStyle: { width: "20%" }, */
    headerClasses: "col-sm-3",
    classes: "col-sm-3"
  },
  {
    dataField: "project",
    text: "Project",
    editable: false,
    /* headerStyle: { width: "40%" }, */
    headerClasses: "col-sm-4",
    classes: "col-sm-4"
  },
  {
    dataField: "time",
    text: "",
    editable: true,
    /* headerStyle: { width: "20%" }, */
    headerClasses: "col-sm-3",
    editCellClasses: "col-sm-3",
    classes: "col-sm-3"
  },
  {
    dataField: "week",
    text: "Week",
    editable: false,
    /* headerStyle: { width: "10%" }, */
    headerClasses: "col-sm-1",
    classes: "col-sm-1"
  },
  {
    dataField: "month",
    text: "Month",
    editable: false,
    /* headerStyle: { width: "10%" }, */
    headerClasses: "col-sm-1",
    classes: "col-sm-1"
  }
];
