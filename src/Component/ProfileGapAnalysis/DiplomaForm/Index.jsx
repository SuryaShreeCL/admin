import React, { Component } from 'react'
import MarkSheetUpload from './MarkSheetUpload';
import ViewDetails from './ViewDetails';

export default class Index extends Component {
    render() {
        return (
            <div>
                <ViewDetails/>
                <MarkSheetUpload/>
                
            </div>
        )
    }
}
