import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import ArchiveIcon from '@material-ui/icons/Archive';
import { MuiMenu } from '../../Assets/StyledTableComponents';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import PublishIcon from '../../Assets/icons/Publish.svg';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export default function Menu(props) {
  const ROLES = { editor: 'LMSEDITOR', checker: 'LMSCHECKER' };

  const editorChoices = [
    { text: 'Edit', icon: <EditIcon style={{ fill: '#1093FF' }} /> },
    { text: 'Archive', icon: <ArchiveIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Send Review', icon: <ShareIcon style={{ fill: '#1093ff' }} /> },
  ];

  const checkerChoices = [
    { text: 'Edit', icon: <EditIcon style={{ fill: '#1093FF' }} /> },
    { text: 'Archive', icon: <ArchiveIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Approve', icon: <ThumbUpIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Publish Now', icon: <img src={PublishIcon} alt='Publish' /> },
  ];

  const {
    role,
    topicId,
    open,
    anchorEl,
    handleClose,
    status,
    handleOptions,
    name,
  } = props;
  //   console.log(status);
  if (role === ROLES.editor)
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
      >
        {editorChoices
          .filter(
            choice =>
              (status === 'Live' && choice.text === 'Edit') || status !== 'Live'
          )
          .map(item => (
            <MenuItem onClick={() => handleOptions(item.text, name)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography className={'menu-item-text'}>{item.text}</Typography>
            </MenuItem>
          ))}
      </MuiMenu>
    );
  if (role === ROLES.checker)
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
      >
        {checkerChoices
          .filter(
            choice =>
              (status === 'Live' && choice.text === 'Edit') || status !== 'Live'
          )
          .map(item => (
            <MenuItem onClick={() => handleOptions(item.text, name)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography className={'menu-item-text'}>{item.text}</Typography>
            </MenuItem>
          ))}
      </MuiMenu>
    );
}
