import React, { PropTypes as T } from 'react'
import { hashHistory } from 'react-router'
import {connect} from 'react-redux'

import styles from '../../cs/style.css'

import AppBar from "material-ui/AppBar"
import Avatar from "material-ui/Avatar"

import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app"
import Help from "material-ui/svg-icons/action/help"
import {grey50,deepOrange300,purple500} from "material-ui/styles/colors"

import Notification from "../components/Notification"
import {setProfileInStore,clearProfile} from "../actions/action"

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

const mapStateToProps = (state = {}) => {
	// console.dir(state)
    return {...state};
};
export class Container extends React.Component {
  constructor(props){
    super(props)
    const {dispatch,route} = this.props

    dispatch(setProfileInStore(route.auth.getProfile()))

    // listen to profile_updated events to update internal state
    props.route.auth.on('profile_updated', (newProfile) => {
       dispatch(setProfileInStore(newProfile))
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
    const {pathname} = this.props.location
    const {profile,notifyMessage} = this.props.newsReducer
    const {dispatch} = this.props


    let userLoggedIn = null
    const authProfile = auth.getProfile()
    if (profile && profile.hasOwnProperty('name') && pathname !== "/login"){
        userLoggedIn = <span>
                        <Avatar
                            color={deepOrange300}
                            backgroundColor={purple500}
                            size={30}
                            
                         >    
                         {/*src={profile.picture}*/}
                        {profile.name.substring(0,1)}
                        </Avatar>
                        {" "}
                        <span>Welcome <strong>{profile.name}</strong></span>
                        
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
    }
    let snackbar = null
    if (notifyMessage){
        snackbar = <Notification message={notifyMessage} openSnackbar={true}/>
    }   

    return (
        <div>
            <AppBar
                title="React with Auth0"
                showMenuIconButton={false}
                iconElementRight={userLoggedIn}
            />
            {children}
            {snackbar}
        </div>
    )
  }
}

export default  connect(mapStateToProps)(Container)