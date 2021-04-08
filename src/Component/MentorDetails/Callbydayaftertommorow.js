import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import axios from 'axios';
import React, { Component } from 'react'
import { useRouteMatch } from 'react-router';

export default class Callbydayaftertommorrow extends Component {
    constructor(){
        super();
        // this.state={
        //     calls:[]
        // }
    }
//      username = '22543248';
//      password = '7624e0b3cd6d6a98c41266f7fd6352e0'
//      token=
// componentDidMount(){
//     axios.get("https://acuityscheduling.com/api/v1/appointments?email=atharv.unde59@gmail.com",{
//       crossDomain:true,
//       headers:{
//         //   "Access-Control-Allow-Origin":"*";
//         'Authorisation':`Basic ${token}`
//       }      
//     })
//     .then(call=>{console.log(call)});
// }

    studentdetails=[
        {
            studentid:1234,
            name:"student1",
            email:"student1gmail.com",
            phonenumber:1233456789
        },
        {
           studentid:5678,
           name:"student2",
           email:"student2gmail.com",
           phonenumber:9812467843
        },
        {
           studentid:9721,
           name:"student3",
           email:"student3gmail.com",
           phonenumber:2983461932
        }, 
        {
           studentid:3421,
           name:"student4",
           email:"student4gmail.com",
           phonenumber:1976781424
        }, 
        {
           studentid:1762,
           name:"student5",
           email:"student5gmail.com",
           phonenumber:9127498762
        },
        {
           studentid:8125,
           name:"student6",
           email:"student6gmail.com",
           phonenumber:1827457861
        }
    ]


       render() {
        // console.log(this.studentdetails.map(studentlist=>{studentlist.email}))
        return (
            <div>
                <h4>
                   All User 
                </h4>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>StudentID</TableCell>
                                <TableCell>Fullname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phonenumber</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.studentdetails.map((data)=>(
                                <TableRow>
                                    <TableCell>{data.studentid}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.phonenumber}</TableCell>
                                </TableRow>
                            ))}
                       
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
