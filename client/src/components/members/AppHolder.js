import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import LoadsData from "./LoadsData";
import DriversData from "./DriversData";
import CompaniesData from "./CompaniesData";
import TrucksData from "./TrucksData";
import BrokersData from "./BrokersData";
import Earnings from "./Earnings";
import FixedCost from "./FixedCost";

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
    case "Loads Data":
      showComponent = <LoadsData />;
      break;
    case "Earnings":
      showComponent = <Earnings />;
      break;
    case "Companies":
      showComponent = <CompaniesData />;
      break;
    case "Brokers":
      showComponent = <BrokersData />;
      break;
    case "Trucks":
      showComponent = <TrucksData />;
      break;
    case "Drivers":
      showComponent = <DriversData />;
      break;
    case "Fixed Cost":
      showComponent = <FixedCost />;
      break;
    default:
      showComponent = <LoadsData />;
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
