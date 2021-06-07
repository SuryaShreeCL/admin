import { Grid, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../../Utils/PrimaryButton'

class StarterPackTable extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(props) {
        const data = [
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
        ]
        return (
            <Grid container>
                <Grid item md={12} align={"right"}>
                    <PrimaryButton color={"primary"} size={"small"} variant={"contained"} >New Enroll</PrimaryButton>
                </Grid>
                <Grid item md={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell align="center">CLS ID</TableCell>
                                <TableCell align="center">Client Name</TableCell>
                                <TableCell align="center">Track</TableCell>
                                <TableCell align="center">Specialization</TableCell>
                                <TableCell align="center">SP Code</TableCell>
                                <TableCell align="center">Enroll Date</TableCell>
                                <TableCell align="center">SP Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Cert</TableCell>
                                <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {data.map((eachData,index)=>{
                                return(
                                    <TableRow>
                                    <TableCell align="center">
                                        {eachData.clsId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.clientName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.track}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.specialization}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.spCode}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.enrollDate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.spName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.cert}
                                    </TableCell>
                                    <TableCell align="center">
                                        <PrimaryButton color={"primary"} size={"small"} variant={"contained"}>Manage</PrimaryButton>
                                    </TableCell>
                                </TableRow>
                                )
                               
                            })}
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps, {})(StarterPackTable)