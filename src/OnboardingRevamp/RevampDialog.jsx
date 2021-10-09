import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import React, { Component } from 'react'
import PrimaryButton from '../Utils/PrimaryButton';
import '../Asset/All.css'
export default class RevampDialog extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <div>
                <Dialog open={this.props.open}>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                   <DialogActions>
                   <Grid container>
                <Grid item md={12}>
                  <hr />
                </Grid>
                <Grid item md={12} align={"right"}>
                    {this.props.action}
                <PrimaryButton
                  color={"primary"}
                  variant={"text"}
                  onClick={this.props.onClose}
                  className={"button"}
                >
                  Cancel
                </PrimaryButton>
                </Grid>
              </Grid>
                   </DialogActions>
                </Dialog>
            </div>
        )
    }
}
