import React, { PropTypes as T } from 'react'
import Auth from '../utils/Auth'
import styles from '../../cs/style.css'

import RaisedButton from "material-ui/RaisedButton"
import {Redirect } from "react-router-dom"


export class Login extends React.Component {
  // static propTypes = {

  //   auth: T.instanceOf(Auth)
  // }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <RaisedButton label="Login" primary={true} onTouchTap={auth.login.bind(this)} />
      </div>
    )
  }
}

export default Login;