import { Card, Grid, Accordion,
    AccordionSummary,
    AccordionDetails, createMuiTheme,
    TextField, withStyles,
    ThemeProvider } from '@material-ui/core'
import React, { Component } from 'react'
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import PrimaryButton from '../../Utils/PrimaryButton'
import { ExpandMore } from '@material-ui/icons';

const theme = createMuiTheme({
    overrides : {
       
    }
});

export class academicInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            expanded: "panel1",
            open: false,
        }
    }
    handleChange = (panel) => (event, newExpanded) => {
        console.log(panel, newExpanded)
        this.setState({ expanded: newExpanded ? panel : false });
      };
      


      Accordion = withStyles({
        root: {
          border: "1px solid rgba(0, 0, 0, .125)",
          borderRadius:20,
          boxShadow: "none",
          "&:not(:last-child)": {
            borderBottom: 0,
            
          },
          "&:before": {
            display: "none",
          },
          "&$expanded": {
            margin: "auto",
          },
        },
        expanded: {},
      })(MuiAccordion);
    
      AccordionSummary = withStyles({
        root: {
          backgroundColor: "rgba(0, 0, 0, .03)",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
          marginBottom: -1,
          marginTop:15,
          minHeight: 56,
          "&$expanded": {
            minHeight: 56,
          },
        },
        content: {
          "&$expanded": {
            margin: "20px 0",
          },
        },
        expanded: {},
      })(MuiAccordionSummary);
    
      AccordionDetails = withStyles((theme) => ({
        root: {
          padding: theme.spacing(2),
        },
      }))(MuiAccordionDetails);
    
    
    render() {
        const { HeadStyle, title, ans, secondary } = style;
        return (
            <div>
              <Card style={{padding:50}}>
                  <Grid container>
                    <Grid item md = {12}>
                      <p style={HeadStyle}>Academic Information</p>
                    </Grid>
                  </Grid>
                  <ThemeProvider theme={theme}>
                  <div style={{marginTop:5}}>
                  <Accordion style={{borderRadius:15}}
                   expandIcon={<ExpandMore />}
                // square
                // expanded={this.state.["expanded"] === "panel"}
                // onChange={this.handleChange("panel")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>Postgraduated Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="PG Degree"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="College Name"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Department"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Present Semester"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="End date"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="University"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA Scale"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA"/>
                      </Grid>
                      <Grid item md={5}>
                      </Grid>
                      
                     <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                     style={{width:270}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       More Details in Marksheet CRUD
                      </PrimaryButton>
                     </Grid>
                  </Grid>
                </AccordionDetails>
                </Accordion>


                <Accordion style={{borderRadius:15, marginTop:15}}
                 expandIcon={<ExpandMore />}
                // square
                // expanded={this.state.["expanded"] === "panel"}
                // onChange={this.handleChange("panel")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>Undergrdauate Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="UG Degree"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="College Name"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Department"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Present Semester"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="End date"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="University"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA Scale"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA"/>
                      </Grid>
                      <Grid item md={5}>
                      </Grid>
                      
                     <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                     style={{width:270}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       More Details in Marksheet CRUD
                      </PrimaryButton>
                     </Grid>
                  </Grid>
                </AccordionDetails>
                </Accordion>

                <Accordion style={{borderRadius:15, marginTop:15}}
                 expandIcon={<ExpandMore />}
                // square
                // expanded={this.state.["expanded"] === "panel"}
                // onChange={this.handleChange("panel")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>Diplomo</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="diplomo"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="University"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Department"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Present Semester"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="End date"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="University"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA Scale"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA"/>
                      </Grid>
                      <Grid item md={5}>
                      </Grid>
                      
                     <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                     style={{width:270}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       More Details in Marksheet CRUD
                      </PrimaryButton>
                     </Grid>
                  </Grid>
                </AccordionDetails>
                </Accordion>



                <Accordion style={{borderRadius:15, marginTop:15}}
                 expandIcon={<ExpandMore />}
                // square
                // expanded={this.state.["expanded"] === "panel"}
                // onChange={this.handleChange("panel")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>12th</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="12 th"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="School Name"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="Exam Board Name"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="End date"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="University"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="GPA"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Overall GPA"/>
                      </Grid>
                      <Grid item md={5}>
                      </Grid>
                      
                     <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                     style={{width:270}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       More Details in Marksheet CRUD
                      </PrimaryButton>
                     </Grid>
                  </Grid>
                </AccordionDetails>
                </Accordion>


                <Accordion style={{borderRadius:15, marginTop:15}}
                 expandIcon={<ExpandMore />}
                // square
                // expanded={this.state.["expanded"] === "panel"}
                // onChange={this.handleChange("panel")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>10 th</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="10 th"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="School Name"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="Exam Board Name"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="End date"/>
                      </Grid>
                      <Grid item md={3}>
                      <TextField id="standard-basic" label="University"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="GPA"/>
                      </Grid>
                      <Grid item md={2}>
                      <TextField id="standard-basic" label="Overall GPA"/>
                      </Grid>
                      <Grid item md={5}>
                      </Grid>
                      
                     <Grid item md={12} style={{alignSelf:'center', alignItems:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                     <PrimaryButton
                     style={{width:270}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       More Details in Marksheet CRUD
                      </PrimaryButton>
                     </Grid>
                  </Grid>
                </AccordionDetails>
                </Accordion>
                </div>
                </ThemeProvider>
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
    },
    title: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "18px",
        alignSelf: "flex-start",
        color: "#052A4E",
      },
      ans: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontSize: "12px",
        color: "#686868",
      },
      secondary: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        color: "#052A4E",
      },
  };

export default academicInfo
