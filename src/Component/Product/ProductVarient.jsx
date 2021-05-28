import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Slide
  } from "@material-ui/core";

export class ProductVarient extends Component {
    render() {
        return (
            <div>
               <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Varient short Name</TableCell>
                <TableCell>Code Name</TableCell>
                <TableCell>Product Onliner</TableCell>
                <TableCell>Product description</TableCell>
                <TableCell>Product Images</TableCell>
                <TableCell>Product Videos</TableCell>
                <TableCell>Product Tnc</TableCell>
                <TableCell>Product Q&A</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
            </div>
        )
    }
}

export default ProductVarient
