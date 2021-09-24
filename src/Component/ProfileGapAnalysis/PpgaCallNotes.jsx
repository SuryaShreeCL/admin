import React, { Component } from "react";
import { TextField, Grid, Divider, Typography } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import "./InterestDetail.css";
import { getPpgaCallNotes, savePpgaNotes, updatePpgaCallNotes } from '../../Actions/ProfileGapAction';
import {isEmptyString} from "../../Component/Validation"
import { connect } from "react-redux";


class PpgaCallNotes extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      title : "",
      data : [],
     ppgaArr : [
      {
        fieldTitle: "10th and 12th Details | School-Board-Grades",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "UG | School-Board-Grades",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Interested Subjects",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Confirm package (Placements/Masters)",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Higher Education Readiness (program, areas of study/specialization, location)",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Back-up options for Master’s",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Suggest a Specialization Track",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Ask the reason for the Job. Why now? What is the end goal?",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "Ask about career interest. Clear? Suggest suitable courses. Unclear? Walk through steps options available",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
      {
        fieldTitle: "Relevant work experience",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
       {
        fieldTitle: "If gap in academics/career. Ask for reason. Will it affect chances?",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
      {
        fieldTitle: "Relevant research experience",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      },
      {
        fieldTitle: "If Backlogs.Ask for a reason. Cleared? If pending, when are they clearing?",
        ppgaNotes: "",
        ppgaNotesErr : false,
        ppgaNotesMsg : "",
        postPpgaNotes: "",
        postPpgaNotesErr : false,
        postPpgaNotesMsg : "",
        mentorNotes: "",
        mentorNotesErr : false,
        mentorNotesMsg : ""
      }
    ]

    };
  }

  handleChange = (e,index) => {
    let items = [...this.state.ppgaArr];
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[index]};
    // 3. Replace the property you're intested in
    item[e.target.name] = e.target.value;
    // 4. Put it back into our array. N.B. we are mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    this.setState({ppgaArr : items});
  };

  componentDidMount(){
      this.props.getPpgaCallNotes(this.props.match.params.studentId,this.props.match.params.productId,(response)=>{
        console.log(response);
        this.setState({
          data : response.data
        })
     
      })
  }

  handleSave = () => {

  let data = this.state.ppgaArr.map((item)=>(item))
  console.log(data)
   if(isEmptyString(data.ppgaNotes)){
     this.setState({
       ppgaNotesErr: true,
       ppgaNotesMsg : "please fill the Required field"
     })

   }
   if(isEmptyString(data.postPpgaNotes)){
    this.setState({
      postPpgaNotesErr: true,
      postPpgaNotesMsg : "please fill the Required field"
    })

  }
  if(isEmptyString(data.mentorNotes)){
    this.setState({
      mentorNotesErr: true,
      mentorNotesMsg : "please fill the Required field"
    })

  }
  }
  
  render() {
    console.log(this.state)
    console.log(this.props.saveResponse);
    return (
      <div>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            style={{ maxHeight: "92%", overflowY: "scroll", padding: "15px" }}
          >
            {this.state.ppgaArr.map((item,index) => (
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                  <p>{item.fieldTitle}</p>
                </Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                  <TextField
                    label="PPGA Notes"
                    name="ppgaNotes"
                    value={item.ppgaNotes}
                    onChange={(e) => this.handleChange(e,index)}
                    className="ppgaTextField_align"
                    error={item.ppgaNotesErr}
                    helperText={item.ppgaNotesMsg}
                  ></TextField>
                </Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                  <TextField
                    className="ppgaTextField_align"
                    name="postPpgaNotes"
                    value={item.postPpgaNotes}
                    error={item.postPpgaNotesErr}
                    helperText={item.postPpgaNotesMsg}
                    onChange={(e) => this.handleChange(e,index)}
                    label="Post PPGA Notes"
                  ></TextField>
                </Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                  <TextField
                    className="ppgaTextField_align"
                    name="mentorNotes"
                    error={item.mentorNotesErr}
                    helperText={item.mentorNotesMsg}
                    onChange={(e) => this.handleChange(e,index)}
                    value={item.mentorNotes}
                    label="Mentor Notes"
                  ></TextField>
                </Grid>
              </Grid>
            ))}

           
          </Grid>

          {/* button */}
          <Grid container>
            <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
              <hr />
            </Grid>
            {/* button and text main div */}
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              xl={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "-15px",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <div>
                <Typography className={"footer_text"}>
                  PPGA Call - Verification/Change Details
                </Typography>
              </div>
              <div className={"button_div"}>
                <PrimaryButton
                  variant={"contained"}
                  color={"primary"}
                  onClick={this.handleSave}
                  style={{
                    width: "100px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  Save
                </PrimaryButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ppgaResponse: state.ProfileGapAnalysisReducer.ppgaCallNotes,
    saveResponse: state.ProfileGapAnalysisReducer.ppgaNotes,



  };
};
export default connect(mapStateToProps, {
 getPpgaCallNotes,
 updatePpgaCallNotes,
 savePpgaNotes
})(PpgaCallNotes);
