import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import Landinglogo from "../Asset/Images/landingLogo.svg"
function LandingAdmin(props) {
    return (
       <Grid container>
           <Grid item style={{height : "60vh"}} md={12} container justifyContent={"center"} direction={"column"} alignItems={"center"}>
                <img src={Landinglogo} />
                <Typography
                variant={"h4"}
                style={{
                    fontWeight : 400,
                    padding : "25px"
                }}
                >Welcome to CareerLabs Admin Portal</Typography>
                <Typography
                variant={"h5"}
                 style={{
                    fontWeight : 400,
                }}
                >From the Left Navigation, Select Operations and the product to manage</Typography>
           </Grid>
       </Grid>
    )
}

export default LandingAdmin
