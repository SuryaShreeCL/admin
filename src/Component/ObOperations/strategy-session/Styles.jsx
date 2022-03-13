import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sessionContainer: {
    height: "80vh",
    border: "1px solid #D2D2D2",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "15px",
    width: "100%",
  },
  strategyCard: {
    height: "98px",
    border: "1px solid #E7E7E7",
    borderRadius: "5px",
    opacity: 1,
    padding: "15px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent : 'space-around'
  },
  selectedStrategyCard: {
    height: "98px",
    border: "2px solid #18AAE7",
    borderRadius: "5px",
    opacity: 1,
    padding: "15px",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
    display: "flex",
    flexDirection: "column",
    justifyContent : 'space-around'
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    gap : '15px'
  },
  preStrategyWorkSheetContainer : {
    minHeight: "80vh",
    width : '100%',
    borderRadius : '10px',
    border : '1px solid #D2D2D2',
    opacity : 1,
    marginTop : '15px'
  },
  saveContainer : {
    display: "flex",
    alignItems : 'center',
    justifyContent : 'flex-end',
    padding : '10px',
    borderTop : "1px solid #D2D2D2"
  },
  mainWrapper : {
    display : 'flex',
    flexDirection : 'column',
    height : '80vh'
  },
  contentWrapper : {
    flex : 1,
    overflowY : 'auto'
  }
}));
