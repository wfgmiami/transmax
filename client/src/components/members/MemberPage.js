import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppMenuBar from "./AppMenuBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Trips from "./Trips";

const styles = {
  root: {}
};

class MemberPage extends Component {
  render() {
    const menuItem = this.props.nav.activeMenu;
    console.log("props member page", this.props, " ", menuItem);

    return (
      <React.Fragment>
        <AppMenuBar />
        {menuItem !== "" ? <Trips /> : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ navigation }) {
  return {
    nav: navigation.nav
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      null
    )(MemberPage)
  )
);
