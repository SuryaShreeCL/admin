import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BackHandlerContainer } from '../Assets/Styles/WallStyles';
import { useHistory } from 'react-router-dom';

const BackHandler = ({ title }) => {
  const history = useHistory();
  return (
    <BackHandlerContainer>
      <ArrowBackIcon style={{ color: '#4383E7',fontSize:'1.7rem' }} onClick={history.goBack} />
      <h5>{title}</h5>
    </BackHandlerContainer>
  );
};

export default BackHandler;
