import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Card,IconButton, Typography} from "@material-ui/core"
import { AddCircle } from "@material-ui/icons";
import { productcomboPath } from "../RoutePaths";
class AddNewCard extends Component {
  constructor(props) {
    super(props);
    
  }
 
    render() {
        return (
            <div>
                <Card style={{ height: "200px", maxWidth: "330px",width:"100%",boxShadow:" 0px 0px 7px rgba(183, 222, 255, 0.5)",borderRadius:8 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <IconButton 
                // onClick={()=>this.props.history.push(productcomboPath)}
                component={Link} to="/admin/productcombo"
                >
                    <AddCircle fontSize="large" color="primary"/>
                </IconButton>
                <Typography style={{color:"#1093FF"}}>Create a New Product combo</Typography>
              </div>
            </Card>
            </div>
        );
    }
}

export default AddNewCard;