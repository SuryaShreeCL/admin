/**
 * (c) CareerLabs. All rights reserved.
 **/
import {
  Button,
  Card as MuiCard,
  Popover as MuiPopover,
  Tooltip,
} from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

export const YearCard = styled.div`
  width: 140px;
  height: 80px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 11px 1px rgba(55, 143, 233, 0.25);
  border-radius: 8px;
`;
export const DateCard = styled.div`
  width: 59px;
  height: 75px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 7px rgba(206, 206, 206, 0.5);
  border-radius: 8px;
  cursor: pointer;
`;

export const AuthContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

export const LeftContainer = styled.div`
  width: 100%;
`;
export const RightContainer = styled.div`
  width: 100%;
  background-color: #f9faff;
`;

export const LoginWrapper = styled.div`
  padding-top: 15vh;
  padding-left: 10%;
  padding-right: 8%;
  @media (max-width: 768px) {
    padding-top: 10vh;
    padding-left: 2vh;
    padding-right: 2vh;
  }
`;

export const LoginLeftWrapper = styled.div`
  padding-top: 20vh;
  padding-left: 20%;
  padding-right: 15%;
  @media (max-width: 768px) {
    padding-top: 15vh;
    padding-left: 2vh;
    padding-right: 2vh;
  }
`;

export const SliderContainer = styled.div`
  padding: 0px;
`;

export const AuthTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;

export const SubTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  padding: 3vh 0vh;
  color: #000000;
`;

export const ProfileLeftContainer = styled.div``;

export const UploadSizeTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 5;
  color: #686868;
  text-align: center;
`;

export const ProfileImageEdit = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const EditButton = styled.div`
  position: absolute;
  width: 286px;
  background: #ffffff;
  opacity: 0.8;
  bottom: 0px;
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #002d18;
`;

export const ProfileContainer = styled.div`
  padding-top: 15vh;
  @media (max-width: 768) {
    padding-top: 10vh;
  }
`;

export const InputBoxContainer = styled.div`
  padding: 20px 0px;
`;

export const Url = styled.button`
  font-size: 16px;
  background-color: #fff;
  border: none;
  color: #1093ff;
  text-decoration: underline;
  cursor: pointer;
`;

export const checkboxOption = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #2c2c2c;
`;

export const AddMoreButton = styled.button`
  padding: 5px;
  /* border: 1px solid #1093ff; */
  box-sizing: border-box;
  /* border-radius: 30px; */
  border: none;
  color: #1093ff;
  background-color: #fff;
  :hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    text-decoration: underline;
  }
  cursor: pointer;
`;

export const ProfileCardBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  @media (max-width: 920px) {
    justify-content: end;
    padding-left: 0px;
    padding-right: 0px;
  }

  @media (max-width: 768px) {
    display: unset;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 65, 130, 0.15);
  border-radius: 16px;
  transition: 0.3s;
`;

export const Logout = styled.button`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #0f3250;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export const LogoutButton = styled.button`
  width: 230px;
  height: 48px;
  background: ${props => (props.name === "no" ? "#FFFFFF" : "#1093ff")};
  border: ${props =>
    props.name === "yes" ? "none" : "1px solid #1093FF !important"};
  color: ${props => (props.name === "yes" ? "#FFFFFF" : "#1093FF")};
  border-radius: 30px;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.15px;
  border: none;
  cursor: pointer;
  outline: none;
`;

export const LogoutDialog = styled.div`
  padding: 40px;
  position: relative;
`;

export const LogoutHeaderText = styled.div`
  padding-bottom: 40px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #001d3a;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LogoutCloseIcon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;

export const PreviousButton = styled(Button)`
  border: 1px solid #1093ff;
  // box-sizing: border-box;
  border-radius: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  text-align: center;
  color: #1093ff;
  width: 220px;
  height: 40px;
  cursor: pointer;
  outline: none;
  background: #ffffff;
`;

export const NextButton = styled(Button)`
  border: 1px solid #1093ff;
  // position: absolute;
  width: 220px;
  height: 40px;
  // left: 1126px;
  // top: 1057px;
  background: #1093ff;
  border-radius: 30px;
  padding-right: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  :hover {
    background-color: #1093ff;
    opacity: 0.6;
  }
`;

export const RemoveButton = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ff0000;
  position: absolute;
  right: 5px;
  cursor: pointer;
  display: ${props => (props.visible === true ? "unset" : "none")};
