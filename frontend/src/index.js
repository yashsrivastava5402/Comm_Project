import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Validated from "./components/validated/validated";
import ChatPage from "./components/chatpage/ChatPage";

import ErrorPage from "./components/ErrorPage/ErrorPage";
import Regerror from "./components/ErrorPage/regerror";
import 'semantic-ui-css/semantic.min.css';
import UserContextProvider from "./components/contexts/usercontext/usercontext";


const hist = createBrowserHistory();

ReactDOM.render(
	<UserContextProvider>
	
	<Router history={hist}>
		<Switch>
			<Route exact path="/login" render={(props) => <App {...props} />} />
			<Route
				exact
				path="/validated"
				render={(props) => <Validated {...props} />}
			/>
			<Route exact path="/error" render={(props) => <ErrorPage {...props} />} />
			<Route exact path="/Regerror" render={(props) => <Regerror {...props} />} />
			<Route exact path="/chatPage" render={(props) => <ChatPage {...props} />} />

			<Redirect from="/" to="/login" />
		</Switch>
	</Router>
	
	</UserContextProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
