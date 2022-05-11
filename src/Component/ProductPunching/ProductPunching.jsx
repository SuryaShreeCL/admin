import {
  Box,
  createTheme,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { AddCircleOutline, DeleteOutline } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getAllProductFamily,
  getProductByFamilyId,
  getPunchingData,
  getReferProductVariantByProductId,
  postPunchingData,
} from "../../Actions/ProductAction";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { helperText, PROVIDERS } from "./Constant";

const theme = createTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        fontSize: "11px",
      },
    },
    MuiMenu: {
      paper: {
        maxHeight: "240px",
      },
    },
    MuiIconButton: {
      root: {
        padding: "8px",
        margin: "0px 5px 5px 0px",
      },
    },
  },
});
class ProductPunching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family: null,
      product: null,
      variant: null,
      familyErr: "",
      productErr: "",
      variantErr: "",
      punching: null,
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      productVariantList: [],
      loadUpdate:false,
    };
  }

  componentDidMount() {
    this.props.getAllProductFamily();
    this.props.getPunchingData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { postPunchingStatus, match, productVariant } = this.props;
    const { family, product } = this.state;

    if (family !== prevState.family) {
      this.setState({ product: null, variant: null });
      if (family?.id) this.props.getProductByFamilyId(family?.id);
    }
    if (product !== prevState.product) {
      this.setState({ variant: null, productVariantList: [] });
      if (product?.id)
        this.props.getReferProductVariantByProductId(
          product?.id,
          match.params.id
        );
    }

    if (
      postPunchingStatus &&
      postPunchingStatus !== prevProps.postPunchingStatus
    ) {
      if (postPunchingStatus.success) {
        this.setState({
          snackMsg: "Updated Successfully",
          snackOpen: true,
          snackVariant: "success",
          punching: null,
          family: null,
          product: null,
          variant: null,
          loadUpdate:false,
        });
        this.props.getPunchingData(match.params.id);
      } else {
        this.setState({
          snackMsg: postPunchingStatus.message,
          snackOpen: true,
          snackVariant: "error",
          loadUpdate:false,
        });
      }
    }
    if (productVariant && productVariant !== prevProps.productVariant) {
      if (productVariant.success) {
        this.setState({
          productVariantList: productVariant.data || [],
        });
      } else {
        this.setState({
          snackMsg: productVariant.message,
          snackOpen: true,
          snackVariant: "error",
          productVariantList: [],
        });
      }
    }
  }

  handleAdd = () => {
    const { variant, family, product } = this.state;

    if (variant) this.setState({ variantErr: "" });
    else this.setState({ variantErr: helperText });

    if (family) this.setState({ familyErr: "" });
    else this.setState({ familyErr: helperText });

    if (product) this.setState({ productErr: "" });
    else this.setState({ productErr: helperText });

    if (family && variant && product) {
      let serviceDate = variant.endOfServiceDate
        ? moment(new Date(variant.endOfServiceDate)).format("DD-MM-YYYY")
        : null;
      let obj = {
        id: variant.id,
        familyName: variant.productFamily.productName,
        productVariant: variant.name,
        variantSku: variant.variant_SKU,
        standalone: variant.standaloneSellable,
        productPriceStandalone: variant.sellingPrice,
        productPriceCombo: variant.costPrice,
        productSku: variant.codeName,
        validity: variant.validity,
        endOfServiceDate: serviceDate,
        paymentDetails: [
          {
            paymentId: null,
            paymentProvider: null,
            paymentIdErr: null,
            paymentProviderErr: null,
            Amount: null,
            AmountErr: null,
          },
        ],
      };
      this.setState({ punching: obj });
    }
  };

  handlePaymentAdd = () => {
    const { punching } = this.state;
    let paymentModel = {
      paymentId: null,
      paymentProvider: null,
      paymentIdErr: null,
      paymentProviderErr: null,
      Amount : null,
      AmountErr: null,

    };
    let arr = [...punching.paymentDetails];
    arr.push(paymentModel);
    let obj = {
      ...punching,
      paymentDetails: arr,
    };
    this.setState({ punching: obj });
  };

  handleRemovePayment = (e) => {
    const { id } = e.currentTarget;
    const { punching } = this.state;
    let arr = [...punching.paymentDetails];
    arr.splice(parseInt(id), 1);
    let obj = {
      ...punching,
      paymentDetails: arr,
    };
    this.setState({ punching: obj });
  };

  getValidation = () => {
    const { punching } = this.state;
    let arr = punching.paymentDetails;
    punching.paymentDetails.map(({ paymentId, paymentProvider,Amount }, index) => {
      let paymentIdError = null;
      let paymentProviderError = null;
      let AmountError = null;
      if (!(paymentId && paymentId.trim().length !== 0))
        paymentIdError = helperText;
      if (!paymentProvider) paymentProviderError = helperText;
      if (!Amount) AmountError = helperText;
      arr[index]["paymentIdErr"] = paymentIdError;
      arr[index]["AmountErr"] = AmountError;
      arr[index]["paymentProviderErr"] = paymentProviderError;
    });
    let obj = {
      ...punching,
      paymentDetails: arr,
    };
    let validArray = arr.filter(
      ({ paymentIdErr, paymentProviderErr,AmountErr }) =>
        !Boolean(paymentIdErr) && !Boolean(paymentProviderErr) && !Boolean(AmountErr)
    );
    this.setState({ punching: obj });
    return arr.length === validArray.length;
  };

  handleUpdate = ( ) => {
    const { punching } = this.state;
    const { match } = this.props;

    if (punching && this.getValidation()) {
      this.setState({
        loadUpdate:true
      
      });
      let paymentModel = punching.paymentDetails.map(
        ({ paymentId, paymentProvider }) => ({ paymentId, paymentProvider })
      );
      let requestBody = {
        studentId: match.params.id,
        productPaymentModels: [
          {
            paymentDetailsModelList: paymentModel,
            productId: punching.id,
            mentor: window.sessionStorage.getItem("adminUserId"),
            stage: "NotActivated",
            punchedBy: window.sessionStorage.getItem("adminUserId"),
          },
        ],
      };
      this.props.postPunchingData(requestBody);
    }
  };

  handleChange = (e) => {
    const { value, name, id } = e.target;
    const { punching } = this.state;
    let arr = punching.paymentDetails;
    arr[id][name] = value;
    arr[id][`${name}Err`] = null;
    let obj = {
      ...punching,
      paymentDetails: arr,
    };
    this.setState({ punching: obj });
  };

  renderProductText = (array) => {
    let count = 1;
    if (array && array.length !== 0) {
      count = array.length + 1;
    }
    return `Product ${count}`;
  };

  renderPayment = () => {
    const { punching } = this.state;
    if (
      punching &&
      punching.paymentDetails &&
      punching.paymentDetails.length !== 0
    ) {
      return punching.paymentDetails.map(
        (
          { paymentId, paymentProvider,Amount,AmountErr, paymentIdErr, paymentProviderErr },
          index
        ) => {
          let isDeleteOption = punching.paymentDetails.length - 1 !== 0;
          let isAddOption = punching.paymentDetails.length - 1 === index;
          return (
            <Fragment key={`paymentDetails${index}`}>
              <Grid item xs={12} lg={12} key={index}>
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      id={`provider-combo-box-${index}`}
                      key={`provider-combo-box-${index}`}
                      options={PROVIDERS}
                      getOptionLabel={(option) => option}
                      value={paymentProvider}
                      onChange={(e, newVal) =>
                        this.handleChange({
                          target: {
                            id: index,
                            name: "paymentProvider",
                            value: newVal,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={`paymentMode${index}`}
                          label={"Payment Mode"}
                          variant={"standard"}
                          error={Boolean(paymentProviderErr)}
                          helperText={paymentProviderErr || " "}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id={index}
                      key={`paymentId${index}`}
                      label={"Payment ID"}
                      name={"paymentId"}
                      value={paymentId || ""}
                      onChange={this.handleChange}
                      error={Boolean(paymentIdErr)}
                      helperText={paymentIdErr || " "}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id={index}
                      key={`Amount${index}`}
                      label={"Amount"}
                      name={"Amount"}
                      type={"number"}
                      value={Amount || ""}
                      onChange={this.handleChange}
                      error={Boolean(AmountErr)}
                      helperText={AmountErr || " "}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs>
                    {isDeleteOption && (
                      <IconButton id={index} onClick={this.handleRemovePayment}>
                        <DeleteOutline color={"secondary"} />
                      </IconButton>
                    )}
                    {isAddOption && (
                      <IconButton id={index} onClick={this.handlePaymentAdd}>
                        <AddCircleOutline color={"primary"} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        }
      );
    } else return null;
  };

  renderPunchedList = () => {
    const { getPunchingDataList } = this.props;
    let punchedList = getPunchingDataList
      ? [...getPunchingDataList].reverse()
      : [];
    return punchedList.length !== 0
      ? punchedList.map(
          ({ products, studentId, paymentDetailsModelList }, index) => (
            <Fragment key={`punchedList${index}`}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography style={{ fontWeight: "bold" }}>
                    {`Product ${index + 1}`}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label='Student ID'
                    value={studentId}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label='Product Name'
                    value={products.name}
                    disabled
                    fullWidth
                  />
                </Grid>
                {paymentDetailsModelList &&
                  paymentDetailsModelList.length !== 0 &&
                  paymentDetailsModelList.map(
                    ({ id, paymentProvider, paymentId }, index) => (
                      <Fragment key={`paymentDetailsModelList${index}`}>
                        <Grid item md={6}>
                          <TextField
                            id={id}
                            key={id}
                            label='Payment ID'
                            name={"paymentId"}
                            value={paymentId}
                            disabled
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            id={id}
                            key={id}
                            label='Payment Provider'
                            name={"paymentProvider"}
                            value={paymentProvider}
                            disabled
                            fullWidth
                          />
                        </Grid>
                      </Fragment>
                    )
                  )}
                <Grid item md={12}></Grid>
              </Grid>
            </Fragment>
          )
        )
      : null;
  };

  handleDropdownValueChange = (value, name) => {
    this.setState({ [name]: value, [`${name}Err`]: "" });
  };

  render() {
    const {
      family,
      familyErr,
      variant,
      variantErr,
      punching,
      loadUpdate,
      productVariantList,
      product,
      productErr,
    } = this.state;
    const {
      getAllProductFamilyList,
      getProductByFamilyIdList,
      getPunchingDataList,
    } = this.props;
    return (
      <Box padding={"15px 0px !important"}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Autocomplete
                id={"combo-box-product-family"}
                options={(getAllProductFamilyList || []).filter(
                  ({ isDisplayName }) => isDisplayName
                )}
                getOptionLabel={(option) =>
                  option.productDisplayName || option.productName
                }
                value={family}
                onChange={(e, newValue) =>
                  this.handleDropdownValueChange(newValue, "family")
                }
                disabled={Boolean(punching)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Select Product Family"}
                    variant={"standard"}
                    error={familyErr.length > 0}
                    helperText={familyErr || " "}
                  />
                )}
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                id={"combo-box-product"}
                options={(getProductByFamilyIdList || []).filter(
                  ({ isProduct }) => isProduct
                )}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) =>
                  this.handleDropdownValueChange(newValue, "product")
                }
                value={product}
                disabled={!Boolean(family) || Boolean(punching)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Select Product"}
                    variant={"standard"}
                    error={productErr.length > 0}
                    helperText={productErr || " "}
                  />
                )}
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                id={"combo-box-variant"}
                options={productVariantList}
                getOptionLabel={(option) => option.name}
                getOptionDisabled={(option) => option.isPunched}
                onChange={(e, newValue) =>
                  this.handleDropdownValueChange(newValue, "variant")
                }
                value={variant}
                disabled={!Boolean(product) || Boolean(punching)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Select Product Variant"}
                    variant={"standard"}
                    error={variantErr.length > 0}
                    helperText={variantErr || " "}
                  />
                )}
              />
            </Grid>
            <Grid item md={3}>
              <PrimaryButton
                disabled={Boolean(punching)}
                color={"primary"}
                variant={"contained"}
                onClick={() => this.handleAdd()}
              >
                {"Add"}
              </PrimaryButton>
            </Grid>
          </Grid>
          {this.renderPunchedList()}
          {punching && (
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Box pt={1}>
                  <Typography
                    variant={"h6"}
                    style={{ color: "#1093FF", fontWeight: "bold" }}
                  >
                    {this.renderProductText(getPunchingDataList)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label='Product Family'
                  value={punching.familyName}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label='Product Variant'
                  value={punching.productVariant}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label='Variant SKU (Standalone)'
                  value={punching.variantSku}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label='Standalone Sellable?'
                  value={punching.standalone}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label='Product Pricing (Standalone)'
                  value={punching.productPriceStandalone}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label='Product Pricing (Combo)'
                  value={punching.productPriceCombo}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label='Product SKU (Combo)'
                  value={punching.productSku}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label='Product Validity'
                  value={punching.validity}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label='End of Service'
                  value={punching.endOfServiceDate}
                />
              </Grid>
              {this.renderPayment()}
            </Grid>
          )}

          <Grid item md={12}>
            <Box pt={3} textAlign={"center"}>
              {punching && (
                <PrimaryButton
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => this.handleUpdate()}
                  disabled={Boolean(loadUpdate)}
                >
                  {"Update Details"}
                </PrimaryButton>
              )}
            </Box>
          </Grid>
          <MySnackBar
            snackMsg={this.state.snackMsg}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />
        </ThemeProvider>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
    getPunchingDataList: state.ProductReducer.getPunchingData,
    postPunchingStatus: state.ProductReducer.postPunchingStatus,
    productVariant: state.ProductReducer.productVariant,
  };
};

export default connect(mapStateToProps, {
  getAllProductFamily,
  getProductByFamilyId,
  getPunchingData,
  postPunchingData,
  getReferProductVariantByProductId,
})(ProductPunching);