`;

export const RoundedEditButton = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 28%;
  left: 28%;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.8;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    top: 20%;
    left: 20%;
  }
`;
export const CardTitle = styled.div`
  font-size: 120px;
  font-weight: 600;
  color: #052a4e;
  @media (max-width: 768px) {
    font-size: 70px;
  }
`;
export const CardView = styled.div`
  padding: 15px;
`;

export const AddressTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
  padding: ${props => props.padding};
`;
export const TopTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 2;
  text-align: center;
  color: #052a4e;
`;

export const TopSubTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #052a4e;
  text-align: center;
  padding-top: 24px;
`;

export const SubDescription = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #052a4e;
  text-align: center;
  padding: 16px;
`;

export const EmptyCourseImg = styled.img`
  width: 196px;
  height: 250px;
  display: block;
  margin: 66px auto 100px auto;
  // padding: 66px 16px 100px 16px;
`;

export const TopHeading = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 61px;
  text-align: center;
  color: #052a4e;
  @media (max-width: 500px) {
    font-size: 25px;
    line-height: 30px;
  }
`;
export const TopSubPara = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  color: #052a4e;
`;
export const BottomText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: #1093ff;
  text-align: center;
  cursor: pointer;
`;
export const BelowContent = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #052a4e;
  padding: ${props => props.p};
`;

export const TopParaSub = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  color: #052a4e;
`;
export const SubHeading = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
  padding-right: 16px;
  white-space: nowrap;
`;
export const AccountText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #052a4e;
`;
export const AccountLabel = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #686868;
  padding-bottom: 10px;
  mix-blend-mode: normal;
`;
export const AccountPass = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  color: #1093ff;
  cursor: pointer;
  border: none;
  background: none;
`;
export const AccountPassChange = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #052a4e;
  text-align: center;
`;
export const AccountChangeSubText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 27px;
  padding: 10px;
  color: #052a4e;
  text-align: center;
  padding-bottom: 40px;
`;

export const SubItem = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;
export const SubPara = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-left: 15px;
  line-height: 20px;
  color: #686868;
  white-space: nowrap;
  margin-right: 40px;
`;
export const CardBelowContent = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  padding: 20px;
  color: #052a4e;
`;
export const Bullet = styled.div`
  width: 12px;
  height: 12px;
  top: 6px;
  position: relative;
  border-radius: 50%;
  background: #00012c;
`;
export const InputContainer = styled.div`
  padding: 0px 30px;
  width: 100%;
`;
export const CardContainer = styled.div`
  padding: 20px;
`;
export const CardShadow = styled.div`
  box-shadow: 0px 0px 14px rgba(183, 222, 255, 0.5);
  border-radius: 8px;
  background-color: #ffffff;
  min-height: ${props => props.minHeight || "unset"};
`;
export const TopGridSubPara = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #052a4e;
  overflow: auto;
  overflow-y: scroll;
  height: 100%;
`;
export const TopGridSub = styled.div`
  padding: 20px;
  display: "flex";
  flex-direction: "row";
`;
export const FlatText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
  line-height: 20px;
  color: #052a4e;
`;
export const FlatTextContent = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const ImageSideText = styled.div`
  font-style: normal;
  font-weight: normal;
  margin-left: 10px;
  font-size: 12px;
  line-height: 16px;
`;

export const FlatInterText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  margin: 5px;
  margin-top: 20px;
  line-height: 20px;
  color: #052a4e;
`;

export const GreyTick = styled(CheckRoundedIcon)`
  height: 100px !important;
  width: 100px !important;
  color: #f0f0f0 !important;
`;

export const GreenTick = styled(CheckRoundedIcon)`
  height: 100px !important;
  width: 100px !important;
  color: #37e288 !important;
`;

export const Question = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  /* or 187% */
  color: #052a4e;
`;
export const AnswerTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 50px;

  color: #052a4e;
`;
export const HeaderText = styled.div`
  font-style: normal;
  text-align: left;
  font-weight: normal;
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
  color: #052a4e;
`;

export const AnswerDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  /* or 187% */
  color: #000000;
`;

export const TestTime = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 44px;
  /* identical to box height */

  color: #052a4e;
`;

/* topic test instruction css*/
export const InstructionDivider = styled.div`
  position: relative;
  width: 55px;
  height: 0px;
  /* right:70px; */
  top: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
`;

