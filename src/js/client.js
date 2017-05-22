import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router,  Route, Link, Redirect } from "react-router-dom"
// import { createStore, applyMiddleware } from 'redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import reducer from './reducers/reducer'
import makeMainRoutes from "./route"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//const routes = makeMainRoutes()
// const store = createStore(reducer, applyMiddleware(thunk))
const app = document.getElementById('app')

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql-secure',
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

import AuthService from './utils/AuthService'
import Container from './containers/MainContainer'
import UsingGraphQL from './containers/UsingGraphQL'
import Home from './components/Home'
import Login from './components/Login'
import Help from './components/Help'
import {AUTH_CLIENT_ID,AUTH_DOMAIN} from "../../auth.config"

const auth = new AuthService(AUTH_CLIENT_ID,AUTH_DOMAIN)

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(nextState.location.hash);
  }
}

const PrivateRoute = ({ component: Component,auth, ...rest }) => (
  <Route {...rest} render={props => {
    return (!!auth.loggedIn() ? (
      <Component {...props} auth={auth}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    ))
  }
  }/>
)

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
	 combineReducers({
		 apollo: client.reducer(),
		 newsReducer:reducer,
		}),
	 {newsReducer:{loading:true}},
	 applyMiddleware(client.middleware())
)

ReactDOM.render(
	<ApolloProvider store={store} client={client}>
		<MuiThemeProvider>
			<Router >
				<div>
					{/*<Link to="/public">Public Page</Link>*/}
					<Link to="/protected">Protected Page</Link>
          <Route path="/" render={(props) => {
              {/*alert('Gethyl- test1'); */}
              handleAuthentication(props)
              return <Redirect to="/protected" />}}
          />
					
					<Route path="/home" component={Home} />
          <Route path="/help" component={Help} />
					<Route path="/login" render={() => <Login auth={auth}/>} />
          {/*<Route path="using-graphql-secure" component={UsingGraphQL}/> */}
					<PrivateRoute path="/protected" component={Container} auth={auth} />
          <Route path="/access_token=:token" render={() => {alert('Gethyl'); return <Redirect to="/help"/>}} />
				</div>
			</Router>
		</MuiThemeProvider>
	</ApolloProvider>
			, app)