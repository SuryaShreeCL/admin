import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    "& .MuiPaginationItem-icon": {
      color: "#ffffff",
    },
    "& .MuiPagination-ul > li": {
      "&:first-child": {
        "& button": {
          background: "#1093ff",
        },
      },
      "&:last-child": {
        "& button": {
          background: "#1093ff",
        },
      },
    },
    "& .MuiPagination-ul": {
      justifyContent: "center",

      flexWrap: "nowrap",
    },
    "& .Mui-selected": {
      backgroundColor: "white",
      color: "#1093ff",
      borderColor: "#1093ff",
    },
    "& .Mui-selected:hover": {
      backgroundColor: "white",
    },
    "& .MuiPaginationItem-page:hover": {
      backgroundColor: "white",
    },
  },
}));

function PaginationComponent({ pageCount, onPageChange, page }) {
  const classes = useStyles();
  if (pageCount <= 1) return null;
  else
    return (
      <React.Fragment>
        <Pagination
          className={classes.root}
          count={pageCount}
          page={parseInt(page)}
          onChange={onPageChange}
          variant='outlined'
          shape='rounded'
        />
      </React.Fragment>
    );
}

export default PaginationComponent;
