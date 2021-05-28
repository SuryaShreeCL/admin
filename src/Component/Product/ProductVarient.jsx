import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Slide
  } from "@material-ui/core";
  import TableComponent from "../TableComponent/TableComponent"
  import AddIcon from "@material-ui/icons/Add";

export class ProductVarient extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            addTermDialog: false,
        }
    }
    addTermDialogHandler = (event) => {
        this.setState({
          addTermDialog: true,
        });
      };
    
    render() {
        return (
            <div>
                 {/* <TableComponent
                  add={true}
                /> */}
               <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Varient short Name</TableCell>
                <TableCell>Code Name</TableCell>
                <TableCell>Product Oneliner</TableCell>
                <TableCell>Product description</TableCell>
                <TableCell>Product Images</TableCell>
                <TableCell>Product Videos</TableCell>
                <TableCell>Product Tnc</TableCell>
                <TableCell>Product Q&A</TableCell>
                <TableCell>Action</TableCell>
               
                {/* <Button  variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          style={{}}
                        //   onClick={this.addDegereeDialogHandler}
                          size="medium">Add</Button> */}
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                      <TableCell> 
                       Profile Builder for Placements
                      </TableCell>
                      <TableCell> 
                        PBP
                      </TableCell>
                      <TableCell> 
                       Profile Builder
                      </TableCell>
                      <TableCell> 
                      Description of Profile builder
                      </TableCell>
                      <TableCell> 
                      Profile Builder Images
                      </TableCell>
                      <TableCell> 
                      Profile Builder Videos
                      </TableCell>
                      <TableCell> 
                      Profile Builder Terms and conditions
                      </TableCell>
                      <TableCell> 
                          Profile builder Q and Ans
                      </TableCell>
                      <TableCell> 
                      <Button size="small" variant="contained" color="primary" style={{margin:"5px"}}>Edit</Button>
                      <Button size="small" variant="contained" color="secondary" style={{margin:"5px"}}>Cancel</Button>
                      </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
            </div>
        )
    }
}

export default ProductVarient
