import React from 'react'
import {useState,useEffect} from "react"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {viewProduct,addProductToStudent,viewProductToStudent, getAllProductFamily, getProductByFamilyId} from "../Actions/ProductAction"
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";
import {Grid, 
    TextField, 
    Typography, 
    Button,
     Dialog, 
     DialogTitle, 
     DialogContent, 
     IconButton,
      createMuiTheme,
      ThemeProvider,
      DialogActions,
      TableBody,
      TableRow,
        TableContainer,
        Paper,
        Table,
        TableHead,
        TableCell,
        Collapse
    } from "@material-ui/core"
    import { connect } from "react-redux";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import MySnackBar from './MySnackBar';
function Product(props) {
    const [dialogOpen,setDialogOpen] = useState(false)
    const [productFamily,setProductFamily] = useState(null)
    const [currentDate] = useState(new Date())
    const [collapse,setCollapse] = useState(false)
    const [snack,setSnack] = useState({
        snackOpen : false,
        snackMsg : "",
        snackColor : "",
    })
    const dialogTheme = createMuiTheme({
        overrides : {
            MuiDialog: {
                paperWidthSm: {
                  width: "50%",
                  padding : "1%"
                },
              },
        }
    })
    const  useStyles = makeStyles({
       
      });
      const classes = useStyles()

      useEffect(()=>{
        props.viewProductToStudent(props.id)
        props.getAllProductFamily()
      },[])

      useEffect(()=>{
          if(props.addProductToStudentResponse.length !== 0){
            setSnack({
                snackColor : "success",
                snackMsg : "Product alocated successfully",
                snackOpen : true
            })
            props.viewProductToStudent(props.id)
          }
        
      },[props.addProductToStudentResponse])

      
      const submitHandler = (value) =>{
          console.log(value)
        let obj = {
          student: {
            id: props.id,
          },
          product: {
            id: value.id,
          },
          enrollmentDate: currentDate,
        };
        console.log(obj)
        props.addProductToStudent(obj)
        setDialogOpen(false)
      }

      const productFamilyChangeHandler = (value) =>{
        console.log(value)
        if(value !== null){
            props.getProductByFamilyId(value.id)
            setProductFamily(value)
        }
       
      }
      console.log(props.studentProductList)
      console.log(props.productFamilyList)
      console.log(props.productVariantList)

    return (
        <div>
            <Grid container spacing={3}>
            <Grid item md={10}>
                <Typography>Product Details</Typography>
                                <TableContainer component={Paper}>
                                <Table aria-label="caption table">
                                <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {props.studentProductList.length !== 0 ? 
                            props.studentProductList.map(singleProduct=>{
                                return(
                                    <>
                                    <TableRow>
                                        <TableCell>
                                        {singleProduct.product.id}
                                        </TableCell>
                                        <TableCell>
                                        {singleProduct.product.name}
                                        </TableCell>
                                    </TableRow>
                                    </>
                                )
                            }) : null
                        }
                            </TableBody>
                                    </Table>
                                </TableContainer>
            </Grid>
            <Grid item md={2}>
            <Button 
            variant={"contained"} 
            color={"primary"}
            onClick={(e)=>setDialogOpen(true)}
            >
                Add New Product
                </Button>
            </Grid>
            </Grid>
            <ThemeProvider theme={dialogTheme}>
            <Dialog open={dialogOpen} className={classes.dialog} onClose={(e)=>setDialogOpen(false)}>
                <DialogTitle>
                    <Typography>Choose Product </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12} xs={12}>
                            <Autocomplete
                        id="tags-outlined"
                        options={props.productFamilyList !== undefined ? props.productFamilyList : []}
                        getOptionLabel={(option) => option.productName === null ? "" : option.productName}
                        filterSelectedOptions
                        onChange={(event,newValue)=>productFamilyChangeHandler(newValue)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label="Select the product family"
                        />
                        )}
                    />
                            </Grid>
                            {props.productVariantList !== undefined && props.productVariantList.map((eachProduct,index)=>{
                                return (
                                    <>
                            <Grid item md={8} sm={8} xs={8}>
                                <Typography>{eachProduct.name}</Typography>
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <Button fullWidth size="small" onClick={()=>submitHandler(eachProduct)} variant="contained" color={"primary"}>Allocate Product</Button>
                            </Grid>
                                    </>
                                )
                            })}

                        </Grid>
                   
                    </DialogContent>
                    <DialogActions>
                        
                    </DialogActions>
            </Dialog>
            </ThemeProvider>
            <MySnackBar
            snackColor={snack.snackColor}
            snackMsg={snack.snackMsg}
            snackOpen={snack.snackOpen}
            onClose={()=>setSnack({
                snackColor : "",
                snackOpen : false,
                snackMsg : ""
            })}
            />
        </div>
    )
}
const mapStateToProps=(state)=>{
    console.log(state.ProductReducer)
    return {
        viewProductList: state.ProductReducer.viewProductList,
        studentProductList : state.ProductReducer.studentProductList,
        productFamilyList : state.ProductReducer.getAllProductFamily,
        productVariantList : state.ProductReducer.getProductByFamilyId,
        addProductToStudentResponse : state.ProductReducer.addProductToStudentResponse
    }
}
export default connect(mapStateToProps,{viewProduct,addProductToStudent,viewProductToStudent,getAllProductFamily,getProductByFamilyId})(Product)
