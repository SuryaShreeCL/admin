import styled from "styled-components";

export const useStyles = () => ({
  buttonGrid: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    height: "84px",
    display: "flex",
    alignSelf: "flex-end",
  },
  addIcon: {
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteIcon: {
    cursor: "pointer",
  },
  container: {
    height: "100vh",
    padding: "0% !important",
    width: "100% !important",
    margin: "0px !important",
  },
  topGrid: {
    maxHeight: "100vh",
    overflowY: "scroll",
    position: "relative",
  },
  wrap: {
    padding: "0% !important",
    width: "100% !important",
    margin: "0px !important",
  },
  dividerColor: {
    background: "#E7E7E7",
  },
  customDividerColor: {
    background: "#E7E7E7",
    height: "calc(100% - 70px)",
  },
  rightWrapper: {
    maxHeight: "100vh",
    position: "relative",
    padding: "0px !important",
  },
  containerTopPad: {
    paddingTop: "15px",
  },
});

export const TestHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 62;
  overflow: hidden;
  font-size: 16px;
  letter-spacing: 0.32px;
  color: #333333;
  background: rgba(129, 193, 79, 0.4);
  padding: 14px 16px 10px;
`;

export const RightContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const RightContent = styled.div`
  position: absolute;
  top: 62px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

export const QuestionList = styled.ul`
  padding-right: 8px;
  li {
    font-size: 16px;
    color: #666666;
  }
  li::marker {
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
    font-size: 20px;
    text-indent: 0px !important;
    text-align: start !important;
    text-align-last: start !important;
  }
  div {
    margin-bottom: 1rem;
  }
`;

export const BolderPara = styled.p`
  font-size: 16px;
  font-weight: 600 !important;
  color: #666666;
`;
