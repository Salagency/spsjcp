import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

function Home(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Welcome to the St Philip and St James Carpark System
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="display2" align="center" color="textSecondary" gutterBottom>
              What would you like to do?
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button href="/create" variant="contained" size="large" color="primary">
                    Create Paper Ticket
                  </Button>
                </Grid>
                <Grid item>
                  <Button href="/search" variant="outlined" size="large" color="primary">
                    Search Tickets
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" size="large" color="secondary">
                    Create Offline Ticket
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="large" color="secondary">
                    Find Offline Ticket
                  </Button>
                </Grid>
              </Grid> */}
            </div>
          </div>
          <Button href="/admin" variant="outlined" size="small" color="primary">
            Admin
          </Button>
        </div>
      </main>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
