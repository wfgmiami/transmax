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
    }

    // componentDidMount(){
    //     this.callApi()
    //         .then(res => console.log(res.express))
    //         .catch(err => console.log(err));
    // }

    // callApi = async() => {
    //     const response = await fetch('api/hello');
    //     const body = await response.json();
    //     if(response.status !== 200) throw Error(body.message);

    //     return body;
    // }

    handleCandidateCreate = candidate => {

        axios.post('/api/candidate',{ ...candidate })
        .then( response => response.data)
        .then( candidates => this.setState({ candidates })

            // this.setState(({ candidates }) =>({
            //     candidates: [
            //         ...candidates,
            //         candidate
            //     ]
            // }))
        )

    }

    render()
    {
        return (
                <div>
                    <Nav/>
                    {renderRoutes(this.props.routes, {onCreate: this.handleCandidateCreate})}
                </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);
