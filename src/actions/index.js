import * as api from "../api";

export function fetchDay(date) {
  return dispatch => {
    api
      .getDay(date)
      .then(resp => {
        dispatch(fetchDaySucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postDay(params) {
  return dispatch => {
    api
      .postDay(params)
      .then(resp => {
        dispatch(fetchDaySucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}
export function fetchDaySucceeded(data) {
  return {
    type: "FETCH_DAY_SUCCEEDED",
    payload: { dayview: data, error: null }
  };
}

export function fetchError(error) {
  return {
    type: "ERROR",
    payload: { error: "Connection error" }
  };
}

/*
 * Week view
 */

export function fetchWeek(date) {
  return dispatch => {
    api
      .getWeek(date)
      .then(resp => {
        dispatch(fetchWeekSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postWeek(params) {
  return dispatch => {
    api
      .postWeek(params)
      .then(resp => {
        dispatch(fetchWeekSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}
export function fetchWeekSucceeded(data) {
  return {
    type: "FETCH_WEEK_SUCCEEDED",
    payload: { weekview: data, error: null }
  };
}

/*
 * Month view
 */

export function fetchMonth(date) {
  return dispatch => {
    api
      .getMonth(date)
      .then(resp => {
        dispatch(fetchMonthSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchMonthSucceeded(data) {
  return {
    type: "FETCH_MONTH_SUCCEEDED",
    payload: { monthview: data, error: null }
  };
}

/*
 * Customer view
 */

export function fetchCustomers() {
  return dispatch => {
    api
      .getCustomers()
      .then(resp => {
        dispatch(fetchCustomersSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postCustomer(data) {
  return dispatch => {
    api
      .postCustomer(data)
      .then(resp => {
        dispatch(fetchCustomersSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchCustomersSucceeded(data) {
  return {
    type: "FETCH_CUSTOMERS_SUCCEEDED",
    payload: { customerview: data, error: null }
  };
}

export function fetchCustomerProjects(customerId) {
  return dispatch => {
    api
      .getCustomer(customerId)
      .then(resp => {
        dispatch(fetchCustomerProjectsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postCustomerProject(data) {
  return dispatch => {
    api
      .postProject(data)
      .then(resp => {
        dispatch(fetchCustomerProjectsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchCustomerProjectsSucceeded(data) {
  return {
    type: "FETCH_CUSTOMER_PROJECTS_SUCCEEDED",
    payload: { projectview: data, error: null }
  };
}

/*
 * Reports
 */

export function fetchReportPreview(params) {
  return dispatch => {
    api
      .postReportPreview(params)
      .then(resp => {
        dispatch(fetchReportPreviewSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchReportPreviewSucceeded(data) {
  return {
    type: "FETCH_REPORT_PREVIEW_SUCCEEDED",
    payload: { reportview: data, error: null }
  };
}

export function getExcel(params) {
  return dispatch => {
    api
      .getExcel(params)
      .then(response => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // this is for IE 11
          window.navigator.msSaveOrOpenBlob(response.data, "report.xslx");
        } else {
          // for other browsers
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "report.xlsx");
          link.click();
          window.URL.revokeObjectURL(url);

          /*
          a = document.createElement('a');
          document.body.appendChild(a);
          a.download = name;
          a.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABWSURBVDhPY0xISPh//0UOA7mAiVyNMH2jBjAwkBQGjD9KGBTEJ6OEO0kG2NvbMwCjnXwDsEU5SS5ANuDhjRCGJbPFSQsDdBfIyMhQZgDIQLK9QLWkDABPsQw5I+5qmAAAAABJRU5ErkJggg==";
          a.click();
          */
        }
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

/*
 * Change Password
 */

export function postChangePassword(params) {
  return dispatch => {
    api
      .postChangePassword(params)
      .then(resp => {
        dispatch(changePasswordSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function changePasswordSucceeded(data) {
  return {
    type: "CHANGE_PASSWORD_SUCCEEDED",
    payload: { passwordview: data, error: null }
  };
}

export function dismissPasswordDialog() {
  return {
    type: "DISMISS_PASSWORD_DIALOG",
    payload: { passwordview: {}, error: null }
  };
}

/*
 * Who Am I and Preferences
 */

export function fetchWhoAmI(params) {
  return dispatch => {
    api
      .getWhoAmI()
      .then(resp => {
        dispatch(fetchWhoAmISucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postPreferences(params) {
  return dispatch => {
    api
      .postPreferences(params)
      .then(resp => {
        dispatch(fetchWhoAmISucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchWhoAmISucceeded(data) {
  return {
    type: "WHOAMI_SUCCEEDED",
    payload: { whoami: data, error: null }
  };
}

/*
 * Project Preferences
 */

export function postProjectPreferences(params) {
  return dispatch => {
    api
      .postProjectPreferences(params)
      .then(resp => {
        dispatch(fetchProjectPreferencesSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchProjectPreferencesSucceeded(data) {
  return {
    type: "FETCH_PROJECT_PREFERENCES_SUCCEEDED",
    payload: { projectprefview: data, error: null }
  };
}
