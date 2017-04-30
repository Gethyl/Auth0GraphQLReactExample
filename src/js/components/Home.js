import React, { PropTypes as T } from 'react'
import { hashHistory } from 'react-router'

import AuthService from '../utils/AuthService'
import styles from '../../cs/style.css'
import RaisedButton from "material-ui/RaisedButton"
import NewsFeed from "./NewsFeed"


export class Home extends React.Component {
  constructor(props){
      super()
      this.state = {
          feedReady:false
      }

  }

 
 fetchNonSecure(){
    this.setState({feedReady:false}) 
    fetch(`http://localhost:3000/api/nonsecure/newsfeed`)
                 .then(res => res.json())
                 .then(json => {
                   console.log(json)
                   this.setState({newsFeed:json, feedReady: true})
                  })
                 .catch(err => 
                    console.log(err))
 }

 fetchSecure(){
    this.setState({feedReady:false}) 
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const idToken = this.props.auth.getToken()
    // if logged in, includes the authorization header
    if (!!idToken) {
      headers['Authorization'] = 'Bearer ' + idToken
    }

    fetch(`http://localhost:3000/api/secure/newsfeed`,{headers})
         .then(res => {
            if (res.status !== 401)  {
              return res.json()
            }
            else return {status:res.status, statusText:res.statusText}
          })
          .then(json => {
            // console.log(json)
            json.status !== 401 ? this.setState({newsFeed:json, feedReady: true}) : alert(json.statusText)
          })
          .catch(err => { 
            console.log("Catch Block"+err)
          })
 }

  render() {
    const { auth } = this.props
  
    let childNewsFeed = null
    if (this.state.feedReady){
        const {articles} = this.state.newsFeed

        childNewsFeed = <NewsFeed news={articles}  />
    }   
    return (
      <div>
          <div>
              &nbsp;
              &nbsp;
          </div>
          <span>
              <RaisedButton label="Fetch News Secure" primary={true} onTouchTap={this.fetchSecure.bind(this)} />
              {" "}
              <RaisedButton label="Fetch News Not Secure" primary={true} onTouchTap={this.fetchNonSecure.bind(this)} />              
          </span>
          {" "}
          <RaisedButton label="GraphQL Secure" secondary={true} onTouchTap={()=> {hashHistory.push('/using-graphql-secure')}} />  
          {/*{" "}
          <RaisedButton label="GraphQL Non Secure" secondary={true} onTouchTap={()=> {hashHistory.push('/using-graphql')}} />  */}
          {/*{this.props.children}*/}
          { childNewsFeed   }
          
      </div>
    )
  }
}

export default Home;