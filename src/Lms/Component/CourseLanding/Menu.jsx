import React from 'react';
import { MuiMenu } from '../../Assets/StyledTableComponents';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import PublishIcon from '../../Assets/icons/Publish.svg';
import ShareIcon from '@material-ui/icons/Share';

export default function Menu(props) {
  const ROLLS = { maker: 'LMSMAKER', checker: 'LMSCHECKER' };

  const {
    open,
    anchorEl,
    handleClose,
    roll,
    handleDelete,
    topicId,
    topicName,
    handlePublish,
    handleSendReview,
    isMapped,
    handleEdit,
  } = props;
  if (roll === ROLLS.maker) {
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
      >
        {!isMapped ? (
          <div>
            <MenuItem onClick={handleSendReview}>
              <ListItemIcon>
                <ShareIcon color='primary' />
              </ListItemIcon>
              <Typography className={'menu-item-text'}>Send Review</Typography>
            </MenuItem>

            <MenuItem onClick={() => handleDelete(topicId, topicName)}>
              <ListItemIcon>
                <DeleteIcon style={{ fill: '#1093ff' }} />
              </ListItemIcon>
              <Typography className={'menu-item-text'}>Delete</Typography>
            </MenuItem>
          </div>
        ) : null}

        <MenuItem onClick={() => handleEdit(topicId)}>
          <ListItemIcon>
            <EditIcon style={{ fill: '#1093FF' }} />
          </ListItemIcon>
          <Typography className={'menu-item-text'}>Edit</Typography>
        </MenuItem>
      </MuiMenu>
    );
  } else if (roll === ROLLS.checker) {
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
      >
        {!isMapped ? (
          <div>
            <MenuItem onClick={() => handlePublish(topicId)}>
              <ListItemIcon>
                <img src={PublishIcon} alt='Publish Icon' />
              </ListItemIcon>
              <Typography className={'menu-item-text'}>Publish Now</Typography>
            </MenuItem>

            <MenuItem onClick={() => handleDelete(topicId, topicName)}>
              <ListItemIcon>
                <DeleteIcon style={{ fill: '#1093ff' }} />
              </ListItemIcon>
              <Typography className={'menu-item-text'}>Delete</Typography>
            </MenuItem>
          </div>
        ) : null}

        <MenuItem onClick={() => handleEdit(topicId)}>
          <ListItemIcon>
            <EditIcon style={{ fill: '#1093FF' }} />
          </ListItemIcon>
          <Typography className={'menu-item-text'}>Edit</Typography>
        </MenuItem>
      </MuiMenu>
    );
  } else return null;
}
