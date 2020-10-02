import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import '../Asset/EditCourse.css'
import $ from 'jquery'
import axios from 'axios'
import Select from 'react-select'

export default class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            option: [
                { value: 'Starter', label: 'Starter' },
                { value: 'Regular', label: 'Regular' },
                { value: 'Advance', label: 'Advance' },
            ],
        }
    }

    options = [{ value: 'chocolate', label: 'Chocolate' },]

    componentDidMount() {

        axios.get("http://localhost:8080/api/v1/courses/", {
            crossDomain: true
        })
            .then(res => res.data)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error);
            });

        $('#inputGroupFile01').on('change', function () {
            //get the file name
            var fileName0 = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.f1').html(fileName0);
        })
        $('#inputGroupFile02').on('change', function () {
            //get the file name
            var fileName1 = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.f2').html(fileName1);
        })
        $('#inputGroupFile03').on('change', function () {
            //get the file name
            var fileName2 = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.f3').html(fileName2);
        })
    }

    getmuitheme = () => createMuiTheme({
        palette: {
            primary: {
                main: '#007bff',
            }
        },
        overrides:{
            MuiFormLabel:{
                root:{
                    fontSize:'16px'
                }
            }
        }

    })


    render() {
        return (
            <ThemeProvider theme={this.getmuitheme()}>
                <div>
                    <div className="edit-course-root container">
                        <div className='edit-course-content'>
                            <div className="edit-form-header">
                                <div className="edit-header-label">
                                    <label>Edit Course Detail</label>
                                </div>
                            </div>
                            <div className="edit-body">
                                <div className='edit-row-1 '>
                                    <TextField id="filled-search" label="Course Id" type="search" variant="outlined" size="small" className='edit-text-box t1 col-xs-12' />
                                    <TextField id="filled-search" label="Course Name" type="search" variant="outlined" size="small" className='edit-text-box t2' />
                                </div>
                                <div className="edit-row-2 ">
                                    <TextField id="filled-search" label="Course Description" type="search" variant="outlined" size="small" fullWidth multiline className='course-desc' />
                                </div>
                                <div className="edit-row-3">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" />
                                        <label class="custom-file-label f1" for="inputGroupFile01">lms Url</label>
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile02" />
                                        <label class="custom-file-label f2" for="inputGroupFile02">display Image URL</label>
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile03" />
                                        <label class="custom-file-label f3" for="inputGroupFile03">thumnail Image URL</label>
                                    </div>

                                </div>
                                <div className="edit-row-4">
                                    <Select
                                        closeMenuOnSelect={true}
                                        isSearchable={true}
                                        isClearable={true}
                                        options={this.state.option}
                                        placeholder='Course Level'
                                    />

                                    <Select
                                        closeMenuOnSelect={true}
                                        isSearchable={true}
                                        isClearable={true}
                                        options={this.state.option}
                                        placeholder='tags'
                                    />
                                </div>
                                <div className="edit-row-5">
                                    <Select
                                        closeMenuOnSelect={true}
                                        isSearchable={true}
                                        isClearable={true}
                                        options={this.state.option}
                                        placeholder='Similar Courses'
                                    />

                                    <Select
                                        closeMenuOnSelect={true}
                                        isSearchable={true}
                                        isClearable={true}
                                        options={this.state.option}
                                        placeholder='vendor'
                                    />
                                </div>
                                <div className="edit-row-6">
                                    <Select
                                        closeMenuOnSelect={true}
                                        isSearchable={true}
                                        isClearable={true}
                                        fullWidth
                                        options={this.state.option}
                                        placeholder='Skill  provided'
                                    />
                                </div>
                                <div className="edit-row-7">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        size="medium"
                                        startIcon={<SaveIcon />}

                                    >
                                        Save
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}
