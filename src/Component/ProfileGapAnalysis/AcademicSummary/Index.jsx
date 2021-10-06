import { Grid, Typography, Button, Tabs, Tab } from '@material-ui/core'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopSubjects from './TopSubjects';
import { useStyles } from '../FormStyles';
import BacklogSummary from "../BacklogSummary/Index"
function Index(props) {
    const [ tabValue, setTabValue ] = useState(0)
    const classes = useStyles()
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };
      const tabLabel = ["Top Subjects", "Backlog Summary"]

      const renderTabContent = () =>{
        if(tabValue === 0){
            return <TopSubjects />
        }else if(tabValue === 1){
            return <BacklogSummary />
        }
      }

    return (
        <Grid container spacing={2} className={classes.containerSpacing}>
            <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                <Typography variant={"h6"}>Academic Summary</Typography>
            </Grid>
            <Grid item md={6} xs={6} sm={6} lg={6} xl={6}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={6} sm={6} lg={6} xl={6}>
                    <Autocomplete
                        id="combo-box-demo"
                        fullWidth
                        size={"small"}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Degree Type" variant="standard" />}
                        />
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} lg={6} xl={6}>
                    <Autocomplete
                        id="combo-box-demo"
                        fullWidth
                        size={"small"}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Top 3 Subjects Category" variant="standard" />}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6} xs={6} sm={6} lg={6} xl={6} container justifyContent={"flex-end"}>
                <Button size={"small"} variant={"contained"} color={"primary"}>Get Data</Button>
            </Grid>
            <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
            <Tabs
            classes={{root : classes.tabStyle}}
             indicatorColor="none"
             textColor="primary"
            value={tabValue}
            onChange={handleChange}
            >
            {tabLabel.map((eachItem, index)=>{
                return (
                    <Tab label={eachItem} />
                )
            })}
            </Tabs>
            </Grid>
            <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
            {renderTabContent()}
            </Grid>
        </Grid>
    )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
]

export default Index
