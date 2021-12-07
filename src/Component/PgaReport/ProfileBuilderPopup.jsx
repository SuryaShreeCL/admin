import { Collapse, Dialog, IconButton } from '@material-ui/core';
import {
  BottomContainer,
  DialogContainer,
  LeftContent,
  ListHeader,
  ListSubText,
  MainContainer,
  PopupHeader,
  StyleCloseButton,
  Table,
  TableContainer,
  TableData,
  TableHead,
} from './Components/StyledComponents';
import React from 'react';
import { useStyles } from './Styles/Index';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export const Popup = ({ open, tableCollapse, onClose, handleCollapse }) => {
  const classes = useStyles();
  const renderArrowIcon = key => {
    if (tableCollapse.indexOf(key) > -1)
      return <ExpandLess className={classes.arrowStyle} />;
    else return <ExpandMore className={classes.arrowStyle} />;
  };

  return (
    <Dialog
      open={open}
      classes={{
        root: classes.dialogRoot,
        paper: classes.dialogPaper,
      }}
      fullWidth={true}
    >
      <DialogContainer>
        <PopupHeader>
          {'PGA Report Starter Focus Area Guide <Text Needed>'}
        </PopupHeader>
        <MainContainer>
          {TableContent.map(({ packageText, grades, headers, body }, index) => {
            return (
              <>
                <ListHeader>
                  <LeftContent>
                    <ListSubText>
                      {'Package'}
                      <span>{packageText}</span>
                    </ListSubText>
                    <ListSubText>
                      {'Grades'}
                      <span>{grades}</span>
                    </ListSubText>
                  </LeftContent>
                  <IconButton onClick={() => handleCollapse(index)}>
                    {renderArrowIcon(index)}
                  </IconButton>
                </ListHeader>
                <Collapse in={tableCollapse.indexOf(index) > -1}>
                  <TableContainer>
                    <Table>
                      <tr>
                        {headers.map(title => (
                          <TableHead>{title}</TableHead>
                        ))}
                      </tr>
                      {body &&
                        body.map(
                          ({
                            focusText,
                            quarter1,
                            quarter2,
                            quarter3,
                            quarter4,
                            quarter5,
                            quarter6,
                          }) => (
                            <tr>
                              <TableData>{focusText}</TableData>
                              <TableData>{quarter1}</TableData>
                              <TableData>{quarter2}</TableData>
                              <TableData>{quarter3}</TableData>
                              <TableData>{quarter4}</TableData>
                              <TableData>{quarter5}</TableData>
                              {quarter6 && <TableData>{quarter6}</TableData>}
                            </tr>
                          )
                        )}
                    </Table>
                  </TableContainer>
                </Collapse>
              </>
            );
          })}
        </MainContainer>
        <BottomContainer>
          <StyleCloseButton onClick={onClose}>{'Close'}</StyleCloseButton>
        </BottomContainer>
      </DialogContainer>
    </Dialog>
  );
};

