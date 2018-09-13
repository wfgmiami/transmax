import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as authActions from "../../store/actions/authentication";

const styles = theme => ({
 root: {
    [theme.breakpoints.up('md')]: {
        display:'flex',
        justifyContent:'space-between'
    },
  },
  flexContainer: {
      margin: '20px auto 0 auto'
  },
  flexSection:{
    padding: '20px',
    boxSizing:'border-box',
    flexBasis:'50%',
    marginBottom: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "45%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

});


class Login extends Component {

    state = {
        login: {
          userName: "",
          password: "",
        },
      };

    handleSignin = () => {
        const { login } = this.state;

        axios.post('/api/signin', { ...login })
        .then(response => response.data)
        .then(data => {
            // console.log('data login: ', data)
            if(data.authenticated){
                this.props.setAuth({ authenticated: true})

            }else{
                this.props.setAuth({ authenticated: false})
                alert("Invalid Login! Try Again.")
            }
        })

    };

    handleChange = key => ({target: {value}}) =>{

        this.setState({
            login: {
                ...this.state.login,
                [key]: value
            }
        })
    }

    render(){
        const { classes } = this.props;

        return (
            <div>
                <div className={classNames(classes.root, classes.flexContainer)}>

                    <div className={classes.flexSection}>
                        <h2 className="py-16">MEMBER LOGIN</h2><br/>
                        <form>
                            <TextField
                                id="userName"
                                label="Username"
                                className={classes.textField}
                                value={this.state.login.userName}
                                onChange={this.handleChange('userName')}
                                margin="normal"
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                className={classes.textField}
                                value={this.state.login.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />

                        </form>
                        <br/><br/>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={()=>this.handleSignin()}
                        >
                            SIGN IN
                        </Button>
                    </div>
                </div>
            </div>
        );

    }

}

// function mapStateToProps({ navigation }) {
//     return {
//       nav: navigation.nav
//     };
//   }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        getAuth: authActions.getAuthentication,
        setAuth: authActions.setAuthentication
      },
      dispatch
    );
  }

  export default withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        null,
        mapDispatchToProps
      )(Login)
    )
  )
