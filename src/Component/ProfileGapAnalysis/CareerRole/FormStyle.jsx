import { createTheme } from "@material-ui/core";

export const Gridtheme = createTheme({
 overrides : {
        MuiGrid: {
            "spacing-xs-3": {
                width: "100%",
                margin: "0px",
            },
            "spacing-xs-2" : {
                width: "100%",
                margin: "0px",
            }
          },
          MuiButton : {
              containedPrimary : {
                  backgroundColor : "#3eaff0",
                  textTransform : "none"
              },
              outlinedPrimary : {
                  color : "#3eaff0",
                  textTransform : "none"
              }
          }
 }
});
