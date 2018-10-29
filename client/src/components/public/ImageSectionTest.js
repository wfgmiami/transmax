import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {tileData} from './tileData';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {smallImages, largeImages} from './imagesData';


const styles = theme => ({
  root: {
    topMargin: '10px',
    "& img": {
      width: "100%",
      height: "auto",
      padding: '3px'
    }
  },
  wrapper: {
    position: 'relative',
    padding: '0',
    margin: '0',

    "& img": {
      // display: 'block',
      // maxWidth: '100%',
      // height: 'auto'
    },
    // "& div": {
    //   whiteSpace: "pre-wrap"
    // }
  },
  imageTitle: {
    justifyContent: 'left',
    alignItems: 'left',
    display: 'flex',
    color: '#fff',
    position: 'absolute',
    width: '50%',
    left: '5px',
    bottom: '25px',
    padding: '0.75em 1em',
    fontWeight: '700',
    zIndex: '2',
    // webkitBoxSizing: 'border-box',
    // boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0,.7)',
    webkitTransition: 'opacity .3s ease-in-out',
    transition: 'opacity .3s ease-in-out'
  },
  imageSubtitle: {
    justifyContent: 'right',
    alignItems: 'right',
    display: 'flex',
    color: '#fff',
    position: 'absolute',
    width: '50%',
    right: '5px',
    bottom: '8px',
    padding: '0.75em 1em',
    fontWeight: '500',
    zIndex: '2',
    // webkitBoxSizing: 'border-box',
    // boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0,.5)',
    webkitTransition: 'opacity .3s ease-in-out',
    transition: 'opacity .3s ease-in-out'

  },
  [theme.breakpoints.up("sm")]:{
    root: {
      display: 'flex',
      justifyContent: 'space-around',

    },

    imageContainer: {
      flexBasis: '50%',

      "& img": {
        maxWidth: "50vw",
        minHeight: "50vw",
        maxWidth: "50vw",
        minWidth: "50vw",
        padding: '3px',
      }
    },

  }

});


class ImageSectionTest extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showLargerPics: false
    }

  }

  componentDidMount(prevProps){
    window.addEventListener("resize", this.resize.bind(this))
    this.setState({ showLargerPics: window.innerWidth >= 600 })
  }

  resize(){
    this.setState({ showLargerPics: window.innerWidth >= 600 })
  }

  render(){
    const { classes } = this.props;
    const pics = this.state.showLargerPics ? largeImages : smallImages;

    return (
      <div className={classes.root}>

        <div className={classes.imageContainer}>
          {pics.map( (image, idx) => {
              if(idx%2 === 0)
                return (
                  <div className={classes.wrapper}>
                    <img key={idx} src={image.img}/>
                    <div className={classes.imageTitle}>{image.title}</div>
                    <div className={classes.imageSubtitle}>{image.subtitle}</div>
                  </div>
                )
            }
          )}
        </div>

        {/* <div className={classes.imageContainer}>
           <img src="assets/images/coronado-900x696.jpg"/>
        </div>
        <div className={classes.imageContainer}>
           <img src="assets/images/cascadia-parking-839x680.jpg"/>
        </div> */}


        <div className={classes.imageContainer}>
          {pics.map( (image, idx) => {
            if(idx%2 !== 0)
            return (
                  <div className={classes.wrapper}>
                    <img key={idx} src={image.img}/>
                    <div className={classes.imageTitle}>{image.title}</div>
                    <div className={classes.imageSubtitle}>{image.subtitle}</div>
                  </div>
                )
            }
          )}
        </div>

      </div>

    );

  }

}

ImageSectionTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageSectionTest);
