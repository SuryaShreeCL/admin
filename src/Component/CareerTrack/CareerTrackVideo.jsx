import React, { Component } from "react";
import TableComponent from "../TableComponent/TableComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default class CareerTrackVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "29cf2526-f1d0-40e2-95e5-d04f1c049c75",
          name: "Skills Required",
          orderNo: 10,
          videoUrl:
            "https://player.vimeo.com/external/371357696.hd.mp4?s=c78ef887961bc20cf38aba675dea3bbc8ae11162&profile_id=175",
          duration: 50.0,
          careerTrackVideoSet: {
            id: "39b64faf-627c-4ee8-91ef-9b09f2362bde",
          },
        },
        {
          id: "29cf2526-f1d0-40e2-95e5-d04f1c049c75",
          name: "Skills Required",
          orderNo: 10,
          videoUrl:
            "https://player.vimeo.com/external/371357696.hd.mp4?s=c78ef887961bc20cf38aba675dea3bbc8ae11162&profile_id=175",
          duration: 50.0,
          careerTrackVideoSet: {
            id: "39b64faf-627c-4ee8-91ef-9b09f2362bde",
          },
        },
      ],
      label: "",
      openModel: false,
      name: "",
      orderNo: "",
      videoUrl:"",
      duration:0,
      displayImageURL: "",
    };
  }

  column = [
    { title: "Order No", fieldName: "orderNo" },
    { title: "Name", fieldName: "name" },
    { title: "Video Url", fieldName: "videoUrl" },
    { title: "Duration", fieldName: "duration" },
    { title: "Career track videoset ID", fieldName: "careerTrackVideoSet.id" },
  ];

  doCreateCareerTrackApp = () => {
    //Create Career Track
    const { name, orderNo, videoUrl, duration } = this.state;
    let obj = {
      name: name,
      orderNo: orderNo,
      videoUrl: videoUrl,
      duration : duration,
    };
    console.log("data is created", obj);
  };

  doUpdateCareerTrackApp = () => {
    // Update Career Track App
    const { name, orderNo, videoUrl, duration } = this.state;
    let obj = {
      name: name,
      orderNo: orderNo,
      videoUrl: videoUrl,
      duration : duration,
    };
    console.log("Data is updated", obj)
  };

  openUpdateModel = (data) => {
    // Update Model
    this.setState({
      openModel: true,
      name: data.name,
      orderNo : data.orderNo,
      label: "Update",
      videoUrl: data.videoUrl,
      duration : data.duration
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
    const { doCreateCareerTrackApp } = this;
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
          <Button color="primary" onClick={doCreateCareerTrackApp}>
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
