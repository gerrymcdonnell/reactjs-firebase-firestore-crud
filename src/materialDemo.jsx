import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

class MaterialDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Button variant="contained" color="primary">
                Welcome Material UI
            </Button>
        );
    }
}

export default MaterialDemo;