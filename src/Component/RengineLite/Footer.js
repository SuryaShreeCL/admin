import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div className='item-footer'>
                    <Button variant="outlined" color="primary" small='small' className='item-btn' >Previous</Button>
                    <Button variant="contained" color="primary" small='small' className='item-btn' onClick={(e) => this.handleClick()}>Next</Button>
                </div>
            </div>
        )
    }
}
