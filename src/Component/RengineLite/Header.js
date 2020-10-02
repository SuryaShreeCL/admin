import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

export default class Header extends Component {
    render() {
        return (
            <div>
                 <AppBar>
                    <Toolbar>Career Lab</Toolbar>
                </AppBar>
            </div>
        )
    }
}
