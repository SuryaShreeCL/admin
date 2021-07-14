import { Button, createMuiTheme, ThemeProvider ,Dialog,DialogActions,DialogContent,DialogTitle,Grid,TextField } from '@material-ui/core'
import React from 'react'
function PrimaryButton(props) {
    const buttonTheme = createMuiTheme({
        overrides : {
            MuiButton : {
                label : {
                    whiteSpace : "nowrap"
                },
                containedPrimary : {
                    backgroundColor : "#1093FF",
                    width : "190px",
                    borderRadius : "30px",
                    "&:hover" : {
                        backgroundColor : "#1093FF",
                    }
                },
                containedSecondary : {
                    backgroundColor : "#FF0000",
                    width : "170px",
                    borderRadius : "30px",
                    "&:hover" : {
                        backgroundColor : "#FF0000",
                    }
                },
                outlinedSecondary : {
                    border : "1px solid #FF0000",
                    width : "146px",
                    color : "#FF0000",
                    borderRadius : "30px",
                    "&:hover" : {
                        border : "1px solid FF0000",                }    
                },
               outlinedPrimary : {
                   border : "1px solid #1093FF",
                   width : "146px",
                   color : "#1093FF",
                borderRadius : "30px",
                "&:hover" : {
                    border : "1px solid 1093FF",                }
               }
            }
        }
    })
    return (
        <ThemeProvider theme={buttonTheme}>
        <Button
        {...props}
          >
        {props.children}
          </Button>    
           </ThemeProvider>
    )
}

export default PrimaryButton