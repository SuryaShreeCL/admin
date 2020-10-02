import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TextField from '@material-ui/core/TextField'
import './Asset/Login.css'
import history from '../Component/History'

export default class MLogin extends Component {
    render() {
        return (
            <div>
                <div className="login-root">
                    <div className="container login-body ">
                        <div className="left-side col-6">
                        </div>
                        <div className="right-side col-6">
                            <div className="log-in">
                                <div className="log-in-header">
                                    <label>Login</label>
                                </div>
                                <div className="log-in-body">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        className="input-field"
                                        size="small"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className="input-field"
                                        size="small"
                                    />

                                    <button className="btn btn-primary" onClick={() => history.push('/personalInfo')}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
