import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CopyrightText from './CopyrightText';

const styles = theme => ({
  root: {
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: "14px",
    backgroundColor: theme.palette.primary.light,
    padding: "5px",
    textAlign: 'center',

  },
  social: {
    // paddingBottom: "5px",
    '& img': {
      width: "30px"
    }
  }

});

class Footer extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <CopyrightText/>
          &nbsp;&bull;&nbsp;3527 Riverwood Ln, Loveland, OH 45140 &bull; (Main)
          513-680-5334 &nbsp;(Support) 302-723-3275
          &nbsp;&bull; &nbsp;
          <span className={classes.social}>
           <a href="https://www.facebook.com/Transmaxfleet/" target="_blank" rel="noopener noreferrer">
           <img src="assets/images/logos/facebook.png" alt="My Facebook page"></img></a>
          </span>
          &nbsp;
          <span className={classes.social}>
           <a href="https://www.instagram.com/transmaxfleet/" target="_blank" rel="noopener noreferrer">
           <img src="assets/images/logos/instagram.png" alt="My Instagram"></img></a>
          </span>
      </div>

    );
  }
}

export default withStyles(styles)(Footer);
