import React, { Component } from 'react'
import {
    Grid,
    Paper,
    Typography,
  } from "@material-ui/core";
  import { KeyboardBackspace, NearMe } from "@material-ui/icons";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import Dropzone from "react-dropzone";
import PrimaryButton from '../Utils/PrimaryButton'
import {connect} from 'react-redux'
import {getStudentsById} from '../Actions/Student'
import {uploadfile,getallfiles,deletefiles,viewfiles,downlaodfiles} from '../Actions/PgaAction'
import MySnackBar from './MySnackBar';
import {URL} from '../Actions/URL'
class ProfileGapAnalysisTab extends Component {
    constructor(){
        super();
        this.onDrop = (files) => {
            this.setState({ files });
          };
          this.state={
            files: [],
            fileErr: false,
            finalFile: null,
            snackMsg: "",
            snackVariant: "",
            snackOpen: false,
          }
    }
    componentDidMount(){
       this.props.getStudentsById(this.props.match.params.studentId)
       this.props.getallfiles(this.props.match.params.studentId)
    }
    componentDidUpdate(prevProps,prevState){
        if (this.state.files !== prevState.files) {
            console.log(this.state.files[0]);
            // var stuBasicData = JSON.parse(
            //   window.sessionStorage.getItem("studentBasicData")
            // );
            var name =
              this.props.getStudentsByIdList.firstName + "_" + this.props.getStudentsByIdList.lastName + "_" + "PGA"+this.props.getallfilesList.length;
            var file = this.state.files[0];
      
            var indexOf = file.type.indexOf("/");
            var newFileType = file.type.substr(indexOf + 1);
      
            var blob = new Blob([file], { type: newFileType });
            console.log(blob);
      
            var newFile = new File(
              [blob],
              name
                .concat(".", newFileType)
                .replace(
                  "vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "docx"
                ),
              { type: newFileType }
            );
            console.log("NEW FILE..................", newFile);
            console.log("NEW FILE TYPE..................", newFileType);
            this.setState({
              finalFile: newFile,
            });
          }
          if(this.props.uploadfileList !== prevProps.uploadfileList){
            this.props.getallfiles(this.props.match.params.studentId)
          }
          if(this.props.deletefilesList !== prevProps.deletefilesList){
            this.props.getallfiles(this.props.match.params.studentId)
          }
    }
    handleUpload=()=>{
        if(this.state.finalFile !== null){
            let product = JSON.parse(window.sessionStorage.getItem("adminLinkedProduct")) 
            let productid =  product.products[0].id
            let name = product.name
            // console.log(name)
            console.log(this.state.finalFile.name)
            let index = this.state.finalFile.name.indexOf(".")
            let filename = this.state.finalFile.name.substring(0,index)
            console.log(filename)
              let d = new FormData();
                d.append('file', this.state.finalFile);
                console.log(d)
            this.props.uploadfile(this.props.match.params.studentId,productid,name,filename,d)
            this.setState({
                snackMsg : "Uploaded Successfully",
                snackOpen : true,
                snackVariant : "success"
            })
        }
        else{
            this.setState({
                fileErr : "PLease Fill"
            })
        }
    }
    handleDelete=(event,data)=>{
        console.log(data)
        this.props.deletefiles(this.props.match.params.studentId,data.fileName)
        this.setState({
          snackMsg : "Deleted Successfully",
          snackOpen: true,
          snackVariant : "success"
        })
        event.stopPropagation()
    }
    handleView=(event,data)=>{
        console.log(data)
        // this.props.downlaodfiles(this.props.match.params.studentId,data.fileName)
        window.open(URL+"/api/v1/pgaDownload/"+this.props.match.params.studentId+"/"+data.fileName)
    }
    render() {
        console.log(this.props)
        const files =
      this.state.finalFile !== null ? (
        <li key={this.state.finalFile.name}>
          {this.state.finalFile.name} - {this.state.finalFile.size} bytes
        </li>
      ) : null;
        return (
            <div>
                <Typography style={{margin:"1%"}}>Profile Gap Analysis</Typography>
                <Grid container spacing={2}>
                 <Grid item md={6} sm={12} xs={12}>
                 <Grid container spacing={2}>
                        <Grid item md={12}>
                        <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        style={{
                          height: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          border: "1px dashed #1093FF",
                        }}
                        {...getRootProps({ className: "dropzone" })}
                      >
                        <input {...getInputProps()} />
                        <PublishRoundedIcon color="primary" />
                      </div>
                      <Typography
                        style={{
                          paddingTop: "5px",
                          display: this.state.fileErr ? "block" : "none",
                        }}
                        variant={"body2"}
                        color={"secondary"}
                      >
                        Please Upload Your File
                      </Typography>
                      <aside>
                        <p
                          style={{
                            color: "#686868",
                            fontFamily: "Montserrat",
                          }}
                        >
                          File Size: less than 1MB | Formatted: PDF{" "}
                        </p>
                        <h6>Files</h6>
                        <ul>{this.state.finalFile !== null ? files : null}</ul>
                      </aside>
                    </section>
                  )}
                </Dropzone>
                        </Grid>
                        <Grid item md={12} align="center">
                            <PrimaryButton style={{width:"100px"}} size={"small"} color={"Primary"} variant={"contained"} onClick={()=>this.handleUpload()}>Upload</PrimaryButton>
                        </Grid>
                    </Grid>
               
              </Grid>
              <Grid item md={6}>
                  <Grid container spacing={2}>
                    {this.props.getallfilesList.map(eachdata => {
                       let date = new Date(eachdata.uploadedAt).getDate()
                       let month = new Date(eachdata.uploadedAt).getMonth()
                       let year = new Date(eachdata.uploadedAt).getFullYear()
                       var months = ["January", "Febuary", "March", "April", "May", "June", "July","August","September","October","November","December"];
                       var monthname = months[month];
                       let finaldate = date+" "+monthname+" "+year
                      return(
                      <Grid item md={12}>
                        <Paper variant="outlined" style={{width : "90%", padding : "3%"}} onClick={(event)=>this.handleView(event,eachdata)}>
                          <Grid container>
                              <Grid item md={8}>
                                  <div style={{display:"flex",flexDirection:"column"}}>
                                  <Typography style={{color:"#0645AD"}}>
                                  {eachdata.reportTitle}
                                  </Typography>
                                  <Typography>
                                  Last updated : {finaldate}
                                  </Typography>
                                  </div>
                              </Grid>
                              <Grid item md={4}>
                                  <PrimaryButton style={{width:"100px",height:"30px"}} variant={"outlined"} color={"secondary"} onClick={(event)=>this.handleDelete(event,eachdata)}>Delete</PrimaryButton>
                              </Grid>
                          </Grid>
                    </Paper>
                        </Grid>
                      )
                    })}
                  </Grid>
                
              </Grid>
                </Grid>
                <MySnackBar 
                   snackMsg={this.state.snackMsg}
                   snackVariant={this.state.snackVariant}
                   snackOpen={this.state.snackOpen}
                   onClose={() => this.setState({ snackOpen: false })}
                />
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        getStudentsByIdList : state.StudentReducer.StudentList,
        uploadfileList : state.PgaReducer.uploadfile,
        getallfilesList : state.PgaReducer.getallfiles,
        deletefilesList : state.PgaReducer.deletefiles,
        viewfilesList : state.PgaReducer.viewfiles,
        downlaodfilesList : state.PgaReducer.downlaodfiles
    }
}
export default connect(mapStateToProps,{getStudentsById,uploadfile,getallfiles,deletefiles,viewfiles,downlaodfiles})(ProfileGapAnalysisTab)

