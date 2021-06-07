import { Button, createMuiTheme, ThemeProvider ,Dialog,DialogActions,DialogContent,DialogTitle,Grid,TextField } from '@material-ui/core'
import React from 'react'
function PrimaryButton(props) {
    const buttonTheme = createMuiTheme({
        overrides : {
            MuiButton : {
                containedPrimary : {
                    backgroundColor : "#1093FF",
                    width : "146px",
                    borderRadius : "30px",
                    "&:hover" : {
                        backgroundColor : "#1093FF",
                    }
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