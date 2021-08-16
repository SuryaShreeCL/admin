import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Table,
  TableBody,
  TableRow,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import {
  BlueCell,
  BodyCell,
  Head,
  HeadCell,
  MuiMenu,
} from '../../Assets/StyledTableComponents';
import { MoreVertRounded, ViewColumnSharp } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItems from './MenuItems';

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// const columns = [
//   { field: 'no', headerName: '', width: 150, headerAlign: 'center' },
//   {
//     field: 'conceptName',
//     headerName: ,
//     width: 200,
//     headerAlign: 'center',
//   },
//   {
//     field: 'topicName',
//     headerName: ',
//     width: 200,
//     headerAlign: 'center',
//   },
//   {
//     field: 'noOfTasks',
//     headerName: ,
//     width: 200,
//     headerAlign: 'center',
//   },
//   {
//     field: 'uploadedBy',
//     headerName: ,
//     width: 200,
//     headerAlign: 'center',
//   },
//   { field: 'status', headerName: 'Status', width: 200, headerAlign: 'center' },
//   {
//     field: 'createdDate',
//     headerName: ,
//     width: 200,
//     headerAlign: 'center',
//   },
// ];

const useStyles = makeStyles({
  leftAlign: {
    textAlign: 'left',
  },
});

const columns = [
  'No.',
  'Concept Name',
  'Topic Name',
  'No. of Tasks',
  'Uploaded by',
  'Created Date',
];

const getDateFormat = dateString => {
  let date = new Date(dateString);
  let day = date.getDay();
  let month = MONTH[date.getMonth()];
  let year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
};

export default function DataTable(props) {
  const classes = useStyles();
  const {
    content: rows,
    anchorEl,
    threeDotId,
    handleThreeDotClick,
    handleClose,
  } = props;
  return (
    <React.Fragment>
      <Table>
        <Head>
          <TableRow>
            {columns.map((item, index) => (
              <HeadCell
                className={(index === 0 || index === 4) && classes.leftAlign}
              >
                {item}
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {rows &&
            rows.map((item, index) => {
              return (
                <TableRow style={{ border: '0 0 0 0' }}>
                  <BodyCell className={classes.leftAlign}>{index}</BodyCell>
                  <BodyCell>{item.conceptName}</BodyCell>
                  <BlueCell>{item.topicName}</BlueCell>
                  <BodyCell>{item.noOfTasks}</BodyCell>
                  <BodyCell className={classes.leftAlign}>
                    {item.uploadedBy}
                  </BodyCell>
                  <BodyCell>{getDateFormat(item.createdAt)}</BodyCell>
                  <BlueCell>
                    <IconButton
                      aria-controls={item.id}
                      aria-haspopup='true'
                      onClick={handleThreeDotClick}
                    >
                      <MoreVertRounded style={{ fill: '#1093FF' }} />
                    </IconButton>
                    <MuiMenu
                      id={item.id}
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      onClose={handleClose}
                    >
                      <MenuItems roll={'LMSCHECKER'} />
                    </MuiMenu>
                  </BlueCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
