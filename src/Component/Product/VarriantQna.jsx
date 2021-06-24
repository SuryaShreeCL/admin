import {
  Grid,
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import PrimaryButton from "../../Utils/PrimaryButton";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { getFaq, updateFaq, postFaq } from "../../Actions/ProductAction";

class VariantQna extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      expanded: "panel1",
      open: false,
      question: null,
      answer: null,
      visibility: true,
      faq: [],
    };
  }

  componentDidMount() {
    this.props.getFaq();
    
  }

  handleChange = (panel) => (event, newExpanded) => {
    this.setState({ expanded: newExpanded ? panel : false });
  };

  Accordion = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
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
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  handleClickOpen = (item) => {
    this.setState({ open: true, question : item.question , answer : item.answer, id : item.id });

    console.log(item)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    // this.state.question !== null && this.state.answer !== null
    //   ? this.setState({ visibility: true })
    //   : this.setState({ visibility: false });
    // if (this.state.question !== null && this.state.answer !== null) {
    //   let arr = this.state.faq;
    //   arr.push({
    //     question: this.state.question,
    //     answer: this.state.answer,
    //   });
    //   this.setState({ faq: arr, question: null, answer: null });
    // }
    let obj = {
      question: this.state.question,
      answer: this.state.answer,
      products: {
        id: this.props.match.params.id,
      },
    };
    this.props.postFaq(obj)
    console.log(this.props.match.params.id)

    this.setState({ open: false });
  };

  handleUpdate = () => {
    console.log("diygd");
    // if (this.state.question !== null && this.state.answer !== null) {
    //   let arr = this.state.faq;
    //   arr.push({
    //     question: this.state.question,
    //     answer: this.state.answer,
    //   });
    //   this.setState({ faq: arr, question: null, answer: null });
    // }
    let obj = {
      id: this.state.id,
      question: this.state.question,
      answer: this.state.answer,
      products: {
        id: this.props.match.params.id,
      },
    };
    
    this.props.updateFaq(obj)
    console.log(this.props.match.params.id)
    this.setState({ open :false, question: null, answer: null, id: null });
    this.props.getFaq();
  };

  render() {
   
    console.log(this.props.getFaqList)
    console.log(this.state.faq);
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="row" justify="flex-end">
          <PrimaryButton
            onClick={this.handleClickOpen}
            color={"primary"}
            variant={"contained"}
          >
            Create new FAQ
          </PrimaryButton>
        </Grid>
        {this.props.getFaqList !== null ? this.props.getFaqList.map(item => item.productQuestionAnswer.map(item1 => (
            <div style={{ marginTop: 20 }}>
              <Accordion
                square
                expanded={this.state.expanded === "panel2"}
                onChange={this.handleChange("panel2")}
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
                      <p className={classes.title}>{item1.question}</p>
                    </Grid>
                    <Grid container direction="row" justify="flex-end">
                      <Button onClick={() => this.handleClickOpen(item1)}>
                        <EditRoundedIcon />
                      </Button>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </div>
                </AccordionSummary>
                <Divider
                  style={{ backgroundColor: "#686868" }}
                  variant="middle"
                />
                <AccordionDetails>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className={classes.ans}>Answer</p>
                    <p className={classes.secondary}>{item1.answer}</p>
                  </div>
                </AccordionDetails>
                <Divider
                  style={{ backgroundColor: "#686868" }}
                  variant="middle"
                />
                <div
                  style={{
                    alignSelf: "center",
                    padding: 19,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PrimaryButton
                    className={classes.button}
                    color={"primary"}
                    variant={"contained"}
                  >
                    SAVE FAQ
                  </PrimaryButton>
                </div>
              </Accordion>
            </div>
))) : '' }
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          maxWidth="md"
        >
          <div>
            <IconButton
              aria-label="close"
              onClick={this.handleClose}
              color="primary"
              style={{
                position: "absolute",
                color: "#1093FF",
                right: 5,
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent style={{ padding: 33 }}>
            <div
              style={{
                marginLeft: 5,
                display: "flex",
                flexDirection: "column",
                height: 250,
                width: 460,
                justifyContent: "space-around",
              }}
            >
              <TextField
                id="outlined-basic"
                value={this.state.question}
                name="question"
                onChange={(e) =>
                  this.setState({
                    [e.target.name]: e.target.value,
                  })
                }
                variant="outlined"
                label="Question"
                fullWidth
              />

              <TextField
                multiline
                rows={5}
                value={this.state.answer}
                name="answer"
                onChange={(e) =>
                  this.setState({
                    [e.target.name]: e.target.value,
                  })
                }
                id="outlined-basic"
                variant="outlined"
                label="Answer"
                fullWidth
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ width: "104px", alignSelf: "center" }}
                startIcon={<AddIcon />}
                variant="contained"
                onClick={
                  this.state.id 
                    ? this.handleUpdate
                    : this.handleAdd
                }
                color="primary"
                size="medium"
              >
                {this.state.id  ? "Update" : "Add"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const useStyles = () => ({
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
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
  button: {
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    getFaqList: state.ProductReducer.getFaq,
    updateFaqList: state.ProductReducer.updateFaq,
    postFaqList: state.ProductReducer.postFaq,
  };
};

export default connect(mapStateToProps, { getFaq, updateFaq, postFaq })(
  withStyles(useStyles)(VariantQna)
);
