import { makeStyles } from '@material-ui/core';
import { colors } from '../../../Constant/Variables';

export const useStyles = makeStyles(theme => ({
  contentContainer: {
    flexGrow: 1,
  },
  addContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRowColor: {
    backgroundColor: colors.ashColor,
  },
  leftContainer: {
    padding: '20px',
  },
  containerStyle: {
    height: '80vh',
    overflowY: 'auto',
    padding: '20px',
  },
  specializationWrapper: {
    height: '80vh',
    overflowY: 'auto',
    padding: '20px',
  },
  planOfActionContainer: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  planOfActionWrapper: {
    height: '70vh',
    overflowY: 'auto',
    padding: '20px',
  },
  autoCompleteStyle: {
    width: 300,
  },
  noSchoolTypo: {
    fontWeight: 'bolder',
  },
  quarterlyTypo: {
    fontWeight: 600,
  },
  generalDetailsHeading: {
    fontWeight: 600,
    marginTop: '10px',
  },
  schoolLeftContainer: {
    padding: '20px',
    borderRight: '2px solid #f1f1f1',
  },
  columnDivider: {
    borderRight: '2px solid #f1f1f1',
  },
  sampleSchoolHeading: {
    gridGap: '5px',
  },
  suggestPlan: {
    marginTop: '15px',
  },
  dropDownStyle: {
    width: '80%',
  },
  paperBorder: {
    borderRadius: '10px',
  },
  paddingContent: {
    padding: '20px',
    '& .MuiInputLabel-formControl': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: 'calc(100% - 18px)',
      paddingBottom: '1px',
    },
  },
  gutters: {
    padding: 2,
  },
  dividerColor: {
    background: '#E5E5E5',
  },
  paddingList: {
    padding: '20px 20px 20px 0px',
  },
  flexColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gridGap: '25%',
  },
  inputText: {
    '& .MuiInputBase-input': {
      fontSize: '14px',
      letterSpacing: '0.36px',
      fontStyle: 'italic',
      color: '#999999',
    },
  },
  centeredInputText: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
  },
  gapStyle: {
    display: 'flex',
    gridGap: '100px !important',
    justifyContent: 'space-between',
  },
  gap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gridGap: '20px !important',
    justifyContent: 'space-between',
  },
  buttonPad: {
    maxWidth: '145px',
    padding: '2px 5px !important',
    minWidth: '100% !important',
    '& .MuiButton-label': {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  boxPadding: {
    background: '#FFFFFF',
    border: '1px solid #D2D2D2',
    borderRadius: '0px 10px 10px 0px',
    width: '100%',
    height: '100%',
    position: 'relative',
    top: '-19px',
    right: '-19px',
  },
  rightContainerPad: {
    padding: '20px',
  },
  autoCompleteCustomStyle: {
    '& .MuiChip-outlined': {
      border: '1px solid rgb(52 59 137 / 20%)',
      backgroundColor: 'rgb(52 59 137 / 20%)',
      borderRadius: '15px',
      marginBottom: '5px',
    },
  },
  checkBox: {
    color: '#343B89',
  },
  fullWidth: {
    width: '100%',
  },
  infoBorder: {
    padding: '6px !important',
    background: '#FFFFFF !important',
    border: '1px solid #E7E7E7 !important',
    borderRadius: '4px !important',
    zIndex: 1,

    '&:hover': {
      background: 'rgba(24, 170, 231, 0.3) !important',
    },
  },
  iconBorder: {
    padding: '0px !important',
    marginTop: '3px',
  },
  dialogPaper: {
    background: '#FFFFFF',
    borderRadius: '10px !important',
    minWidth: '100% !important',
    minHeight: '100% !important',
    margin: '0 !important',
  },
  dialogRoot: {
    '& .MuiDialog-scrollPaper': {
      alignItems: 'flex-start !important',
      padding: '60px 80px !important',
    },
  },
  arrowStyle: {
    color: '#000000',
  },
}));
