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

  const filterMaker = (array, status) => {
    if (status === 'Live') {
      array.length = 1;
      return array;
    }
    if (status === 'Approved') {
      array.length = 2;
      return array;
    }
    if (status === 'In Review') {
      array.length = 2;
      return array;
    }
    if (status === 'Draft') {
      array.length = 3;
      return array;
    } else return [];
  };

  const filterChecker = (array, status) => {
    if (status === 'Live') {
      array.length = 1;
      return array;
    }
    if (status === 'Draft') {
      array.length = 2;
      return array;
    }
    if (status === 'In Review') {
      array.length = 3;
      return array;
    }
    if (status === 'Approved') {
      array.splice(2, 1);
      return array;
    } else return [];
  };

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
        {filterMaker(editorChoices, status).map(item => (
          <MenuItem onClick={() => handleOptions(item.text, name, topicId)}>
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
        {filterChecker(checkerChoices, status).map(item => (
          <MenuItem onClick={() => handleOptions(item.text, name, topicId)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography className={'menu-item-text'}>{item.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    );
  else return null;
}
