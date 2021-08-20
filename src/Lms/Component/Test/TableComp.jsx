import { Box, Table, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import {
  Head,
  HeadCell,
  IconBox,
  TableBox,
  HeadInline,
} from '../../Assets/StyledTableComponents';
import data from './sample';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Down from '../../../Asset/icons/Down.svg';

const headText = [
  'Name',
  'Test Type',
  '#  Que Assignes',
  '# Que filled',
  'Course',
  'Topic name',
];
export default function TableComp() {
  const content = data.content;
  // console.log(data);
  return (
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map((item, index) => (
              <TableCell>
                <HeadInline>
                  {item}
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
                </HeadInline>
              </TableCell>
            ))}
          </TableRow>
        </Head>
      </Table>
    </TableBox>
  );
}
