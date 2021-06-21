import React, { Component } from 'react'
import { connect } from 'react-redux'

 class VariantTnc extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps, {})(VariantTnc)