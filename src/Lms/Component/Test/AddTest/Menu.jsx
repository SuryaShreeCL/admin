import React from 'react';
import { MuiMenu } from '../../../Assets/StyledTableComponents';
import { DeleteRounded } from '@material-ui/icons';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';

export default function Menu(props) {
  const choices = [
    {
      text: 'Delete',
      icon: <DeleteRounded style={{ fill: '#1093ff' }} />,
    },
  ];

  const { questionId, open, anchorEl, handleClose, handleDelete } = props;
  return (
    <MuiMenu
      id={questionId}
      open={open}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      {choices.map(choice => (
        <MenuItem onClick={() => handleDelete(questionId)}>
          <ListItemIcon>{choice.icon}</ListItemIcon>
          <Typography className={'menu-item-text'}>{choice.text}</Typography>
        </MenuItem>
      ))}
    </MuiMenu>
  );
}
