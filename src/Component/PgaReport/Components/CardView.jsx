import {
  CardActionButton,
  CardInline,
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
  object,
}) => {
  return (
    <CardView>
      <JustifyFlex>
        <CardSubText>{titleText}</CardSubText>
        <CardActionButton
          outlined={!buttonStatus}
          variant={buttonStatus ? 'contained' : 'outlined'}
          onClick={() => handleClick(object)}
        >
          {buttonText}
        </CardActionButton>
      </JustifyFlex>
      <FlexView className={'card_style'}>
        <CardInline>
          {leftContent.map((item, index) => (
            <CardInlineText>
              <span>{item}</span>
              <b>{rightContent[index]}</b>
            </CardInlineText>
          ))}
        </CardInline>
      </FlexView>
    </CardView>
  );
};
