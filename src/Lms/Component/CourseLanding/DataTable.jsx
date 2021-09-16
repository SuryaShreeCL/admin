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
  let day = date.getDate();
  let month = MONTH[date.getMonth()];
  let year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
};

const handleShowThreeDot = (role, status) => {
  return !(
    role === 'LMSEDITOR' &&
    (status === 'Live' || status === 'In Review' || status === 'Approved')
  );
};

export default function DataTable(props) {
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

  // console.log(topics);

  return (
    <React.Fragment>
      <Table>
        <Head>
          <TableRow>
            {columns.map((item, index) => (
              <HeadCell
                className={
                  index === 3 || index === 0 ? 'table_center_align' : null
                }
                key={index}
              >
                {item}
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {topics !== null &&
            topics.map((item, index) => {
              return (
                <TableRow key={index} style={{ border: '0 0 0 0' }}>
                  <BodyCell className={'table_center_align'}>
                    {pageNo * 10 + index + 1}
                  </BodyCell>
                  <BodyCell>{item.conceptName}</BodyCell>
                  <BlueCell>{item.topicName}</BlueCell>
                  <BodyCell className={'table_center_align'}>
                    {item.noOfTasks}
                  </BodyCell>
                  <BodyCell>{item.uploadedBy}</BodyCell>
                  <BodyCell>{item.status}</BodyCell>
                  <BodyCell>{getDateFormat(item.createdAt)}</BodyCell>
                  <BlueCell>
                    {handleShowThreeDot(role, item.status) && (
                      <div>
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
                          // open={openHandle(item.id, popUpId, role, item.status)}
                          handleClose={handleClose}
                          status={item.status}
                          handleOptions={handleOptions}
                          name={item.topicName}
                          topicId={item.id}
                        />
                      </div>
                    )}
                  </BlueCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
