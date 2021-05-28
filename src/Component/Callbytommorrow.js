import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Slide
  } from "@material-ui/core";
  import React, { Component } from "react";
  import {viewschedule} from '../Actions/MentorAction'
  import {connect} from 'react-redux'
  
  class CallByTommorrow extends Component {
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
          arr.push({id : content.id, date : content.date, firstName : content.firstName, lastName : content.lastName, email : content.email, phone : content.phone, accurateDate : new Date(content.date).getDate(), time : content.time })
        })
        this.setState({
          data : arr
        })
      }
    }
    data=[
      {
         "id":54321,
         "firstName":"Bob",
         "lastName":"McTest",
         "phone":"",
         "email":"bob.mctest@example.com",
         "date":"July 2, 2013",
         "time":"10:15am",
         "endTime":"11:15am",
         "dateCreated":"June 17, 2013",
         "datetime":"2013-07-02T10:15:00-0700",
         "price":"10.00",
         "paid":"no",
         "amountPaid":"0.00",
         "type":"Regular Visit",
         "appointmentTypeID":1,
         "addonIDs":[
            1
         ],
         "classID":null,
         "duration":"60",
         "calendar":"My Calendar",
         "calendarID":27238,
         "canClientCancel":false,
         "canClientReschedule":false,
         "location":"",
         "certificate":null,
         "confirmationPage":"https://acuityscheduling.com/schedule.php?owner=11145481&id[]=1220aa9f41091c50c0cc659385cfa1d0&action=appt",
         "formsText":"...",
         "notes":"Notes",
         "timezone":"America/New_York",
         "forms":[
            {
               "id":1,
               "name":"Example Intake Form",
               "values":[
                  {
                     "value":"yes",
                     "name":"Is this your first visit?",
                     "fieldID":1,
                     "id":21502993
                  },
                  {
                     "value":"Ninja",
                     "name":"What is your goal for this appointment?",
                     "fieldID":2,
                     "id":21502994
                  }
               ]
            }
         ],
         "labels":[
            {
               "id":3,
               "name":"Completed",
               "color":"pink"
            }
         ]
      },
      {
         "id":2051308,
         "firstName":"Eve",
         "lastName":"Cooper",
         "phone":"1231231234",
         "email":"eve@example.com",
         "date":"June 24, 2013",
         "datetime":"2013-06-24T09:00:00-0700",
         "time":" 9:00am",
         "endTime":"10:00am",
         "price":"0.00",
         "paid":"no",
         "type":"Another Type",
         "appointmentTypeID":2,
         "addonIDs":[
            
         ],
         "classID":1,
         "duration":"60",
         "calendar":"My Calendar",
         "calendarID":27238,
         "canClientCancel":false,
         "canClientReschedule":false,
         "location":"",
         "confirmationPage":"https://acuityscheduling.com/schedule.php?owner=11145481&id[]=3320aa9f41091c50c0cc659385cfa1d0&action=appt",
         "formsText":"...",
         "notes":"Notes",
         "timezone":"America/New_York",
         "forms":[
            
         ],
         "labels":[
            
         ]
      }
   ]
    render() {
      console.log(this.state.data)
      if(this.props.viewscheduleList.length !== 0 ){
        let tempVar = new Date(this.props.viewscheduleList[0].date)
      console.log(tempVar.getDate())}
      if(this.props.viewscheduleList.length !== 0 )
      console.log(this.props.viewscheduleList)
      const currentdate = new Date().getDate();
      console.log(currentdate)
      const tommorrowdate = currentdate+1;
      // const tommorrowdate = new Date("April 12, 2021").getDate()
      const finaldate = this.state.data.filter(filterdate=>filterdate.date === currentdate)
      console.log(finaldate)
      return (
        <div>
          <h4>All User</h4>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Call Date</TableCell>
                <TableCell>Call Type</TableCell>
                {/* <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell> */}
                <TableCell>Call Starts</TableCell>
                <TableCell>Call Ends</TableCell>
                <TableCell>Client Email</TableCell>
                <TableCell>Client Mobile</TableCell>
                <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {this.state.data.filter(filterdate=>filterdate.date)} */}
              {/* {this.state.data.filter(sample=>sample.accurateDate === tommorrowdate).map(content=>( */}
                {this.data.map(details=>
                  <TableRow>
                    <TableCell>
                    {/* {content.id} */}
                    {details.date}
                    </TableCell>
                    <TableCell>
                    {/* {content.firstName} {content.lastName} */}
                    {details.type}
                    </TableCell>
                    {/* <TableCell>
                    {content.firstName}
                    </TableCell>
                    <TableCell>
                    {content.lastName}
                    </TableCell> */}
                    <TableCell>
                    {/* {content.email} */}
                    {details.time}
                    </TableCell>
                    <TableCell>
                    {/* {content.phone} */}
                    {details.endTime}
                    </TableCell>
                    <TableCell>
                    {/* {content.date} */}
                    {details.email}
                    </TableCell>
                    <TableCell>
                   {/* {content.time} */}
                   {details.phone}
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" color="primary" style={{margin:"5px"}}>Reschedule</Button>
                      <Button size="small" variant="contained" color="secondary" style={{margin:"5px"}}>Cancel</Button>
                    </TableCell>
                    </TableRow>
                  // ))}        content 
                )}
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
    export default connect(mapStateToprops,{viewschedule})(CallByTommorrow)
  