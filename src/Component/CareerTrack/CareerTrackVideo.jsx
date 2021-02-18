import React, { Component } from "react";
import TableComponent from "../TableComponent/TableComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {getCareerTrackVideo ,createCareerTrackVideo ,updateCareerTrackVideo} from "../../Actions/CareerTrackAction"
import { connect } from "react-redux";

export class CareerTrackVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      label: "",
      openModel: false,
      name: "",
      orderNo: "",
      videoUrl:"",
      duration:0,
      displayImageURL: "",
      id:"",
    };
  }

  column = [
    { title: "Order No", fieldName: "orderNo" },
    { title: "Name", fieldName: "name" },
    { title: "Video Url", fieldName: "videoUrl" },
    { title: "Duration", fieldName: "duration" },    
  ];


  componentDidMount(){
    this.props.getCareerTrackVideo(this.props.match.params.id,(response)=>{      
      this.setState({data:response})  
    })    
  }

  doCreateCareerTrackApp = () => {
    //Create Career Track
    const { name, orderNo, videoUrl, duration } = this.state;
    let obj = {
      name: name,
      orderNo: orderNo,
      videoUrl: videoUrl,
      duration : duration,
      careerTrackVideoSet:{
        id:this.props.match.params.id
      }      
    };  
    
    this.props.createCareerTrackVideo(obj,res=>{
      this.props.getCareerTrackVideo(this.props.match.params.id,(response)=>{      
        this.setState({data:response,openModel:false})  
      }) 
    })

  };

  doUpdateCareerTrackApp = () => {
    // Update Career Track App
    const { name, orderNo, videoUrl, duration ,id} = this.state;
    let obj = {
      name: name,
      orderNo: orderNo,
      videoUrl: videoUrl,
      duration : duration,
      careerTrackVideoSet:{
        id:this.props.match.params.id
      },           
      id:id,
    };
    
    this.props.updateCareerTrackVideo(obj,response=>{
      this.props.getCareerTrackVideo(this.props.match.params.id,(response)=>{      
        this.setState({data:response,openModel:false})  
      })
    })
  };

  openUpdateModel = (data) => {
    // Update Model
    this.setState({
      openModel: true,
      name: data.name,
      orderNo : data.orderNo,
      label: "Update",
      videoUrl: data.videoUrl,
      duration : data.duration,
      id:data.id,
    });
  };

  openCreateModel = () => {
    this.setState({
      openModel: true,
      label: "Create",
      name: "",
      videoUrl: "",
      duration : "",
      orderNo: "",
    });
  };

  handleRowClick = (rowData) => {
    //   history.push(careerTrackPath+careerTrackVideoPath+"/"+rowData.id)
  };

  renderCreateModel = () => {
    const { openModel, label } = this.state;
    const { doCreateCareerTrackApp ,doUpdateCareerTrackApp } = this;
    return (
      <Dialog
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="max-width-dialog-title"
        open={openModel}
      >
        <DialogTitle id="max-width-dialog-title">{label}</DialogTitle>

        <DialogContent>
          <form noValidate>
            <Grid container spacing={2}>
              {/* Order No */}
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  label={"Order No"}
                  variant={"outlined"}
                  value={this.state.orderNo}
                  onChange={(e) => this.setState({ orderNo: e.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                {/* Name */}
                <TextField
                  label={"Name"}
                  variant={"outlined"}
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                {/* videoUrl */}
                <TextField
                  label={"Video URL"}
                  variant={"outlined"}
                  value={this.state.videoUrl}
                  onChange={(e) => this.setState({ videoUrl: e.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                {/* duration */}
                <TextField
                  label={"Duration"}
                  variant={"outlined"}
                  value={this.state.duration}
                  onChange={(e) => this.setState({ duration: e.target.value })}
                  fullWidth
                />
              </Grid>
              
                                          

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={(e) => this.setState({ openModel: false })}
          >
            Close
          </Button>
          <Button color="primary" onClick={label==='Create' ? doCreateCareerTrackApp : doUpdateCareerTrackApp}>
            {label}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { data } = this.state;
    const {
      column,
      renderCreateModel,
      openCreateModel,
      openUpdateModel,
      handleRowClick,
    } = this;

    return (
      <div>
        {/* <TableComponent
          title={"Career Track"}
          data={careerTrackAppList.length !== 0 ? careerTrackAppList : null}
          cols={column}
          add={true}
          action={true}
          onEdit={true}
          onDelete={true}
          // Actions
          onAddClick={openCreateModel}
          onEditClick={openUpdateModel}
          onRowClick={handleRowClick}

          // Paginate
          paginate={()=>{}}
          totalCount={careerTrackAppList.length}          
          pageCount={careerTrackAppList.length}

        /> */}
        <TableComponent
          title={"Career Track Video"}
          data={data.length !== 0 ? data : null}
          cols={column}
          add={true}
          action={true}
          onEdit={true}
          onDelete={true}
          // Actions
          onAddClick={openCreateModel}
          onEditClick={openUpdateModel}
          onRowClick={handleRowClick}
        />

        {renderCreateModel()}
      </div>
    );
  }
}

export default connect(null,{getCareerTrackVideo ,createCareerTrackVideo ,updateCareerTrackVideo})(CareerTrackVideo)