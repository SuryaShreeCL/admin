import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BackHandlerContainer } from '../Assets/Styles/CreateTestStyles';
import { useHistory } from 'react-router-dom';

const BackHandler = ({ title, tab, path, scrollRef }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push({
      pathname: path,
      tab: tab,
    });
  };

  return (
    <BackHandlerContainer>
      <ArrowBackIcon style={{ color: '#4383E7', fontSize: '1.7rem' }} onClick={handleBack} />
      <h5 style={{ cursor: 'pointer' }} onClick={handleBack} ref={scrollRef}>
        {title}
      </h5>
    </BackHandlerContainer>
  );
};

export default BackHandler;
