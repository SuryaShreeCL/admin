import {
  CardActionButton,
  CardInlineText,
  CardSubText,
  CardView,
  FlexView,
  JustifyFlex,
} from '../../../Asset/StyledComponent';
import React from 'react';
import '../../../Asset/DialogStyles.css';

export const CardViewComponent = ({
  titleText,
  buttonText,
  buttonStatus,
  handleClick,
  leftContent,
  rightContent,
}) => {
  return (
    <CardView>
      <JustifyFlex>
        <CardSubText>{titleText}</CardSubText>
        <CardActionButton
          outlined={!buttonStatus}
          variant={buttonStatus ? 'contained' : 'outlined'}
          onClick={handleClick}
        >
          {buttonText}
        </CardActionButton>
      </JustifyFlex>
      <FlexView className={'card_style'}>
        <CardInlineText bold={false}>
          {leftContent.map(item => (
            <span>{item}</span>
          ))}
        </CardInlineText>
        <CardInlineText bold={true}>
          {rightContent.map(item => (
            <span>{item}</span>
          ))}
        </CardInlineText>
      </FlexView>
    </CardView>
  );
};
