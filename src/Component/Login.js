import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "../Asset/Login.css";
import GoogleBtn from "./GoogleBtn";
import { landingAdminPath, rootPath, studentPath } from "./RoutePaths";
import { connect } from "react-redux";
import history from "./History";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { adminLogin } from "../Actions/AdminAction";
import { isEmptyString } from "./Validation";
import MySnackBar from "./MySnackBar";
import DropDown from "./Controls/DropDown";
import TextFieldComponent from "./Controls/TextField";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userNameErr: "",
      password: null,
      passwordErr: "",
      error: "",
      snackMsg: "",
      snackOpen: false,
      snackVariant: "",
    };
  }
  componentDidMount() {
    // sessionStorage.setItem('token','false');
  }
  handleLogin = (e) => {
    let hlpTxt = "Please fill the required field";
    isEmptyString(this.state.username)
      ? this.setState({ userNameErr: hlpTxt })
      : this.setState({ userNameErr: "" });
    isEmptyString(this.state.password)
      ? this.setState({ passwordErr: hlpTxt })
      : this.setState({ passwordErr: "" });
    if (
      !isEmptyString(this.state.username) &&
      !isEmptyString(this.state.password)
    ) {
      let loginObj = {
        userName: this.state.username,
        password: this.state.password,
      };
      this.props.adminLogin(loginObj, (response) => {
        if (response.status === 200) {
          window.sessionStorage.setItem("token", "true");
          window.sessionStorage.setItem(
            "accessToken",
            response.data.accessToken
          );
          window.sessionStorage.setItem(
            "refreshToken",
            response.data.refreshToken
          );
          window.sessionStorage.setItem("role", response.data.role);
          window.sessionStorage.setItem(
            "mentor",
            JSON.stringify(response.data.Mentor)
          );
          window.sessionStorage.setItem(
            "adminUserId",
            response.data.AdminUsers
          );
          this.props.history.push(landingAdminPath);
        } else {
          this.setState({
            snackMsg:
              response.response && response.response.data.message
                ? response.response.data.message
                : response.message,
            snackOpen: true,
            snackVariant: "error",
          });
        }
      });
    }
  };

  render() {
    //
    //
    return (
      <div>
        <div className='root__login'>
          <div className='login__container'>
            <div className='login__left__container'>
              <img
                src={require("../Asset/Images/ProfileBuilder.png")}
                alt='not suppotted'
              />
            </div>
            <div className='login__right__container'>
              <div className='login__inner__box'>
                <div className='login__header'>
                  <label className='login__header__label'>
                    Welcome to CareerLabs
                  </label>
                </div>
                <div className='login__body'>
                  <div className='error'>
                    {this.state.error.length !== 0 ? this.state.error : null}
                  </div>
                  <div className='login__text__box'>
                    <DropDown
                      id={"combo-box-demo"}
                      options={[]}
                      // getOptionLabel={(option) => option.name}
                      // value={eachItem.pgaAdditionalPoint}
                      // onChange={(e, value) =>
                      //   handleAdditionalPointChange(value, index)
                      // }
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          label={"Role"}
                          variant={"outlined"}
                        />
                      )}
                    />
                  </div>
                  <div className='login__text__box'>
                    <TextField
                      id='Username'
                      label='Username'
                      variant='outlined'
                      helperText={this.state.userNameErr}
                      error={this.state.userNameErr.length > 0}
                      fullWidth
                      size='medium'
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </div>
                  <div className='login__text__box'>
                    <FormControl
                      error={this.state.passwordErr.length > 0}
                      variant='outlined'
                      fullWidth
                    >
                      <InputLabel htmlFor='outlined-adornment-password'>
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-password'
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
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={(e) =>
                                this.setState({
                                  visibile: !this.state.visibile,
                                })
                              }
                              edge='end'
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
                <div className='login__footer'>
                  <div className='login__button'>
                    <Button
                      id='login'
                      variant='contained'
                      color='primary'
                      onClick={this.handleLogin.bind(this)}
                    >
                      Sign in
                    </Button>
                  </div>
                  {/* <div className="login__footer__label">
                    <label className="text-secondary">
                      Sign in with Other?
                    </label>
                  </div>
                  <GoogleBtn {...this.props} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <MySnackBar
          snackOpen={this.state.snackOpen}
          snackVariant={this.state.snackVariant}
          snackMsg={this.state.snackMsg}
          onClose={() => this.setState({ snackOpen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminLoginDetails: state.AdminReducer.adminLoginDetails,
  };
};
export default connect(mapStateToProps, { adminLogin })(Login);
