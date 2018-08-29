import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// import tileData from './tileData';

const styles = theme => ({
  root: {
    display: "flex",
    // flexWrap: "wrap",
    padding: '40px 0 0 0',
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1200,
    height: 1000,
    // flex: '1 1 auto',
    overflow: "hidden",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
});

const tileData = [
  {
    img:"assets/images/cascadia-evo.jpg",
    title: "Drive Freightliner Cascadia Evolution - electronic log",
    author: "author",
    featured: false
  },
  {
    img:"assets/images/cascadia.jpg",
    title: "Drive Freightliner Coronado - paper log",
    author: "author",
    featured: false
  },
  {
    img:"assets/images/cascadia-red.jpg",
    title: "Drive Freightliner Cascadia",
    author: "author",
    featured: false
  },
  {
    img:"assets/images/volvo.jpg",
    title: "Drive Volvo VNL780 Automatic Transmission",
    author: "author",
    featured: false
  }
];

function AdvancedGridList(props) {
  const { classes } = props;

  return (
    <div id="shadow" className={classes.root}>
      <GridList cellHeight={400} spacing={1} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancedGridList);
