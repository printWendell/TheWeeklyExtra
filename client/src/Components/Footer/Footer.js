import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Logo from '../../images/TheWeeklyExtraLogo.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#2E3B55',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    color: 'white',
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  footerGrid: {
    marginBottom: '0',
    paddingTop: '1.5rem',
  },
  footerLogo: {
    width: '140px',
  },
  footerItem: {
    '&:hover': {
      color: fade(theme.palette.error.light, 0.75),
    },
  },
  footerDivider: {
    marginTop: '1rem',
    backgroundColor: '#bdbdbd',
  },
  [theme.breakpoints.down('xs')]: {
    footerLogo: {
      width: '105px',
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={`footer ${classes.footer}`}>
      <Container>
        <Grid
          container
          spacing={3}
          className={`footer-grid ${classes.footerGrid}`}
        >
          <Grid item xs={12} sm={4} className="footer-columns--logo">
            <Link to="/">
              <img
                src={Logo}
                alt="theweeklyextra-logo"
                className={classes.footerLogo}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} className="footer-columns--sections">
            <h3>Sections</h3>
            {/* <hr /> */}
            <Link to="/business" className={classes.footerItem}>
              <p>Business</p>
            </Link>
            <Link to="/health" className={classes.footerItem}>
              <p>Health</p>
            </Link>
            <Link to="/science" className={classes.footerItem}>
              <p>Science</p>
            </Link>
            <Link to="/sports" className={classes.footerItem}>
              <p>Sports</p>
            </Link>
            <Link to="/entertainment" className={classes.footerItem}>
              <p>Entertainment</p>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} className="footer-columns--policies">
            <h3>Policies</h3>
            {/* <hr /> */}
            <Link to="/privacy" className={classes.footerItem}>
              <p>Privacy Policies</p>
            </Link>
            <Link to="/terms" className={classes.footerItem}>
              <p>Terms of Use</p>
            </Link>
          </Grid>
        </Grid>
        <Divider className={classes.footerDivider} />
        <p>Copyright &#169; 2021 TheWeeklyExtra</p>
      </Container>
    </div>
  );
}

export default Footer;
