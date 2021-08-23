import {
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import {
  Head,
  HeadCell,
  IconBox,
  TableBox,
  HeadInline,
  BodyCell,
  BoldCell,
} from '../../Assets/StyledTableComponents';
import Blue from '../../../Asset/icons/Down.svg';
import Blur from '../../../Asset/icons/Up.png';
import { MoreVertRounded } from '@material-ui/icons';
import { indexOf } from 'lodash';

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

export default function TableComp(props) {
  const {
    tableContent,
    handleUpClick,
    handleDownClick,
    field,
    order,
    handleSortNew,
    handleSortBlue,
    handleSortBlur,
  } = props;

  const renderIcons = (field, order, index) => {
    const typeIndex = field.indexOf('type');
    const courseNameIndex = field.indexOf('courseName');
    const statusIndex = field.indexOf('wkStatusValue');
    const fields = ['type', 'courseName', 'wkStatusValue'];
    // console.log(order[typeIndex] === 'ASC');
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
            onClick={event => console.log(event.target.id)}
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
            onClick={event => console.log(event.target.id)}
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
              <TableCell>
                <HeadInline>
                  {item}
                  {(index === 1 || index === 4 || index === 6) &&
                    renderIcons(field, order, index)
                  // <img
                  //   src={Down}
                  //   alt=''
                  //   style={{
                  //     transform: 'rotate(180deg',
                  //     padding: '2px 8px',
                  //   }}
                  // />
                  // <img src={Down} alt='' style={{ padding: '2px 8px' }} />
                  }
                </HeadInline>
              </TableCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {tableContent &&
            tableContent.map(item => (
              <TableRow key={item.id} style={{ border: '0 0 0 0' }}>
                <BoldCell className={'table_left_align'}>{item.name}</BoldCell>
                <BoldCell>{item.testType}</BoldCell>
                <BoldCell>{item.queAssigns}</BoldCell>
                <BodyCell>{item.queFilled}</BodyCell>
                <BodyCell className={'table_left_align'}>
                  {item.courseName}
                </BodyCell>
                <BodyCell>{item.topicName}</BodyCell>
                <BodyCell>{item.status}</BodyCell>
                <BodyCell>
                  <IconButton
                    aria-controls={item.id}
                    aria-haspopup='true'
                    // onClick={event => handleThreeDotClick(item.id, event)}
                  >
                    <MoreVertRounded style={{ fill: '#1093FF' }} />
                  </IconButton>
                </BodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableBox>
  );
}
