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
import data from './sample';
import Down from '../../../Asset/icons/Down.svg';
import { MoreVertRounded } from '@material-ui/icons';

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
  const { tableContent } = props;
  return (
    <TableBox>
      <Table style={{ marginTop: '40px' }}>
        <Head>
          <TableRow>
            {headText.map((item, index) => (
              <TableCell>
                <HeadInline>
                  {item}
                  {(index === 1 || index === 4 || index === 6) && (
                    <IconBox>
                      <img
                        src={Down}
                        alt=''
                        style={{
                          transform: 'rotate(180deg',
                          padding: '2px 8px',
                        }}
                      />
                      <img src={Down} alt='' style={{ padding: '2px 8px' }} />
                    </IconBox>
                  )}
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
