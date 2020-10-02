import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../Asset/EditCourse.css'
import $ from 'jquery'
import Select from 'react-select';


export default class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [
                { value: 'Starter', label: 'Starter' },
                { value: 'Regular', label: 'Regular' },
                { value: 'Advance', label: 'Advance' },
            ]
        }
    }

    options = [{ value: 'chocolate', label: 'Chocolate' },]

    componentDidMount() {
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
    render() {
        return (
            <div>
                <div className="edit-course-root container">
                    <div className='edit-course-content'>
                        <div className="edit-form-header">
                            <div className="edit-header-label">
                                <label>ADD Course </label>
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
                                    className="edit-save-btn btn-blue"
                                    size="medium"
                                    startIcon={<AddCircleOutlineIcon />}

                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
