import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

export default class Footer extends Component {
  render() {      
      const {buttonName,buttonText,onSave,onCancel}=this.props
    return (
      <div>
        <Grid container spacing={3} >
            <Grid item style={{flex:1}} ></Grid>          
            <Grid item>
            <Button variant="contained" color="secondary" onClick={onCancel} >
              Cancel
            </Button>
          </Grid>
          <Grid item>              
            <Button variant="contained" color="primary" name={buttonName} onClick={onSave} >
              {buttonText}
            </Button>
          </Grid>          
        </Grid>
      </div>
    );
  }
}
