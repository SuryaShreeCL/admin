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
import {isEmptyString} from '../../Component/Validation'

export class personalInfo extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      personalDisable: true,
      addressDisable: true,
      mediaDisable: true,
      firstName:'',
      firstNameErr:'',
      lastName:'',
      lastNameErr:'',
      fullName:'',
      fullNameErr:'',
      altPhone:'',
      altPhoneErr:'',
      altEmail:'',
      altEmailErr:'',
      apartmentName:'',
      apartmentNameErr:'',
      address1:'',
      address1Err:'',
      address2:'',
      address2Err:'',
      landmark:'',
      landmarkErr:'',
      pincode:'',
      pincodeErr:'',
      state:'',
      stateErr:'',
      city:'',
      cityErr:'',
      
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
   handleSave = () => {
    // let hlptxt = "Please fill the required field";
    // isEmptyString(this.state.firstName)
    // ? this.setState({ firstNameErr: hlptxt })
    // : this.setState({ firstNameErr: "" });
    // this.state.lastName === ""
    // ? this.setState({ lastNameErr: hlptxt })
    // : this.setState({ lastNameErr: "" });
    // this.state.fullName === ""
    // ? this.setState({ fullNameErr: hlptxt })
    // : this.setState({ fullNameErr: "" });
    // this.state.altPhone === ""
    // ? this.setState({ altPhoneErr: hlptxt })
    // : this.setState({ altPhoneErr: "" });
    // this.state.altPhone === ""
    // ? this.setState({ altPhoneErr: hlptxt })
    // : this.setState({ altPhoneErr: "" });
    // this.state.altEmail === ""
    // ? this.setState({ altEmailErr: hlptxt })
    // : this.setState({ altEmailErr: "" });

    // this.state.apartmentName === ""
    // ? this.setState({ apartmentNameErr: hlptxt })
    // : this.setState({ apartmentNameErr: "" });
    // this.state.address1 === ""
    // ? this.setState({ address1Err: hlptxt })
    // : this.setState({ address1Err: "" });
    // this.state.address2 === ""
    // ? this.setState({ address2Err: hlptxt })
    // : this.setState({ address2Err: "" });
    // this.state.landmark === ""
    // ? this.setState({ landmarkErr: hlptxt })
    // : this.setState({ landmarkErr: "" });
    // this.state.pincode === ""
    // ? this.setState({ pincodeErr: hlptxt })
    // : this.setState({ pincodeErr: "" });
    // this.state.state === ""
    // ? this.setState({ stateErr: hlptxt })
    // : this.setState({ stateErr: "" });
    // this.state.city === ""
    // ? this.setState({ cityErr: hlptxt })
    // : this.setState({ cityErr: "" });



console.log('uhdjuh')
   }

    render() {
      const { HeadStyle, HeadDisplay } = style;
        return (
            <div>
              <Card style={{padding:25}}>
        <Grid container spacing={2}>
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
          <TextField id="standard-basic" label="Client First Name" disabled={this.state.personalDisable} value={"Atharva"} onChange={(e) => this.setState({ firstName: e.target.value })} error={this.state.firstNameErr.length > 0}
                            helperText={this.state.firstNameErr}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Client Last Name" disabled={this.state.personalDisable}  value={'Unde'} onChange={(e) => this.setState({ lastName: e.target.value })} error={this.state.lastNameErr.length > 0}
                            helperText={this.state.lastNameErr}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Full Name" disabled={this.state.personalDisable} value={'Atharva Unde'} onChange={(e) => this.setState({ fullName: e.target.value })} error={this.state.fullNameErr.length > 0}
                            helperText={this.state.fullNameErr}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Contact Number" disabled={true} value={'+919561027164'}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Email Address" disabled={true} value={'me@atharvaunde.me'}/>
          </Grid>

          <Grid item md={2}>
          <TextField id="standard-basic" label="Alternate Contatct Number"  disabled={this.state.personalDisable} value={'+917028194457'} error={this.state.altPhoneErr.length > 0}
                            helperText={this.state.altPhoneErr}/>
          </Grid>
          <Grid item md={3}>
          <TextField id="standard-basic" label="Alternate Email Address" disabled={this.state.personalDisable} value={'atharva@thecareerlabs.com'} error={this.state.altEmailErr.length > 0}
                            helperText={this.state.altEmailErr}/>
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
          <TextField id="standard-basic" label="Suit No, Apartment Name"  disabled={this.state.apartmentName}  error={this.state.apartmentNameErr.length > 0}
                            helperText={this.state.apartmentNameErr}/>
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="Street Address 1" disabled={this.state.addressDisable} error={this.state.address1Err.length > 0}
                            helperText={this.state.address1Err}/>
          </Grid>
          <Grid item md={4}>
          <TextField id="standard-basic" label="Street Address 2" disabled={this.state.addressDisable} error={this.state.address2Err.length > 0}
                            helperText={this.state.address2Err}/>
          </Grid>
          {/* <Grid item md={12}>
          </Grid> */}

          <Grid item md={2}>
          <TextField id="standard-basic" label="Landmark" disabled={this.state.addressDisable} error={this.state.landmarkErr.length > 0}
                            helperText={this.state.landmarkErr}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Pincode" disabled={this.state.addressDisable} error={this.state.pincodeErr.length > 0}
                            helperText={this.state.pincodeErr}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="State" disabled={this.state.addressDisable} error={this.state.stateErr.length > 0}
                            helperText={this.state.stateErr}/>
          </Grid>
          <Grid item md={2}>
          <TextField id="standard-basic" label="Current city" disabled={this.state.addressDisable} error={this.state.cityErr.length > 0}
                            helperText={this.state.cityErr}/>
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
          <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                     onClick={() => this.handleSave()}
                        style={{ textTransform: "none" }}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       Save Changes
                      </PrimaryButton>
                     </Grid>
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
