import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid,Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { viewscoredetails } from '../Actions/ScoreDetails';
import { Component } from 'react';
import { connect } from "react-redux";
     
    //  props.viewscoredetails(props.id);
    // console.log(props.viewScoreDetailsList)
    class ScoreDetails extends Component{
      constructor(props){
        super(props);
        this.state ={

        }
      }
      
        componentDidMount(){
          this.props.viewscoredetails(this.props.id)
        }
        render(){
          console.log(this.props.viewScoreDetailsList)
    return(
           <div>
             <h1>Score Details</h1>
             <h6> {this.props.viewScoreDetailsList.map(mark=><li>{mark.questionSetName}:{mark.score}</li>)}</h6>
           </div>   
    );
 }}
 const mapStateToProps = (state) => {
    console.log(state)
    
    return {
   viewScoreDetailsList :state.ScoreDetailsReducer.viewScoreDetailsList
    };        
  };
  
  export default connect(mapStateToProps,{
    viewscoredetails
  })(ScoreDetails);
