import React, { Component } from 'react'

export default class Dot extends Component {
    render() {
        return (
            <div
            style={{
              height: "11px",
              width: "11px",
              backgroundColor: this.props.color,
              borderRadius: "50%",
            }}
          ></div>
        )
    }
}
