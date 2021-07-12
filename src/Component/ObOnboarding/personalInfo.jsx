import React, { Component } from 'react'
import {
  Grid,
  TextField,
  Card,
  IconButton
} from "@material-ui/core";
import GreenTick from "../../Asset/Images/greenTick.png"
import Pencil from "../../Asset/Images/pencil.png"
import PrimaryButton from '../../Utils/PrimaryButton'

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
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'22%'}}>
            <p style={HeadStyle}>Personal Information</p>
            <img src={GreenTick} style={{height:17, width:17, position:'relative', top:5}}/>
            </div>
            <IconButton onClick={this.handlePersonalClick.bind(this)}>
            <img src={Pencil} height={17} width={17}/>
               </IconButton>           
                </div>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="CLS ID (Order ID / Student ID)" disabled={true} value={'62569'}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Client First Name" disabled={this.state.personalDisable} value={'Atharva'}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Client Last Name" disabled={this.state.personalDisable}  value={'Unde'}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Full Name" disabled={this.state.personalDisable} value={'Atharva Unde'} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Contact Number" disabled={true} value={'+919561027164'}/>
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label="Email Address" disabled={true} value={'me@atharvaunde.me'}/>
          </Grid>

          <Grid item md={2}>
          <TextField id="standard-basic" label="Alternate Contatct Number"  disabled={this.state.personalDisable} value={'+917028194457'} />
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label="Alternate Email Address" disabled={this.state.personalDisable} value={'atharva@thecareerlabs.com'}/>
          </Grid> 
          <Grid item md={8}></Grid>
       
          <Grid item md={12}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'22%'}}>
            <p style={HeadStyle}>Address Details</p>
            <img src={GreenTick} style={{height:17, width:17, position:'relative', top:5}}/>
            </div>
            <IconButton onClick={this.handleAddressClick.bind(this)}>
            <img src={Pencil} height={17} width={17}/>
               </IconButton>           
                </div>
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="Suit No, Apartment Name"  disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="Street Address 1" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="Street Address 2" disabled={this.state.addressDisable} />
          </Grid>
          {/* <Grid item md={12}>
          </Grid> */}

          <Grid item md={2}>
          <TextField id="standard-basic" label="Landmark" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Pincode" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="State" disabled={this.state.addressDisable} />
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Current city" disabled={this.state.addressDisable} />
          </Grid>

          <Grid item md={12}>
          <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <div style = {{display:"flex", flexDirection:'row', justifyContent:'space-between', width:'22%'}}>
            <p style={HeadStyle}>Social Media</p>
            <img src={GreenTick} style={{height:17, width:17, position:'relative', top:5}}/>
            </div>
            <IconButton onClick={this.handleSocialClick.bind(this)}>
            <img src={Pencil} height={17} width={17}/>
               </IconButton>
           
            </div>
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label="LinkedIn" disabled={this.state.mediaDisable} />
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label="Facebook" disabled={this.state.mediaDisable} />
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label="Twitter" disabled={this.state.mediaDisable} />
          </Grid>
          {/* <Grid item md={2}>
          <TextField id="standard-basic" label="" disabled={this.state.mediaDisable} />
          </Grid> */}
          <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                        style={{ textTransform: "none" }}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       Save Changes
                      </PrimaryButton>
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
    // fontWeight: "600",
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
