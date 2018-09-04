import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import TripsData from "./TripsData";

function TabContainer(props) {
  const { value } = props;

  return value === 117 ? (
    <div style={{ padding: 8 * 2 }}>
      <TripsData val={value} />
    </div>
  ) : null;
}
const styles = theme => ({
  root: {}
});

class Trips extends Component {
  state = {
    value: 0,
    tabLabel: 117
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.setState({ tabLabel: Number(event.target.textContent) });
  };

  render() {
    const { classes } = this.props;
    const { value, tabLabel } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="117" />
            <Tab label="118" />
            <Tab label="119" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer value={tabLabel} />}
        {value === 1 && <TabContainer value={tabLabel} />}
        {value === 2 && <TabContainer value={tabLabel} />}
      </div>
    );
  }
}

Trips.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Trips);
