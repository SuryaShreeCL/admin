import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import MySnackBar from '../MySnackBar';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Slide,
    Button,
    Icon,
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core";
import { getAllProductFamily, getProductByFamilyId, getProductVarient } from "../../Actions/ProductAction"
import { ExpandMore } from '@material-ui/icons';
import AddIcon from "@material-ui/icons/Add";
import {
    getAwaitingUsersByAdminId,
    activateStudentProduct,
} from "../../Actions/AdminAction";
// import button from './button';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PrimaryButton from '../../Utils/PrimaryButton';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from "react-redux";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const AntTabs = withStyles({
    root: {
        borderBottom: '2px solid #A2D3FC',
    },
    indicator: {
        backgroundColor: '#1890ff',
        height: "5px",
        borderRadius: "6px 6px 0px 0px"
    },


})(Tabs);

const theme = createMuiTheme({
    overrides: {
        MuiInputLabel: {
            root: {
                whiteSpace: "nowrap",
                fontSize: "inherit",
            },
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: "0px",
                marginBottom: "0px"
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: '20px'
            }
        }
    },
});
const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1,
        },
        "&$selected": {
            color: "#000",
            fontWeight: theme.typography.fontWeightBold,
        },
        "&:focus": {
            color: "#000",
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

class ProductActivation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabCount: 0,
            show: false,
            id: "",
            clientName: null,
            contactNumber: null,
            email: null,
            clsId: null,
            productFamily: null,
            productVariant: null,
            intake: null,
            year: null,
            validity: null,
            endServiceDate: null,
            amountPaid: null,
            bdaName: null,
            studentId: null,
            snackOpen: false,
            snackColor: null,
            snackMsg: null,
            shrink:false,
        };

    }
    handleClose = (e) => {
        this.setState({ show: false });
    };

    componentDidMount() {
        this.props.getAwaitingUsersByAdminId();
        this.props.getAllProductFamily()
        this.props.getProductVarient()
    }
    shrink(){
        this.setState({ shrink: true });
    }

    handleShowPopUp = (data) => {
        console.log(data)
        this.setState({
            show: true,
            clientName: data.fullName === null ? data.firstName + data.lastName : data.fullName,
            contactNumber: data.phoneNumber,
            email: data.emailId,
            clsId: data.clsId,
            productFamily: data.products.productFamily,
            productVariant: data.products,
            intake: data.products.intake,
            year: data.year,
            validity: data.products.validity,
            endServiceDate: data.products.endOfServiceDate,
            amountPaid: data.products.sellingPrice,
            bdaName: data.punchedBy,
            studentId: data.studentId
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.productActivationResponse !== prevProps.productActivationResponse) {
            this.setState({
                snackOpen: true,
                snackColor: "success",
                snackMsg: "Product activated successfully"
            })
        }
    }

    handleActivate = () => {
        let obj = {
            studentId: this.state.studentId,
            productPaymentModels: [
                {
                    productId: this.state.productVariant.id,
                    stage: "Activated",
                    activatedBy: window.sessionStorage.getItem("adminUserId"),
                },
            ],
        };
        this.props.activateStudentProduct(obj)
    }


    render() {
        console.log(this.state)
        return (
            <div style={{ padding: 10 }}>
                <ThemeProvider theme={theme}>
                    {/* <div style={{ display: 'flex', flexDirection: 'row', }}> */}

                    <AntTabs
                        value={this.state.tabCount}
                        textColor={"inherit"}
                        // onChange={(e, value) => this.setState({ tabCount: value })}
                        aria-label="ant example"

                    >
                        <AntTab label="Awaiting Allocation" />
                    </AntTabs>
                    <TextField
                        label='Search by Email ID / Mobile / Full Name / CLS ID'
                        variant="outlined"
                        InputLabelProps={{
                            shrink: this.state.shrink
                        }}
                        // label=""
                        onFocus={()=> this.shrink()}
                        type="search"
                        InputProps={{

                            startAdornment: (
                                
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        style={{ width: '50%', marginLeft: '50%', bottom: 65 }}
                    />
                    {/* </div> */}

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>CLS ID</TableCell>
                                    <TableCell align='center'>Client Name</TableCell>
                                    <TableCell align='center'>College</TableCell>
                                    <TableCell align='center'>Dept</TableCell>
                                    <TableCell align='center'>Degree</TableCell>
                                    <TableCell align='center'>Product Varient</TableCell>
                                    <TableCell align='center'>Order Punch Date</TableCell>
                                    <TableCell align='center'>Amount Paid</TableCell>
                                    <TableCell align='center'>Activated</TableCell>
                                    <TableCell align='center'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {this.props.awaitingUsersForActivationList.length !== 0 &&
                                    this.props.awaitingUsersForActivationList.map(
                                        (eachData, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="center">{eachData.clsId}</TableCell>
                                                    <TableCell align="center">
                                                        {eachData.fullName}
                                                    </TableCell>
                                                    <TableCell align="center">{eachData.college}</TableCell>
                                                    <TableCell align="center">
                                                        {eachData.department}
                                                    </TableCell>
                                                    <TableCell align="center">{eachData.degree}</TableCell>
                                                    <TableCell align="center">
                                                        {eachData.products.name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {eachData.orderDate}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {eachData.paymentProvider}
                                                    </TableCell>
                                                    <TableCell align="center">{eachData.stage}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => this.handleShowPopUp(eachData)}
                                                        >
                                                            <AddCircleRoundedIcon
                                                                style={{ color: "#1093FF" }}
                                                            />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ borderRadius: 10 }}>
                        <Dialog
                            maxWidth="lg"
                            fullWidth={true}
                            open={this.state.show}
                            onClose={this.handleClose}
                            // maxHeight='lg'
                            aria-labelledby="customized-dialog-title"
                        >
                            {/* <Dialog id="customized-dialog-title" > */}
                            <div className="flex-1 text-center">
                            </div>
                            <div className="model-close-button" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton aria-label="close" onClick={this.handleClose}>
                                    <CloseIcon style={{ background: '#ADD8E6', borderRadius: 20, color: '#1093FF', backgroundSize: 20 }} />
                                </IconButton>
                            </div>
                            {/* </DialogTitle> */}
                            <DialogContent style={{ height: '300px' }}>
                                <Grid container spacing={4} style={{ width: '90%', paddingLeft: 50 }}>
                                    <Grid item xs={6} sm={3} >
                                        <TextField

                                            color="primary"
                                            label="Client Name"
                                            fullWidth
                                            disabled
                                            value={this.state.clientName}
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField

                                            color="primary"
                                            label="Contact Number"
                                            fullWidth
                                            disabled
                                            value={this.state.contactNumber}
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField

                                            color="primary"
                                            label="Email Address"
                                            fullWidth
                                            disabled
                                            value={this.state.email}
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            disabled
                                            value={this.state.clsId}
                                            color="primary"
                                            label="CLS ID"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Autocomplete
                                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                                            id="combo-box-demo"
                                            disabled
                                            value={this.state.productFamily}
                                            options={this.props.getAllProductFamilyList}
                                            getOptionLabel={(option) => option.productName}
                                            //   style={{ width: 300 }}
                                            onChange={(e, value) => this.setState({ productFamily: value })}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Product Family" variant="standard" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Autocomplete
                                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                                            id="combo-box-demo"
                                            disabled
                                            value={this.state.productVariant}
                                            options={this.props.getProductVarientList}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(e, value) => this.setState({ productVariant: value })}
                                            //   style={{ width: 300 }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Product Variant" variant="standard" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            disabled
                                            value={this.state.intake}
                                            color="primary"
                                            label="Intake"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            disabled
                                            value={this.state.year}
                                            color="primary"
                                            label="Year"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            disabled
                                            value={this.state.validity}
                                            color="primary"
                                            label="Product Validity"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            disabled
                                            value={this.state.endServiceDate}
                                            color="primary"
                                            label="End Of Service Date"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            disabled
                                            value={this.state.amountPaid}
                                            color="primary"
                                            label="Amount Paid"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            disabled
                                            value={this.state.bdaName}
                                            color="primary"
                                            label="BDA Name"
                                            fullWidth
                                        // value={this.state.name}
                                        // onChange={(e) => this.setState({ name: e.target.value })}

                                        />
                                    </Grid>

                                </Grid>

                            </DialogContent>
                            {/* <DialogActions> */}
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10%', paddingBottom: '5%' }}>
                                <PrimaryButton onClick={this.handleActivate} variant={"contained"} color={"primary"} >
                                    Activate
                                </PrimaryButton>
                            </div>
                            {/* </DialogActions> */}
                        </Dialog>
                    </div>
                </ThemeProvider>
                <MySnackBar
                    onClose={() => this.setState({ snackOpen: false })}
                    snackOpen={this.state.snackOpen}
                    snackVariant={this.state.snackColor}
                    snackMsg={this.state.snackMsg}
                />

            </div>

        );
    }
}

export const mapStateToProps = (state) => {
    return {
        awaitingUsersForActivationList:
            state.AdminReducer.awaitingUsersForActivationList,
        productActivationResponse: state.AdminReducer.productActivationResponse,
        getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
        getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
        getProductVarientList: state.ProductReducer.getProductVarient,

    };
};

export default connect(mapStateToProps, {
    getAwaitingUsersByAdminId,
    activateStudentProduct,
    getProductByFamilyId,
    getAllProductFamily,
    getProductVarient,
})(ProductActivation);
