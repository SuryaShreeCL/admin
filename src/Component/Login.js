import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "../Asset/Login.css";
import GoogleBtn from "./GoogleBtn";
import { landingAdminPath, rootPath, studentPath } from "./RoutePaths";
import { connect } from "react-redux";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {
  adminLogin,
  clearCustomData,
  getAdminUserDepartments,
} from "../Actions/AdminAction";
import { isEmptyString } from "./Validation";
import MySnackBar from "./MySnackBar";
import DropDown from "./Controls/DropDown";
import TextFieldComponent from "./Controls/TextField";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      usernameErr: "",
      password: null,
      passwordErr: "",
      visible: false,
      department: null,
      departmentErr: "",
      snackMsg: "",
      snackOpen: false,
      snackVariant: "",
      adminUserDepartmentList: [],
    };
  }

  componentDidMount() {
    this.props.getAdminUserDepartments();
  }

  componentDidUpdate(prevProps) {
    const { adminUserDepartments } = this.props;
    if (
      adminUserDepartments &&
      adminUserDepartments !== prevProps.adminUserDepartments
    ) {
      if (adminUserDepartments.success) {
        this.setState({ adminUserDepartmentList: adminUserDepartments.data });
      } else {
        this.setState({
          snackMsg: adminUserDepartments.message,
          snackOpen: true,
          snackVariant: "error",
          adminUserDepartmentList: [],
        });
      }
      this.props.clearCustomData("adminUserDepartments");
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password, department } = this.state;
    let hlpTxt = "Please fill the required field";
    isEmptyString(username)
      ? this.setState({ usernameErr: hlpTxt })
      : this.setState({ usernameErr: "" });
    isEmptyString(password)
      ? this.setState({ passwordErr: hlpTxt })
      : this.setState({ passwordErr: "" });
    isEmptyString(department)
      ? this.setState({ departmentErr: hlpTxt })
      : this.setState({ departmentErr: "" });

    if (
      !isEmptyString(username) &&
      !isEmptyString(password) &&
      !isEmptyString(department)
    ) {
      let loginObj = {
        userName: username,
        password: password,
        department: department,
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
          window.sessionStorage.setItem("department", response.data.department);
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, [`${name}Err`]: "" });
  };

  render() {
    const {
      username,
      usernameErr,
      password,
      passwordErr,
      visible,
      department,
      departmentErr,
      snackOpen,
      snackMsg,
      snackVariant,
      adminUserDepartmentList,
    } = this.state;
    return (
      <div>
        <div className='root__login'>
          <div className='login__container'>
            <div className='login__left__container'>
              <img
                src={require("../Asset/Images/ProfileBuilder.png")}
                alt={"Not supported"}
              />
            </div>
            <div className='login__right__container'>
              <div className='login__inner__box'>
                <form onSubmit={this.handleLogin}>
                  <div className='login__header'>
                    <label className='login__header__label'>
                      {"Welcome to CareerLabs"}
                    </label>
                  </div>
                  <div className='login__body'>
                    <div className='login__text__box'>
                      <DropDown
                        id={"combo-box-demo"}
                        options={adminUserDepartmentList}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) =>
                          this.handleChange({
                            target: { name: "department", value: value?.id },
                          })
                        }
                        renderInput={(params) => (
                          <TextFieldComponent
                            {...params}
                            label={"Role"}
                            variant={"outlined"}
                            helperText={departmentErr || " "}
                            error={departmentErr.length > 0}
                          />
                        )}
                        fullWidth
                      />
                    </div>
                    <div className='login__text__box'>
                      <TextField
                        id={"Username"}
                        label={"Username"}
                        variant={"outlined"}
                        name={"username"}
                        helperText={usernameErr || " "}
                        error={usernameErr.length > 0}
                        size={"medium"}
                        value={username}
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </div>
                    <div className='login__text__box'>
                      <FormControl
                        error={passwordErr.length > 0}
                        variant='outlined'
                        fullWidth
                      >
                        <InputLabel htmlFor='outlined-adornment-password'>
                          {"Password"}
                        </InputLabel>
                        <OutlinedInput
                          id='outlined-adornment-password'
                          type={visible ? "text" : "password"}
                          fullWidth
                          value={password}
                          name={"password"}
                          onChange={this.handleChange}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={(e) =>
                                  this.setState({
                                    visible: !visible,
                                  })
                                }
                                edge='end'
                              >
                                {visible ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                        <FormHelperText>{passwordErr || " "}</FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                  <div className='login__footer'>
                    <div className='login__button'>
                      <Button
                        id={"login"}
                        variant={"contained"}
                        color={"primary"}
                        type={"submit"}
                      >
                        {"Sign in"}
                      </Button>
                    </div>
                    {/* <div className="login__footer__label">
                    <label className="text-secondary">
                      Sign in with Other?
                    </label>
                  </div>
                  <GoogleBtn {...this.props} /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <MySnackBar
          snackOpen={snackOpen}
          snackVariant={snackVariant}
          snackMsg={snackMsg}
          onClose={() => this.setState({ snackOpen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminLoginDetails: state.AdminReducer.adminLoginDetails,
    adminUserDepartments: state.AdminReducer.adminUserDepartments,
  };
};
export default connect(mapStateToProps, {
  adminLogin,
  getAdminUserDepartments,
  clearCustomData,
})(Login);
