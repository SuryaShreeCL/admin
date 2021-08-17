import styled from 'styled-components';
import { createTheme, Button } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
  padding: 24px 24px;
  margin: 24px;
`;

export const H1 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;

export const ColorScheme = createTheme({
  palette: {
    primary: {
      main: '#052A4E',
    },
    secondary: {
      main: '#1093FF',
    },
  },
});

export const textFieldTheme = createTheme({
  overrides: {
    MuiInputBase: {
      root: {
        height: '40px',
      },
      input: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#686868',
        height: '40px',
        background: '#FFFFFF',
        border: '1px solid #CCCCCC',
        boxSizing: 'border-box',
        borderRadius: '4px',
      },
    },
  },
});
export const MainContainer = styled.div`
  padding: 20px;
  padding-right: 40px;
`;

export const TabContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 4px;
  padding: 0px 8px;
`;

export const TabItem = styled.span`
  height: 56px;
  font-size: 18px;
  color: #052a4e;
`;

export const PreviewIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`;

export const ButtonContainer = styled.div`
  padding: 32px 8px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
  padding-left: 20px;
`;

export const Wrapper = styled.div`
  padding-top: 24px;
`;

export const InputCard = styled.div`
  padding: 30px 20px 22px 20px;
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
`;

export const DialogDiv = styled.div`
  padding: 40px 60px;
  // height: 308px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled.div`
  width: 124px;
  height: 124px;
  background: rgba(16, 147, 255, 0.5);
  border-radius: 50%;
  margin-bottom: 12px;
`;

export const HeadText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #052a4e;
`;

export const BodyText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #052a4e;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexFiller = styled.div`
  display: flex;
  flex-grow: 1;
`;
