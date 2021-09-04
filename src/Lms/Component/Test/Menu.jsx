import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import ArchiveIcon from '@material-ui/icons/Archive';
import { MuiMenu } from '../../Assets/StyledTableComponents';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import PublishIcon from '../../Assets/icons/Publish.svg';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

export default function Menu(props) {
  const ROLES = { editor: 'LMSEDITOR', checker: 'LMSCHECKER' };

  const makerChoices = [
    { text: 'Send Review', icon: <ShareIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Edit', icon: <EditIcon style={{ fill: '#1093FF' }} /> },
    { text: 'Archive', icon: <ArchiveIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Unarchive', icon: <UnarchiveIcon style={{ fill: '#1093ff' }} /> },
  ];

  const checkerChoices = [
    { text: 'Edit', icon: <EditIcon style={{ fill: '#1093FF' }} /> },
    { text: 'Archive', icon: <ArchiveIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Approve', icon: <ThumbUpIcon style={{ fill: '#1093ff' }} /> },
    { text: 'Publish Now', icon: <img src={PublishIcon} alt='Publish' /> },
    { text: 'Unarchive', icon: <UnarchiveIcon style={{ fill: '#1093ff' }} /> },
  ];

  const filterMaker = (array, status) => {
    // if (status === 'Pending') {
    //   array.length = 2;
    //   return array;
    // } else return array;
    if (status === 'Archive') {
      return array.splice(3, 1);
    } else return array;
  };

  const filterChecker = (array, status) => {
    if (status === 'Draft') {
      array.length = 3;
      return array;
    }
    if (status === 'Pending') {
      array.length = 3;
      array.splice(1, 1);
      return array;
    }
    if (status === 'Live') {
      return array.splice(1, 1);
    }
    if (status === 'In Review') {
      array.splice(2, 1);
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
  // console.log(topicId);
  if (role === ROLES.editor)
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        {filterMaker(makerChoices, status).map(item => (
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
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        {filterChecker(checkerChoices, status).map(item => (
          <MenuItem
            onClick={() => handleOptions(item.text, name, topicId)}
            className={'menu-item-text'}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography>{item.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    );
  else return null;
}
