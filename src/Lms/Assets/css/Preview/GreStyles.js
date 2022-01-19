import {
  createTheme,
  Divider as MuiDivider,
  Grid as MuiGrid,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Button as MuiButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { gmatTheme } from "./GmatStyles";

export const greTheme = createTheme({
  palette: {
    primary: {
      main: "#052A4E",
    },
    secondary: {
      main: "#696969",
    },

    text: {
      primary: "#052A4E",
      secondary: "#FFFFFF",
    },
    headerBackground: "#393837",
    subHeaderBackground: "#F7E7EA",
  },
  typography: {
    h1: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "150%",
    },

    h2: {
      fontWeight: "500",
      fontSize: "24px",
      lineHeight: "29px",
    },

    h3: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18px",
    },

    h4: {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "16px",
    },

    h5: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "16px",
    },

    h6: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "28px",
    },

    h7: {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "150%",
    },

    body1: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      color: "#686868",
    },

    body2: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "150%",
    },
  },
  overrides: {
    MuiCheckbox: {
      root: {
        color: "#000000",
      },
    },
  },
});

export const Header = styled("div")({
  height: greTheme.spacing(7.5),
  background: greTheme.palette.headerBackground,
  padding: greTheme.spacing(0, 3),
  display: "flex",
  justifyContent: "space-between",
});

export const SubHeader = styled("div")({
  height: greTheme.spacing(5),
  background: greTheme.palette.subHeaderBackground,
  padding: greTheme.spacing(0, 3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const LeftBox = styled("div")({
  display: "flex",
  alignItems: "baseline",
});

export const RightBox = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  gridColumnGap: greTheme.spacing(3),
  padding: greTheme.spacing(0.8),
});

export const ImgBox = styled("span")({
  paddingRight: greTheme.spacing(1.5),
  paddingTop: greTheme.spacing(0.5),
});

export const Main = styled("div")({
  padding: greTheme.spacing(1.5, 0, 4, 0),
  minHeight: "calc(100vh - 100px)",
  // overflow: "auto",
});

export const Content = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const InnerContent = styled("div")({
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  // mar
});

export const Divider = withStyles({
  root: {
    background: "#052A4E",
  },
})(MuiDivider);

export const TitleBox = styled("div")({
  display: "grid",
  gridAutoFlow: "row",
  gridRowGap: greTheme.spacing(1.5),
  padding: greTheme.spacing(2, 0),
});

export const Text = styled("div")({
  padding: greTheme.spacing(1.5),
  display: "flex",
  alignItems: "center",
});

export const Bullet = styled("div")({
  width: "12px",
  height: "12px",
  position: "relative",
  borderRadius: "50%",
  background: "#00012c",
});

export const BulletBox = styled("div")({
  padding: greTheme.spacing(1.5),
});

export const DemoBox = styled("div")({
  padding: greTheme.spacing(1.5, 6),
});

export const SubLeftBox = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  gridColumnGap: greTheme.spacing(1.5),
  // padding: greTheme.spacing(0.8),
});

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",

  "& *": {
    fontFamily: "Montserrat !important",
  },
});

export const TopGrey = styled("div")({
  width: "67%",
  background: "#D3D3D3",
  ...greTheme.typography.h7,
  color: "#000000",
  padding: greTheme.spacing(1.5, 2.5),
  display: "flex",
  justifyContent: "center",
});

export const BottomGrey = styled("div")({
  width: greTheme.spacing(56.25),
  background: "#D3D3D3",
  ...greTheme.typography.h7,
  color: "#000000",
  padding: greTheme.spacing(1.5, 2.5),
  display: "flex",
  justifyContent: "center",
});

export const Center = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80%",
  padding: "8px",
  // margin: greTheme.spacing(0, 18),
});

export const BundleCenter = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  padding: "8px",
  overflow: "auto",
});

export const Table = styled("table")({
  borderCollapse: "collapse",
  width: greTheme.spacing(50),
  marginTop: greTheme.spacing(5),
});

export const Tr = styled("tr")({
  borderCollapse: "collapse",
  border: "1px solid #000000",
});

export const Td = styled("td")(({ active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: greTheme.spacing(1.5),
  background: active ? "#000000" : "",
  cursor: "pointer",
  ...greTheme.typography.h7,
  color: active ? "#FFFFFF" : "#000000",
}));

