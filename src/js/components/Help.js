import React from 'react'

import {blue500} from "material-ui/styles/colors"
import RaisedButton from "material-ui/RaisedButton"
import Divider from "material-ui/Divider"

export class Help extends React.Component {

  render() {
    return (
      <div>
        <h2 style={{backgroundColor:'rgb(0, 188, 212)', height:'2em',
                    color:'white', textAlign:'center', verticalAlign:'middle'}}>Help</h2>
        <RaisedButton label="Back to Home" primary={true} onTouchTap={()=> {this.props.history.push('/protected')}} />
        <Divider/>
        <ul>
            <li>Setup Redux</li>
            <li>GraphQL Apollo without Secure</li>
            <li>GraphQL Apollo with Secure</li>
            <li>CSS Transition??</li>
        </ul>
      </div>
    )
  }
}

export default Help;