export const TestScore = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #052a4e;
`;

export const TestScores = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 51px;
  text-align: center;
  color: #052a4e;
`;

// continue
export const ContinueTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  white-space: nowrap;
  line-height: 24px;
  color: #052a4e;
`;

export const ContinueSubTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #052a4e;
`;

// STUDYPLANS
// CALENDAR DESIGN
export const NavigateBack = styled.div`
  /* background: #EAF5FF; */
`;
export const Landing = styled.div`
  width: 95%;
  margin: auto;
  height: 94px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 8px;
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
`;

export const LandingTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;

export const LandingSubTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #052a4e;
`;

export const CalendarCard = styled.div`
  /* position: absolute; */
  /* margin: 2px; */
  /* padding: 4px; */
  /* width: 1290px; */
  /* height: 400px; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: pink; */
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 8px;
  overflow-y: scroll;
  /* overflow-y: clip !important; */
  ::-webkit-scrollbar {
    width: 8px;
    height: 52px;
  }
  /* scrollbar-width: initial; */
`;

export const CalendarDayDivider = styled.div`
  position: relative;
  height: 2px;
  bottom: 6px;
  left: 14px;
  width: 89%;
  background: ${props => (props.active ? "#1093FF" : "#5C5C5C")};
`;

export const CalendarDate = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #5c5c5c;
  padding-left: 10px;
  cursor: pointer;
`;

export const CalendarDay = styled.div`
  width: 37px;
  height: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.color || "#5C5C5C"};
  /* identical to box height */
`;

export const RoutePageName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #052a4e;
  cursor: pointer;
`;

export const DayTitle = styled.div`
  /* width: 74px; */
  left: 52px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  color: #5c5c5c;
`;

export const DayTask = styled.div`
  /* width: 100px; */
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 2px;
  color: #052a4e;
`;

export const DayTopic = styled.div`
  /* width: 89px; */
  left: 52px;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 11px;
  color: #5c5c5c;
`;

export const BeforeIcon = styled.div`
  padding-left: 40px;

  /* cursor: pointer; */
  /* position: absolute; */
  /* left: 260px; */
  /* top: 185px; */
`;

export const NextIcon = styled.div`
  padding-left: 16px;
  /* cursor: pointer; */
  /* position: absolute; */
  /* left: 340px; */
  /* top: 185px; */
`;

export const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: stretch;
  position: absolute;
  right: 0;
  bottom: -10px;
  width: 345px;
  height: 637px;
  background: #ffffff;
  overflow-y: auto;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 12px 12px 8px 8px;
  transition: position 0.8s;
`;

export const Header = styled.div`
  background: #1093ff;
  height: 60px;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 12px 12px 0px 0px;
  display: flex;
  align-items: center;
`;

export const HeadText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 16px;
  color: #ffffff;
  margin-left: 20px;
`;

export const FlexFiller = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const NumberOfNotes = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #052a4e;
  text-align: right;
  padding-top: 12px;
  padding-right: 15px;
  padding-bottom: 7px;
`;

export const ValidatorCard = styled.div`
  display: ${props => (props.display ? "block" : "none")};
  width: 259px;
  padding: 12px 16px 8px 16px;
  border: 1px solid #eb0000;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 8px;
  margin-bottom: 60px;
`;

export const ValidatorHeader = styled.div`
  display: flex;
  align-items: center;
  min-height: 20px;
`;

export const ValidatorContainer = styled.div`
  padding-left: 24px;
  padding-top: 8px;
`;

export const ValidatorTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.15px;
  color: #eb0000;
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  min-height: 24px;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  letter-spacing: 0.15px;
  color: ${props => (props.color ? "#008D28" : "#EB0000")};
`;

export const ValidatorIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const PasswordMatchError = styled.div`
  display: ${props => (props.display ? "block" : "none")};
  margin-top: 8px;
  margin-bottom: 48px;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: #eb0000;
`;

export const Note = styled.div`
  background: #ffffff;
  border: 1px solid #ebecec;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const SuccessContainer = styled.div`
  padding: 126px 0px;
  text-align: center;
`;

export const SuccessImg = styled.img`
  width: 214.5px;
  height: 167px;
  margin-bottom: 105px;
`;

export const SuccessTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  text-align: center;
  color: #052a4e;
  padding-bottom: 24px;
`;

