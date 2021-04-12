import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Slide
  } from "@material-ui/core";
  import React, { Component } from "react";
  import {viewschedule} from '../Actions/MentorAction'
  import {connect} from 'react-redux'
  
  class CallbydayafterTommorrow extends Component {
    constructor(props){
      super(props);
      this.state = {
        data : []
      }
    }
    componentDidMount(){
      this.props.viewschedule()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.viewscheduleList !== prevProps.viewscheduleList){
        let arr = []
        this.props.viewscheduleList.map(content=>{
          arr.push({id : content.id, date : content.date, firstName : content.firstName, lastName : content.lastName, email : content.email, phone : content.phone, accurateDate : new Date(content.date).getDate(),time : content.time})
        })
        this.setState({
          data : arr
        })
      }
    }
    
    render() {
      console.log(this.state.data)
      if(this.props.viewscheduleList.length !== 0 ){
        let tempVar = new Date(this.props.viewscheduleList[0].date)
      console.log(tempVar.getDate())}
  
      if(this.props.viewscheduleList.length !== 0 )
      console.log(this.props.viewscheduleList)
      const currentdate = new Date().getDate();
      console.log(currentdate)
      const dayafterdate = currentdate+2;
  // const dayafterdate = new Date("April 14, 2021").getDate();
      let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
      console.log(month,date,year)
      return (
        <div>
          <h4>All User</h4>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Student ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  {/* <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell> */}
                  <TableCell>Email ID</TableCell>
                  <TableCell>Phone No</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.state.data.filter(sample=>sample.accurateDate === dayafterdate ).map(content=>(
                  <TableRow>
                    <TableCell>
                    {content.id}
                    </TableCell>
                    <TableCell>
                    {content.firstName} {content.lastName}
                    </TableCell>
                    {/* <TableCell>
                    {content.firstName}
                    </TableCell>
                    <TableCell>
                    {content.lastName}
                    </TableCell> */}
                    <TableCell>
                    {content.email}
                    </TableCell>
                    <TableCell>
                    {content.phone}
                    </TableCell>
                    <TableCell>
                    {content.date}
                    </TableCell>
                    <TableCell>
                    {content.time}
                    </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    const mapStateToprops=(state)=>{
        console.log(state);
        return{
          viewscheduleList:state.MentorReducer.viewscheduleList,
        }
    }
    export default connect(mapStateToprops,{viewschedule})(CallbydayafterTommorrow)
  