import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableRow,
} from '@material-ui/core';
import { MoreVertRounded } from '@material-ui/icons';
import React from 'react';
import {
  BlueCell,
  BodyCell,
  Head,
  HeadCell,
} from '../../Assets/StyledTableComponents';
import Menu from '../Test/Menu';

const role = sessionStorage.getItem('role');

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
  'Status',
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

  const {
    topics,
    anchorEl,
    handleThreeDotClick,
    handleClose,
    pageNo,
    popUpId,

    role,
    handleOptions,
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
                  <BodyCell>{item.status}</BodyCell>
                  <BodyCell>{getDateFormat(item.createdAt)}</BodyCell>
                  <BlueCell>
                    <IconButton
                      aria-controls={item.id}
                      aria-haspopup='true'
                      onClick={event => handleThreeDotClick(item.id, event)}
                    >
                      <MoreVertRounded style={{ fill: '#1093FF' }} />
                    </IconButton>
                    <Menu
                      role={role}
                      anchorEl={anchorEl}
                      open={item.id === popUpId}
                      handleClose={handleClose}
                      status={item.status}
                      handleOptions={handleOptions}
                      name={item.topicName}
                      topicId={item.id}
                    />
                    {/* <Menu
                      role={role}
                      open={item.id === popUpId}
                      anchorEl={anchorEl}
                      handleClose={handleClose}
                      handleDelete={handleDelete}
                      topicId={item.id}
                      topicName={item.topicName}
                      handlePublish={handlePublish}
                      handleSendReview={handleSendReview}
                      isMapped={item.isMapped}
                      handleEdit={handleEdit}
                    /> */}
                  </BlueCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
