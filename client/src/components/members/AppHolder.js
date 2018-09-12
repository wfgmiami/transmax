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
import ShipmentsData from "./ShipmentsData";
import FadeMenu from "./FadeMenu";
import SideMenu from "./SideMenu";

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

function AppHolder(props) {
  const { classes } = props;
  const menuItem = props.nav.activeMenu;
  // console.log("AppHolder.js props menuItem ", props, " ", menuItem);
  let showComponent = "";

  switch (menuItem) {
    case "Trips":
      showComponent = <TripsData />;
      break;
    case "Shipments":
      showComponent = <ShipmentsData />;
      break;
    default:
      showComponent = <TripsData />;
  }

  return (
    <div className={classes.root}>
      <div>{showComponent}</div>
    </div>
  );
}

AppHolder.propTypes = {
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
    )(AppHolder)
  )
);