/**
 * (c) CareerLabs. All rights reserved.
 **/
// import Button from "../../../utils/components/Button";
import { Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { Divider as MuiDivider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export const Container = styled.div`
  padding: 5vh 10vh;
  height: 100vh;
  position: relative;
  background: linear-gradient(
    rgb(238, 246, 255) 0%,
    rgba(255, 255, 255, 0) 100%
  );

  * {
    font-family: Montserrat !important;
  }

  & .MuiDivider-root {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

export const TestTitle = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;
export const TitleContainer = styled.div`
  position: absolute;
  left: 10vh;
  right: 10vh;
  top: 32px;
  height: 126px;
  overflow: hidden;
`;

export const QuestionCount = styled.div`
  font-style: normal;
  font-weight: ${props => props.bold || '400'};
  font-size: 24px;
  line-height: 30px;
  color: #052a4e;
`;

export const Div = styled.div`
  display: ${props => props.display || 'unset'};
  align-items: center;
  overflow: hidden;

  & .MuiLinearProgress-barColorPrimary {
    background-color: #1093ff;
  }

  & .MuiLinearProgress-colorPrimary {
    background-color: rgb(164, 213, 255);
  }

  & .MuiLinearProgress-root {
    height: 6px !important;
    border-radius: 12px !important;
    margin: 15px 0;
  }
`;

export const TitleHeader = styled.div`
  padding: 15px 0px;
`;

export const QuestionTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #052a4e;
  padding-left: ${({ padding }) => (padding ? padding : '20px')};
  flex: ${props => props.flex || 1};
`;

export const TimeRemaining = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  color: #000000;
  padding-right: 10px;
`;
export const Time = ``;

export const QuestionBody = styled.div`
  overflow: auto;
  position: absolute;
  left: 10vh;
  right: 10vh;
  bottom: 100px;
  top: 158px;
`;

export const SingleSelect = {
  Question: styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;
    color: #052a4e;
  `,
  OptionContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
  `,
  Option: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 20px 0px;
  `,

  OptionDiv: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 12px 0px;
    padding: 8px;
    background: ${props => (props.active ? '#f2f9ff' : '')};
  `,
  OptionBox: styled.div`
    width: 32px;
    height: 32px;
    background: ${props => (props.active ? '#1093FF' : '#c4c4c445')};
    border-radius: 5px;
    font-style: normal;
    font-weight: ${props => (props.active ? 500 : 'normal')};
    font-size: 16px;
    line-height: 114.7%;
    color: ${props => (props.active ? '#fff' : '#000000')};
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  `,
  OptionTitle: styled.div`
    font-style: normal;
    font-style: normal;
    font-weight: ${props => (props.active ? 500 : 'normal')};
    font-size: 16px;
    line-height: 24px;
    color: #052a4e;
    cursor: pointer;
  `,
};

export const Passage = {
  Para: styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 30px;
    /* or 187% */
    color: #000000;
  `,
};

export const Bundle = {};

export const Footer = styled.div`
  position: absolute;
  left: 10vh;
  right: 10vh;
  bottom: 24px;
  height: 76px;
`;

export const Pause = styled.div`
  display: flex;
  width: 100px;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  color: #1093ff;
  align-items: center;
`;

export const Icon = styled.img`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

export const Next = withStyles({
  root: {
    width: '200px',
    borderRadius: '30px',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '16px',
    textAlign: 'center',
    padding: '10px',
    height: '48px',
    color: '#ffffff !important',
    backgroundColor: '#1093FF !important',
  },
  disabled: {
    background: 'gba(0, 0, 0, 0.26)',
    opacity: '0.6',
  },
})(Button);

export const TextBox = styled.textarea`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #052a4e;
  outline: none;
  border: none;
  min-height: 400px;
  width: 100%;
`;
export const QuestionDivider = styled.div`
  width: 23px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
`;

export const LeftIcon = styled.div`
  cursor: pointer;
  display: flex;
`;

export const RightIcon = styled.div`
  cursor: pointer;
  display: flex;
`;

export const Video = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 900px;
  top: 80px;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  border-radius: 5px;
`;

export const PauseModelTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #052a4e;
  padding: 29px 0px 0px;
`;

export const PauseModelSubTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #052a4e;
`;

export const ContinueButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  background: #1093ff;
  border-radius: 30px !important;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: #f2f2f2 !important;
  padding: 10px;
  margin-top: 5vh;
  cursor: pointer;
`;

export const QuitButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  background: none;
  border-radius: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: #1093ff;
  border: 1px solid #1093ff;
  padding: 10px;
  margin-top: 5vh;
  cursor: pointer;
`;

export const StyleDiv = styled.div`
  background: linear-gradient(180deg, #eef6ff 0%, rgba(255, 255, 255, 0) 100%);
  min-height: 100vh;
  padding: 40px;
  padding-top: 120px;
`;

export const H1 = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;

export const Divider = withStyles({
  root: {
    border: '1px solid #CCCCCC',
  },
})(MuiDivider);

export const H2 = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #052a4e;
  margin-top: 20px;
`;

export const B1 = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #686868;
  margin-top: 12px;
`;

export const T1 = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #052a4e;
  width: 100px;
  margin-right: 12px;
`;

export const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;

export const Grey = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #686868;
  padding: ${props => props.p};
`;

export const BookMarkContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

export const Main = styled.div`
  min-height: 80vh;
`;

export const BookmarkButton = withStyles({
  root: {
    width: '32px',
    height: '32px',
    background: 'rgb(16 147 255 / 10%)',
    '&:hover': {
      background: 'rgb(16 147 255 / 15%)',
    },
    '&:active': {
      background: 'rgb(16 147 255 / 10%)',
    },
  },
})(IconButton);

export const BackIconTag = styled(Button)`
  background: rgba(16, 147, 255, 0.2);
  margin-right: 10px;
  border-radius: 40px;
  min-width: 48px !important;
  height: 48px !important;

  & svg {
    fill: #1093ff;
  }
`;
