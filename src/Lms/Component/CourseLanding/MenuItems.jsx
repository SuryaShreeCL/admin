import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import PublishIcon from '../../Assets/icons/Publish.svg';

const ROLLS = { admin: 'LMSADMIN', checker: 'LMSCHECKER' };

// const menueItems = {icon:EditIcon,text:'Edit'}

export default function MenuItems(props) {
  if (props.roll === ROLLS.admin) {
    return (
      <React.Fragment>
        <MenuItem>
          <ListItemIcon className={'menu-item-text'}>
            <EditIcon style={{ fill: '#1093FF' }} />
          </ListItemIcon>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon className={'menu-item-text'}>
            <DeleteIcon style={{ fill: '#1093ff' }} />
          </ListItemIcon>
          <Typography>Delete</Typography>
        </MenuItem>
      </React.Fragment>
    );
  }
  if (props.roll === ROLLS.checker) {
    return (
      <React.Fragment>
        <MenuItem className={'menu-item-text'}>
          <ListItemIcon>
            <img src={PublishIcon} alt='Publish Icon' />
          </ListItemIcon>
          <Typography>Publish Now</Typography>
        </MenuItem>
        <MenuItem className={'menu-item-text'}>
          <ListItemIcon>
            <EditIcon style={{ fill: '#1093FF' }} />
          </ListItemIcon>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem className={'menu-item-text'}>
          <ListItemIcon>
            <DeleteIcon style={{ fill: '#1093ff' }} />
          </ListItemIcon>
          <Typography>Delete</Typography>
        </MenuItem>
      </React.Fragment>
    );
  }
}
