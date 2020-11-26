import React, { Component } from 'react'
import TableComponent from './TableComponent'

export default class Index extends Component {
    render() {
        return (
            <div>
                {/* Table Component */}
                <TableComponent {...this.props} />
            </div>
        )
    }
}
