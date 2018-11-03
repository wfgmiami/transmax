import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from '@material-ui/icons/Info';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ListSubheader from '@material-ui/core/ListSubheader';
import {smallImages, largeImages} from './imagesData';

const styles = theme => ({
  root: {
    background: '#eff0f2',
    padding: '10px 0 0 0',
    overflow: "hidden",
    "& img": {
      width: '100%',
    }
  },
  gridList: {
    flex: '1 1 auto',
    padding: '20px',
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      wordWrap: 'break-word'

  },
  icon: {
    color: "white"
  },
  subheader: {
    color: '#000',
    textAlign: 'center',
    padding: '0.75em 1em',
    fontWeight: '800',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  [theme.breakpoints.up("md")]: {
    root: {
      display: "flex",
      flexWrap: "wrap",
      background: '#eff0f2',
      padding: '10px 0 0 0',
      justifyContent: "space-around",

      "& img": {
        width: '100%',
      }

    }
  }

});


class ImageSection extends React.Component {
  _isMounted = false;

  constructor(props){
    super(props)
    this.state = {
      mobileView: false
    }

  }

  componentDidMount(prevProps){
    this._isMounted = true;
    if(this._isMounted){
      window.addEventListener("resize", this.resize.bind(this))
      this.setState({ mobileView: window.innerWidth >= 600 })
    }

  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  resize(){
    if(this._isMounted)
     this.setState({ mobileView: window.innerWidth >= 600 })
  }


  render(){
    const { classes } = this.props;
    const featuredMobile = this.state.mobileView;
    const pics = this.state.showLargerPics ? largeImages : smallImages;
    // console.log('featuredMobile: ', featuredMobile)

    return (
      <div className={classes.root}>
        <GridList  cellHeight='auto' spacing={4} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2}>
            <ListSubheader className={classes.subheader} component="div">WHAT TRANSMAX HAS TO OFFER</ListSubheader>
          </GridListTile>
          {pics.map(tile => (
            <GridListTile
              key={tile.img}

              cols={featuredMobile ? 1 : 2}
              rows={featuredMobile ? 1 : 2}
            >
              <img src={tile.img} alt={tile.title} />

              <GridListTileBar
                title={tile.title}
                subtitle={tile.subtitle}
                titlePosition="bottom"
                actionIcon={
                  <InfoIcon className={classes.icon}>
                    <StarBorderIcon />
                  </InfoIcon>
                }
                actionPosition="right"
                className={classes.titleBar}
              />

            </GridListTile>
          ))}

        </GridList>
      </div>
    );
  }
}

ImageSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageSection);
