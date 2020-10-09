import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { rootPath, rootLoginPath } from './RoutePaths';


const CLIENT_ID = '600213633260-k6htkib69gu2bkma46jmvalot4h7m4hr.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));      
      window.sessionStorage.setItem('token','true');
      this.props.history.push(rootPath);          
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));    
    window.sessionStorage.setItem('token','false'); 
    this.props.history.push(rootLoginPath);       
  }

  handleLoginFailure (response) {
     alert('Failed to log in')
  }

  handleLogoutFailure (response) {
     alert('Failed to log out')
  }

  render() {          
    console.log(sessionStorage.getItem('token'))  
    return (
    <div>
      { (window.sessionStorage.getItem('token')==='true') ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Google Account'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }      

    </div>
    )
  }
}

export default GoogleBtn;