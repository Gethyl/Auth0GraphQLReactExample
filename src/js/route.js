import React from 'react'
import {Route, IndexRedirect} from 'react-router'
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

// const parseAuthHash = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.parseHash(nextState.location.hash)
//   }
// }

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth} >
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} >
      </Route>
      <Route path="using-graphql" component={UsingGraphQL} onEnter={requireAuth} /> 
      <Route path="help" component={Help} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      
      <Route path="access_token=:token" component={Login} />
    </Route>
  )
}

export default makeMainRoutes