import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";

import Menu from "./menu";

import NewDayView from "./newdayview";

import DayView from "./dayview";
import WeekView from "./weekview";
import MonthView from "./monthview";
import CustomerView from "./customerview";
import ProjectView from "./projectview";
import ReportView from "./reportview";
import ProjectPreferences from "./projectpref";
import PasswordView from "./passwordview";
import PrefView from "./prefview";

function LogoutView() {
  return <div>Logout</div>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Menu privileged={true} personName="Admin" />
            <Route exact path="/" component={NewDayView} />
            <Route path="/day" component={DayView} />
            <Route path="/week" component={WeekView} />
            <Route path="/month" component={MonthView} />
            <Route path="/admin/customers" component={CustomerView} />
            <Route path="/admin/customer/:id" component={ProjectView} />
            <Route path="/admin/reports" component={ReportView} />
            <Route exact path="/logout" component={LogoutView} />
            <Route exact path="/password" component={PasswordView} />
            <Route exact path="/pref" component={PrefView} />
            <Route exact path="/pref/projects" component={ProjectPreferences} />
          </div>
        </Router>
        <div className="footer-filler" />
        <div className="footer text-black-50">&copy; 2017-2019 ɘksɐdɘsɪ</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: { value: 1, label: "Person" }
  };
}

export default connect(mapStateToProps)(App);
