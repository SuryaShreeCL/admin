/**
* Icanio Technology. All rights reserved.
**/

import React from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import history from './History'
import Student from './Student'
import Student_data from './StudentData'
import Courses from './Courses'
import Department from './Department'
import MLogin from '../Designs/MLogin'
import Curated_Course from '../Designs/CuratedCourse'
import Personal_information from '../Designs/PersonalInformation'
import '../Designs/Asset/Login.css'
import EditCourse from './EditCourse'
import AddCourse from './AddCourse'
import QuestionBank from './QuestionBank'
import RecHome from './RengineLite/RecHome'


export default function Routes() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Router history={history}>
                        {/* <Route restricted={false} exact path="/" component={Login} /> */}
                        {/* <Route exact path="/" component={Student} /> */}
                        <Route exact path="/students" component={Student} />
                        <Route exact path="/courses" component={Courses} />
                        <Route exact path="/courses/edit/:id" component={EditCourse} />
                        <Route exact path="/courses/add" component={AddCourse} />
                        <Route exact path="/departments" component={Department} />
                        <Route exact path="/students/:id" component={Student_data} />
                        <Route exact path="/login" component={MLogin} />
                        <Route exact path="/personalInfo" component={Personal_information} />
                        <Route exact path="/curatedCourse" component={Curated_Course} />
                        <Route exact path="/questionbank" component={QuestionBank} />                       
                        <Route exact path='/Rengine' component={RecHome} />
                    </Router>
                </Switch>
                
            </div>
        </BrowserRouter>
    )
}
