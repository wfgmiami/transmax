import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Nav from './components/Nav';

const styles = theme => ({
    layoutRoot: {}
});

class Home extends Component {
    state = {
        candidates: [],
        applySuccess: false
    }

    handleCandidateCreate = candidate => {

        axios.post('/api/candidate',{ ...candidate })
        .then(response => response.data)
        .then(candidates => this.setState({ candidates }))
        .then (() => this.setState({ applySuccess: true }))

            // this.setState(({ candidates }) =>({
            //     candidates: [
            //         ...candidates,
            //         candidate
            //     ]
            // }))

    }

    render()
    {
        return (
                <div>
                    <Nav/>
                    {renderRoutes(this.props.routes,
                        {applySuccess: this.state.applySuccess , onCreate: this.handleCandidateCreate})}
                </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);
