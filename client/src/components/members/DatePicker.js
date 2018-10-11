import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as freightActions from "../../store/actions/freight";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DatePicker extends React.Component {
  handleChange = key => ({ target: { value } }) => {
    this.props.setDateRangeValue({ [key]: value });
  };

  render() {
    const { classes } = this.props;
    // console.log("DatePicker ", this.props);

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Start Date"
          type="date"
          defaultValue=""
          onChange={this.handleChange("startDate")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="date"
          label="End Date"
          type="date"
          defaultValue=""
          onChange={this.handleChange("endDate")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ freight }) {
  return {
    dateRange: freight.dateRange
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDateRangeValue: freightActions.setDateRangeValue,
      setDateRange: freightActions.setDateRange
    },
    dispatch
  );
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(DatePicker)
  )
);
