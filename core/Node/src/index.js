import React from "react";
import ReactDOM from "react-dom";
import ehealth from 'general/i3app';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import Homepage from './pages/Homepage.jsx'
const hist = createBrowserHistory();
window.applicationBaseUrl = "";

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/Homepage" component={Homepage} />
            <Redirect from="/" to="/Homepage" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
