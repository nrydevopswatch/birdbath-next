import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export function getDay(datestr) {
  if (datestr == null) {
    return client.get("/rest/day");
  } else {
    return client.get("/rest/day/" + datestr);
  }
}

export function postDay(params) {
  return client.post("/rest/day", params);
}

export function getWeek(datestr) {
  if (datestr == null) {
    return client.get("/rest/week");
  } else {
    return client.get("/rest/week/" + datestr);
  }
}

export function postWeek(params) {
  return client.post("/rest/week", params);
}

export function getMonth(datestr) {
  if (datestr == null) {
    return client.get("/rest/month");
  } else {
    return client.get("/rest/month/" + datestr);
  }
}

/*
 * Customer handling
 */

export function getCustomers() {
  return client.get("/rest/customers");
}

export function getCustomer(customerId) {
  return client.get("/rest/customer/" + customerId);
}

export function postCustomer(params) {
  return client.post("/rest/customer", params);
}

export function postProject(params) {
  return client.post("/rest/project", params);
}

/*
 * Report preview
 */

export function postReportPreview(params) {
  return client.post("/rest/admin/report/preview", params);
}

const excelClient = axios.create({
  baseURL: API_BASE_URL,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.ms-excel"
  }
});

export function getExcel(params) {
  return excelClient.post("/rest/admin/report/xlsx", params);
}

/*
 * Change password
 */

export function postChangePassword(params) {
  return client.post("/rest/password", params);
}

/*
 *
 */

export function getWhoAmI() {
  return client.get("/rest/whoami");
}

export function postPreferences(params) {
  return client.post("/rest/pref", params);
}

/*
 * Project Preferences
 */

export function postProjectPreferences(params) {
  return client.post("/rest/pref/projects", params);
}
