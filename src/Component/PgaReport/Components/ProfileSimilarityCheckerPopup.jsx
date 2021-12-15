import { Dialog, Grid, Paper, TextField } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import '../../../Asset/DialogStyles.css';
import {
  BottomContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRelativeBox,
  DialogSubText,
  FilterText,
  FlexView,
  HeaderText,
  SelectedBox,
  StyledCloseButton,
} from '../../../Asset/StyledComponent';
import Draggable from 'react-draggable';

export const filterOptions = [
  {
    label: 'Same Branch, Same College, Same Product',
    value: {
      sameBranch: true,
      sameCollege: true,
      sameProduct: true,
      differentCollege: false,
      otherProduct: false,
    },
  },
  {
    label: 'Same Branch, Different College, Same Product',
    value: {
      sameBranch: true,
      sameCollege: false,
      sameProduct: true,
      differentCollege: true,
      otherProduct: false,
    },
  },
  {
    label: 'Same Branch, Same College, Other Products',
    value: {
      sameBranch: true,
      sameCollege: true,
      sameProduct: false,
      differentCollege: false,
      otherProduct: true,
    },
  },
  {
    label: 'Same College',
    value: {
      sameBranch: false,
      sameCollege: true,
      sameProduct: false,
      differentCollege: false,
      otherProduct: false,
    },
  },
];

const PaperComponent = props => {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

export const ProfileSimilarityCheckerPopup = ({
  dialogOpen,
  handlePopupClose,
  handleDropdownChange,
  children,
  value,
  count,
}) => {
  return (
    <Dialog
      open={dialogOpen}
      maxWidth={'lg'}
      classes={{ paper: 'dialog_paper', root: 'dialog_root' }}
      PaperComponent={PaperComponent}
    >
      <DialogRelativeBox id={'draggable-dialog-title'}>
        <DialogHeader>
          <HeaderText>{'Profile Similarity Checker'}</HeaderText>
          <Grid container className={'dialog_style'} spacing={3}>
            <Grid item xs={6}>
              <DialogSubText>{`Similarity Students ${
                count > 0 ? `(${count})` : ''
              }`}</DialogSubText>
            </Grid>
            <Grid item xs={6}>
              <FlexView>
                <FilterText>{'Filter By'}</FilterText>
                <Autocomplete
                  options={filterOptions}
                  className={'autocomplete_style'}
                  getOptionLabel={option => option.label}
                  onChange={handleDropdownChange}
                  fullWidth
                  value={value}
                  renderInput={params => (
                    <TextField {...params} variant={'standard'} />
                  )}
                  popupIcon={<ExpandMore />}
                />
              </FlexView>
            </Grid>
            <Grid item xs={12}>
              <FlexView>
                {filterOptions.map(
                  ({ label }) =>
                    value &&
                    label === value.label &&
                    label
                      .split(',')
                      .map(item => <SelectedBox>{item}</SelectedBox>)
                )}
              </FlexView>
            </Grid>
          </Grid>
        </DialogHeader>
        <DialogContent>{children}</DialogContent>
        <DialogFooter>
          <BottomContainer>
            <StyledCloseButton onClick={handlePopupClose}>
              {'Close'}
            </StyledCloseButton>
          </BottomContainer>
        </DialogFooter>
      </DialogRelativeBox>
    </Dialog>
  );
};
