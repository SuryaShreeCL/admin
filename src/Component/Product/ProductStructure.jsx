import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getproductstructure,
  postproductstructure,
  putproductstructure,
} from "../../Actions/ProductAction";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PrimaryButton from "../../Utils/PrimaryButton";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ProductStructure extends Component {
  constructor() {
    super();
    this.state = {
        stepname:"",
        stepnameErr:"",
        description:"",
        descriptionErr:"",
        startMonth:new Date(),
        endMonth:new Date(),
        href:"",
        hrefErr:"",
        image:"",
        imageErr:"",
        lockimage:"",
        lockimageErr:"",
        maxtat:"",
        maxtatErr:"",
        mintatErr:"",
        mintat:"",
        rank:"",
        rankErr:"",
        open:false,
        checkedB:false
    };
  }
  componentDidMount() {
    this.props.getproductstructure();
  }
 handleClick=()=>{
     this.setState({
         open:true
     })
 }
 handleOpen=()=>{
    this.setState({
        open:true
    })
}
handelAdd=()=>{
    console.log(this.state)
    let obj=
        {
            "stepName":this.state.stepname,
            "description":this.state.description,
            "disabled":this.state.checkedB,
            "endMonth":this.state.endMonth,
            "startMonth":this.state.startMonth,
            "href":this.state.href,
            "image":this.state.image,
            "lockImg":this.state.lockimage,
            "max_tat":this.state.maxtat,
            "min_tat":this.state.mintat,
            "rank":this.state.rank,
          "parent":null,
            "product":{
                id:""
            }
        }
        // this.props.postproductstructure(obj)
}
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h5>Product Structure</h5>
          <PrimaryButton
            color={"primary"}
            variant={"contained"}
            onClick={() => this.handleOpen()}
          >
            Add
          </PrimaryButton>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <TableCell>SNo</TableCell>
                <PrimaryButton
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => this.handleClick()}
                >
                  Manage
                </PrimaryButton>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          maxWidth="md"
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  name="stepname"
                  value={this.state.stepname}
                  label="Step Name"
                  error={this.state.stepnameErr.length > 0}
                  helperText={this.state.stepnameErr}
                  onChange={(e) => this.setState({ stepname: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="description"
                  value={this.state.description}
                  label="Description"
                  error={this.state.descriptionErr.length > 0}
                  helperText={this.state.descriptionErr}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedB}
                      onChange={(e)=>this.setState({ checkedB : e.target.checked})}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Disabled"
                />
              </Grid>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM"
                    value={this.state.startMonth}
                    // onChange={handleDateChange}
                    onChange={(e, newValue) =>
                      this.setState({ startMonth: newValue })
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM"
                    value={this.state.endMonth}
                    // onChange={handleDateChange}
                    onChange={(e, newValue) =>
                      this.setState({ endMonth: newValue })
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="href"
                  value={this.state.href}
                  label="Image"
                  error={this.state.hrefErr.length > 0}
                  helperText={this.state.hrefErr}
                  onChange={(e) => this.setState({ href: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="image"
                  value={this.state.image}
                  label="Image"
                  error={this.state.imageErr.length > 0}
                  helperText={this.state.imageErr}
                  onChange={(e) => this.setState({ image: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="lockimage"
                  value={this.state.lockimage}
                  label="Lockimage"
                  error={this.state.lockimageErr.length > 0}
                  helperText={this.state.lockimageErr}
                  onChange={(e) => this.setState({ lockimage: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="maxtat"
                  value={this.state.maxtat}
                  label="Maxtat"
                  error={this.state.maxtatErr.length > 0}
                  helperText={this.state.maxtatErr}
                  onChange={(e) => this.setState({ maxtat: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="mintat"
                  value={this.state.mintat}
                  label="Mintat"
                  error={this.state.mintatErr.length > 0}
                  helperText={this.state.mintatErr}
                  onChange={(e) => this.setState({ mintat: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="rank"
                  value={this.state.rank}
                  label="Rank"
                  error={this.state.rankErr.length > 0}
                  helperText={this.state.rankErr}
                  onChange={(e) => this.setState({ rank: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
              <Autocomplete
                id="combo-box-demo"
                // options={top100Films}
                // getOptionLabel={(option) => option.title}
                // style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Product" variant="standard" />}
                />
              </Grid>
              <Grid item md={12} align="center">
                <PrimaryButton
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => this.handelAdd()}
                >
                  Add
                </PrimaryButton>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getproductstructureList: state.ProductReducer.getproductstructure,
    postproductstructureList: state.ProductReducer.postproductstructure,
    putproductstructureList: state.ProductReducer.putproductstructure,
  };
};

export default connect(mapStateToProps, {
  getproductstructure,
  postproductstructure,
  putproductstructure,
})(ProductStructure);
