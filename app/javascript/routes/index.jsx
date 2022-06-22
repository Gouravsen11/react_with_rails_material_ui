import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";

export default (
	<Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/registration" exact component={Home} />
		</Switch>
	</Router>
);