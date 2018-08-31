import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {withStyles} from '@material-ui/core/styles';

import Nav from './components/Nav';

const styles = theme => ({
    layoutRoot: {}
});

class Home extends Component {
    state = {
        candidates: []
    }


    handleCandidateCreate = candidate => {
       
        this.setState(({ candidates }) =>({
            candidates: [
                ...candidates,
                candidate
            ]
        }))

    }

    render()
    {
        return (
                <div>
                    <Nav/>
                    {renderRoutes(this.props.routes)}
                </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);