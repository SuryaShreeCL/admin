import React, { Component } from 'react'
import {connect} from "react-redux"
import {getAllMentors} from "../Actions/AdminAction"
import { Button, Grid, TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 }
]
class AllocateMentor extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }

    componentDidMount() {
        this.props.getAllMentors()
    }
    

    render() {
        console.log(this.props.mentorList)
        return (
            <div>
                <Grid container spacing={2} alignItems='center' justify="center">
                    <Grid item md={7} align="right">
                    <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select Mentor" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item md={5}>
                        <Button variant="outlined" size="large" color="primary">Allocate</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        mentorList : state.AdminReducer.mentorList
    }
}

export default connect(mapStateToProps,{getAllMentors})(AllocateMentor)