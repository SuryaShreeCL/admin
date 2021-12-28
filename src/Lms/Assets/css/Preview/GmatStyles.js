/**
 * (c) CareerLabs. All rights reserved.
 **/
import {
  createTheme,
  withStyles,
  Button as MuiButton,
  RadioGroup as MuiRadioGroup,
  FormControlLabel as MuiFormControlLabel,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton as MuiIconButton,
  FormGroup as MuiFormGroup,
} from "@material-ui/core";
import { CloseSharp as MuiCloseSharp } from "@material-ui/icons";
import styled from "styled-components";
// import montserrat from url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap')

const font = "'Montserrat', sans-serif";
export const gmatTheme = createTheme({
  palette: {
    primary: {
      main: "#006DAA",
    },

    secondary: { main: "#1093FF" },

    text: {
      primary: "#052A4E",
      secondary: "#686868 ",
      buttonText: "#fff",
    },
    // common: { black: '#052A4E' },
    // textPrimary: { main: '#052A4E' },
    textFilled: "#fff",
    primaryBackground: { dark: "#006DAA", light: "#80AEE1" },
    secondaryBackground: "#fff",
  },
  typography: {
    fontFamily: ["Montserrat !important"].join(","),

    h1: {
      fontWeight: "500",
      fontSize: "1.25rem",
      lineHeight: "20px",
      color: "#FFFFFF",
    },
    h2: {
      fontWeight: "500",
      fontSize: "24px",
      lineHeight: "29px",
    },
    h3: {
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "150%",
    },
    h4: {
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "28px",
    },
    h5: {
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "30px",
    },
    h6: {
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "20px",
      color: "#fff",
    },
    body1: {
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
  shape: {
    borderRadius: 0,
  },
  breakpoints: {
    values: {
      xs: "450",
      md: "600",
      lg: "1336",
    },
  },
});

export const MainStyle = styled.div`
  padding: ${gmatTheme.spacing(2, 3)};
  font-family: "Montserrat !important";
`;

export const Header = styled.div`
  background-color: ${gmatTheme.palette.primaryBackground.dark};
  padding: ${gmatTheme.spacing(0, 3)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${gmatTheme.spacing(8)}px;
`;

export const SubHeader = styled.div`
  background: ${gmatTheme.palette.primaryBackground.light}};
  height: ${gmatTheme.spacing(5)}px;
  margin: ${gmatTheme.spacing(0.3, 0)};
  padding: ${gmatTheme.spacing(1, 3)};
  display: flex;
  align-items: center;
  color: ${gmatTheme.palette.text.buttonText};
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  background: ${gmatTheme.palette.secondaryBackground};
  flex-grow: 1;
  border-left: ${gmatTheme.spacing(3)}px solid
    ${gmatTheme.palette.primaryBackground.dark};
  border-right: ${gmatTheme.spacing(3)}px solid
    ${gmatTheme.palette.primaryBackground.dark};
  display: flex;
`;

export const Main = styled.div`
  padding: ${gmatTheme.spacing(5, 2)};
`;

export const SubTitle = styled.div`
  padding-top: ${gmatTheme.spacing(1)}px;
`;

export const Text = styled.div`
  padding: ${gmatTheme.spacing(1.5)}px;
  display: flex;
  align-items: center;
`;

export const Bullet = styled.div`
  width: 12px;
  height: 12px;
  //   top: 6px;
  position: relative;
  border-radius: 50%;
  background: #00012c;
`;

export const BulletBox = styled.div`
  padding: ${gmatTheme.spacing(1.5)}px;
`;

export const ButtonBox = styled.div`
  padding-left: ${gmatTheme.spacing(4)}px;
  padding-top: ${gmatTheme.spacing(1.5)}px;
`;

export const Box = styled.div`
  // padding-top: 7vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  height: 50px;
  border-left: 24px solid ${gmatTheme.palette.primaryBackground.dark};
  background: ${gmatTheme.palette.secondaryBackground};
`;

export const Filler = styled.div`
  flex-grow: 1;
  background: ${gmatTheme.palette.primaryBackground.dark};
`;

export const Button = withStyles({
  root: {
    // borderRadius: '0px',
    textTransform: "none",
    height: "50px",
    width: "145px",
    border: "1px solid #fff",
    boxShadow: "none",
  },
})(MuiButton);

export const RadioGroup = withStyles({
  root: {
    paddingTop: `${gmatTheme.spacing(4)}px`,
  },
})(MuiRadioGroup);

export const FormControlLabel = withStyles({
  root: {
    marginRight: `${gmatTheme.spacing(10)}px`,
    alignItems: "flex-start",
  },
})(MuiFormControlLabel);

export const ButtonBox2 = styled.div`
  padding-top: ${gmatTheme.spacing(3)}px;
`;

export const OptionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${gmatTheme.spacing(1)}px;
`;

export const DialogTitle = withStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    color: `${gmatTheme.palette.text.buttonText}`,
    fontSize: `${gmatTheme.typography.h4.fontSize}`,
    fontWeight: 600,
    background: `${gmatTheme.palette.primaryBackground.dark}`,
    padding: `${gmatTheme.spacing(2)}px`,
    borderBottom: `1px solid`,
  },
})(MuiDialogTitle);

export const CloseSharp = withStyles({
  root: {
    color: `${gmatTheme.palette.text.buttonText}`,
  },
})(MuiCloseSharp);

export const DialogContent = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `${gmatTheme.palette.primaryBackground.dark}`,
    color: `${gmatTheme.palette.text.buttonText}`,
    padding: `${gmatTheme.spacing(2)}px`,
  },
})(MuiDialogContent);

export const DialogContent2 = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `${gmatTheme.palette.primaryBackground.dark}`,
    color: `${gmatTheme.palette.text.buttonText}`,
    padding: `${gmatTheme.spacing(1)}px`,
  },
})(MuiDialogContent);

export const DialogActions = withStyles({
  root: {
    background: `${gmatTheme.palette.primaryBackground.dark}`,
    justifyContent: "center",
    padding: `${gmatTheme.spacing(3)}px`,
  },
})(MuiDialogActions);

export const IconButton = withStyles({
  root: {
    padding: "0px",
  },
})(MuiIconButton);

export const QuestionDiv = styled.div`
  // margin-top: ${gmatTheme.spacing(3)}px;
  padding: ${gmatTheme.spacing(3, 2)};

  overflow: hidden;
  overflow-y: auto;
  overflow-x: auto;
  height: 84vh;
  @media only screen and (max-width: ${gmatTheme.breakpoints.values.lg}px) {
    /* CSS that should be displayed if width is equal to or less than 991px goes here */
    height: 75vh;
  }
`;

export const FormControlLabel2 = withStyles({
  root: {
    padding: `${gmatTheme.spacing(1.5)}px`,
  },
})(MuiFormControlLabel);

export const HeaderBox = styled.div`
  color: ${gmatTheme.palette.text.buttonText};
  // width: ${gmatTheme.spacing(27)}px;
  display: flex;
  flex-direction: column;
`;

export const Inline = styled.div`
  display: flex;
  padding: 2px;
`;

export const TimerBox = styled.div`
  width: ${gmatTheme.spacing(8)}px;
  position: relative;
  right: -${gmatTheme.spacing(0.9)}px;
`;

export const FormGroup = withStyles({
  root: {
    paddingTop: `${gmatTheme.spacing(4)}px`,
  },
})(MuiFormGroup);

export const BundleDiv = styled.div`
  padding-top: ${gmatTheme.spacing(4)}px;
`;

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