const TableContent = [
  {
    packageText: 'PB - Masters',
    grades: 'Below Average',
    headers: [
      'Focus',
      'Quarter 1',
      'Quarter 2',
      'Quarter 3',
      'Quarter 4',
      'Quarter 5',
      'Quarter 6',
    ],
    body: [
      {
        focusText: 'Focus 1',
        quarter1: 'Starter Pack Courses',
        quarter2: 'Starter Pack Courses',
        quarter3: 'Starter Pack Courses',
        quarter4: 'Starter Pack Courses',
        quarter5: 'Starter Pack Courses',
        quarter6: 'Starter Pack Courses',
      },
      {
        focusText: 'Focus 2',
        quarter1: 'Mini-Project',
        quarter2: 'Mini-Project',
        quarter3: 'Mini-Project',
        quarter4: 'Mini-Project',
        quarter5: 'Mini-Project',
        quarter6: 'Mini-Project',
      },
      {
        focusText: 'Focus 3',
        quarter1: 'Advanced Course-1',
        quarter2: 'Advanced Course-1',
        quarter3: 'Advanced Course-1',
        quarter4: 'Advanced Course-1',
        quarter5: 'Advanced Course-1',
        quarter6: 'Advanced Course-1',
      },
      {
        focusText: 'Focus 4',
        quarter1: 'GRE Preparation',
        quarter2: 'GRE Preparation',
        quarter3: 'GRE Preparation',
        quarter4: 'GRE Preparation',
        quarter5: 'GRE Preparation',
        quarter6: 'GRE Preparation',
      },
    ],
  },
  {
    packageText: 'PB - Masters',
    grades: 'Moderate',
    headers: [
      'Focus',
      'Quarter 1',
      'Quarter 2',
      'Quarter 3',
      'Quarter 4',
      'Quarter 5',
      'Quarter 6',
    ],
    body: [
      {
        focusText: 'Focus 1',
        quarter1: 'Starter Pack Courses',
        quarter2: 'Starter Pack Courses',
        quarter3: 'Starter Pack Courses',
        quarter4: 'Starter Pack Courses',
        quarter5: 'Starter Pack Courses',
        quarter6: 'Starter Pack Courses',
      },
      {
        focusText: 'Focus 2',
        quarter1: 'Mini-Project',
        quarter2: 'Mini-Project',
        quarter3: 'Mini-Project',
        quarter4: 'Mini-Project',
        quarter5: 'Mini-Project',
        quarter6: 'Mini-Project',
      },
      {
        focusText: 'Focus 3',
        quarter1: 'Advanced Course-1',
        quarter2: 'Advanced Course-1',
        quarter3: 'Advanced Course-1',
        quarter4: 'Advanced Course-1',
        quarter5: 'Advanced Course-1',
        quarter6: 'Advanced Course-1',
      },
      {
        focusText: 'Focus 4',
        quarter1: 'GRE Preparation',
        quarter2: 'GRE Preparation',
        quarter3: 'GRE Preparation',
        quarter4: 'GRE Preparation',
        quarter5: 'GRE Preparation',
        quarter6: 'GRE Preparation',
      },
    ],
  },
  {
    packageText: 'PB - Masters',
    grades: 'Above Average',
    headers: [
      'Focus',
      'Quarter 1',
      'Quarter 2',
      'Quarter 3',
      'Quarter 4',
      'Quarter 5',
      'Quarter 6',
    ],
    body: [
      {
        focusText: 'Focus 1',
        quarter1: 'Starter Pack Courses',
        quarter2: 'Starter Pack Courses',
        quarter3: 'Starter Pack Courses',
        quarter4: 'Starter Pack Courses',
        quarter5: 'Starter Pack Courses',
        quarter6: 'Starter Pack Courses',
      },
      {
        focusText: 'Focus 2',
        quarter1: 'Mini-Project',
        quarter2: 'Mini-Project',
        quarter3: 'Mini-Project',
        quarter4: 'Mini-Project',
        quarter5: 'Mini-Project',
        quarter6: 'Mini-Project',
      },
      {
        focusText: 'Focus 3',
        quarter1: 'Advanced Course-1',
        quarter2: 'Advanced Course-1',
        quarter3: 'Advanced Course-1',
        quarter4: 'Advanced Course-1',
        quarter5: 'Advanced Course-1',
        quarter6: 'Advanced Course-1',
      },
      {
        focusText: 'Focus 4',
        quarter1: 'GRE Preparation',
        quarter2: 'GRE Preparation',
        quarter3: 'GRE Preparation',
        quarter4: 'GRE Preparation',
        quarter5: 'GRE Preparation',
        quarter6: 'GRE Preparation',
      },
    ],
  },
  {
    packageText: 'PB - Placements',
    grades: 'Below Average',
    headers: [
      'Focus',
      'Quarter 1',
      'Quarter 2',
      'Quarter 3',
      'Quarter 4',
      'Quarter 5',
    ],
    body: [
      {
        focusText: 'Focus 1',
        quarter1: 'Starter Pack Courses',
        quarter2: 'Starter Pack Courses',
        quarter3: 'Starter Pack Courses',
        quarter4: 'Starter Pack Courses',
        quarter5: 'Starter Pack Courses',
      },
      {
        focusText: 'Focus 2',
        quarter1: 'Mini-Project',
        quarter2: 'Mini-Project',
        quarter3: 'Mini-Project',
        quarter4: 'Mini-Project',
        quarter5: 'Mini-Project',
      },
      {
        focusText: 'Focus 3',
        quarter1: 'Advanced Course-1',
        quarter2: 'Advanced Course-1',
        quarter3: 'Advanced Course-1',
        quarter4: 'Advanced Course-1',
        quarter5: 'Advanced Course-1',
      },
      {
        focusText: 'Focus 4',
        quarter1: 'GRE Preparation',
        quarter2: 'GRE Preparation',
        quarter3: 'GRE Preparation',
        quarter4: 'GRE Preparation',
        quarter5: 'GRE Preparation',
      },
    ],
  },
  {
    packageText: 'PB - Placements',
    grades: 'Moderate',
    headers: [
      'Focus',
      'Quarter 1',
      'Quarter 2',
      'Quarter 3',
      'Quarter 4',
      'Quarter 5',
    ],
    body: [
      {
        focusText: 'Focus 1',
        quarter1: 'Starter Pack Courses',
        quarter2: 'Starter Pack Courses',
        quarter3: 'Starter Pack Courses',
        quarter4: 'Starter Pack Courses',
        quarter5: 'Starter Pack Courses',
      },
      {
        focusText: 'Focus 2',
        quarter1: 'Mini-Project',
        quarter2: 'Mini-Project',
        quarter3: 'Mini-Project',
        quarter4: 'Mini-Project',
        quarter5: 'Mini-Project',
      },
      {
        focusText: 'Focus 3',
        quarter1: 'Advanced Course-1',
        quarter2: 'Advanced Course-1',
        quarter3: 'Advanced Course-1',
        quarter4: 'Advanced Course-1',
        quarter5: 'Advanced Course-1',
      },
      {
        focusText: 'Focus 4',
        quarter1: 'GRE Preparation',
        quarter2: 'GRE Preparation',
        quarter3: 'GRE Preparation',
        quarter4: 'GRE Preparation',
        quarter5: 'GRE Preparation',
      },
    ],
  },
  {
    packageText: 'PB - Placements',
    grades: 'Above Average',
    headers: [
      'Focus',
      'Quarter 1',
      'Quarter 2',
      'Quarter 3',
      'Quarter 4',
      'Quarter 5',
    ],
    body: [
      {
        focusText: 'Focus 1',
        quarter1: 'Starter Pack Courses',
        quarter2: 'Starter Pack Courses',
        quarter3: 'Starter Pack Courses',
        quarter4: 'Starter Pack Courses',
        quarter5: 'Starter Pack Courses',
      },
      {
        focusText: 'Focus 2',
        quarter1: 'Mini-Project',
        quarter2: 'Mini-Project',
        quarter3: 'Mini-Project',
        quarter4: 'Mini-Project',
        quarter5: 'Mini-Project',
      },
      {
        focusText: 'Focus 3',
        quarter1: 'Advanced Course-1',
        quarter2: 'Advanced Course-1',
        quarter3: 'Advanced Course-1',
        quarter4: 'Advanced Course-1',
        quarter5: 'Advanced Course-1',
      },
      {
        focusText: 'Focus 4',
        quarter1: 'GRE Preparation',
        quarter2: 'GRE Preparation',
        quarter3: 'GRE Preparation',
        quarter4: 'GRE Preparation',
        quarter5: 'GRE Preparation',
      },
    ],
  },
];

export const collapseArray = [0, 1, 2, 3, 4, 5];
