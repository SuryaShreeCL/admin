import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  BodyText,
  ButtonBox,
  DialogDiv,
  FlexFiller,
  HeadText,
  IconContainer,
} from '../Assets/StyledComponents';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Button, IconButton } from '@material-ui/core';

export default function DialogComponent(props) {
  const { open, handleClose, dialogText, handleDelete, icon } = props;
  if (dialogText !== undefined)
    return (
      <Dialog open={open} maxWidth='sm' fullWidth>
        <DialogDiv>
          <ButtonBox>
            <FlexFiller />
            <IconButton></IconButton>
            <CloseRoundedIcon />
          </ButtonBox>
          <IconContainer>{icon}</IconContainer>
          <HeadText>{dialogText.title}</HeadText>
          <BodyText>{dialogText.body}</BodyText>
          <ButtonBox>
            <Button color='primary' variant='outlined'>
              {dialogText.button1}
            </Button>
            <Button color='primary' variant='contained'>
              {dialogText.button2}
            </Button>
          </ButtonBox>
        </DialogDiv>
      </Dialog>
    );
  else return null;
}

/**
 * (c) CareerLabs. All rights reserved.
 **/

//  import React from 'react';
//  import Dialog from '@material-ui/core/Dialog';
//  import {
//    DialogDiv,
//    HeadText,
//    BodyText,
//    ButtonBox,
//  } from '../../../assets/css/dashboard/StyledNotesComponents';
//  import { Button } from '@material-ui/core';

//  export default function ConfirmationDialog(props) {
//    const { open, handleClose, dialogText, handleDelete } = props;

//    return (
//      <Dialog open={open} maxWidth='sm' fullWidth>
//        <DialogDiv>
//          <div>
//            <HeadText>{dialogText.title}</HeadText>
//            <BodyText>{dialogText.body}</BodyText>
//          </div>
//          <ButtonBox>
//            <Button
//              variant='outlined'
//              color='primary'
//              className={'round-button margin-style-right'}
//              onClick={handleClose}
//            >
//              {dialogText.button1}
//            </Button>
//            <Button
//              variant='contained'
//              color='primary'
//              className={'round-button margin-style-left'}
//              onClick={handleDelete}
//            >
//              {dialogText.button2}
//            </Button>
//          </ButtonBox>
//        </DialogDiv>
//      </Dialog>
//    );
//  }
