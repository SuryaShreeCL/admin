import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BackHandlerContainer } from '../Assets/Styles/CreatePostStyles';
import { wallPath } from '../../RoutePaths';
import { useHistory } from 'react-router-dom';

const BackHandler = ({ title, tab }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push({
      pathname: wallPath,
      tab: tab,
    });
  };

  return (
    <BackHandlerContainer>
      <ArrowBackIcon style={{ color: '#4383E7', fontSize: '1.7rem' }} onClick={handleBack} />
      <h5 style={{ cursor: 'pointer' }} onClick={handleBack}>
        {title}
      </h5>
    </BackHandlerContainer>
  );
};

export default BackHandler;
