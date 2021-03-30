import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import * as service from "../../api/service";
import RandomCrafts from "../RandomCrafts";
import Profile from '../Profile'

class Auth extends Component {
  responseGoogle = (response) => {
    service.logIn(response).then((user) => {
      this.props.setUser(user);
    });
  };

  render() {
   
    return (
      <div>

      {!this.props.user.email &&  <div>

            <div>
            <h3>Sign up/Log in</h3>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_KEY}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>

            <RandomCrafts/>
          </div>
          }

          {/* {this.props.user.email && this.props.history.push('/profile')} */}

          
        
      
      
        
      </div>
    );
  }
}

export default Auth;
