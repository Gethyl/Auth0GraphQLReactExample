import { AUTH_CLIENT_ID, AUTH_DOMAIN } from "../../../auth.config"
import { EventEmitter } from 'events';
import history from '../history';
import decode from "jwt-decode"
import auth0 from 'auth0-js'

export default class Auth extends EventEmitter {
    auth0 = new auth0.WebAuth({
        domain: AUTH_DOMAIN,
        clientID: AUTH_CLIENT_ID,
        redirectUrl: 'http://localhost:8080/help',
        responseType: 'token id_token',
        scope: 'openid profile'
    })


    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.loggedIn = this.loggedIn.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/protected');
            } else if (err) {
                // history.replace('/home');
                console.log(err);
            }
        });
    }

    setSession(authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Set the time that the access token will expire at
            let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);

            // let accessToken = localStorage.getItem('access_token')
            this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                if (profile) {
                    localStorage.setItem('profile', JSON.stringify(profile))
                    history.replace('/')
                }
                else {
                    console.log(err)
                }
            });
            // navigate to the home route
            
        }
    }

    setProfile(profile) {
        // Saves profile data to local storage
        const minimalProfile = {
            name: profile.name,
            nickname: profile.name,
            picture: profile.picture
        }

        localStorage.setItem('profile', JSON.stringify(minimalProfile))
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile)
    }

    getProfile() {
        // const profile = localStorage.getItem('profile')
        // if (!!profile){
        //     this.emit('profile_updated', profile)
        // }
        let accessToken = localStorage.getItem('access_token')
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                localStorage.setItem('profile', JSON.stringify(profile))
                this.emit('profile_updated', profile)
            }
            else{
                console.log(err)
            }
        });
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile')
        // navigate to the home route
        history.replace('/');
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = localStorage.getItem('id_token');
        if (!token) {
            return false
        }
        else {
            const decodedToken = decode(token)
            console.log(decodedToken.exp * 1000)
            console.log(new Date().getTime())
            if ((decodedToken.exp * 1000) < (new Date().getTime())) {
                alert("Your session has expired....logging out!!")
                this.logout()
                return false
            }
            else return true
        }

    }
}
