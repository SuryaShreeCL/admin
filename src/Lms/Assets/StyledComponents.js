import styled from "styled-components";
import { createTheme, Button } from "@material-ui/core";
import { Box as MuiBox, Button as MuiButton } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
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
      main: "#1093FF",
    },
    secondary: {
      main: "#052A4E",
    },
  },
});

export const textFieldTheme = createTheme({
  overrides: {
    MuiInputBase: {
      root: {
        height: "40px",
      },
      input: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#686868",
        height: "40px",
        background: "#FFFFFF",
        border: "1px solid #CCCCCC",
        boxSizing: "border-box",
        borderRadius: "4px",
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
  padding: ${(props) => props.padding || 0};
`;

// view StudyPlans
export const CardTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;

export const DialogDiv = styled.div`
  padding: 20px 20px;
  min-height: 365px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 124px;
  background: rgba(16, 147, 255, 0.05);
  border-radius: 50%;
  align-self: center;
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
  min-height: 40px;
`;

export const FlexFiller = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DeleteCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 11px 1px rgba(55, 143, 233, 0.25);
  border-radius: 12px;
`;

export const DeleteTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #052a4e;
`;

export const Close = styled.div`
  position: absolute;
  /* left: 300px; */
  top: 15px;
  right: 15px;
`;

export const DialogBox = styled.div`
  position: absolute;
  width: 560px;
  height: 403px;
  left: 443px;
  top: 271px;
  background: #ffffff;
`;

export const Box = styled(MuiBox)`
  color: #052a4e;
`;

export const TestTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
  flex: ${(props) => props.flex || 0};
`;

export const Cancel = styled(MuiButton)`
  background: #ffffff;
  border: 1px solid #1093ff;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #1093ff;
  width: 140px;
  height: 40px;
`;

export const Save = styled(MuiButton)`
  background: #1093ff;
  border: 1px solid #1093ff;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  width: 140px;
  height: 40px;
  &:hover {
    background-color: #1093ff;
    opacity: 0.6;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;
  opacity: 0.3;
  border: 1px solid #1093ff;
  margin: 24px 0px 30px 0px;
`;

export const TabBarItem = styled(MuiBox)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  background: none;
  border: none;
  padding: 20px !important;
  grid-gap: 20px;
  border-bottom: ${(props) => (props.active ? "4px solid #FFE100" : "")};
`;

export const TabBarMonthItem = styled(MuiBox)`
  background: ${(props) => (props.active ? "#fff" : "#fafafa")};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => (props.active ? "#1093FF" : "#052a4e")};
  border: none;
  border-right: ${(props) => (props.active ? "4px solid" : "")};
  width: 210px;
`;