export const SuccessSubTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #052a4e;
  width: 364px;
  padding-bottom: 50px;
  margin: 0px auto;
`;

export const SuccessButton = styled.button`
  width: 203px;
  height: 40px;
  background: #1093ff;
  border-radius: 30px;
  cursor: pointer;
  color: #ffffff;
  border: none;
  font-weight: 500;
  font-size: 14px;
`;

export const NavigateBackIcon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: ${props => (props.top ? props.top : "0px")};
  left: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const TimeNumber = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #052a4e;
`;

export const TimeText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #052a4e;
`;

export const PopOver = styled(MuiPopover)``;

export const CommentIcon = styled.div`
  float: right;
  cursor: pointer;
  margin: -12px;
`;

export const CommentBox = styled.div`
  background: #ffffff;
  border: 1px solid #ebecec;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 64px;
`;

export const CommentFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #2f3237;
  padding: 8px;
`;

export const LeftLineBorder = styled.div`
  position: absolute;
  width: 2px;
  height: calc(100% - 31px);
  background: #1093ff;
  top: 7px;
  left: 4px;
`;

export const CommentTitle = styled.div`
  padding: 0px 14px 18px 12px;
  font-style: italic;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  color: #052a4e;
`;

export const CommentContent = styled.div`
  font-size: 16px;
  line-height: 150%;
  color: #052a4e;
  padding: 8px;
  word-break: break-word;
`;

export const AddNote = styled.div`
  position: absolute;
  right: -20px;
  z-index: 1;
  top: ${props => props.top || "auto"};
`;

export const TextBox = styled.div`
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

export const AddNotesBox = styled.div`
  position: absolute;
  width: 345px;
  height: 212px;
  background: #ffffff;
  box-shadow: 0px 0px 7px 4px rgba(183, 222, 255, 0.5);
  border-radius: 12px;
  padding: 16px;
  z-index: 1;
  right: 3px;
  top: ${props => props.top || "auto"};
`;

export const BoxArrow = styled.img`
  float: left;
  position: relative;
  top: 9px;
  z-index: 1;
`;

// INTRO DIALOG STYLES

export const IntroTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #052a4e;
`;

export const IntroDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #052a4e;
`;

export const Close = styled.div`
  position: absolute;
  left: 390px;
  right: 20.83%;
  top: 30px;
  bottom: 20.83%;
`;
export const HightLightTaskContainer = styled.div`
  position: absolute;
  background: #ffffff;
  border: 1px solid #a3d5ff;
  box-sizing: border-box;
  box-shadow: 0px 0px 7px 4px rgba(183, 222, 255, 0.5);
  border-radius: 12px;
  padding: 20px;
  width: 345px;
  height: 305px;
  z-index: 2;
  top: ${props => `${props.top}px` || 0};
  left: ${props => `${props.left}px` || 0};
  display: ${props => (props.visible ? "block" : "none")};
  word-break: break-word;
  overflow: auto;
`;

export const HighlightTextNoCount = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #686868;
`;

export const DialogDiv = styled.div`
  padding: 60px 0px;
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

export const DialogHeadText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #052a4e;
  text-align: center;
`;

export const BodyText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #052a4e;
  padding-top: 12px;
`;

export const DialogButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 40px;
  margin-top: 26px;
`;

export const BookmarkPosition = styled.div`
  position: absolute;
  right: 48px;
  top: 24px;
`;

export const BookmarkPosition1 = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`;

export const DividerBookmark = styled.div`
  position: absolute;
  top: 20px;
  right: 74px;
  height: 40px;
  /* border-right: 1px solid #5c5c5c; */
`;

export const DemoGuideContainer = styled.div`
  width: 387px;
  height: 423px;
  overflow: hidden;
  transition: hidden 0.8s;
`;

export const DemoGuideBox = styled.div`
  width: 687px;
  height: 687px;
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  inset: -264px 0px;
  border-radius: 100%;
`;

export const DemoArrow = styled.div`
  float: right;
  position: relative;
  top: 2px;
  right: 0px;
  z-index: 1;
`;

export const DemoBookmark = styled.div`
  float: right;
  position: relative;
  top: 24px;
  right: 48px;
  z-index: 2;
`;

export const DemoText = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  float: right;
  position: relative;
  top: 136px;
  right: -118px;
  z-index: 1;
`;

