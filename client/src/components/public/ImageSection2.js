import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {tileData} from './tileData';

const styles = theme => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    background: '#eff0f2',
    padding: '10px 0 0 0',
    // justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
    '& img': {
      width: '100%'
    }

  },
  gridList: {
    // width: 1600,
    // height: 1000,
    flex: '1 1 auto',
    // overflow: "hidden",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: "translateZ(0)"
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
  [theme.breakpoints.up("md")]: {
    root: {
      display: "flex",
      flexWrap: "wrap",
      background: '#eff0f2',
      padding: '10px 0 0 0',
      justifyContent: "space-around",
      // overflow: "hidden",
      // backgroundColor: theme.palette.background.paper,

    }
  }

});


class AdvancedGridList extends React.Component {

  state = {
    featured: false
  }

  componentDidMount(){
    this.addListener()
  }

  addListener(){
    window.addEventListener("resize", this.updatePictureColumns)
  }

  updatePictureColumns = () => {
    let width = window.innerWidth

    if( width < 960 ){
      this.setState({ featured: true })
    }
    else{
      this.setState( { featured: false })
    }

  }

  render(){
    const { classes } = this.props;
    // console.log('featured: ', this.state)
    return (
      <div className={classes.root}>
        <GridList  cellHeight={this.state.featured ? 250 : 450} spacing={4} className={classes.gridList}>

          {tileData.map(tile => (
            <GridListTile
              key={tile.img}

              cols={this.state.featured ? 2 : 1}
              rows={this.state.featured ? 2 : 1}
            >
              <img src={tile.img} alt={tile.title} />

              <GridListTileBar
                title={tile.title}
                subtitle={tile.subtitle}
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
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancedGridList);
