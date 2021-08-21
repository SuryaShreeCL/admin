import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Container, H1 } from '../../Assets/StyledComponents';
import PlusButton from '../../Utils/PlusButton';
import DropDownRack from './DropDownRack';
import TableComp from './TableComp';
import { connect } from 'react-redux';
import { getFilters, getQuestionSet } from '../../Redux/Action/Test';
import PaginationComponent from '../../Utils/PaginationComponent';

const INITIAL_PAGE_NO = 0;
const NO_OF_RESPONSE = 10;

class TestLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testTypeValue: 'default',
      topicNameValue: 'default',
      statusValue: 'default',
    };
  }

  componentDidMount() {
    this.props.getFilters();
    let paramObj = { page: INITIAL_PAGE_NO, size: NO_OF_RESPONSE };
    this.props.getQuestionSet(paramObj);
  }

  handleDropDownChange = event => {
    // console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    let paramObj = {
      page: INITIAL_PAGE_NO,
      size: NO_OF_RESPONSE,
      testType:
        event.target.name === 'testTypeValue' &&
        event.target.value !== 'default'
          ? event.target.value
          : null,
      topicId:
        event.target.name === 'topicNameValue' &&
        event.target.value !== 'default'
          ? event.target.value
          : null,
      status:
        event.target.name === 'statusValue' && event.target.value !== 'default'
          ? event.target.value
          : null,
    };
    this.props.getQuestionSet(paramObj);
  };

  handlePageChange = (event, value) => {
    window.scroll(0, 0);
    let paramObj = { page: value - 1, size: NO_OF_RESPONSE };
    this.props.getQuestionSet(paramObj);
  };
  render() {
    const { data: filterData } = this.props.filterData;
    const { data: tableContent } = this.props.testData;
    console.log(tableContent);
    const { testTypeValue, topicNameValue, statusValue } = this.state;
    const { handleDropDownChange, handlePageChange } = this;
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
            testTypeValue={testTypeValue}
            topicNameValue={topicNameValue}
            statusValue={statusValue}
            handleDropDownChange={handleDropDownChange}
          />
        )}
        {tableContent && <TableComp tableContent={tableContent.content} />}
        {tableContent !== undefined && (
          <PaginationComponent
            pageCount={tableContent.totalPages}
            onPageChange={handlePageChange}
          />
        )}
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
