import React, { Component } from 'react'
import './Asset/PersonalInfo.css'
import { TextField, Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import history from '../Component/History'

export default class Personal_information extends Component {
    render() {
        return (
            <div>
                <div className="personal-info-root">
                    <div className="container personal-info-body ">
                        <div className="info-header">
                            <label className="info-header-label">Personal Information</label>
                        </div>
                        <div className="info-name">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="What is your Name?"
                                name="name"
                                size="small"
                                className="col-12"
                            />

                        </div>
                        <div className="info-mail-ph">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="name"
                                label="What is your E-mail id?"
                                name="email"
                                size="small"
                                className="info-email"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="name"
                                label="What is your Contact Number?"
                                name="ph_no"
                                size="small"
                                className="info-contactno"
                            />
                        </div>
                        <div className="info-clg-dept">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="name"
                                label="What is your College Name?"
                                name="college_name"
                                size="small"
                                className="info-clg"
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="name"
                                label="Enter your Department Name?"
                                name="Department"
                                size="small"
                                className="info-dept"
                            />
                        </div>
                        <div className="info-upload">
                        <input
                           accept="image/*"
                           className="info-file-upload"
                           id="contained-button-file"
                           multiple
                           type="file"
                         />
                          <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                className="btn-blue"
                                component="span"
                            >
                                Upload
                                
                            </Button>
                            </label>
                        </div>
                        <div className="info-second-header">
                            <label className="info-second-header-label">We would like to know you better</label>
                        </div>
                        <div className="info-education">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Enter your Higher Education?"
                                name="higher"
                                size="small"
                                className="info-higher-education"
                            />
                        </div>
                        <div className="item-container">
                            <label className="qus">Are you planing to purse higher education ?</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">In which field you would like to pursue higher education?</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="Technical" control={<Radio color="primary" />} label="Technical" />
                                    <FormControlLabel value="Management" control={<Radio color="primary" />} label="Management" />
                                    <FormControlLabel value="notDecided" control={<Radio color="primary" />} label="Not decided" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">When i work,i would like to be known amongst my work Colleagues for...</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="My Coding Ability" />
                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="My Ability to Get Things done" />
                                    <FormControlLabel value="creativeWork" control={<Radio color="primary" />} label="My Creative Work" />
                                    <FormControlLabel value="Insights" control={<Radio color="primary" />} label="My Ability to Play with Data and Get Insights" />
                                    <FormControlLabel value="getInsights" control={<Radio color="primary" />} label="My Ability to Play with Data and Get Insights" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">If i were given an opportunity to give a TED talk,this is the topic i would pick</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="Ai" control={<Radio color="primary" />} label="How AI can save the world" />
                                    <FormControlLabel value="marketing" control={<Radio color="primary" />} label="The New Age Marketing" />
                                    <FormControlLabel value="story" control={<Radio color="primary" />} label="The evolution of Animation Flims since Toy Story" />
                                    <FormControlLabel value="visualization" control={<Radio color="primary" />} label="The beauty of Analytics and Visualization" />
                                    <FormControlLabel value="engineer" control={<Radio color="primary" />} label="Engineer beyond engimeering -The Art of being an Engineer" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">On a day basis at work,I would like to,</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="a" control={<Radio color="primary" />} label="Architect,Design,Develop,Softwere Product" />
                                    <FormControlLabel value="b" control={<Radio color="primary" />} label="Plan and Get things Done" />
                                    <FormControlLabel value="c" control={<Radio color="primary" />} label="Work on animated movies" />
                                    <FormControlLabel value="d" control={<Radio color="primary" />} label="Analyse Information & Execute Projects" />
                                    <FormControlLabel value="e" control={<Radio color="primary" />} label="Engineer solutions to real world problems" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">I'm most likely to pick up this book</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="a" control={<Radio color="primary" />} label="The art of computer programming" />
                                    <FormControlLabel value="b" control={<Radio color="primary" />} label="The One Mnute Manager" />
                                    <FormControlLabel value="c" control={<Radio color="primary" />} label="Pixar Storytelling:Rules fro Effective Storytelling" />
                                    <FormControlLabel value="d" control={<Radio color="primary" />} label="Business Analytics for Managers:Talking Business Intelligence Beyond Reporting" />
                                    <FormControlLabel value="e" control={<Radio color="primary" />} label="The essential pleasures of engneering" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">My dream job is (Pick the most reevent option)</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="a" control={<Radio color="primary" />} label="Softwere Engineer" />
                                    <FormControlLabel value="b" control={<Radio color="primary" />} label="Product Manager" />
                                    <FormControlLabel value="c" control={<Radio color="primary" />} label="Character Animator" />
                                    <FormControlLabel value="d" control={<Radio color="primary" />} label="Business Analyst" />
                                    <FormControlLabel value="e" control={<Radio color="primary" />} label="Work in my Core Tech field" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="item-container">
                            <label className="qus">If i had an opportunity to work at google,this is what i would work on</label>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="a" control={<Radio color="primary" />} label="Youtube Recommendation Algorithms" />
                                    <FormControlLabel value="b" control={<Radio color="primary" />} label="Making Policy Changes that Help Employees" />
                                    <FormControlLabel value="c" control={<Radio color="primary" />} label="Google Creative Team's Projects" />
                                    <FormControlLabel value="d" control={<Radio color="primary" />} label="Google Analytics Team's Projects" />
                                    <FormControlLabel value="e" control={<Radio color="primary" />} label="The essential pleasures of engneering" />
                                    <FormControlLabel value="e" control={<Radio color="primary" />} label="Any Engneering Team in my Domain" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="info-submit">
                            <Button
                                variant="contained"
                                className="btn-blue"
                                onClick={() => history.push('/curatedCourse')}
                            >
                                SUBMIT
                             </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
