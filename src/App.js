import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {withStyles} from '@material-ui/core/styles';
import HomePage from './components/HomePage';
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
        const {classes} = this.props;
        console.log('homepage key',this.props)
        return (
                <div>
                <Nav/>
                {renderRoutes(this.props.routes)}
                {/* <HomePage onCreate={this.handleCandidateCreate}/> */}
                </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);