import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {imagesGroupOne} from './imagesGroupOne';
import {imagesGroupTwo} from './imagesGroupTwo';

const styles = theme => ({
  root: {
    width: '100%',
    // margin: '10px auto 10px auto',
    // overflow: "hidden",
  },
  imageContainer: {
    flexBasis: '50%',

  },
  imageContent: {
    width: '85%',
    height: '500px',
    margin:"10px auto 10px auto",
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingBottom: '10px'

  },
  imageHeading: {
    backgroundColor: 'rgba(248, 247, 216, 0.5)',
    width: '100%',
    height: '5%'
  },
  [theme.breakpoints.up("md")]: {
    root: {
      display: "flex",
      background: '#eff0f2',
      // padding: '10px 0 0 10px',
      justifyContent: "space-between",
      // overflow: "hidden",

    },
  }

});


const ImageSection = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>

      <div className={classes.imageContainer}>
        {imagesGroupOne.map( (tile,id) => (
          <div style={{ backgroundImage: tile.img }} className={classes.imageContent}>
            <div className={classes.imageHeading}>{tile.title}</div>
          </div>
        ))}
      </div>

      <div className={classes.imageContainer}>
        {imagesGroupTwo.map((tile,id) => (
          <div style={{ backgroundImage: tile.img }} className={classes.imageContent}>
            <div className={classes.imageHeading}>{tile.title}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

ImageSection.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ImageSection);
