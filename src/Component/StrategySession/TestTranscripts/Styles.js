import { createMuiTheme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  HeadStyle: {
    paddingTop: "18px",
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
  },
  GridStyle: {
    fontStyle: "Montserrat",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "16px",
    color: "#052A4E",
  },
  iconButtonStyle: {
    padding: "2px !important",
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    background: "none",
  },
  dialogTitle: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#052A4E",
    fontWeight: 600,
  },
  arrowColor: {
    color: "#1093FF",
  },
  dropZoneLayout: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px dashed #1093FF",
  },
  fileError: {
    paddingTop: "5px",
    display: ({ isFileError }) => (isFileError ? "block" : "none"),
  },
  fileHelperText: {
    color: "#686868",
    fontFamily: "Montserrat",
  },
  buttonStyle: {
    width: "130px",
    textTransform: "none",
  },
  tableCellStyle: {
    color: "#000000",
    fontWeight: 400,
    fontSize: 14,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  tableCellCustomStyle: {
    color: "#000000",
    fontWeight: 400,
    fontSize: 14,
    fontFamily: "Montserrat",
    borderBottom: "none",
  },
  titleStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "18%",
  },
  subHeadStyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
  },
  subTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  documentCardLayout: {
    height: "80px",
    maxWidth: "330px",
    width: "100%",
    boxShadow: " 0px 8px 7px rgba(183, 222, 255, 0.5)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
  },
  documentCardWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px",
  },
  documentContent: {
    fontStyle: "Montserrat",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "14px",
    color: "#052A4E",
    marginTop: "10px",
  },
  documentDateTextStyle: {
    fontStyle: "Montserrat",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "14px",
    color: "#686868",
  },
}));

export const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "14px",
        whiteSpace: "nowrap",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
      },
    },
  },
});