export const TH = styled("td")(({ active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: greTheme.spacing(1.5),
  // background: active ? '#000000' : '',
  cursor: "pointer",
  ...greTheme.typography.h5,
  // color: active ? '#FFFFFF' : '#000000',
}));

export const Grid = withStyles({
  root: {
    width: "100%",
    height: "100%",
    // margin: 'unset',
  },
  // container: {},
  // item: {
  //   padding: greTheme.spacing(1.25),
  // },
})(MuiGrid);

export const DescriptionBox = styled("div")({
  display: "grid",
  gridAutoFlow: "row",
  gridRowGap: greTheme.spacing(1.25),
  padding: greTheme.spacing(2.5),
  overflowX: "auto",
  overflowY: "auto",
  overflow: "hidden",
  height: "90%",
});

export const OutlineLeft = styled("div")({
  border: "1px solid #888888",
  margin: greTheme.spacing(2, 1.25, 3, 3),
  height: "100%",
});

export const OutlineRight = styled("div")({
  border: "1px solid #888888",
  height: "100%",
  margin: greTheme.spacing(2, 3, 3, 1.25),
});

export const TextBox = styled("textarea")({
  ...greTheme.typography.h6,
  padding: greTheme.spacing(2, 2.5),
  outline: "none",
  border: "none",
  minHeight: "77vh",
  width: "100%",
  color: greTheme.palette.text.primary,
});

export const ChoiceBox = styled("div")({
  paddingTop: greTheme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ChoiceInnerBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const ChoiceDiv = styled("div")({
  height: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "100%",
  padding: greTheme.spacing(2),
});

export const BundleTable = styled("table")({
  borderCollapse: "collapse",

  gridRow: 1,
  // width: greTheme.spacing(50),
});

export const BundleDiv = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  gridColumnGap: greTheme.spacing(2.5),
  width: "inherit",
  justifyItems: "center",
});

export const DescriptionHeader = styled("div")({
  height: "32px",
  width: "100%",
  background: "#000080",
  ...greTheme.typography.body1,
  color: greTheme.palette.text.secondary,
  paddingLeft: greTheme.spacing(1),
  display: "flex",
  alignItems: "center",
});

export const DialogTitle = withStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    color: `${gmatTheme.palette.text.buttonText}`,
    fontSize: `${gmatTheme.typography.h4.fontSize}`,
    fontWeight: 600,

    background: "#393837",
    padding: `${gmatTheme.spacing(2)}px`,
    borderBottom: `1px solid`,
  },
})(MuiDialogTitle);

export const DialogContent = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#393837",
    color: `${gmatTheme.palette.text.buttonText}`,
    padding: `${gmatTheme.spacing(2)}px`,
  },
})(MuiDialogContent);

export const DialogActions = withStyles({
  root: {
    background: "#393837",

    justifyContent: "center",
    padding: `${gmatTheme.spacing(3)}px`,
  },
})(MuiDialogActions);

export const Button = withStyles({
  root: {
    // borderRadius: '0px',
    background: "#393837",
    textTransform: "none",
    height: "50px",
    color: "white",
    width: "145px",
    border: "1px solid #fff",
    boxShadow: "none",
    "&:hover": {
      color: "white",

      background: "#393837",
    },
  },
})(MuiButton);

// export const ContinueButton = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 200px;
//   background: #1093ff;
//   border-radius: 30px !important;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 16px;
//   color: #f2f2f2 !important;
//   padding: 10px;
//   margin-top: 5vh;
//   cursor: pointer;
// `;

// export const PauseModelSubTitle = styled.div`
//   font-style: normal;
//   font-weight: normal;
//   font-size: 16px;
//   line-height: 24px;
//   text-align: center;
//   color: #052a4e;
// `;

// export const PauseModelTitle = styled.div`
//   font-weight: 600;
//   font-size: 24px;
//   line-height: 30px;
//   text-align: center;
//   color: #052a4e;
//   padding: 29px 0px 0px;
// `;

// export const QuitButton = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 200px;
//   background: none;
//   border-radius: 30px;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 16px;
//   color: #1093ff;
//   border: 1px solid #1093ff;
//   padding: 10px;
//   margin-top: 5vh;
//   cursor: pointer;
// `;
