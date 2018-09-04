import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function ContactUsSend(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root}>
        Thank you for contacting us. We will get back to you as soon as we
        review your comment
      </Paper>
    </div>
  );
}

ContactUsSend.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactUsSend);
