import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class Spinner extends Component {
    render() {
        return (
            <div style={style}>
                {this.props.visible ? <CircularProgress /> :null}
            </div>
        )
    }
}

const style={
    position: 'absolute',
    left: '50%',
    top: 'auto',
}