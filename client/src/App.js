import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Nav from './components/public/Nav';
import AppHolder from "./components/members/AppHolder";

const styles = theme => ({
    layoutRoot: {}
});

class Home extends Component {
    state = {
        contactFormSend: false
    }


    handleContactFormSend = contactform => {
        axios.post('/api/contactus',{ ...contactform })
        .then(() => this.setState({ contactFormSend: true }))
    }

    render() {
        const { authenticated } = this.props.auth;
        // console.log("App.js this.props", this.props);
        return (

            <div>
                { authenticated ?
                    <AppHolder />
                :
                    <div>
                        <Nav/>
                        { renderRoutes(this.props.routes,
                            { onFormSend: this.handleContactFormSend,
                                formSend: this.state.contactFormSend }) }
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({ authentication }) {
    return {
        auth: authentication.auth
    };
}

export default withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        null
      )(Home)
    )
  );
