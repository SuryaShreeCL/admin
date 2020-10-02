import React, { Component } from 'react'
import College from './College'
import FieldOfStudy from './FieldOfStudy'
import Personality from './Personality'
export default class Content extends Component {
    render() {
        return (
            <div>
                <div className='right-body-container'>
                    <Personality />
                </div>
            </div>
        )
    }
}
