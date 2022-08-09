import {
  Grid,
  Typography,
  withStyles,
  createTheme,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditor from "../../Lms/Utils/TextEditor";
// import ClassicEditor from "ckeditor5-custom-build";
import { updateProductTnC, getvarientByid } from "../../Actions/ProductAction";
class VariantTnc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tnc: "",
    };
  }

  componentDidMount() {
    this.props.getvarientByid(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getvarientByidList !== prevProps.getvarientByidList) {
      this.setState({
        tnc:
          this.props.getvarientByidList.productTnc === null
            ? ""
            : this.props.getvarientByidList.productTnc,
      });
    }
  }

  componentWillUnmount() {
    let obj = {
      id: this.props.match.params.id,
      productTnc: this.state.tnc,
    };
    this.props.updateProductTnC(obj);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.heading}>
              Product Terms and Conditions
            </Typography>{" "}
            <br />
            <CKEditor
              // editor={ClassicEditor}
              data={this.state.tnc}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                this.setState({ tnc: data });
              }}
              // onReady={editor => {
              //     // You can store the "editor" and use when it is needed.
              //    console.log( editor);
              // }}

              // onBlur={(event, editor) => {
              //     console.log('Blur.', editor);
              // }}
              // onFocus={(event, editor) => {
              //     console.log('Focus.', editor);
              // }}
            />
            <br />
          </Grid>
          {/* <Grid item xs={12}>
                        <Typography className={classes.heading}>Product Service Agreement   </Typography><br />
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={editors => {
                                // You can store the "editor" and use when it is needed.
                                console.log( editors);
                            }}
                            onChange={(event, editors) => {
                                const data = editors.getData();
                                console.log({ event, editors, data });
                            }}
                            onBlur={(event, editors) => {
                                console.log('Blur.', editors);
                            }}
                            onFocus={(event, editors) => {
                                console.log('Focus.', editors);
                            }}
                        /><br />
                    </Grid> */}
        </Grid>
      </div>
    );
  }
}
const useStyles = (theme = createTheme()) => ({
  heading: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "15px",
    color: "#686868",
  },
});
const mapStateToProps = (state) => {
  return {
    updateTncResponse: state.ProductReducer.updateTncResponse,
    getvarientByidList: state.ProductReducer.getvarientByid,
  };
};

export default connect(mapStateToProps, { updateProductTnC, getvarientByid })(
  withStyles(useStyles)(VariantTnc)
);
