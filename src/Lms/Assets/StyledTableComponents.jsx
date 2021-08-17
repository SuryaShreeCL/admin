import { withStyles } from '@material-ui/styles';
import { TableHead, TableCell, Menu } from '@material-ui/core';

export const Head = withStyles({
  root: {
    borderBottom: '1px solid #CCCCCC',

    // borderBottom: 'solid',
    // borderWidth: '1px',
    // borderColor: '#CCCCCC',
  },
})(TableHead);

// export const TableHeaderCell = withStyles((theme) => ({
//     root: {
//       fontStyle: 'normal',
//       fontWeight: 600,
//       fontSize: '16px',
//       lineHeight: '20px',
//       color: '#052A4E',
//       textAlign: 'center',
//       border: '0',
//     },
//   }))(TableCell);

export const HeadCell = withStyles({
  root: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#052A4E',
    textAlign: 'center',
  },
})(TableCell);

export const BodyCell = withStyles({
  root: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#052A4E',
    textAlign: 'center',
    borderBottom: 'none',
  },
})(TableCell);

export const BlueCell = withStyles({
  root: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#0A66C2',
    textAlign: 'center',
    borderBottom: 'none',
  },
})(TableCell);

export const MuiMenu = withStyles({
  paper: {
    background: '#ffffff',
    boxShadow: '0px 4px 11px 1px rgba(55, 143, 233, 0.25)',
    borderRadius: '12px',
    padding: '17px 12px',
    width: '260px',
  },
})(Menu);

// studyplans
export const TableCells = withStyles({
  root: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '22px',
    color:'#052A4E',
    borderBottom: 'none',
  },
})(TableCell);