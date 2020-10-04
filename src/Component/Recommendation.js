import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { port } from './RoutePaths';
export default class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataFromdb: [],
            courses: [],
        }
    }

    componentDidMount() {
        //document.title = "basket";
        let engine = "/api/v1/courses/" + this.props.id + "";

        const db = "/api/v1/students/" + this.props.id + "/RecommendedCourses";

        axios.get(engine, {
            crossDomain: true
        })
            .then(res => res.data)
            .then(result => {
                console.log(result)
                this.setState({
                    data: result
                })
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(db, { crossDoman: true })
            .then(result => result.data)
            .then(results => {
                // console.log(results)
                this.setState({
                    dataFromdb: results
                })
            })
            .catch(error => {
                console.log(error);
            });

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
        var result = [];
        var dbres=[];
        var flat = [];
        return (
            <div>
                <div className="table-resonsive-sm">
                    <table className="table">
                        <thead>
                            <tr><th>Engine Recommendation</th>
                                <th>Mentor Recommendation</th></tr>
                        </thead>
                        <tbody>
                            <td className="">
                                <div className="hidden">
                                    {/* Divide the Course From Engine Recommendation Array */}
                                    {this.state.data.map((e) => {
                                        return e.courses.map((course) => {
                                            var co = [];
                                            co.push(course.name);
                                            return result.push(co);

                                        });
                                    }
                                    )}
                                    {/* Storing a Single Array */}
                                    {result.map((a) => {
                                        flat = result.reduce(function (a, b) {
                                            return a.concat(b)
                                        })
                                    }
                                    )}
                                    {/* Remove Duplication */}
                                    {flat = flat.filter((val, index) => flat.indexOf(val) === index).map((a) => {
                                        return a
                                    }
                                        // 
                                    )}
                                </div>
                                {/* Sorting the Engine Recommendation Courses*/}
                                {
                                    flat.sort().map((c) =>
                                        <tr><td>{c}</td></tr>
                                    )
                                }

                            </td>
                            <td>
                                {/* Divide the Mentor Recomendation */}
                                {
                                    this.state.dataFromdb.map((db) => {
                                        dbres.push(db.name);
                                    }
                                    )
                                }
                                {/* Sorting Mentor Recommendation */}
                                {
                                    dbres.sort().map((dbcourse) =>
                                        <tr><td>{dbcourse}</td></tr>
                                    )
                                }
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
