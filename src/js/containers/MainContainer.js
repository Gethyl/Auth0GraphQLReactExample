import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'
import { withRouter, Route, Switch, Link } from 'react-router-dom'

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

import Home from '../components/Home'
import UsingGraphQL from './UsingGraphQL'

const mapStateToProps = (state = {}) => {
	// console.dir(state)
    const {profile} = state.newsReducer
    return {profile};
};

export class Container extends React.Component {
  constructor(props){
    super(props)
    this.getAuthProfileDetails = this.getAuthProfileDetails.bind(this)
    // listen to profile_updated events to update internal state
    this.props.auth.on('profile_updated', (newProfile) => {
        if (!!newProfile)
            this.props.dispatch(setProfileInStore(newProfile))
    })
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState) {
      const { dispatch, auth, profile } = this.props
    //   const authProfile = this.getAuthProfileDetails()
    //   dispatch(setProfileInStore(this.getAuthProfileDetails()))
      if (!profile ) {
          auth.getProfile()
      }
  }

  getAuthProfileDetails() {
      const { dispatch, auth } = this.props
      const profileInfo =  auth.getProfile()
      
      return profileInfo

  }

  componentWillMount(){
    const {dispatch,auth} = this.props
    dispatch(setProfileInStore(JSON.parse(localStorage.getItem('profile'))))
  }

  render() {
    let children = null;
    // if (!!this.props.children) {
    //   children = React.cloneElement(this.props.children, {
    //     auth: this.props.route.auth //sends auth instance from route to children
    //   })
    // }
    const { auth } = this.props
    const {pathname} = this.props.location
    const {profile} = this.props

    let userLoggedIn = null
    // const authProfile = auth.getProfile() 
    if (profile && profile.hasOwnProperty('name')){ // && pathname !== "/login"){
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
                                onTouchTap={()=> {
                                        this.props.history.push('/help')
                                    }
                                }
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
    // let snackbar = null
    // if (notifyMessage){
    //     snackbar = <Notification message={notifyMessage} openSnackbar={true}/>
    // }   

    return (
        <div>
            <AppBar
                title="React with Auth0"
                showMenuIconButton={false}
                iconElementRight={userLoggedIn}
            />
            <Home {...this.props}/>
            
            <Switch>
                <Route path={`${this.props.match.url}/using-graphql-secure`} component={UsingGraphQL} />
            </Switch>
            {/*{snackbar}*/}
        </div>
    )
  }
}

export default  withRouter(connect(mapStateToProps)(Container))