import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Icon } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import classNames from 'classnames'
import PropTypes from "prop-types";
import { navigationConfig } from "../../configs/navigationConfig";
import Typography from "@material-ui/core/Typography";

const propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string
  })
};

const styles = theme => ({
  root: {},
  list: {
    whiteSpace: "nowrap",
    display: "flex",
    padding: 0
  },
  listItem: {
    textAlign: "left",
    margin: "15px auto"
  },
  phone: {
    marginTop: "16px",
    paddingRight: "25px"
  }

});

class Navbar extends Component {
  navbarClick = () => {
    window.location.reload(true)
  };

  render() {
    const { classes } = this.props;
    const mobileFlexDirection = this.props.mobileMenu.style.flexDirection;

    return (
      <List
        style={{ paddingLeft: '10px', flexDirection: mobileFlexDirection }}
        className={classes.list}
      >
         <Typography className={classNames(classes.phone,"text-white")} variant="display1">
          Call (513) 680-5334
        </Typography>
        {navigationConfig.map(item => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              component={NavLink}
              to={item.url}
              className={classes.listItem}
              onClick={this.navbarClick}
            >
              <Icon className="text-white">{item.icon}</Icon>
              <ListItemText
                primary={item.title}
                classes={{ primary: "text-white" }}
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    );
  }
}

Navbar.propTypes = propTypes;

export default withStyles(styles)(withRouter(Navbar));
