import { TextField, Grid,IconButton} from "@material-ui/core";
import React, { Component } from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
// import AddCircleIcon from '@mui/icons-material/AddCircle';


export default class InterestDetail extends Component {
  renderFunction() {
    return (
      //   <Grid container>
      //     {/* supplementary question */}
      //     <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
      //       <TextField
      //         style={{ width: "500px" }}
      //         label="Supplementary Question"
      //       ></TextField>
      //     </Grid>

      //     {/* Answers */}
      //     <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
      //       <div style={{ display: "flex", flexDirection: "row" }}>
      //         <div>
      //           <TextField style={{ width: "500px" }} label="Answers"></TextField>
      //         </div>
      //         <div>
      //           <IconButton>
      //             {/* <AddCircleIcon /> */}
      //           </IconButton>
      //         </div>
      //       </div>
      //     </Grid>

      //     {/*SAVE */}
      //     <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
      //       <hr />
      //     </Grid>
      //     <Grid item md={12} xs={12} sm={12} xl={12} lg={12} align={"right"}>
      //       <PrimaryButton
      //         color={"primary"}
      //         variant={"contained"}
      //         style={{ width: "100px", marginTop: "12px" }}
      //         // onClick={() => this.handleopen()}
      //       >
      //         Save
      //       </PrimaryButton>
      //     </Grid>
      //   </Grid>
      <Grid container>
        <Grid item md={12}>
          <p>Area of Interest (1)</p>
        </Grid>
        <Grid item md={12}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <TextField style={{ width: "500px" }} label="Enter interest Area"></TextField>
            </div>
        </Grid>

        {/*SAVE */}
           <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
             <hr />
           </Grid>
           <Grid item md={12} xs={12} sm={12} xl={12} lg={12} align={"right"}>
             <PrimaryButton
              color={"primary"}
               variant={"contained"}
               style={{ width: "100px", marginTop: "12px" }}
               // onClick={() => this.handleopen()}
             >
               Save
             </PrimaryButton>
           </Grid>
      </Grid>
    );
  }

  render() {
    return <div>{this.renderFunction()}</div>;
  }
}
