import { Card , Button} from "@material-ui/core";
import React, { Component } from "react";
import {deleteDocument, getDocumentList} from "../../Actions/Student";
import {connect} from "react-redux"

class DoccumentCard extends Component {

  handleSave = () => {
      this.props.deleteDocument(this.props.studentid,this.props.certificate)
      this.props.getDocumentList(this.props.studentid)
  }
  
  render() {
    let date = new Date(this.props.date).getDate()
    let month = new Date(this.props.date).getMonth()
    let year = new Date(this.props.date).getFullYear()
    

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
                var monthName = months[month];
                let newDate = date + " " +monthName+" "+ year

                const {deletebtn} =style;

                console.log(this.props.studentid)

    return (

      <div style={{marginBottom:20, marginLeft:10}}>
        <Card
          style={{
            height: "80px",
            maxWidth: "300px",
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
                fontSize: "16px",
                color: "#052A4E",
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
          <div>
               <Button
                        href="#text-buttons"
                        color="secondary"
                        style={deletebtn}
                        onClick={() => this.handleSave()}
                      >
                        Delete
                      </Button>
          </div>
        </Card>
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

  };
};
export default  connect(mapStateToProps, {
  deleteDocument,
  getDocumentList
})(DoccumentCard);
