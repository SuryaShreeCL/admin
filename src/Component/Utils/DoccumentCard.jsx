import { Card , Button} from "@material-ui/core";
import React, { Component } from "react";
import {deleteDocument, getDocumentList, deleteDocumentGraduate, getStudentsById} from "../../Actions/Student";
import { getgmatscore, getgrescore, getieltsscore, gettoeflscore} from "../../Actions/Calldetails";
import {connect} from "react-redux"
import Mysnack from "../MySnackBar";
import { ErrorMessage } from "../Validation";
class DoccumentCard extends Component {
  constructor(){
    super();
    this.state={
      snackmsg : "",
      snackvariant:"",
      snackopen : false
    }
  }
  componentDidMount(){
    this.props.getgrescore(this.props.studentid);
    this.props.getgmatscore(this.props.studentid);
    this.props.getieltsscore(this.props.studentid);
    this.props.gettoeflscore(this.props.studentid);
  }
  handleSave = (event) => {
    if(this.props.category === 'Toefl'){
      this.props.deleteDocumentGraduate(this.props.studentid,this.props.path, this.props.id, "tofel")
    }
    if(this.props.category === 'Gre'){
      this.props.deleteDocumentGraduate(this.props.studentid,this.props.path, this.props.id, "gre")
    }
    if(this.props.category === 'Gmat'){
      this.props.deleteDocumentGraduate(this.props.studentid,this.props.path, this.props.id, "gmat")
    }
    if(this.props.category === 'Ielts'){
      this.props.deleteDocumentGraduate(this.props.studentid,this.props.path, this.props.id, "ielts")
    }
    if(!this.props.category){
      console.log(this.props)
        this.props.deleteDocument(this.props.studentid,this.props.path,(response => {
          if(response.status === 200){
            this.setState({
              snackmsg : "Document Deleted",
              snackopen : true,
              snackvariant: "success"
            })
          }
          else {
            this.setState({
              snackmsg : ErrorMessage.NetworkError,
              snackopen : true,
              snackvariant: "error"
            })
          }
        }))
    }
      
      // this.setState({
      //     snackmsg : "Document Deleted",
      //     snackopen : true,
      //     snackvariant: "success"
      //   })
        this.props.getDocumentList(this.props.studentid) 
        event.stopPropagation();

  }
  
  render() {
    let date = new Date(this.props.date).getDate()
    let month = new Date(this.props.date).getMonth()
    let year = new Date(this.props.date).getFullYear()
    console.log(this.props)

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
                var monthName = months[month];
                let newDate = date + " " +monthName+" "+ year

                const {deletebtn} =style;


    return (

      <div style={{marginBottom:20, marginLeft:10}}>
        <Card
          style={{
            height: "80px",
            maxWidth: "330px",
            width: "100%",
            boxShadow: " 0px 8px 7px rgba(183, 222, 255, 0.5)",
            borderRadius: 8,
            display:'flex', flexDirection:'row'
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
                fontSize: "14px",
                color: "#052A4E",
                marginTop:"10px"
              }}
            >
              {this.props.certificate}
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
             Uploaded On: {newDate}
            </p>
          </div>
          {!this.props.status &&
            <div>
                   <Button
                        href="#text-buttons"
                        color="secondary"
                        style={deletebtn}
                        onClick={(event) => this.handleSave(event)}
                      >
                        Delete
                      </Button>
          </div> }
         
        </Card>
        <Mysnack
          snackMsg={this.state.snackmsg}
          snackVariant={this.state.snackvariant}
          snackOpen={this.state.snackopen}
          onClose={() => this.setState({ snackopen: false })}
        />
      </div>
    );
  }
}
const style = {
          deletebtn:{
          color: "red",
          fontWeight: "500",
          fontSize: "14px",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          textTransform: "none",
          textDecorationLine: "underline",
  }
};
const mapStateToProps = (state) => {
  return {
    deleteDocumentList : state.StudentReducer.deleteDocument,
    getAllDocumentList: state.StudentReducer.getDocumentList,
    deleteDocumentGraduateList: state.StudentReducer.deleteDocumentGraduate,
    getgrescoreList: state.CallReducer.getgrescore,
    getieltsscoreList: state.CallReducer.getieltsscore,
    gettoeflscoreList: state.CallReducer.gettoeflscore,
    getgmatscoreList: state.CallReducer.getgmatscore,
    getStudentsByIdList : state.StudentReducer.StudentList,
  };
};
export default  connect(mapStateToProps, {
  deleteDocument,
  getDocumentList,
  deleteDocumentGraduate,
  getgrescore,
  getgmatscore,
  gettoeflscore,
  getieltsscore,
  getStudentsById,
})(DoccumentCard);
