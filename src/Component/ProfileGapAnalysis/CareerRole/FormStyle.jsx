import { createTheme } from "@material-ui/core";

export const Gridtheme = createTheme({
 overrides : {
        MuiGrid: {
            "spacing-xs-3": {
                width: "100%",
                margin: "0px",
                padding : "0px"
            },
            "spacing-xs-2" : {
                width: "100%",
                margin: "0px",
            }
          },
          MuiButton : {
              containedPrimary : {
                  backgroundColor : "#3eaff0",
                  textTransform : "none",
                  "&:hover": {
                    backgroundColor: "#3eaff0",
                  },
              },
              outlinedPrimary : {
                  color : "#3eaff0",
                  textTransform : "none",
                  border : "1px solid #3eaff0",
                  "&:hover": {
                    color : "#3eaff0",
                    border : "1px solid #3eaff0",
                },
              }
          },
          MuiToggleButton : {
            label : {
                textTransform : "none",
            },
          }
 }
});
