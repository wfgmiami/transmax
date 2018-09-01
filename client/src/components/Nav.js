import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = theme => ({
  root: {
    fontSize: "18px",
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
      alignItems: "center"
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
  }
});

class Nav extends Component {
  expandMenu = e => {
    const { classes } = this.props;

    const classNm = e.target.className;
    if (classNm === "active") {
      classes.root.display = "none";
      this.classList.remove("active");
    } else {
      console.log(classes);
      classes.root.display = "flex";
      this.classList.add("active");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <nav className={classes.root}>
        <span onClick={this.expandMenu} className={classes.navbarToggle}>
          <i className="fa fa-bars" />
        </span>

        <img
          style={{ maxWidth: "100%" }}
          src="assets/images/logos/transmax.png"
          alt="transmax"
        />
        <img
          style={{ maxWidth: "100%" }}
          src="assets/images/phone.png"
          alt="phone"
        />
        <ul className={classes.navBar}>
          <Navbar />
        </ul>
      </nav>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Nav);
