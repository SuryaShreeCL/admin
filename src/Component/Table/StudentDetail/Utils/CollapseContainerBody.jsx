import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";

export default class CollapseContainerBody extends Component {
  render() {
    return (    
             <>                                              
                <Grid
                  item
                  md={
                    this.props.keyRow !== undefined || this.props.keyRow !== ""
                      ? this.props.keyRow
                      : "6"
                  }
                  className="_label"
                >
                  <label> {this.props.keyName} </label>
                </Grid>
                <Grid
                  item
                  md={
                    this.props.valueRow !== undefined ||
                    this.props.valueRow !== ""
                      ? this.props.valueRow
                      : "6"
                  }
                  className="_value"
                >
                  <label>{this.props.value}</label>
                </Grid>                                                
                </>
    );
  }
}

const _spacing = {
  //   padding: "10px",
};
const _collabseIcon = {
  textAlign: "right",
};
const _TableTitleDesign = {
  backgroundColor: "whitesmoke",
};
const _TableTitle = {
  padding: 12,
  label: {
    margin: 0,
  },
};
