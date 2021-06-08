import React, { Component } from "react";
import TableComponent from "../TableComponent/TableComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import history from "../History"
import {careerTrackPath, careerTrackVideoSetPath, careerTrackVideoPath} from "../RoutePaths"
import { getCareerTrackVideoSet ,createCareerTrackVideoSet ,updateCareerTrackVideoSet } from "../../Actions/CareerTrackAction"
import { connect } from "react-redux";

export class CareerTrackVideoSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      label:'',
      openModel:false,
      name:'',
      orderNo:'',
      displayImageURL:'',
      id:'',

    };
  }

  column = [
    { title: "Order No", fieldName: "orderNo" },
    { title: "Name", fieldName: "name" },
    { title: "Display Image Url", fieldName: "displayImageURL" },
  ];

  componentDidMount(){
    this.props.getCareerTrackVideoSet(this.props.match.params.id,(response)=>{
      this.setState({data:response})
    })
  }

  doCreateCareerTrackApp=()=>{      
    //Create Career Track      
    const {name,orderNo,displayImageURL} = this.state
    let obj={        
      name:name,      
      orderNo:orderNo,
      displayImageURL:displayImageURL,
      careerTrackApp:{
        id:this.props.match.params.id
      }
    }
    this.props.createCareerTrackVideoSet(obj,(response)=>{      
      this.setState({openModel:false})
      this.props.getCareerTrackVideoSet(this.props.match.params.id,(response)=>{
        this.setState({data:response})
      })
    })    
}

doUpdateCareerTrackApp=()=>{
    // Update Career Track App
    const {name,orderNo,displayImageURL,id} = this.state
    let obj={        
      name:name,
      orderNo:orderNo,      
      displayImageURL:displayImageURL,   
      id:this.state.id,
      careerTrackApp:{
        id:this.props.match.params.id
      }
    }     
    
    this.props.updateCareerTrackVideoSet(obj,response=>{
      this.props.getCareerTrackVideoSet(this.props.match.params.id,(response)=>{
        this.setState({data:response ,openModel:false})
      })
    })
}

openUpdateModel=(data)=>{
    // Update Model
    this.setState({
        openModel:true,          
        name:data.name,
        type:data.type,
        label:'Update',
        displayImageURL: data.displayImageURL  ,
        id:data.id,      
        orderNo:data.orderNo  
    })    
}

openCreateModel = () => {
    this.setState({ openModel: true, label: "Create" ,name:'' ,displayImageURL :'' ,orderNo:'' });
  };

handleRowClick=(rowData)=>{
    this.props.history.push(careerTrackVideoPath+rowData.id)
}

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
                {/* display image url */}
                <TextField
                  label={"Display Image URL"}
                  variant={"outlined"}
                  value={this.state.displayImageURL}
                  onChange={(e) =>
                    this.setState({ displayImageURL: e.target.value })
                  }
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
          <Button color="primary" onClick={label ==='Create' ? doCreateCareerTrackApp : doUpdateCareerTrackApp}>
            {label}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { data } = this.state;
    const { column ,renderCreateModel ,openCreateModel,openUpdateModel,handleRowClick} = this;        
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
          title={"Career Track Video Set"}
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

export default connect(null,{getCareerTrackVideoSet ,createCareerTrackVideoSet ,updateCareerTrackVideoSet})(CareerTrackVideoSet)
