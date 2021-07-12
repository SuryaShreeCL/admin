import React, { Component } from 'react';
import {Button} from "@material-ui/core";
class button extends Component {
    render() {
        return (
            <Button
                style={{ width: 150, borderRadius: 20 }}
                variant="contained"
                color="primary"
                // startIcon={<AddIcon />}
                onClick={() => this.setState({ show: false })}
            >
                Save Changes
            </Button>
        );
    }
}

export default button;