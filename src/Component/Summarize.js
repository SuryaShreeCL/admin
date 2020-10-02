import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

export class Summarize extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
// {mismatch_0:'244'},{mismatch_1:'24'},{mismatch_2:'44'}
    sum_header=['Mismatch count'];

    componentDidMount(){
           axios.get("/api/v1/students/testAll/coursesNotInEngine/summarize", {
               crossDomain: true
           })
               .then(res => res.data)
               .then(result =>{
             console.log(result)
                   this.setState({
                       data : result
                   })
               })
               .catch(error=>{
                   console.log(error);
               });
       }
    render() {
        return (
            <div>
                <div className="container">
                <div className="table-responsive-sm">    
                <table className="table">
                    <thead>
                      <tr>
                          {this.sum_header.map((sum)=>
                           <th> {sum} </th>
                          )}
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((summarize)=>
                        <tr>
                           
                            <td>{summarize}</td>
                        
                        </tr>
                        )}
                    </tbody>
                </table>
               </div>
            </div>   
            </div>
        )
    }
}

export default Summarize
