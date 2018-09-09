import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Nav from './components/public/Nav';

const styles = theme => ({
    layoutRoot: {}
});

class Home extends Component {
    state = {
        candidates: [],
        applySuccess: false,
        contactFormSend: false
    }


    handleContactFormSend = contactform => {
        axios.post('/api/contactus',{ ...contactform })
        .then(() => this.setState({ contactFormSend: true }))
    }

    render()
    {
        return (
                <div>
                    <Nav/>
                    {renderRoutes(this.props.routes,
                        { applySuccess: this.state.applySuccess ,
                          onCreate: this.handleCandidateCreate,
                          onFormSend: this.handleContactFormSend,
                          formSend: this.state.contactFormSend
                        })}
                </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);
