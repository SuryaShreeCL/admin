import { Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieCircular from "../../Asset/Images/Pie Circular.svg"
class TodayWorkCompletion extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Typography style={{fontWeight : 700}}>Today's Work Completion</Typography>
                <img style={{marginTop : "20px"}} src={PieCircular}></img>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({

})

const useStyles = () =>({
    root : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"

    }
})

export default connect(mapStateToProps, {})(withStyles(useStyles)(TodayWorkCompletion))