import { TextField, Grid, Button } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import {
  postgeneraldetails,
  getAllProductFamily,
  getProductVarient,
  getvarientByid,
  updategeneraldata,
  isVariantCreated,
} from "../../Actions/ProductAction";
import DateFnsUtils from "@date-io/date-fns";
import PrimaryButton from "../../Utils/PrimaryButton";
import { productVariantPath } from "../RoutePaths";
import MySnackBar from "../MySnackBar";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { isEmptyString } from "../Validation";
class VariantGeneralData extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productnameErr: "",
      variantsku: "",
      varientErr: "",
      variantfamilysku: "",
      variantfamilyskuErr: "",
      shortName: "",
      endOfServiceDate: new Date(),
      endOfServiceDateErr: "",
      endOfEnrollmentDate: new Date(),
      endOfEnrollmentDateErr: "",
      costPrice: "",
      costPriceErr: "",
      sellingPrice: "",
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      sellingPriceErr: "",
      createdBy: window.sessionStorage.getItem("role"),
      createdByErr: "",
      createdOn: new Date(),
      createdOnErr: "",
      standaloneSellable: "",
      standaloneSellableErr: "",
      updatedBy: window.sessionStorage.getItem("role"),
      UpdatedOn: new Date(),
      banner : null,
      bannerErr : "",
    };
  }
  componentDidMount() {
    this.props.getAllProductFamily();
    this.props.getProductVarient();
    this.props.getvarientByid(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.getvarientByidList !== prevProps.getvarientByidList) {
      this.setState({
        productName: this.props.getvarientByidList.productFamily,
        variantsku: this.props.getvarientByidList.variantSKU,
        variantfamilysku: this.props.getvarientByidList.name,
        costPrice: this.props.getvarientByidList.costPrice,
        sellingPrice: this.props.getvarientByidList.sellingPrice,
        standaloneSellable: {
          title: this.props.getvarientByidList.standaloneSellable,
        },
        endOfServiceDate: this.props.getvarientByidList.endOfServiceDate,
        endOfEnrollmentDate: this.props.getvarientByidList.endOfEnrollmentDate,
        createdBy: this.props.getvarientByidList.createdBy,
        createdOn: this.props.getvarientByidList.dateOfCreation,
      });
    }
    if (
      this.props.postgeneraldetailsList !== prevProps.postgeneraldetailsList
    ) {
      this.props.history.push(
        productVariantPath + "/" + this.props.postgeneraldetailsList.id
      );
    }
  }
  componentWillUnmount(params) {
    console.log("next component");
    if(this.props.match.params.id !== undefined){
      let faqid = this.props.getvarientByidList.productQuestionAnswers !== null && this.props.getvarientByidList.productQuestionAnswers.length !== 0 ? this.props.getvarientByidList.productQuestionAnswers.map(
        (faq) => {
          return { id: faq.id };
        }
      ) : [];
      console.log(this.props.getvarientByidList);
    let obj = {
      id: this.props.match.params.id,
      name: this.state.variantfamilysku,
      codeName: this.props.getvarientByidList.codeName,
      banner : this.state.banner,
      shortName: this.props.getvarientByidList.shortName,
      productDescription: this.props.getvarientByidList.productDescription,
      productOneliner: this.props.getvarientByidList.productOneliner,
      productTnc: this.props.getvarientByidList.productTnc,
      validity: "365",
      variantSKU: this.state.variantsku,
      costPrice: this.state.costPrice,
      sellingPrice: this.state.sellingPrice,
      updatedBy: window.sessionStorage.getItem("role"),
      productQuestionAnswers: faqid,
      productFamily: { id: this.props.getvarientByidList.productFamily.id },
    };
    this.props.updategeneraldata(obj);
    this.setState({
      snackMsg: "Updated Successfully",
      snackOpen: true,
      snackVariant: "success",
    });
    }
    
    
  }
  data = [{ title: "Yes" }, { title: "No" }];
  handlesaved = () => {
    //  console.log("hello");
    let hlptxt = "Please Fill the Required Field";
    this.state.productName === ""
      ? this.setState({ productnameErr: hlptxt })
      : this.setState({ productnameErr: "" });
    isEmptyString(this.state.variantfamilysku)
      ? this.setState({ variantfamilyskuErr: hlptxt })
      : this.setState({ variantfamilyskuErr: "" });
    isEmptyString(this.state.variantsku)
      ? this.setState({ varientErr: hlptxt })
      : this.setState({ varientErr: "" });
    this.state.endOfEnrollmentDate === null
      ? this.setState({ endOfEnrollmentDateErr: hlptxt })
      : this.setState({ endOfEnrollmentDateErr: "" });
    isEmptyString(this.state.costPrice)
      ? this.setState({ costPriceErr: hlptxt })
      : this.setState({ costPriceErr: "" });
    isEmptyString(this.state.sellingPrice)
      ? this.setState({ sellingPriceErr: hlptxt })
      : this.setState({ sellingPriceErr: "" });
    this.state.endOfServiceDate === null
      ? this.setState({ endOfServiceDateErr: hlptxt })
      : this.setState({ endOfServiceDateErr: "" });
    this.state.createdOn === null
      ? this.setState({ createdOnErr: hlptxt })
      : this.setState({ createdOnErr: "" });
    isEmptyString(this.state.createdBy)
      ? this.setState({ createdByErr: hlptxt })
      : this.setState({ createdByErr: "" });
    this.state.standaloneSellable === ""
      ? this.setState({ standaloneSellableErr: hlptxt })
      : this.setState({ standaloneSellableErr: "" });
      isEmptyString(this.state.banner) ? this.setState({bannerErr : hlptxt}) : this.setState({bannerErr : ""})
    if (
      !isEmptyString(this.state.variantfamilysku) &&
      !isEmptyString(this.state.variantsku) &&
      !isEmptyString(this.state.costPrice) &&
      !isEmptyString(this.state.sellingPrice) &&
      !isEmptyString(this.state.createdBy) &&
      !isEmptyString(this.state.banner) &&
      this.state.endOfServiceDate !== null &&
      this.state.createdOn !== null &&
      this.state.endOfEnrollmentDate !== null &&
      this.state.productName !== "" &&
      this.state.standaloneSellable !== ""
    ) {
      let obj = {
        name: this.state.variantfamilysku,
        variantSKU: this.state.variantsku,
        variant_family_SKU: null,
        shortName: this.state.productName.shortName,
        endOfServiceDate: this.state.endOfServiceDate,
        endOfEnrollmentDate: this.state.endOfEnrollmentDate,
        costPrice: this.state.costPrice,
        banner : this.state.banner,
        sellingPrice: this.state.sellingPrice,
        createdBy: this.state.createdBy,
        dateOfCreation: this.state.createdOn,
        standaloneSellable: this.state.standaloneSellable.title,
        productFamily: {
          id: this.state.productName.id,
        },
        dateOfUpdate: new Date(),
        updatedBy: window.sessionStorage.getItem("role"),
      };
      this.props.postgeneraldetails(obj);
      this.setState({
        snackMsg: "Added Successfully",
        snackOpen: true,
        snackVariant: "success",
      });
    }
    console.log(this.state);
  };
  handleUpdate = () => {
    let obj = {
      id: "8df3b9d4-e392-49e2-8353-9a8a7206d7f6",
      name: "acs",
      codeName: "acs",
      shortName: "acs",
      productDescription: "acs",
      productOneliner: "acs",
      productTnc: "acs",
      validity: "365",
      costPrice: this.state.costPrice,
      sellingPrice: this.state.sellingPrice,
      updatedBy: this.state.updatedBy,
      productQuestionAnswers: [
        {
          id: "3",
        },
      ],
      productFamily: {
        id: "4",
      },
    };
    this.props.updategeneraldata(obj);
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    console.log(this.props.getvarientByidList)
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={3}>
            {/* <TextField label="Product Family" /> */}
            <Autocomplete
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              value={this.state.productName}
              // style={{ width: 300 }}
              onChange={(e, newValue) =>
                this.setState({ productName: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product Family"
                  error={this.state.productnameErr.length > 0}
                  helperText={this.state.productnameErr}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Product Variant"
              variant="standard"
              value={this.state.variantfamilysku}
              name="variantfamilysku"
              onChange={(e) =>
                this.setState({ variantfamilysku: e.target.value })
              }
              error={this.state.variantfamilyskuErr.length > 0}
              helperText={this.state.variantfamilyskuErr}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              label="Varient SKU"
              variant="standard"
              value={this.state.variantsku}
              onChange={(e) => this.setState({ variantsku: e.target.value })}
              error={this.state.varientErr.length > 0}
              helperText={this.state.varientErr}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.data}
              getOptionLabel={(option) => option.title}
              value={this.state.standaloneSellable}
              // style={{ width: 300 }}
              onChange={(e, newValue) =>
                this.setState({ standaloneSellable: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Standalone"
                  variant="standard"
                  error={this.state.standaloneSellableErr.length > 0}
                  helperText={this.state.standaloneSellableErr}
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              label="Pricing"
              type="number"
              value={this.state.costPrice}
              error={this.state.costPriceErr.length > 0}
              helperText={this.state.costPriceErr}
              onChange={(e) => this.setState({ costPrice: e.target.value })}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Product Selling Price"
              type="number"
              size="small"
              value={this.state.sellingPrice}
              error={this.state.sellingPriceErr.length > 0}
              helperText={this.state.sellingPriceErr}
              onChange={(e) => this.setState({ sellingPrice: e.target.value })}
            />
          </Grid>
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End of Service"
                format="yyyy-MM-dd"
                error={this.state.endOfServiceDateErr.length > 0}
                helperText={this.state.endOfServiceDateErr}
                value={this.state.endOfServiceDate}
                onChange={(e, newValue) =>
                  this.setState({ endOfServiceDate: newValue })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End of Enrollment"
                // disableFuture
                error={this.state.endOfEnrollmentDateErr.length > 0}
                helperText={this.state.endOfEnrollmentDateErr}
                format="yyyy-MM-dd"
                value={this.state.endOfEnrollmentDate}
                onChange={(e, newValue) =>
                  this.setState({ endOfEnrollmentDate: newValue })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={2}>
            <TextField
              label="Created By"
              disabled
              value={this.state.createdBy}
              //   error={this.state.createdByErr.length > 0}
              //   helperText={this.state.createdByErr}
              onChange={(e) => this.setState({ createdBy: e.target.value })}
            />
          </Grid>
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Created On"
                format="yyyy-MM-dd"
                disabled
                value={this.state.createdOn}
                error={this.state.createdOnErr.length > 0}
                helperText={this.state.createdOnErr}
                onChange={(e, newValue) =>
                  this.setState({ createdOn: newValue })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={7}>
          <TextField
              label="Banner Link"
              size="small"
              multiline
              value={this.state.banner}
              error={this.state.bannerErr.length > 0}
              helperText={this.state.bannerErr}
              onChange={(e) => this.setState({ banner: e.target.value })}
            />
          </Grid>
          {this.props.match.params.id === undefined && (
            <Grid item md={12}>
              <Button
                color="primary"
                variant="contained"
                style={{ borderRadius: "30px" }}
                onClick={this.handlesaved}
              >
                Create New Varient
              </Button>
            </Grid>
          )}
        </Grid>
        <MySnackBar
          snackMsg={this.state.snackMsg}
          snackVariant={this.state.snackVariant}
          snackOpen={this.state.snackOpen}
          onClose={() => this.setState({ snackOpen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postgeneraldetailsList: state.ProductReducer.postgeneraldetails,
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductVarientList: state.ProductReducer.getProductVarient,
    getvarientByidList: state.ProductReducer.getvarientByid,
    isVariantCreated: state.ProductReducer.isVariantCreated,
  };
};

export default connect(mapStateToProps, {
  postgeneraldetails,
  getvarientByid,
  getAllProductFamily,
  getProductVarient,
  updategeneraldata,
  isVariantCreated,
})(VariantGeneralData);
