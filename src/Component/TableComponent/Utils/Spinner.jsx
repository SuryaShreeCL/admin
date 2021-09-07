import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Loader from '../../Utils/controls/Loader'

export default class Spinner extends Component {
    render() {
        return (
            <div style={style}>
                {this.props.visible ? <Loader /> :null}
            </div>
        )
    }
}

const style={
    position: 'absolute',
    left: '50%',
    top: 'auto',
}