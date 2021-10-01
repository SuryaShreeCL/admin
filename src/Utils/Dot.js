import React, { Component } from 'react'

export default class Dot extends Component {
    render() {
        return (
            <div
            style={{
              height: "15px",
              width: "15px",
              backgroundColor: this.props.color,
              borderRadius: "50%",
            }}
          ></div>
        )
    }
}
