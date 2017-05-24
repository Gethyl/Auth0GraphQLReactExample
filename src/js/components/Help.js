import React from 'react'
import FlatButton from "material-ui/FlatButton"
import Divider from "material-ui/Divider"

const Help = (props) => {
  return (
      <div>
        <h2 style={{backgroundColor:'rgb(0, 188, 212)', height:'2em',
                    color:'white', textAlign:'center', verticalAlign:'middle'}}>Help</h2>
        <Divider/>
        <FlatButton label="Back to Home" secondary={true} onTouchTap={()=> {props.history.push('/protected')}} />
        <ol>
            <li>Setup Redux</li>
            <li>GraphQL Apollo without Secure</li>
            <li>GraphQL Apollo with Secure</li>
            <li>CSS Transition??</li>
        </ol>
      </div>
    )
}

export default Help;