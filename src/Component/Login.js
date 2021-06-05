import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "../Asset/Login.css";
import GoogleBtn from "./GoogleBtn";
import { rootPath, studentPath } from "./RoutePaths";
import {connect} from 'react-redux';
import history from "./History";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {adminLogin} from "../Actions/AdminAction"
import { isEmptyString } from "./Validation";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userNameErr : "",
      password: null,
      passwordErr : "",
      error: "",
    };
  }
  componentDidMount() {
    // sessionStorage.setItem('token','false');
  }
  handleLogin = (e) => {
    let hlpTxt = "Please fill the required feild"
    isEmptyString(this.state.username) ? this.setState({userNameErr : hlpTxt}) : this.setState({userNameErr : ""})
    isEmptyString(this.state.password) ? this.setState({passwordErr : hlpTxt}) : this.setState({passwordErr : ""})
    if(!isEmptyString(this.state.username) && !isEmptyString(this.state.password)){
      let loginObj = {
        userName: this.state.username,
        password: this.state.password,
      };
      this.props.adminLogin(loginObj)
    }
  };
  componentDidUpdate(prevProps){
    if(prevProps.adminLoginDetails !== this.props.adminLoginDetails){
      if(this.props.adminLoginDetails.status === 500){
        this.setState({ error: "Invalid Username or Password" });
        console.log("fail........",this.props.adminLoginDetails)
      }else{
        window.sessionStorage.setItem("token", "true");
        window.sessionStorage.setItem("accessToken",this.props.adminLoginDetails.accessToken);
        window.sessionStorage.setItem("refreshToken",this.props.adminLoginDetails.refreshToken);
        window.sessionStorage.setItem("role", this.props.adminLoginDetails.role);
         window.sessionStorage.setItem("mentor",JSON.stringify(this.props.adminLoginDetails.Mentor))
        this.props.history.push(studentPath); 
        console.log("success.......",this.props.adminLoginDetails)
      }
        
    }
  }
  render() {
    console.log(this.props.adminLoginDetails)
    console.log(this.props)
    return (
      <div>
        <div className="root__login">
          <div className="login__container">
            <div className="login__left__container">
              <img
                src={require("../Asset/Images/ProfileBuilder.png")}
                alt="not suppotted"
              />
            </div>
            <div className="login__right__container">
              <div className="login__inner__box">
                <div className="login__header">
                  <label className="login__header__label">
                    Welcome to CareerLabs
                  </label>
                </div>
                <div className="login__body">
                  <div className="error">
                    {this.state.error.length !== 0 ? this.state.error : null}
                  </div>
                  <div className="login__text__box">
                    <TextField
                      id="Username"
                      label="Username"
                      variant="outlined"
                      helperText={this.state.userNameErr}
                      error={this.state.userNameErr.length > 0}
                      fullWidth
                      size="medium"
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </div>
                  <div className="login__text__box">                   
                     <FormControl error={this.state.passwordErr.length > 0}  variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.visibile ? "text" : "password"}
                        fullWidth
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        onKeyUp={(e) => {
                          if (e.keyCode === 13) {
                            e.preventDefault();
                            document.getElementById("login").click();
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e) =>
                                this.setState({
                                  visibile: !this.state.visibile,
                                })
                              }
                              edge="end"
                            >
                              {this.state.visibile ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText>{this.state.passwordErr}</FormHelperText>
                    </FormControl>
                  </div>
                </div>
                <div className="login__footer">
                  <div className="login__button">
                    <Button
                      id='login'
                      variant="contained"
                      color="primary"
                      onClick={this.handleLogin.bind(this)}
                    >
                      Sign in
                    </Button>
                  </div>
                  <div className="login__footer__label">
                    <label className="text-secondary">
                      Sign in with Other?
                    </label>
                  </div>
                  <GoogleBtn {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return { 
    adminLoginDetails: state.AdminReducer.adminLoginDetails,
    
  }    
}
export default connect(mapStateToProps,{adminLogin})(Login)