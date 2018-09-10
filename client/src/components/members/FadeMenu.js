import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as navActions from "../../store/actions/navigation";

const styles = theme => ({
  root: {}
})

class FadeMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = e => {
    // console.log("e", e.target.textContent, ' ', this.props);
    this.props.setNavigation(e.target.textContent)
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log('menu props', this.props)
    return (
      <div>
        <Button
          aria-owns={open ? "fade-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          View
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleClose}>Trips</MenuItem>
          <MenuItem onClick={this.handleClose}>Shipments</MenuItem>
          <MenuItem onClick={this.handleClose}>Trucks</MenuItem>
          <MenuItem onClick={this.handleClose}>Brokers</MenuItem>
          <MenuItem onClick={this.handleClose}>Drivers</MenuItem>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ navigation }) {
  return {
    nav: navigation.nav
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getNavigation: navActions.getNavigation,
      setNavigation: navActions.setNavigation
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(FadeMenu)
  )
);
