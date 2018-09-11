import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import TripsData from "./TripsData";
import FadeMenu from "./FadeMenu";

import * as authActions from "../../store/actions/authentication";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function AppMenuBar(props) {
  const { classes } = props;
  const menuItem = props.nav.activeMenu;
  console.log("props app menu bar", props, " ", menuItem);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            <FadeMenu />
          </Typography>
          <Button onClick = {()=>props.setAuth({ authenticated: false })} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      {menuItem !== "" ?
        <div>&nbsp;
          <TripsData/>
        </div>
        : null}
    </div>
  );
}

AppMenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ navigation, authentication }) {
  return {
    nav: navigation.nav,
    auth: authentication.auth
  };
}

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
      mapStateToProps,
      mapDispatchToProps
    )(AppMenuBar)
  )
);
