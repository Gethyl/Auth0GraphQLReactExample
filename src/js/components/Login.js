import React from 'react'
import Auth from '../utils/Auth'
import styles from '../../cs/style.css'
import AppBar from "material-ui/AppBar"

import RaisedButton from "material-ui/RaisedButton"
import {Redirect } from "react-router-dom"


export class Login extends React.Component {
  // static propTypes = {

  //   auth: T.instanceOf(Auth)
  // }

  render() {
    const { auth } = this.props
    return (
      <div style={{ position:'fixed',top:0,right:0,left:0,bottom:0, background:'radial-gradient(#757575,#212121)' }}>
        <AppBar
                title="Login to learn some cool stuff on React with Auth0"
                showMenuIconButton={false}
            />
        <div style={{ position: 'absolute', top: '48%', left: '47%', textAlign: 'center' }}>
          <RaisedButton label="Login" primary={true} onTouchTap={auth.login.bind(this)} />
        </div>
      </div> 
    )
  }
}

export default Login;