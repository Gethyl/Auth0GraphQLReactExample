import React, { PropTypes as T } from 'react'
import { hashHistory } from 'react-router'

import styles from '../../cs/style.css'

import AppBar from "material-ui/AppBar"
import Avatar from "material-ui/Avatar"

import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app"
import Help from "material-ui/svg-icons/action/help"
import {grey50,deepOrange300,purple500} from "material-ui/styles/colors"

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

export class Container extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      profile: props.route.auth.getProfile()
    }
    // listen to profile_updated events to update internal state
    props.route.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }
    const { auth } = this.props.route

    /*const logoutIcon = <ActionExitToApp 
                            style={{cursor:"pointer"}}
                            color={grey50}
                            hoverColor={deepOrange300}
                            onTouchTap={auth.logout.bind(this)}
                       >
                       </ActionExitToApp>*/

    let userLoggedIn = null
    const authProfile = auth.getProfile()
    if (authProfile.hasOwnProperty('name')){
        userLoggedIn = <span>
                        <Avatar
                            color={deepOrange300}
                            backgroundColor={purple500}
                            size={30}
                            
                         >    
                         {/*src={this.state.profile.picture}*/}
                        {this.state.profile.name.substring(0,1)}
                        </Avatar>
                        {" "}
                        <span>Welcome <strong>{this.state.profile.name}</strong></span>
                        
                        <div style={{textAlign:"end"}}>
                            <Help
                                style={{cursor:"pointer"}}
                                color={grey50}
                                hoverColor={deepOrange300}
                                onTouchTap={()=> {hashHistory.push('/help')}}
                            />
                            {" "}
                            <ActionExitToApp 
                                style={{cursor:"pointer"}}
                                color={grey50}
                                hoverColor={deepOrange300}
                                onTouchTap={auth.logout.bind(this)}
                            />
                        </div>  
                    </span>
    }
    else {
       userLoggedIn = null
    //    this.setState({profile: null})
    }
       

    return (
        <div>
            <AppBar
                title="React with Auth0"
                showMenuIconButton={false}
                iconElementRight={userLoggedIn}
            />
            {children}
        </div>
    )
  }
}

export default Container;