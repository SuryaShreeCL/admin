import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DropDown from '../../Utils/DropDown';

const DEFAULT_OBJ = { id: 'default', title: 'Select' };

export default function DropDownRack(props) {
  const { handleDropDownChange, filterData, testType, topicId, status } = props;

  let [state, setState] = useState({ testTypes: [], topics: [], status: [] });

  useEffect(() => {
    setState({
      testTypes: [DEFAULT_OBJ, ...filterData.testTypes],
      topics: [DEFAULT_OBJ, ...filterData.topics],
      status: [DEFAULT_OBJ, ...filterData.status],
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Test Type'
          name='testType'
          items={state.testTypes}
          value={testType}
          onChange={handleDropDownChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Topic Name'
          name='topicId'
          items={state.topics}
          value={topicId}
          onChange={handleDropDownChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Status'
          name='status'
          items={state.status}
          value={status}
          onChange={handleDropDownChange}
        />
      </Grid>
    </Grid>
  );
  // } else return null;
}
