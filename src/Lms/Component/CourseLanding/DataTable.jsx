import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Table,
  TableBody,
  TableRow,
  makeStyles,
  IconButton,
  MenuItem,
  ListItemIcon,
  Typography,
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '../../Assets/icons/Publish.svg';

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

const ROLLS = { admin: 'LMSADMIN', checker: 'LMSCHECKER' };

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
  '',
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

  const renderMenuItems = (roll, topicId) => {
    if (roll === ROLLS.admin) {
      // console.log(topicId);
      return (
        <div>
          <MenuItem>
            <ListItemIcon className={'menu-item-text'}>
              <EditIcon style={{ fill: '#1093FF' }} />
            </ListItemIcon>
            <Typography>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleDelete(topicId)}>
            <ListItemIcon className={'menu-item-text'}>
              <DeleteIcon style={{ fill: '#1093ff' }} />
            </ListItemIcon>
            <Typography>Delete</Typography>
          </MenuItem>
        </div>
      );
    }
    if (roll === ROLLS.checker) {
      return (
        <div>
          <MenuItem className={'menu-item-text'}>
            <ListItemIcon>
              <img src={PublishIcon} alt='Publish Icon' />
            </ListItemIcon>
            <Typography>Publish Now</Typography>
          </MenuItem>
          <MenuItem className={'menu-item-text'}>
            <ListItemIcon>
              <EditIcon style={{ fill: '#1093FF' }} />
            </ListItemIcon>
            <Typography>Edit</Typography>
          </MenuItem>
          <MenuItem className={'menu-item-text'}>
            <ListItemIcon onClick={() => handleDelete(topicId)}>
              <DeleteIcon style={{ fill: '#1093ff' }} />
            </ListItemIcon>
            <Typography>Delete</Typography>
          </MenuItem>
        </div>
      );
    }
  };
  const {
    topics,
    anchorEl,
    handleThreeDotClick,
    handleClose,
    pageNo,
    handleDelete,
    popUpId,
  } = props;
  // if (props.topics !== undefined) {
  //   console.log(topics.data);
  // }
  return (
    <React.Fragment>
      <Table>
        <Head>
          <TableRow>
            {columns.map((item, index) => (
              <HeadCell
                className={index === 4 ? classes.leftAlign : null}
                key={index}
              >
                {item}
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {topics !== undefined &&
            topics.data.content.map((item, index) => {
              // console.log(item.id);
              return (
                <TableRow key={index} style={{ border: '0 0 0 0' }}>
                  <BodyCell className={classes.leftAlign}>
                    {pageNo * 10 + index + 1}
                  </BodyCell>
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
                      onClick={event => handleThreeDotClick(item.id, event)}
                    >
                      <MoreVertRounded style={{ fill: '#1093FF' }} />
                    </IconButton>
                    <MuiMenu
                      id={item.id}
                      open={item.id === popUpId}
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      onClose={handleClose}
                    >
                      {renderMenuItems('LMSCHECKER', item.id)}
                      {/* <MenuItems  /> */}
                    </MuiMenu>
                  </BlueCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
  // } else return null;
}
