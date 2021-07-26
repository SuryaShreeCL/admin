import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BackHandlerContainer } from '../Assets/Styles/CreatePostStyles';
import { wallPath } from '../../RoutePaths';
import { useHistory } from 'react-router-dom';

const BackHandler = ({ title, tab }) => {
  const history = useHistory();
  return (
    <BackHandlerContainer>
      <ArrowBackIcon
        style={{ color: '#4383E7', fontSize: '1.7rem' }}
        onClick={() => {
          history.push({
            pathname: wallPath,
            tab: tab,
          });
        }}
      />
      <h5 style={{ cursor: 'pointer' }} onClick={history.goBack}>
        {title}
      </h5>
    </BackHandlerContainer>
  );
};

export default BackHandler;
