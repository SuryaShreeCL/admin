import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

export const typographyStyle = {
  cursor: 'pointer',
  fontWeight: '600',
  marginLeft: '10px',
};

export const BreadCrumpContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

export const useStyles = makeStyles(them => ({
  imgStyle: {
    cursor: 'pointer',
    marginTop: '-10px',
  },
  textSTyle: {
    cursor: 'pointer',
    fontWeight: '600',
  },
}));
