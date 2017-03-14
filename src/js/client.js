import React from "react";
import ReactDOM from "react-dom";
import {Router, hashHistory} from "react-router"
// import { createStore, applyMiddleware } from 'redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import reducer from './reducers/reducer'
import makeMainRoutes from "./route"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const routes = makeMainRoutes()
// const store = createStore(reducer, applyMiddleware(thunk))
const app = document.getElementById('app')

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql',
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
	 combineReducers({
		 newsReducer:reducer,
		 apollo: client.reducer()
		}),
	 {newsReducer:{loading:true}},
	 applyMiddleware(client.middleware())
)

ReactDOM.render(
		<ApolloProvider store={store} client={client}>
			<MuiThemeProvider>
				<Router history={hashHistory} routes={routes}/>				
			</MuiThemeProvider>
		</ApolloProvider>
			, app)