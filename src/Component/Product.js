import React from 'react'
import {useState,useEffect} from "react"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {viewProduct,addProductToStudent,viewProductToStudent} from "../Actions/ProductAction"
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
function Product(props) {
    const [dialogOpen,setDialogOpen] = useState(false)
    const [product,setProduct] = useState(null)
    const [collapse,setCollapse] = useState(false)
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
        props.viewProduct()
        props.viewProductToStudent(props.id)
      },[])
      
      const submitHandler = (event) =>{
          console.log(event)
        let obj = {
          studentId: props.id,
          product: product
        };
        props.addProductToStudent(obj)
        setDialogOpen(false)
      }
    return (
        <div>
            <Grid container spacing={3}>
                {/* <Grid item md={12} sm={12} xs={12} xl={12} lg={12}>
                    <Typography>Purchased Product</Typography>
                    <IconButton 
                    onClick={(e)=>setCollapse(!collapse)}
                    >
                        {collapse === false ? 
                         <VscChevronDown /> :  <VscChevronUp  />
                    }
                    </IconButton>
                </Grid>
                <Collapse in={collapse}>
                <Grid item md={12} sm={12} xs={12} xl={12} lg={12}>
                    Some Text
                </Grid>
                </Collapse> */}
               
            <Grid item md={6}>
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
                            {props.viewProductToStudentList !== undefined ? 
                            props.viewProductToStudentList.map(singleProduct=>{
                                return(
                                    <>
                                    <TableRow>
                                        <TableCell>
                                        {singleProduct.id}
                                        </TableCell>
                                        <TableCell>
                                        {singleProduct.name}
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
            <Grid item md={6}>
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
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={props.viewProductList}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        onChange={(event,newValue)=>setProduct(newValue)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label="Product"
                        />
                        )}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button
                        size="small"
                        onClick={(e)=>submitHandler()}
                         variant="contained" 
                         color="primary"
                         >
                             Add product
                             </Button>
                    </DialogActions>
            </Dialog>
            </ThemeProvider>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return {
        viewProductList: state.ProductReducer.viewProductList,
        viewProductToStudentList : state.ProductReducer.viewProductToStudentList,
    }
}
export default connect(mapStateToProps,{viewProduct,addProductToStudent,viewProductToStudent})(Product)