export const DisabledBlockedBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.85;
  border-radius: 8px;
  z-index: 1;
`;

export const TargetDateDialogContainer = styled.div`
  padding: 56px 40px 32px 40px;
`;

export const TargetDateDialogBody1 = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #052a4e;
  padding: 0px 72px 20px 72px;
`;

export const TargetDateDialogBody2 = styled.div`
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #052a4e;
  padding: 0px 166px 40px 166px;
`;

export const TargetDateDialogBody3 = styled.div`
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: #646464;
  padding-top: 24px;
`;

export const StyledClickButton = styled(Button)`
  min-height: 48px !important;
  width: 295px !important;
  padding: 16px 10px !important;
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 16px !important;
  text-align: center !important;
  background: ${props => (props.outlined ? "none" : "#1093FF")} ${" !important"};
  text-transform: none !important;
  border-radius: 30px !important;
  color: ${props => (props.outlined ? "#1093FF" : "#F2F2F2")} ${" !important"};
  border: ${props => (props.outlined ? "1px solid #1093FF" : "none")}
    ${" !important"};

  &:hover {
    background: ${props => (props.outlined ? "none" : "#1093FF")}
      ${" !important"};
  }
`;

export const FlexButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 100px;
`;

export const CloseIconBox = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const CalendarImg = styled.img`
  width: 124px;
  height: 124px;
  display: block;
  margin: 20px auto 32px auto;
`;

export const CustomHelperText = styled.p`
  color: #f44336;
  margin: 0;
  padding: 3px 9px;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;

export const TaskCard = styled(MuiCard)`
  width: 100%;
  min-height: 100px;
  margin: 20px 0;
  line-height: 40px;
  padding: 20px;
  background: ${props =>
    props.active
      ? "#1093ff !important"
      : props.complete
      ? "#F7F8FC"
      : "#ffffff"};

  margin-left: ${props => (props.active ? "-50px" : "0px")};
  padding-left: ${props => (props.active ? "2.5rem" : "20px")};
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5) !important;
  border-radius: 8px !important;
  color: ${props => (props.active ? "#ffffff !important" : "#052A4E")};
  cursor: pointer;
`;

export const TaskContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 12px 40px;
  * {
    font-family: Montserrat !important;
  }
`;

export const SupportLink = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  text-align: center;
  position: relative;
  top: ${({ isAlign }) => (!isAlign ? "-28px" : "auto")};
  padding-bottom: ${({ isAlign }) => (isAlign ? "60px" : "inherit")};

  span {
    color: #1093ff;
    cursor: pointer;
    font-weight: 600;

    &:active {
      color: #1080ff;
    }
  }
`;

export const LangPopper = styled.div`
  padding: 16px;
  min-width: 150px;
  background: #ffffff;
  display: grid;
  grid-gap: 6px;
`;

export const LangItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 10px;
  &:hover {
    background: #f2f9ff;
  }
`;

export const LangText = styled.div`
  font-size: 16px;
  color: rgb(5, 42, 78);
  font-weight: ${({ active }) => (active ? 600 : "normal")};
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const NavItemContainer = styled.div`
  display: flex;
  gap: 5vh;
  align-items: center;
  margin-left: 3vh;
`;

export const NavBarItem = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: start;
  flex-direction: column;
  position: relative;
  height: 11vh;
`;

export const AccountImageContainer = styled.div`
  border-radius: 50px;
  width: 48px;
  height: 48px;
  background: #eaf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  overflow: hidden;
`;

export const AccountImage = styled.img`
  width: 48px;
  height: 48px;
`;

export const HeaderPopupItemText = styled.div`
  margin-left: 15px;
  font-weight: ${({ bold }) => (bold ? 600 : "normal")};
  color: #052a4e;
`;

export const SubContent = styled.div`
  max-width: 800px;
  padding: 8px 30px;
  margin: 0px auto;
`;

export const HeaderWrap = styled.div`
  max-width: 560px;
  padding: 0px 15px;
  margin: 0 auto;
`;

export const PlayerBox = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  color: #052a4e;
`;

export const ToolTip = withStyles({
  arrow: {
    color: "#052A4E",
  },
  tooltip: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "20px",
    padding: "6px 26px 8px 18px",
    backgroundColor: "#052A4E",
    borderRadius: "8px",
  },
})(Tooltip);
