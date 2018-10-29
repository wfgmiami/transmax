import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

  root: {
      '& img': {
        height: 'auto',
        maxWidth: '100%'
      },
    }

});

function MediaCard(props) {
  const { classes } = props;
  const small = 'assets/images/cascadia-parking.jpg';
  const medium = 'assets/images/cascadia-evo_500x666.jpg';
  const large = 'assets/images/freighliner-cascadia_1024x768.jpg';

  return (
    <picture>

        <img src='assets/images/cascadia-parking.jpg' />
    </picture>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
