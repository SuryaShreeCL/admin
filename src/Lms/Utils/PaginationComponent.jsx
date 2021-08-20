import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

// import PropType from 'prop-types';

// const paginationTheme = createTheme({
//   palette: {
//     secondary: {
//       main: '#1093FF',
//     },
//   },
// });

const useStyles = makeStyles(theme => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiPaginationItem-icon': {
      color: '#ffffff',
    },
    '& .MuiPagination-ul > li': {
      '&:first-child': {
        '& button': {
          background: '#1093ff',
        },
      },
      '&:last-child': {
        '& button': {
          background: '#1093ff',
        },
      },
    },
    '& .Mui-selected': {
      backgroundColor: 'white',
      color: '#1093ff',
      borderColor: '#1093ff',
    },
    '& .Mui-selected:hover': {
      backgroundColor: 'white',
    },
    '& .MuiPaginationItem-page:hover': {
      backgroundColor: 'white',
    },
  },
}));

function PaginationComponent(props) {
  const classes = useStyles();
  console.log(classes);
  const { pageCount, onPageChange } = props;
  if (pageCount <= 1) return null;
  else {
    return (
      <React.Fragment>
        <Pagination
          className={classes.root}
          count={pageCount}
          onChange={onPageChange}
          variant='outlined'
          shape='rounded'
        />
      </React.Fragment>
    );
  }
}

//Checking props type number/string/function etc
// Pagination.propType = {
//   itemCount: PropType.number.isRequired,
//   pageSize: PropType.number.isRequired,
//   onPageChange: PropType.func,
// };

export default PaginationComponent;
