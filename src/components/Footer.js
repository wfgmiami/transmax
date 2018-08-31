import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CopyrightText from './CopyrightText';

const styles = theme => ({
  root: {
    position: "fixed",
   
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: "16px",
    backgroundColor: theme.palette.primary.light,
    padding: "15px",
    maxHeight: "40px"
  },
  items: {
      textAlign: 'center'
  }
});

class Footer extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.items}>
            <CopyrightText/>
            &nbsp;&bull;&nbsp;3527 Riverwood Ln, Loveland, OH 45140 &bull; (Main)
            513-680-5334 &nbsp;(Support) 302-723-3275
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
