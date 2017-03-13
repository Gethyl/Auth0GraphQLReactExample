import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import styles from '../../cs/style.css'

import RaisedButton from "material-ui/RaisedButton"

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

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