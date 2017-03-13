import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'
import decode from "jwt-decode"
import { hashHistory } from 'react-router'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      languageDictionary: {
        title: "Login using Google"
      },
      auth: {
        autoParseHash: true,
        redirectUrl: 'http://localhost:8080/#/login',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))

    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    hashHistory.replace('/home')

    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        console.log(profile)
        this.setProfile(profile)
      }
    })
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    if (!token) {
      return false
    }
    else {
      const decodedToken = decode(token)
      console.log(decodedToken.exp * 1000)
      console.log(new Date().getTime())
      if ((decodedToken.exp * 1000) < (new Date().getTime())){
        alert("Your session has expired....logging out!!")
        this.logout()
        return false
      }
      else return true
    }
    
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  setProfile(profile) {
    // Saves profile data to local storage
    const minimalProfile = {
      name:profile.name,
      nickname:profile.name,
      picture:profile.picture
    }

    localStorage.setItem('profile', JSON.stringify(minimalProfile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    hashHistory.replace('/login')
  }
}