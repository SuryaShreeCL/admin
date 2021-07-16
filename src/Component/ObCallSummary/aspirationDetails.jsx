import { Checkbox, FormControlLabel, Grid, TextField, createMuiTheme, ThemeProvider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";


const theme = createMuiTheme({
    overrides: {
        MuiRadio: {
            colorSecondary: {
                '&$checked': {
                    color: '#1093FF'
                  }
            },
          },
        MuiCheckbox:{
            colorSecondary: {
                '&$checked': {
                    color: '#1093FF'
                  }
            },
        },
        MuiIconButton : {
            root : {
                color : "#1093FF"
            }
        },
        MuiInputLabel: {
            root: {
              whiteSpace: "nowrap",
              fontSize: "12px",
            },
          },
          MuiFormControl: {
            marginNormal: {
              marginTop: "0px",
              marginBottom: "0px",
            },
          },
    },
  });

class AspirationDetails extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      val: "",
      targetYear: "2022,2023",
      targetIntake: "Fall,Winter",
      schoolTargeted: "3",
      targetDegree: "MS",
      areaOfSpecalization: "AREA OF SPECALIZATION1",
      countryCollege: "INDIA, USA",
      listOfDreamCollege: "College1",
      listOfDreamBusinessCollege: "College1",
    };
  }
  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }

  render() {
    console.log(new Date());
    const { choiceStyle } = style;
    return (
      <div style={{ padding: 25 }}>
          <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "15%",
            }}
          >
            <p
              style={{
                fontStyle: "Poppins",
                fontWeight: "600",
                fontStyle: "normal",
                fontSize: "18px",
                color: "#0081FF",
                paddingLeft: 10,
              }}
            >
              Aspiration Details
            </p>
            <img
              src={Warning}
              height={17}
              width={17}
              style={{ position: "realative", top: 5 }}
            />
          </div>
          <IconButton onClick={this.handleClick.bind(this)}>
            <img src={Pencil} height={17} width={17} />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            What Kind Of Degree You Want To Persue?
          </Grid>
          <Grid item md={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel style={choiceStyle}
                  value="Not yet Decided"
                  control={<Radio />}
                  label="Not yet Decided"
                />
                <FormControlLabel style={choiceStyle}
                  value="Technical (Eg: MS in CS)"
                  control={<Radio />}
                  label="Technical (Eg: MS in CS)"
                />
                <FormControlLabel style={choiceStyle}
                  value="Management (Eg: MiM/MSBA)"
                  control={<Radio />}
                  label="Management (Eg: MiM/MSBA)"
                />
                <FormControlLabel style={choiceStyle}
                  value="Techno-Managerial (Eg: MEM)"
                  control={<Radio />}
                  label="Techno-Managerial (Eg: MEM)"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            Which Of The Following Tests Have you Taken Or Intend To Take?
          </Grid>
          <Grid item md={12}>
            <FormGroup row>
              <FormControlLabel style={choiceStyle}
               labelStyle={{color: 'white'}}
               iconStyle={{fill: 'white'}}
                control={<Checkbox name="checkedA" />}
                label="GRE"
              />
              <FormControlLabel style={choiceStyle}
                control={<Checkbox name="checkedB" />}
                label="GMAT"
              />
              <FormControlLabel style={choiceStyle}
                control={<Checkbox name="checkedC" />}
                label="TOEFL"
              />
              <FormControlLabel style={choiceStyle}
                control={<Checkbox name="checkedD" />}
                label="IELTS"
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            How Do You Propose To Finance Your Studies?
          </Grid>
          <Grid item md={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel style={choiceStyle}
                  value="Self"
                  control={<Radio />}
                  label="Self"
                />
                <FormControlLabel style={choiceStyle}
                  value="Loan"
                  control={<Radio />}
                  label="Loan"
                />
                <FormControlLabel style={choiceStyle}
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <TextField
            //   style={{ width: "100%" }}
              id="standard-basic"
              label="No Of Schools?"
              disabled={this.state.disable}
              value={this.state.schoolTargeted}
              onChange={(e) => {
                this.setState({ schoolTargeted: e.target.value });
              }}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              disabled={this.state.disable}
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Intake" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              disabled={this.state.disable}
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Targeted Degree"
                  variant="standard"
                />
              )}
            />
          </Grid>

          <Grid item md={5}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Area of Specialization"
                  variant="standard"
                />
              )}
            />
          </Grid>

          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country of Dream Colleges"
                  variant="standard"
                />
              )}
            />
          </Grid>

          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="List of Dream Graduate Colleges"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Field Of Study"
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <PrimaryButton
            style={{ textTransform: "none" }}
            variant={"contained"}
            color={"primary"}
            size={"small"}
          >
            Save Changes
          </PrimaryButton>
        </div>
        </ThemeProvider>
      </div>
    );
  }
}
const style = {
    choiceStyle:{
        fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#05252C"
    }
            
}

export default AspirationDetails;
