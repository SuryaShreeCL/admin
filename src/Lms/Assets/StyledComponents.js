import styled from "styled-components";
import { createTheme, Button } from "@material-ui/core";
import { Box as MuiBox, Button as MuiButton } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: stretch;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
  padding: 24px 20px;
  // margin: 20px 24px;
`;

export const C2 = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px 16px 0px 0px;
  padding: 24px 20px;
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
  padding-right: 10px;
`;

export const TabContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 4px;
  padding: 0px 8px;
  position: relative;
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
  gap: 30px;
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
  font-size: 22px;
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

export const FlexView = styled(MuiBox)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  align-items: center;
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
  min-width: ${({ minWidth }) => minWidth};
`;

export const FlexColumnView = styled(MuiBox)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
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

export const VerticalDivider = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0px;
  height: 100%;
  opacity: 0.3;
  border: 1px solid #1093ff;
`;

export const DropDownBox = styled.div`
  max-width: 350px;
  margin: 31px 0px;
`;

export const H2 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
`;
export const SubTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #052a4e;
`;

export const CenteredImg = styled.img`
  display: block;
  margin: 0 auto;
  padding: 50px 0px 40px;
`;

export const SubHeaderTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
`;

export const B1 = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

export const GreySpan = styled.span`
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const BlueSpan = styled.span`
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: #1093ff;
  opacity: 1;
`;

export const FileName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: #000000;
  padding-top: 16px;
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

export const TabBarMonthItem = styled(MuiButton)`
  background: ${(props) => (props.active ? "#fff" : "#fafafa")};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => (props.active ? "#1093FF" : "#052a4e")};
  border: none;
  border-right: ${(props) => (props.active ? "4px solid" : "")};
  width: 210px;
  padding: 16px 88px 16px 13px;
  cursor: pointer;
`;

export const Question = styled.div`
  display: flex;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #052a4e;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0 16px 0;
  padding-top: 17px;
`;

export const C1 = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabThreeDot = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ImageUploadButton = styled.input`
  padding: 14px;
  opacity: 0;
  width: 100%;
`;

export const ImageUploadBox = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  color: #052a4e;
  overflow: hidden;
  height: 56.5px;
  &:hover {
    border: 1px solid #000000de;
  }
`;

export const ImageContent = styled.label`
  position: absolute;
  left: 15px;
  top: 18px;
`;

export const UploadIcon = styled.img`
  position: absolute;
  right: 12px;
  top: 15px;
  height: 26px;
  width: 26px;
`;

export const DropDownDiv = styled.div`
  display: flex;
  margin-top: 31px;
`;

export const BackIconBox = styled.div`
  margin-bottom: 1rem;
`;

export const SideIcon = styled.img`
  width: ${(props) => (props.size === true ? "16px" : "24px")};
  height: ${(props) => (props.size === true ? "16px" : "24px")};
  margin: ${(props) =>
    props.size === true ? "0px 19px 0px 4px" : "0px 15px 0px 0px"};
  min-height: 24px;
`;

export const SideContent = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #052a4e;
`;

export const RightContent = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #052a4e;
`;

export const LevelContent = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #052a4e;
  margin-top: 3px;
`;

export const TypeContainer = styled.div`
  padding: 16px 15px 6px 15px;
  align-items: center;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InsideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CenterText = styled(MuiBox)`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 39px;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
`;

export const InsightSubTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #1093ff;
`;
