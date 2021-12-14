import { Collapse, Dialog, Grid, TextField } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import '../../Asset/DialogStyles.css';
import {
  BottomContainer,
  CardTitle,
  DetailsBox,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRelativeBox,
  DialogSubText,
  FilterText,
  FlexView,
  HeaderText,
  JustifyFlex,
  LeftText,
  SelectedBox,
  StyledCloseButton,
  StyledDetailsButton,
} from '../../../Asset/StyledComponent';
import '../../../Asset/DialogStyles.css';
import { ExpandMore } from '@material-ui/icons';

export const ProfileSimilarityCheckerPopup = ({
  handleShowDetails,
  collapseId,
  dialogOpen,
  handlePopupClose,
  children,
}) => {
  const isOpen = id => id === collapseId;
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
          {/* <Grid container spacing={1}>
            <Grid item={12} className={'details_box_style'}>
              <DetailsBox>
                <JustifyFlex>
                  <LeftText>{'Lee Solomon'}</LeftText>
                  <StyledDetailsButton
                    onClick={() => handleShowDetails(1)}
                    outlined={true}
                    variant={'outlined'}
                  >
                    {'Show Details'}
                  </StyledDetailsButton>
                </JustifyFlex>
                <Collapse in={isOpen(1)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <CardTitle>{'Chandra Maya'}</CardTitle>
                    </Grid>
                    <Grid item xs={6}>
                      <CardViewComponent
                        titleText={'Welcome'}
                        buttonText={'Add'}
                        buttonStatus={true}
                        handleClick={null}
                        leftContent={[1, 2, 3]}
                        rightContent={[1, 2, 3]}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </DetailsBox>
            </Grid>
          </Grid> */}
          {children}
        </DialogContent>
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
