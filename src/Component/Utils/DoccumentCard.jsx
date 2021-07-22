import { Card } from "@material-ui/core";
import React, { Component } from "react";

export class DoccumentCard extends Component {
  render() {
    return (
      <div style={{marginBottom:20, marginLeft:10}}>
        <Card
          style={{
            height: "80px",
            maxWidth: "300px",
            width: "100%",
            boxShadow: " 0px 8px 7px rgba(183, 222, 255, 0.5)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <p
              style={{
                fontStyle: "Montserrat",
                fontWeight: "400",
                fontStyle: "normal",
                fontSize: "16px",
                color: "#052A4E",
              }}
            >
              PC Certificate.pdf
            </p>
            <p
              style={{
                fontStyle: "Montserrat",
                fontWeight: "400",
                fontStyle: "normal",
                fontSize: "14px",
                color: "#686868",
              }}
            >
              Uploaded on: 01 Feb 20
            </p>
          </div>
        </Card>
      </div>
    );
  }
}

export default DoccumentCard;
