import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";


export default class CollapseContainer extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* Header */}
            <Grid container style={_TableTitleDesign}>
              <Grid item md={10}>
                {/* Title */}
                <div style={_TableTitle}>
                  <label style={_TableTitle.label}> {this.props.title} </label>
                </div>
              </Grid>
              <Grid item md={2}>
                {/* Collapse Button */}
                <div style={_collabseIcon}>
                  <IconButton
                    aria-label="down"
                    onClick={
                      this.props.onClick
                    }
                  >
                    {this.props.show ? (
                      <VscChevronUp />
                    ) : (
                      <VscChevronDown />
                    )}
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {(this.props.show) ?
          <Grid item md={12}>
              {this.props.children}
          </Grid>          
          : null}          
        </Grid>
      </div>
    );
  }
}

const _spacing = {
    //   padding: "10px",
  };
  const _collabseIcon = {
    textAlign: "right",
  };
  const _TableTitleDesign={    
      backgroundColor: 'whitesmoke',
  }
  const _TableTitle = {
    padding: 12,  
    label: {
      margin: 0,
    },
  };
  