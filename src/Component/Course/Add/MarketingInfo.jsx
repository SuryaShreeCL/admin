import React, { Component } from "react";
import  '../../../Asset/Course.css'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import CreatableSelect from 'react-select/creatable'
import Footer from '../Footer'

export default class MarketingInfo extends Component {
  render() {
    return (
      <ThemeProvider theme={rootTheme}>
        <div>
          <Card>
            <Grid container>
              <Grid item md={12}>
                  {/* Webinar Url */}
                  <TextField
                  id={"webinarURL"}
                  name={"webinarURL"}
                  label="Webinar Url"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>

              <Grid item md={12}>
                  {/* Attend Text */}
                  <CreatableSelect
                   classNamePrefix={'course__select'}                   
                   isMulti                  
                   options={[{label:'sample',value:'sample'}]}
                   placeholder={'Attend Text'}
                   styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  theme={selectTheme}
                 />
              </Grid>

              <Grid item md={12}>
                  {/* Speciality */}     
                  <TextField
                  id={"speciality"}
                  name={"speciality"}
                  label="Speciality"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* keyFeatures */}
                  <CreatableSelect
                   classNamePrefix={'course__select'}                   
                   isMulti                  
                   options={[{label:'sample',value:'sample'}]}
                   placeholder={'Key Features'}
                   styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  theme={selectTheme}
                 />
              </Grid>

              <Grid item md={12}>
                  {/* toolsCovered */}
                  <CreatableSelect
                   classNamePrefix={'course__select'}                   
                   isMulti                  
                   options={[{label:'sample',value:'sample'}]}
                   placeholder={'Tools Covered'}
                   styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  theme={selectTheme}
                 />
              </Grid>

              <Grid item md={12}>
                  {/* introVideoURL */}     
                  <TextField
                  id={"introVideoURL"}
                  name={"introVideoURL"}
                  label="Intro Video URL"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* source */}     
                  <TextField
                  id={"source"}
                  name={"source"}
                  label="Source"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* stats */}
                  <CreatableSelect
                   classNamePrefix={'course__select'}                   
                   isMulti                  
                   options={[{label:'sample',value:'sample'}]}
                   placeholder={'Stats'}
                   styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  theme={selectTheme}
                 />
              </Grid>

              <Grid item md={12}>
                  {/* byjuskit */}     
                  <TextField
                  id={"byjuskit"}
                  name={"byjuskit"}
                  label="Byjus Kit"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* industryProjects */}
                  <CreatableSelect
                   classNamePrefix={'course__select'}                   
                   isMulti                  
                   options={[{label:'sample',value:'sample'}]}
                   placeholder={'Industry Projects'}
                   styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  theme={selectTheme}
                 />
              </Grid>

              <Grid item md={12}>
                  {/* examAndCertification */}     
                  <TextField
                  id={"examAndCertification"}
                  name={"examAndCertification"}
                  label="Exam and Certification"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* faculty */}     
                  <TextField
                  id={"faculty"}
                  name={"faculty"}
                  label="faculty"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* whyByjus */}     
                  <TextField
                  id={"whyByjus"}
                  name={"whyByjus"}
                  label="Why Byjus"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

              <Grid item md={12}>
                  {/* Byjus Faq */}     
                  <TextField
                  id={"byjusFaq"}
                  name={"byjusFaq"}
                  label="Byjus FAQ"
                  size="small"
                  variant="outlined"                  
                  fullWidth                                    
                />             
              </Grid>

            </Grid>
          </Card>
          <Card>
          <Footer 
          buttonName={'save'}
          buttonText={'Save'}
          onSave={(e)=>console.log(e)}
          onCancel={(e)=>console.log(e)}          
          />
          </Card>
        </div>
      </ThemeProvider>
    );
  }
}

// Theme 

export const rootTheme = () =>
  createMuiTheme({
    overrides: {
      MuiCard: {
        root: {
          padding: 10,
          margin: 10,
          boxShadow: "none",
        },
      },
      MuiGrid:{
          item:{
              padding:'10px 0px'
          }
      }
    },
  });

//   react select theme override
const selectTheme=theme => ({
    ...theme,                    
    colors: {
      ...theme.colors,
    //   primary25: 'hotpink',
      primary: '#3f51b5',
    },
  })