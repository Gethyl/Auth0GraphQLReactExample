import React from "react";
import ReactDOM from "react-dom"
import {connect} from 'react-redux'

import NewsFeed from "../components/NewsFeed"

import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import FlatButton from 'material-ui/FlatButton'
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  purple500,
} from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin'

import {loadInitialData} from  '../actions/action'

import { graphql } from 'react-apollo'
import gql from "graphql-tag"

import axios from "axios"
// import {List} from "immutable"

// import loginImage from "../../images/Login.jpg"

const mapStateToProps = (state = {}) => {
    // console.dir(state)
    return {...state};
};

let headStyle = {
    fontFamily: "'Roboto', sans-serif",
    color: '#00BCD4',
	textAlign:"center",	
}

let sourceStyle = {
	// fontFamily: "'Roboto', sans-serif",
	textAlign:"right",
	paddingRight:10,
	// color:"#90CAF9"
}

let progressStyle = {
	paddingLeft:"45%",
	paddingTop:"10%"
}

/******************************************************************************************************************
 *  GraphQL 
 ******************************************************************************************************************/
const MyQuery = gql`query {news {status,source,articles{title,description,urlToImage}}}`

/******************************************************************************************************************
 *  NewsContainer 
 ******************************************************************************************************************/

export  class NewsContainer extends React.Component{
   constructor(props)
   {
	   super(props)
	   const {newsReducer} = this.props
	   this.loginModal = this.loginModal.bind(this)
	   //dispatch(loadInitialData())
	   this.state = {
		   openLogin:false
	   }
   }

   componentWillUnmount() {

   }

   loginModal = ()=>{
	   const openLoginValue = !this.state.openLogin
	   this.setState({openLogin:openLoginValue,errorText:""})
	   console.log(!this.state.openLogin)
   }

   logoutModal = ()=>{
	   this.setState({username:""})
   }

   newUseLogIn = ()=>{
	   const userName = ReactDOM.findDOMNode(this.refs.newUserRef.input).value
	   if (!!userName){
		 axios.post('http://localhost:3001/storesession'
		 			,{username:userName}
				   ).then((res)=>{
						  this.setState({openLogin:false,username:userName,errorText:""})
					   }
				   ).catch((err)=>{alert("Error in Axios POST")})  
	   }
	   else
	   	 this.setState({errorText:"Mandtory Field"})
   }

   render(){	
       const {newsReducer,data} = this.props
	   const {loading}  = data
  	   var isUserLoggedIn = false
	   var userName = "Gethyl"	 


	   let renderChild,userLogin;

		if (!!this.state.username){
			userLogin = <span>
							<Avatar
								color={deepOrange300}
								backgroundColor={purple500}
								size={30}
							>
							{this.state.username.substring(0,1)}
							</Avatar>
							{" "}
							<span>Welcome {this.state.username}</span>
							<FlatButton label="Logout" primary={false} onTouchTap={this.logoutModal}/>
						</span>
			
		 	if (loading){
				renderChild = <CircularProgress size={80} thickness={7} style={progressStyle} />
			}
			else {
				const {articles} = data.news
				renderChild = <NewsFeed news={articles}  />
			}
		}
		else{
			userLogin = <FlatButton label="Login" primary={false} onTouchTap={this.loginModal}/>
			renderChild = 
				<div> 
					<h2>Login to continue....</h2>	
					{/*<img src={loginImage} height={600} width={600}></img>*/}
				</div>		
		}

		const modalActions = [
		<FlatButton
			label="Cancel"
			primary={true}
			onTouchTap={this.loginModal}
		/>,
		<FlatButton
			label="Login"
			primary={true}
			disabled={false}
			onTouchTap={this.newUseLogIn}
		/>,
		]

		return (
			<div >
				<AppBar title="Redis Session + Cache Example"
					showMenuIconButton={false}
					iconElementRight={userLogin}
				/>
				<div >
					<h4 style={sourceStyle}>sourced from newsapi.org</h4>
					<Divider/>
				</div>
				<Dialog
					title="Enter User Name"
					actions={modalActions}
					modal={true}
					open={this.state.openLogin}
				>
					<TextField 
						hintText="Username"
						floatingLabelText="Enter Username"
						errorText={this.state.errorText}
						ref="newUserRef"
					/>
				</Dialog>
				{renderChild}	

			</div>
		);
	}
}

const NewsContainerWithData = graphql(MyQuery)(NewsContainer)
export default  connect(mapStateToProps)(NewsContainerWithData)
// export default  connect(mapStateToProps)(NewsContainer)
