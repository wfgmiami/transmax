import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function ApplicationSuccess(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root}>Application is completed</Paper>
    </div>
  );
}

ApplicationSuccess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplicationSuccess);
