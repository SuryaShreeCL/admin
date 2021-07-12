import React, { Component } from 'react'
import {
  Grid,
  TextField,
  Card,
  IconButton
} from "@material-ui/core";
import GreenTick from "../../Asset/Images/greenTick.png"
import Pencil from "../../Asset/Images/pencil.png"

export class personalInfo extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      personalDisable: true,
      addressDisable: true,
      mediaDisable: true,
  }
}


  handlePersonalClick(e) {
    this.setState({ personalDisable: !this.state.personalDisable })
  }

  handleAddressClick(e) {
    this.setState({ addressDisable: !this.state.addressDisable })
  }

  handleSocialClick(e) {
    this.setState({ mediaDisable: !this.state.mediaDisable })
  }

    render() {
      const { HeadStyle, HeadDisplay } = style;
        return (
            <div>
              <Card style={{padding:25}}>
        <Grid container spacing={3}>
          <Grid item md={12}>
          <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'25%'}}>
            <p style={HeadStyle}>Personal Information</p>
            <img src={GreenTick} style={{height:17, width:17, position:'relative', top:5}}/>
            </div>
            <IconButton onClick={this.handlePersonalClick.bind(this)}>
            <img src={Pencil} height={17} width={17}/>
               </IconButton>           
                </div>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="CLS ID (Order ID / Student ID)" disabled={this.state.personalDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Client First Name" disabled={this.state.personalDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Client Last Name" disabled={this.state.personalDisable}  />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Full Name" disabled={this.state.personalDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Contact Number" disabled={this.state.personalDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Email Address" disabled={this.state.personalDisable}  />
          </Grid>

          <Grid item md={2}>
          <TextField id="standard-basic" label="Alternate Contatct Number"  disabled={this.state.personalDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Alternate Email Address" disabled={this.state.personalDisable} />
          </Grid> 
          <Grid item md={8}></Grid>
       
          <Grid item md={12}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'25%'}}>
            <p style={HeadStyle}>Address Details</p>
            <img src={GreenTick} style={{height:17, width:17, position:'relative', top:5}}/>
            </div>
            <IconButton onClick={this.handleAddressClick.bind(this)}>
            <img src={Pencil} height={17} width={17}/>
               </IconButton>            </div>
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label=""  disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable} />
          </Grid>
          {/* <Grid item md={12}>
          </Grid> */}

          <Grid item md={4}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.addressDisable}  />
          </Grid>

          <Grid item md={12}>
          <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'25%'}}>
            <p style={HeadStyle}>Social Media</p>
            <img src={GreenTick} style={{height:17, width:17, position:'relative', top:5}}/>
            </div>
            <IconButton onClick={this.handleSocialClick.bind(this)}>
            <img src={Pencil} height={17} width={17}/>
               </IconButton>
           
            </div>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.mediaDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.mediaDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.mediaDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.mediaDisable} />
          </Grid>

          {/* <Grid item md={12}>
          </Grid>
          <Grid item md={12}>
          </Grid> */}
        </Grid>
        </Card>
      </div>
        )
    }
}
const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width:'100%',
    justifyContent:'space-between',
    padding:20
  }
};
export default personalInfo
