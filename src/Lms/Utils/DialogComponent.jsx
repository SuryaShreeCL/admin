import { Button, Grid, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React from 'react';
import {
  BodyText,
  ButtonBox,
  DialogDiv,
  HeadText,
  IconContainer,
} from '../Assets/StyledComponents';

export default function DialogComponent(props) {
  const {
    open,
    dialogContent,
    handleButton1Click,
    handleCloseIconClick,
    handleButton2Click,
  } = props;
  if (dialogContent !== null)
    return (
      <Dialog open={open} maxWidth='sm' fullWidth>
        <DialogDiv>
          <Grid container direction='column' alignItems='center'>
            <Grid item xs={12} container justifyContent='flex-end'>
              <IconButton
                style={{ padding: '0 12px' }}
                onClick={handleCloseIconClick}
              >
                <CloseRoundedIcon color='primary' />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <IconContainer>{dialogContent.icon}</IconContainer>
            </Grid>
          </Grid>
          <HeadText>{dialogContent.title}</HeadText>
          <BodyText>{dialogContent.body}</BodyText>
          <ButtonBox>
            <Button
              color='primary'
              variant='outlined'
              className={'button-style'}
              onClick={handleButton1Click}
            >
              {dialogContent.button1}
            </Button>
            <div style={{ width: '40px' }} />
            <Button
              color='primary'
              variant='contained'
              className={'button-style'}
              onClick={handleButton2Click}
            >
              {dialogContent.button2}
            </Button>
          </ButtonBox>
        </DialogDiv>
      </Dialog>
    );
  else return null;
}
