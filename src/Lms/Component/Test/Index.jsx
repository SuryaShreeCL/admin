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
      order: [],
      field: [],
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

  handleSortNew = (index, order) => {
    const fields = { 1: 'type', 4: 'courseName', 6: 'wkStatusValue' };
    // console.log(fields[index]);
    this.setState({
      field: this.state.field.concat(fields[index]),
      order: this.state.order.concat(order),
    });
    // let paramObj = {
    //   page: INITIAL_PAGE_NO,
    //   size: NO_OF_RESPONSE,
    //   field: this.state.field.concat(fields[index]),
    //   order: this.state.order.concat(order),
    // };
    // this.props.getQuestionSet(paramObj);
  };

  handleSortBlue = fieldIndex => {
    this.setState({
      field: this.state.field.filter((item, index) => {
        if (index !== fieldIndex) return item;
      }),
      order: this.state.order.filter((item, index) => {
        if (index !== fieldIndex) return item;
      }),
    });
    // let paramObj = {
    //   page: INITIAL_PAGE_NO,
    //   size: NO_OF_RESPONSE,
    //   field: this.state.field,
    //   order: this.state.order,
    // };
    // this.props.getQuestionSet(paramObj);
  };

  handleSortBlur = fieldIndex => {
    if (this.state.order[fieldIndex] === 'ASC') {
      let newOrder = this.state.order;
      newOrder.splice(fieldIndex, 1, 'DESC');
      console.log(newOrder);
      this.setState({ order: newOrder });
    } else {
      let newOrder = this.state.order;
      newOrder.splice(fieldIndex, 1, 'ASC');
      console.log(newOrder);
      this.setState({ order: newOrder });
    }
    // let paramObj = {
    //   page: INITIAL_PAGE_NO,
    //   size: NO_OF_RESPONSE,
    //   field: this.state.field,
    //   order: this.state.order,
    // };
    // this.props.getQuestionSet(paramObj);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      let paramObj = {
        page: INITIAL_PAGE_NO,
        size: NO_OF_RESPONSE,
        field: this.state.field,
        order: this.state.order,
      };
      this.props.getQuestionSet(paramObj);
    }
  }

  render() {
    const { data: filterData } = this.props.filterData;
    const { data: tableContent } = this.props.testData;
    const {
      testTypeValue,
      topicNameValue,
      statusValue,
      field,
      order,
    } = this.state;
    const {
      handleDropDownChange,
      handlePageChange,
      handleSortNew,
      handleSortBlue,
      handleSortBlur,
    } = this;
    console.log(this.state.order);
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
        {tableContent && (
          <TableComp
            tableContent={tableContent.content}
            handleSortNew={handleSortNew}
            field={field}
            order={order}
            handleSortBlue={handleSortBlue}
            handleSortBlur={handleSortBlur}
          />
        )}
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
