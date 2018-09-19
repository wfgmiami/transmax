import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { viewItems, otherViewItems } from "./tileData";

import * as authActions from "../../store/actions/authentication";
import * as navActions from "../../store/actions/navigation";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class SideMenu extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    // console.log("toggleDrawer", side, open);
    this.setState({
      [side]: open
    });
  };

  handleMenuClick = e => {
    // console.log(
    //   "SideMenu handleMenuClick ",
    //   this.props,
    //   this.props.nav.activeMenu
    // );
    const chosenNav = e.target.textContent;
    this.setState({ left: false }, () => {
      if (chosenNav === "Log Out") {
        // console.log(".............", this.props);
        this.props.setAuth({ authenticated: false });
      } else {
        this.props.setNavigation(chosenNav);
      }
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{viewItems}</List>
        <Divider />
        <List>{otherViewItems}</List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer("left", true)}>Menu</Button>

        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={e => this.handleMenuClick(e)}
            // onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SideMenu.propTypes = {
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
      setAuth: authActions.setAuthentication,
      setNavigation: navActions.setNavigation,
      getNavigation: navActions.getNavigation
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SideMenu)
  )
);
