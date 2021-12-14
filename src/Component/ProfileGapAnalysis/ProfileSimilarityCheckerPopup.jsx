import { Dialog, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import {
  BottomContainer,
  DetailsBox,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRelativeBox,
  DialogSubText,
  FilterText,
  FlexView,
  HeaderText,
  LeftText,
  SelectedBox,
  StyledCloseButton,
  StyledDetailsButton,
} from '../../Asset/StyledComponent';
import '../../Asset/DialogStyles.css';
import { ExpandMore } from '@material-ui/icons';

export const ProfileSimilarityCheckerPopup = () => {
  return (
    <Dialog
      open={true}
      maxWidth={'lg'}
      classes={{ paper: 'dialog_paper', root: 'dialog_root' }}
    >
      <DialogRelativeBox>
        <DialogHeader>
          <HeaderText>{'Profile Similarity Checker'}</HeaderText>
          <Grid container className={'dialog_style'} spacing={3}>
            <Grid item xs={6}>
              <DialogSubText>{'Similarity Students (8)'}</DialogSubText>
            </Grid>
            <Grid item xs={6}>
              <FlexView>
                <FilterText>{'Filter By'}</FilterText>
                <Autocomplete
                  options={[]}
                  className={'autocomplete_style'}
                  // getOptionLabel={option => option.title}
                  fullWidth
                  renderInput={params => (
                    <TextField {...params} variant={'filled'} />
                  )}
                  popupIcon={<ExpandMore />}
                />
              </FlexView>
            </Grid>
            <Grid item xs={12}>
              <FlexView>
                <SelectedBox>{'Same Branch'}</SelectedBox>
                <SelectedBox>{'Same College'}</SelectedBox>
              </FlexView>
            </Grid>
          </Grid>
        </DialogHeader>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item={12} className={'details_box_style'}>
              <DetailsBox>
                <LeftText>{'Lee Solomon'}</LeftText>
                <StyledDetailsButton outlined={true} variant={'outlined'}>
                  {'Show Details'}
                </StyledDetailsButton>
              </DetailsBox>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogFooter>
          <BottomContainer>
            <StyledCloseButton>{'Close'}</StyledCloseButton>
          </BottomContainer>
        </DialogFooter>
      </DialogRelativeBox>
    </Dialog>
  );
};
