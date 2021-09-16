import React from 'react';
import { H1, H2, Div1, Switch } from '../../../Assets/StyledTest';
// import { Switch } from '@material-ui/core';

function Answer(props) {
  const { checked, handleSwitch } = props;
  return (
    <React.Fragment>
      <H1>Answer</H1>
      <Div1>
        <H2 checked={!checked}>Default answer</H2>
        <Switch checked={checked} onChange={handleSwitch} />
        <H2 checked={checked}>Bucket answer</H2>
      </Div1>
    </React.Fragment>
  );
}

export default Answer;
