import { Grid } from '@material-ui/core'
import React from 'react'
import BottomContainer from './BottomContainer'
import SchoolListTable from './Components/SchoolListTable'
import {  PageWrapper } from './Components/StyledComponents'
import { useStyles } from './Styles/Index'

function GeneralDetails(props) {
    const classes = useStyles()
    return (
        <PageWrapper>
            <Grid container>
                <Grid item md={6}>
                   
                    </Grid>
                    <Grid item md={6}>
                    </Grid>
            </Grid>
           <BottomContainer />
        </PageWrapper>
    )
}

export default GeneralDetails
