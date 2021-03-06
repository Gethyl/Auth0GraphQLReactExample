import React from "react";
import ReactDOM from "react-dom"
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'

import NewsFeed from "../components/NewsFeed"
import Notification from "../components/Notification"

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

import {notifyUser} from  '../actions/action'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from "graphql-tag"

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
const MyQuery = gql`query NewsFeed{
							news {
									status
									source
									articles {
									title
									description
									urlToImage
									}
								}
							}`
const myQueryConfig = {
	options: (props) => {
		return {
			fetchPolicy:"cache-first",
		}
	},
};
/******************************************************************************************************************
 *  UsingGraphQL 
 ******************************************************************************************************************/

export  class UsingGraphQL extends React.Component{
   constructor(props)
   {
	   super(props)
	   this.routeToGraphSecure = this.routeToGraphSecure.bind(this)
   }

   routeToGraphSecure(){
	   this.props.history.push('/protected') 
   }

   render(){	
	   	console.log('Entered UsingGraphQL')
	    let snackbar = null
	    let childNewsFeed = null
		const {loading} = this.props.data
		if (!loading){
			if (!this.props.data.error) {
				const {articles} = this.props.data.news

				childNewsFeed = <NewsFeed news={articles}  />
			}
			else {
				if (this.props.data.error.networkError.response.status === 401){
        			snackbar = <Notification message={"No access or Token expired :("} openSnackbar={true}/>
				}
				else{
        			snackbar = <Notification message={"Fetching data failed...."} openSnackbar={true}/>

				}
			}
			
		}   
		return (
			<div >
				<h4>Inside UsingGraphQL</h4>
				<FlatButton label="Return" secondary={true} onTouchTap={ this.routeToGraphSecure} />  

				{childNewsFeed}
				{snackbar}
			</div>
		)
	}
}

const UsingGraphQLWithData = compose(
	graphql(MyQuery,myQueryConfig)
)(withApollo(UsingGraphQL))
export default  connect(mapStateToProps)(UsingGraphQLWithData)