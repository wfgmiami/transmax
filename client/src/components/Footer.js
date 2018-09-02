import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CopyrightText from './CopyrightText';

const styles = theme => ({
  root: {
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: "16px",
    backgroundColor: theme.palette.primary.light,
    padding: "15px",
    textAlign: 'center'
  },

});

class Footer extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <CopyrightText/>
          &nbsp;&bull;&nbsp;3527 Riverwood Ln, Loveland, OH 45140 &bull; (Main)
          513-680-5334 &nbsp;(Support) 302-723-3275
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
