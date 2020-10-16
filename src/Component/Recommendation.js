import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {getStudentsById} from '../Actions/Student'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'

export  class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataFromdb: [],
            courses: [],
        }
    }

    componentDidMount() {      
        this.props.getStudentsById(this.props.id) 
    }

    testcourses(arrayf, arrays) {

        for (let i = 0; i < arrayf.length; i++) {
            for (let j = 0; j < arrays.length; j++) {
                if (arrayf[i] === arrays[i]) {
                    return (
                        <tr> <td className="match">{arrayf[i]}</td></tr>
                    )
                }
            }
        }
    }
    addArray(val) {
        this.state({
            courses: val
        })
    }

    render() {
        let result=[];
        let dbres=[];
        let flat=[];        
        

        let mentor=[];
        let recommended=[];
        if(this.props.StudentDetails.length!==0){
            //mentor            
            let mentorArr=this.props.StudentDetails.mentorRecommendedCourses.map((Mentor)=>{                                
                if(mentor.indexOf(Mentor.name)===-1){
                    return mentor.push(Mentor.name);
                }                
            })
            // console.log(mentor)
            //recommendedCourses
            let recommendedArr=this.props.StudentDetails.recommendedCourses.map((recommend)=>{
                if(recommended.indexOf(recommend.name)===-1){
                    return recommended.push(recommend.name);
                }                
                
            })
            // console.log(recommended)
        }


        function Recommendation(){            
           return recommended.sort().map((recommended)=>{ 
               if(mentor.indexOf(recommended)!== -1){
                return  <tr><td className='match_val'>{recommended}</td></tr>
               } 
               else{
                   return <tr><td>{recommended}</td></tr>
               }                             
            })
        }
        function Mentor(){
           return mentor.sort().map((mentor)=>{
               if(recommended.indexOf(mentor)===-1){
                return <tr><td className='disMatch_val'>{mentor}</td></tr>
               }else{
                return <tr><td>{mentor}</td></tr>
               }                                           
            })
        }
                
        return (
            <div>
                <div className="table-resonsive-sm">    
                <div className='text-end'>  
                    <Button variant='contained' color='primary' className='text-margin-bottom' >Run Recommendation</Button>
                </div>                                
                    <table className="table">
                        <thead>
                            <tr><th>Engine Recommendation</th>
                                <th>Mentor Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <td>
                                  {Recommendation()}                                                                                  
                              </td>
                              <td>                
                                  {Mentor()}               
                              </td>
                         </tr>                          
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


const mapStateToProps=state=>{
    return{ 
        StudentDetails:state.StudentReducer.StudentList,
     }
}

export default connect(mapStateToProps,{getStudentsById})(Recommendation)