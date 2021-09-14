import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { MoreVertRounded } from '@material-ui/icons';
import React from 'react';
import Blue from '../../../Asset/icons/Down.svg';
import Blur from '../../../Asset/icons/Up.png';
import {
  BodyCell,
  BoldCell,
  Head,
  HeadInline,
  IconBox,
  TableBox,
} from '../../Assets/StyledTableComponents';
import Menu from './Menu';

const headText = [
  'Name',
  'Test Type',
  '#  Que Assignes',
  '# Que filled',
  'Course',
  'Topic name',
  'Status',
  '',
];

// const handleOpen = (itemId, popUpId, role, status) => {
//   // console.log(status);
//   // console.log(role === 'LMSEDITOR' && status === 'Live');
//   if (role === 'LMSEDITOR' && (status === 'Live' || status === 'In Review'))
//     return false;
//   else return itemId === popUpId;
// };

const handleShowThreeDot = (role, status) => {
  return !(
    role === 'LMSEDITOR' &&
    (status === 'Live' || status === 'In Review' || status === 'Approved')
  );
};

export default function TableComp(props) {
  const {
    tableContent,
    field,
    order,
    handleSortNew,
    handleSortBlue,
    handleSortBlur,
    role,
    handleThreeDotClick,
    anchorEl,
    popUpId,
    handleClose,
    handleOptions,
  } = props;

  //Sort Icons
  const renderIcons = (field, order, index) => {
    const typeIndex = field.indexOf('type');
    const courseNameIndex = field.indexOf('courseName');
    const statusIndex = field.indexOf('wkStatusValue');
    const fields = ['type', 'courseName', 'wkStatusValue'];
    if (index === 1 && order[typeIndex] === 'ASC') {
      return (
        <IconBox>
          <img
            src={Blue}
            alt='Up arrow'
            className={'up_arrow rotate'}
            id='type'
            onClick={() => {
              handleSortBlue(typeIndex);
            }}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={'down_arrow rotate'}
            id='type'
            onClick={() => {
              handleSortBlur(typeIndex);
            }}
          />
        </IconBox>
      );
    } else if (index === 1 && order[typeIndex] === 'DESC') {
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={'up_arrow'}
            id='type'
            onClick={() => {
              handleSortBlur(typeIndex);
            }}
          />
          <img
            src={Blue}
            alt='Down arrow'
            className={'down_arrow'}
            id='type'
            onClick={() => handleSortBlue(typeIndex)}
          />
        </IconBox>
      );
    } else if (index === 4 && order[courseNameIndex] === 'ASC') {
      return (
        <IconBox>
          <img
            src={Blue}
            alt='Up arrow'
            className={'up_arrow rotate'}
            id={'courseName'}
            onClick={() => handleSortBlue(courseNameIndex)}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={'down_arrow rotate'}
            id={'courseName'}
            onClick={() => handleSortBlur(courseNameIndex)}
          />
        </IconBox>
      );
    } else if (index === 4 && order[courseNameIndex] === 'DESC') {
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={'up_arrow'}
            id={'courseName'}
            onClick={() => handleSortBlur(courseNameIndex)}
          />
          <img
            src={Blue}
            alt='Down arrow'
            className={'down_arrow'}
            id={'courseName'}
            onClick={() => handleSortBlue(courseNameIndex)}
          />
        </IconBox>
      );
    } else if (index === 6 && order[statusIndex] === 'ASC') {
      return (
        <IconBox>
          <img
            src={Blue}
            alt='Up arrow'
            className={'up_arrow rotate'}
            id={'wkStatusValue'}
            onClick={() => handleSortBlue(statusIndex)}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={'down_arrow rotate'}
            id={'wkStatusValue'}
            onClick={() => handleSortBlur(statusIndex)}
          />
        </IconBox>
      );
    } else if (index === 6 && order[statusIndex] === 'DESC') {
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={'up_arrow'}
            id={'courseName'}
            onClick={() => handleSortBlur(statusIndex)}
          />
          <img
            src={Blue}
            alt='Down arrow'
            className={'down_arrow'}
            id={'courseName'}
            onClick={() => handleSortBlue(statusIndex)}
          />
        </IconBox>
      );
    }
    // Default
    else
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={'up_arrow'}
            onClick={() => {
              handleSortNew(index, 'ASC');
            }}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={'down_arrow rotate'}
            onClick={() => {
              handleSortNew(index, 'DESC');
            }}
          />
        </IconBox>
      );
  };

  return (
    <TableBox>
      <Table style={{ marginTop: '40px' }}>
        <Head>
          <TableRow>
            {headText.map((item, index) => (
              <TableCell className={''}>
                <HeadInline>
                  {item}
                  {(index === 1 || index === 4 || index === 6) &&
                    renderIcons(field, order, index)}
                </HeadInline>
              </TableCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {tableContent &&
            tableContent.map(item => {
              return (
                <TableRow key={item.id} style={{ border: '0 0 0 0' }}>
                  <BoldCell>{item.name}</BoldCell>
                  <BoldCell>{item.testType}</BoldCell>
                  <BoldCell className={'table_center_align'}>
                    {item.queAssigns}
                  </BoldCell>
                  <BodyCell className={'table_center_align'}>
                    {item.queFilled}
                  </BodyCell>
                  <BodyCell>{item.courseName}</BodyCell>
                  <BodyCell>{item.topicName}</BodyCell>
                  <BodyCell>{item.status}</BodyCell>
                  <BodyCell>
                    {handleShowThreeDot(role, item.status) && (
                      <div>
                        <IconButton
                          aria-controls={item.id}
                          aria-haspopup='true'
                          onClick={event => handleThreeDotClick(event, item.id)}
                          style={{ padding: '0px' }}
                        >
                          <MoreVertRounded style={{ fill: '#1093FF' }} />
                        </IconButton>
                        <Menu
                          role={role}
                          anchorEl={anchorEl}
                          open={item.id === popUpId}
                          // open={handleOpen(item.id, popUpId, role, item.status)}
                          handleClose={handleClose}
                          status={item.status}
                          handleOptions={handleOptions}
                          name={item.name}
                          topicId={item.id}
                        />
                      </div>
                    )}
                  </BodyCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableBox>
  );
}
