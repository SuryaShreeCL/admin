import {
  Button,
  createTheme,
  Dialog,
  makeStyles,
  Typography,
  Tab,
} from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing("15px", "20px"),
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  dialogBottomContainer: {
    padding: "14px 30px !important",
    gap: "18px",
    borderTop: "1px solid #E6E6E6 !important",
  },
  dialogModelBottomContainer: {
    padding: "14px 30px !important",
    gap: "15px",
    borderTop: "1px solid #E6E6E6 !important",
  },
  popperContent: {
    paddingTop: "10px !important",
  },
  popperContentStyle: {
    maxHeight: "220px !important",
  },
}));

export const customTheme = createTheme({
  palette: {
    contained: {
      backgroundColor: "#18AAE7",
      color: "#FFFFFF",
    },
    text: {
      color: "#18AAE7",
    },
    outlined: {
      color: "#18AAE7",
      borderColor: "#18AAE7",
    },
  },
});

export const DialogBox = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px !important;
    width: ${({ width }) => width && `${width} !important`};
    overflow: hidden;
  }
`;

export const DialogHeaderTitle = styled(Typography)`
  padding: 21px 24px 19px;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  border-bottom: 1px solid #e6e6e6;
`;

export const StyledButton = styled(Button)`
  height: ${({ height }) =>
    height ? `${height} !important` : `32px !important`};
  padding: 15px !important;
  text-transform: none !important;
`;

export const Typo = styled(Typography)`
  color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  z-index: ${(props) => props.zIndex};
  text-align: ${(props) => props.textAlign};
  font-weight: ${(props) => props.fontWeight};
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
`;

export const UploadIcon = styled.img`
  display: block;
  width: 58px;
  height: 48px;
  object-fit: cover;
`;

export const StyledTab = styled(Tab)`
  text-transform: none;
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  max-width: unset;
`;

export const Paper = styled.div`
  width: 440px;
  position: relative;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  padding: 20px 15px;
  top: 5px;
  left: 4px;
  border-radius: 4px;

  &:before {
    content: "";
    position: absolute;
    top: -21px;
    z-index: 1;
    border: solid 10px transparent;
    border-bottom-color: #e7e7e7;
    left: 8px;
  }
  &:after {
    content: "";
    position: absolute;
    top: -19px;
    z-index: 1;
    border: solid 10px transparent;
    border-bottom-color: #ffffff;
    left: 8px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: ${(props) => props.padding};
  ::-webkit-scrollbar {
    display: none;
  }
`;
