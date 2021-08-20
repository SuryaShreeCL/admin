import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Container, H1 } from '../../Assets/StyledComponents';
import PlusButton from '../../Utils/PlusButton';
import DropDownRack from './DropDownRack';
import TableComp from './TableComp';
import { connect } from 'react-redux';
import { getFilters, getQuestionSet } from '../../Redux/Action/Test';

const INITIAL_PAGE_NO = 0;
const NO_OF_RESPONSE = 10;

class TestLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testType: 'default',
      topicName: 'default',
      status: 'default',
    };
  }

  componentDidMount() {
    let paramObj = { page: INITIAL_PAGE_NO, size: NO_OF_RESPONSE };
    this.props.getFilters();
    this.props.getQuestionSet(paramObj);
  }

  handleDropDownChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(this.props.testData);
    const { data: filterData } = this.props.filterData;
    const { testType, topicName, status } = this.state;
    const { handleDropDownChange } = this;
    return (
      <Container>
        <Grid
          item
          container
          alignItems='center'
          justifyContent='space-between'
          style={{ marginBottom: '35px' }}
        >
          <H1>Test</H1>
          <PlusButton>Add</PlusButton>
        </Grid>
        {filterData && (
          <DropDownRack
            filterData={filterData}
            testType={testType}
            topicName={topicName}
            status={status}
            handleDropDownChange={handleDropDownChange}
          />
        )}
        <TableComp />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    filterData: state.TestReducer.filterData,
    testData: state.TestReducer.testData,
  };
};

export default connect(mapStateToProps, { getFilters, getQuestionSet })(
  TestLanding
);
