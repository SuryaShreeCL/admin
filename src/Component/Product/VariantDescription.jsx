import {
  Grid,
  Typography,
  createMuiTheme,
  withStyles,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditor from "../../Lms/Utils/TextEditor";
import ClassicEditor from "ckeditor5-custom-build";
import {
  updateProductOnelinerAndDesc,
  getvarientByid,
} from "../../Actions/ProductAction";
class VariantDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOneliner: "",
      productDescription: "",
    };
  }

  componentWillUnmount() {
    let obj = {
      id: this.props.match.params.id,
      productOneliner: this.state.productOneliner,
      productDescription: this.state.productDescription,
    };
    this.props.updateProductOnelinerAndDesc(obj);
  }

  componentDidMount() {
    console.log(this.props.getvarientByidList);
    this.props.getvarientByid(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getvarientByidList !== prevProps.getvarientByidList) {
      this.setState({
        productOneliner:
          this.props.getvarientByidList.productOneliner === null
            ? ""
            : this.props.getvarientByidList.productOneliner,
        productDescription:
          this.props.getvarientByidList.productDescription === null
            ? ""
            : this.props.getvarientByidList.productDescription,
      });
    }
  }

  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.heading}>
              Product one liner
            </Typography>
            <br />
            <CKEditor
              // editor={ClassicEditor}
              data={this.state.productOneliner}
              onChange={(event, editors) => {
                const data = editors.getData();
                // console.log( { event, editors, data } );
                this.setState({ productOneliner: data });
              }}
              // onReady={ editors => {
              //     // You can store the "editor" and use when it is needed.
              //     console.log(editors );
              // } }

              // onBlur={ ( event, editors ) => {
              //     console.log( 'Blur.', editors );
              // } }
              // onFocus={ ( event, editors ) => {
              //     console.log( 'Focus.', editors );
              // } }
            />
            <br />
            {/* <Grid xs={12} style={{ width: "100%", height: "1px", backgroundColor: "#000000",opacity:"0.2" }}></Grid> <br />
            <Typography className={classes.heading}>Product Short Description</Typography>
            <br />
            <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editors => {
                        // You can store the "editor" and use when it is needed.
                        console.log(  editors );
                    } }
                    onChange={ ( event, editors ) => {
                        const data = editors.getData();
                        console.log( { event, editors, data } );
                    } }
                    onBlur={ ( event, editors ) => {
                        console.log( 'Blur.', editors );
                    } }
                    onFocus={ ( event, editors ) => {
                        console.log( 'Focus.', editors );
                    } }
                /><br/> */}
            <Grid
              xs={12}
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#000000",
                opacity: "0.2",
              }}
            ></Grid>{" "}
            <br />
            <Typography className={classes.heading}>
              Product Description
            </Typography>
            <br />
            <CKEditor
              // editor={ClassicEditor}
              data={this.state.productDescription}
              // onReady={ editors => {
              //     // You can store the "editor" and use when it is needed.
              //     console.log(  editors );
              // } }
              // onBlur={ ( event, editors ) => {
              //     console.log( 'Blur.', editors );
              // } }
              // onFocus={ ( event, editors ) => {
              //     console.log( 'Focus.', editors );
              // } }
              onChange={(event, editors) => {
                const data = editors.getData();
                this.setState({ productDescription: data });
              }}
            />
            <br />
            <Grid
              xs={12}
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#686868",
                opacity: "0.2",
              }}
            ></Grid>{" "}
            <br />
          </Grid>
          {/* <Grid style={{margin: '0 auto'}}>
          <Button variant="contained" className={classes.varientBtn} color="primary">
           Create Varient
          </Button>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}
const useStyles = (theme = createMuiTheme()) => ({
  heading: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "15px",
    color: "#686868",
  },
  varientBtn: {
    backgroundColor: "#1093FF",
    borderRadius: "30px",
    color: "#fff",
    // width : "189px",
    // height : "33px"
  },
});
const mapStateToProps = (state) => {
  return {
    updateOneLineAndDesResponse:
      state.ProductReducer.updateOneLineAndDesResponse,
    getvarientByidList: state.ProductReducer.getvarientByid,
  };
};

export default connect(mapStateToProps, {
  updateProductOnelinerAndDesc,
  getvarientByid,
})(withStyles(useStyles)(VariantDescription));
