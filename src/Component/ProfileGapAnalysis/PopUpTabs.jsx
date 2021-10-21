import React from "react"
import { withStyles, Tabs, Tab } from "@material-ui/core"
export const StyledTabs = withStyles({
  root : {
    borderBottom : "1px solid #f1f1f1"
  },
    indicator: {
      width : "160px !important",
      display: 'flex',
      justifyContent: 'center',
      height : "3px",
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#0186CD',
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  
  export const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: '#000',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(13),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
  }))((props) => <Tab disableRipple {...props} />);