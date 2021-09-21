import React from 'react';
import { MuiMenu } from '../../../Assets/StyledTableComponents';
import { DeleteRounded } from '@material-ui/icons';
import {
  MenuItem,
  ListItemIcon,
  Typography,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyle = makeStyles({
  root: {
    height: '44px',
    color: '#052A4E',
    fontSize: '16px',
    margin: '0px 6px',
    '&:hover': {
      background: '#F2F9FF',
    },
  },
});

export default function Menu(props) {
  const classes = useStyle();
  const choices = [
    {
      text: 'Delete',
      icon: <DeleteRounded style={{ fill: '#1093ff', fontSize: '24px' }} />,
    },
    { text: 'Edit', icon: <EditIcon style={{ fill: '#1093FF' }} /> },
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
        <MenuItem
          onClick={() => handleDelete(choice.text)}
          classes={{ root: classes.root }}
        >
          <ListItemIcon style={{ minWidth: '36px' }}>
            {choice.icon}
          </ListItemIcon>
          {/* <Typography className={"menu-item-text"}> */}
          <span>{choice.text}</span>
          {/* </Typography> */}
        </MenuItem>
      ))}
    </MuiMenu>
  );
}
