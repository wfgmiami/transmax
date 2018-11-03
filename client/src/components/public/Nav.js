import React, { Component } from "react";
import { ListItem, ListItemText, Icon } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { navigationConfig } from "../../configs/navigationConfig";

const styles = theme => ({
  root: {
    fontSize: "2vw",
    backgroundColor: theme.palette.primary.dark,
    // padding: "10px",
    // minHeight: "75px",
    display: 'flex',
    fontFamily: 'sans-serif',
    color: 'white'
  },
  // phone: {
  //   marginTop: '10px',
  //   marginLeft: '30px',
  //   fontSize: '2.2vw'
  // },
  listItem: {
    textAlign: "left",
    margin: "5px auto",
    maxHeight: '50px'
  },

});

class Nav extends Component {
  // _isMounted = false;

  constructor(props){
    super(props)
    this.state = {

    }
    this.classToggle.bind(this)
  }


  componentDidMount(prevProps){
    // this._isMounted = true;
      document.querySelector('.Navbar__Link-toggle')
        .addEventListener('click', this.classToggle);
  }



  classToggle = () => {
    const navs = document.querySelectorAll('.Navbar__Items')
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
  }


  render() {
    const { classes } = this.props;

    return (
      <div className='Navbar'>

        <div style={{maxHeight:'70px'}} className="Navbar__Link Navbar__Link-brand">
          <img
            style={{ maxWidth: '100%'}}
            src="assets/images/logos/transmax.png"
            alt="transmax"
          />
        </div>

        <div className="Navbar__Link Navbar__Link-toggle">
          <i className="fas fa-bars"></i>
        </div>

        <nav className="Navbar__Items">
          <div className="Navbar__Link">
            <h4 className='phone' >
              Call (513) 680-5334
            </h4>
          </div>
        </nav>


          {/* <div className="Navbar__Link">
            Link
          </div>
          <div className="Navbar__Link">
            Link
          </div> */}

          <nav className="Navbar__Items Navbar__Items--right">

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


        </nav>

      </div>
    );
  }
}

// export default withStyles(styles, { withTheme: true })(Nav);


export default withStyles(styles)(withRouter(Nav));
