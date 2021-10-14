import { Typography } from '@material-ui/core'
import React from 'react'
import { NoShoolContainer } from './StyledComponents'
import NoSchoolImg from "../../../Asset/Images/NoSchool.svg";

function NoSchool(props) {
    return (
            <NoShoolContainer>
                    <img src={NoSchoolImg} />
                    <Typography variant={"h5"}>{props.text}</Typography>
                  </NoShoolContainer>
    )
}

export default NoSchool
