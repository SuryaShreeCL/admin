import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    dept_header = ['Id', 'Name','Stream'];

    componentDidMount() {
        axios.get("http://services.thecareerlabs.com:8080/api/v1/departments", {
            crossDomain: true
        })
            .then(res => res.data)
            .then(result => {
                console.log(result);
                this.setState({
                    data: result
                })
            })
            .catch(error => {
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
                                    {this.dept_header.map((dept) =>
                                        <th> {dept} </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((department) =>
                                    <tr>
                                        <td>{department.id}</td>
                                        <td>{department.name}</td>
                                <td>{department.stram_id}</td>

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

export default Department
