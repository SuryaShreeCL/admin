import React from 'react';
import {
  Header,
  HeadText,
  NoteContainer,
  FlexFiller,
  NumberOfNotes,
  Note,
  CommentBox,
  CommentFlex,
  CommentDate,
  CommentTitle,
  CommentContent,
  LeftLineBorder,
} from '../../../assets/css/StyledComponent';
import CloseIcon from '@material-ui/icons/Close';
import Expand from '../../../assets/icons/expand.svg';
import { IconButton, TextField } from '@material-ui/core';
import comment from '../../../assets/icons/commentIcon.svg';
import ThreeDot from '../../../assets/icons/VerticalThreeDot.svg';
import { MuiMenu, MuiMenuItem, MuiButton } from '../../../assets/css/MuiStyles';
import { Typography } from '@material-ui/core';

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Notes(props) {
  const {
    data,
    menu,
    onCloseClick,
    commentBoxOpen,
    handleMenu,
    handleMenuClose,
    anchorEl,
    handleMenuItem,
    handleChange,
    editableId,
    error,
    handleSave,
    t,
  } = props;

  const getDateFormat = dateString => {
    let date = new Date(dateString);
    let day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    let month = MONTH[date.getMonth()];
    return strTime + ' ' + month + ' ' + day;
  };

  return (
    <NoteContainer style={{ display: !commentBoxOpen && 'none' }}>
      <Header>
        <IconButton>
          <img src={comment} alt='Comment Icon' />
        </IconButton>
        <HeadText style={{ marginLeft: '0px' }}>{t('All notes')}</HeadText>
        <FlexFiller />
        <IconButton onClick={() => handleMenuItem('resize')}>
          <img src={Expand} alt='Expand Icon' />
        </IconButton>
        <IconButton onClick={onCloseClick}>
          <CloseIcon className={'icon-styles'} />
        </IconButton>
      </Header>
      <NumberOfNotes>
        {data.length} {t('notes')}
      </NumberOfNotes>
      <div style={{ overflowY: 'auto' }}>
        {data.length !== 0 &&
          data.map((item, index) => {
            return (
              <CommentBox>
                <CommentFlex>
                  <CommentDate>{getDateFormat(item.date)}</CommentDate>
                  <IconButton onClick={e => handleMenu(item.id, e)}>
                    <img src={ThreeDot} />
                  </IconButton>
                  <MuiMenu
                    open={anchorEl}
                    anchorEl={anchorEl}
                    anchorReference={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={handleMenuClose}
                  >
                    {menu.map(option => {
                      return (
                        <MuiMenuItem
                          onClick={() => handleMenuItem(option.name)}
                        >
                          <Typography>{option.text}</Typography>
                        </MuiMenuItem>
                      );
                    })}
                  </MuiMenu>
                </CommentFlex>
                <div style={{ position: 'relative' }}>
                  <CommentTitle>{item.data}</CommentTitle>
                  <LeftLineBorder />
                </div>
                <CommentContent>
                  {editableId === item.id ? (
                    <div>
                      <TextField
                        shrink={true}
                        inputProps={{
                          style: { color: '#052a4e' },
                        }}
                        key={item.id}
                        multiline
                        label={t('Edit Text')}
                        defaultValue={item.notes}
                        placeholder={t('Edit Text')}
                        error={error}
                        variant='outlined'
                        onChange={e => handleChange(index, e)}
                        fullWidth
                        //helperText={(error && "Invalid") || ""}
                      />
                      <MuiButton onClick={() => handleSave(index)}>
                        {t('Save')}
                      </MuiButton>
                    </div>
                  ) : (
                    item.notes
                  )}
                </CommentContent>
              </CommentBox>
            );
          })}
      </div>
    </NoteContainer>
  );
}
