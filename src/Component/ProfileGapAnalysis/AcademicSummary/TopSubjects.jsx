import { Grid } from '@material-ui/core'
import React from 'react'
import BoardTable from './BoardTable'
import SemScoreCard from './SemScoreCard'
function TopSubjects() {
    return (
       <Grid container spacing={2}>
           <Grid item md={12}>
            <BoardTable />
           </Grid>
           <Grid item md={8}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <SemScoreCard />
                </Grid>
                <Grid item md={6}>
                <SemScoreCard />
                </Grid>
                <Grid item md={6}>
                <SemScoreCard />
                </Grid>
                <Grid item md={6}>
                <SemScoreCard />
                </Grid>
            </Grid>
           </Grid>
           <Grid item md={4}>
            Chart
           </Grid>
       </Grid>
    )
}

export default TopSubjects
