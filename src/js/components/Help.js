import React from 'react'
import { hashHistory } from 'react-router'


import RaisedButton from "material-ui/RaisedButton"

export class Help extends React.Component {

  render() {
    return (
      <div>
        <h2>Help</h2>
        <RaisedButton label="Back to Home" primary={true} onTouchTap={()=> {hashHistory.push('/home')}} />
        <ul>
            <li>Setup Redux</li>
            <li>GraphQL Apollo without Secure</li>
            <li>GraphQL Apollo with Secure</li>
            <li>------------------------------</li>
            <li>CSS Transition??</li>
        </ul>
      </div>
    )
  }
}

export default Help;