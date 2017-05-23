import React, { PropTypes as T } from 'react'
import { hashHistory } from 'react-router'
import {blue500} from "material-ui/styles/colors"
import Auth from '../utils/Auth'
import styles from '../../cs/style.css'
import RaisedButton from "material-ui/RaisedButton"
import NewsFeed from "./NewsFeed"

import { withRouter, Route, Switch, Link } from 'react-router-dom'
import UsingGraphQL from '../containers/UsingGraphQL'

export class Home extends React.Component {
  constructor(props) {
    super()
    this.state = {
      feedReady: false,
      graphqlFetch:false
    }

  }

  componentDidUpdate(){
    if (!!this.state.graphqlFetch){
      this.props.history.push(`${this.props.match.url}/using-graphql-secure`)
      this.setState({...this.state,graphqlFetch:false})
    }
  }

  fetchGraphqlSecure() {

    this.setState({...this.state,graphqlFetch:true})
  }


  fetchNonSecure() {
    this.setState({ feedReady: false })
    fetch(`http://localhost:3001/api/nonsecure/newsfeed`)
      .then(res => res.json())
      .then(json => {
        //  console.log(json)
        this.setState({ newsFeed: json, feedReady: true })
      })
      .catch(err =>
        console.log(err))
  }

  fetchSecure() {
    this.setState({ feedReady: false })
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const idToken = localStorage.getItem('id_token')
    // if logged in, includes the authorization header
    if (!!idToken) {
      headers['Authorization'] = 'Bearer ' + idToken
    }

    fetch(`http://localhost:3001/api/secure/newsfeed`, { headers })
      .then(res => {
        if (res.status !== 401) {
          return res.json()
        }
        else return { status: res.status, statusText: res.statusText }
      })
      .then(json => {
        // console.log(json)
        json.status !== 401 ? this.setState({ newsFeed: json, feedReady: true }) : alert(json.statusText)
      })
      .catch(err => {
        console.log("Catch Block" + err)
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

          <RaisedButton label="Fetch News Secure" primary={true} onTouchTap={this.fetchSecure.bind(this)} />
          {" "}
          <RaisedButton label="Fetch News Not Secure" primary={true} onTouchTap={this.fetchNonSecure.bind(this)} />
          {" "}
          <RaisedButton label="GraphQL Secure" secondary={true} onTouchTap={this.fetchGraphqlSecure.bind(this)} />  
          {/*<Link to="/protected/using-graphql-secure">GraphQL Secure</Link>*/}
          { childNewsFeed   }
          
          
          
      </div>
    )
  }
}

export default Home;