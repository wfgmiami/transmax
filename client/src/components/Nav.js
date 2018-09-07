import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";

const styles = theme => ({
  root: {
    fontSize: "16px",
    backgroundColor: theme.palette.primary.dark,
    paddingBottom: "10px",
    minHeight: "75px"
  },
  navBar: {
    listStyleType: "none",
    display: "none",
    flexDirection: "column"
  },
  navbarToggle: {
    position: "absolute",
    top: "10px",
    right: "20px",
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "24px",
    "&:hover": {
      color: "rgba(255, 255, 255, 1)"
    }
  },
  [theme.breakpoints.up("md")]: {
    root: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 0,
      height: "70px",
      // alignItems: "center"
    },
    navBar: {
      display: "flex!important",
      marginRight: "30px",
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    navbarToggle: {
      display: "none"
    }
  },
  [theme.breakpoints.down("xs")]: {
    imgClass: {
      width: '85%'
    }
  }
});

class Nav extends Component {

    state = {
      style: {},
      active: false
    };

    mobileMenuClick = e => {

      if (this.state.active) {
        this.setState({ style: {}, active: false });
      } else {
        this.setState({
          style: { display: "flex", flexDirection: "column" },
          active: true
        });
      }

    };

  render() {
    const { classes } = this.props;
    const mobileDisplay = this.state.style.display;

    return (
      <nav className={classes.root}>
        <span onClick={this.mobileMenuClick} className={classes.navbarToggle}>
          <i className="fa fa-bars" />
        </span>

        <img
          style={{ maxWidth: '100%'}}
          className={ classes.imgClass }
          src="assets/images/logos/transmax.png"
          alt="transmax"
        />

        <ul
          style={{ display: mobileDisplay }}
          className={classes.navBar}
        >
          <Navbar mobileMenu={this.state} />
        </ul>
      </nav>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Nav);


