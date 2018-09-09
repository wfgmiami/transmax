import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#E5FFE5'
  }
});

function ApplicationSuccess(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root}>
        Your application was submitted.<br/>
        We will contact you as soon as your application is reviewed.<br/><br/>
        Thank you for applying!
      </Paper>
    </div>
  );
}

ApplicationSuccess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplicationSuccess);
