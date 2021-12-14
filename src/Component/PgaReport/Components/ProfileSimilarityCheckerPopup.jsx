import { Collapse, Dialog, Grid, TextField } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
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

export const ProfileSimilarityCheckerPopup = ({
  handleShowDetails,
  collapseId,
  dialogOpen,
  handlePopupClose,
  handleDropdownChange,
  children,
  value
}) => {

  const isOpen = id => id === collapseId;

  const filterOptions = [
    {
      label: 'Same Branch, Same College, Same Product',
      value : {
        sameBranch: true,
        sameCollege: true,
        sameProduct: true,
        differentCollege: false,
        otherProduct: false,
      }
    },
    {
      label: 'Same Branch, Different College, Same Product',
      value : {
        sameBranch: true,
        sameCollege: false,
        sameProduct: true,
        differentCollege: true,
        otherProduct: false,
      }
    },
    {
      label: 'Same Branch, Same College, Other Products',
      value : {
        sameBranch: true,
        sameCollege: true,
        sameProduct: false,
        differentCollege: false,
        otherProduct: true,
      }
    },
    {
      label: 'Same College',
      value : {
        sameBranch: false,
        sameCollege: true,
        sameProduct: false,
        differentCollege: false,
        otherProduct: false,
      }
    },
  ];
  return (
    <Dialog
      open={dialogOpen}
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
                  options={filterOptions}
                  // className={'autocomplete_style'}
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
