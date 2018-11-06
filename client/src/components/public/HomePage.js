import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ApplicationForm from "./ApplicationForm";
import ApplicationSuccess from "./ApplicationSuccess";
import Footer from "./Footer";
import ImageSection from "./ImageSection";


const styles = theme => ({
  root: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  flexContainer: {
    background: '#eff0f2',
    margin: "0 auto 0 auto"
  },
  flexSection: {
    padding: "20px",
    boxSizing: "border-box",
    flexBasis: "50%",
    marginBottom: "20px"
  },
  mainText: {
    fontFamily: "Times New Roman, Times, serif",
    fontSize: "18px",
    lineHeight: "1.6"
  }
});

class HomePage extends Component {

  render() {
    const { classes, applicationSuccess } = this.props;

    // console.log('home page ', this.props)
    return (
      <div>
        <div className={classNames(classes.root, classes.flexContainer)}>
          <div className={classes.flexSection}>
            <h2 className="py-16">TRUSTED HIGH QUALITY TRANSPORTATION SERVICE</h2><br/>
              <p className={classes.mainText}>
                Transmax is a commerical truck fleet operation company based in Cincinnati Ohio.
                We provide dependable transportation equipment to motor carriers. We partner with AIK Transport LLC to form integrated trucking services that help our customers deliver their cargo safely and on time every day.
                Our team of drivers and support staff work hard to make sure the company is ready to provide round-the-clock service.
                The company goal is to provide superior transportation solutions to wide range of customers. We are looking to add new trucks to our fleet and hire more safe and reliable drivers.
              </p>
            <br/><br/>
            <h2 className="py-16">START AT $0.55 CENTS PER MILE OR MORE</h2><br/>
              <h3>What you can expect:</h3>&nbsp;
                <ul style={{ marginLeft: '25px' }} className={classes.mainText}>
                  <li>Flexible home time - choose to be at home for the weekends or to stay on the road</li>
                  <li>Drivers who have proven to be safe and dependable will qualify for $0.60 cpm</li>
                  <li>Detention paid $20 per hour</li>
                  <li>Get paid every week - flexible pay methods</li>
                  <li>Drive on paper log or ELD</li>
                  <li>Accidental insurance provided</li>
                  <li>1099 only</li><br/>
                </ul>

              <h3>What you need to have:</h3>&nbsp;
                <ul style={{ marginLeft: '25px' }} className={classes.mainText}>
                  <li>Class A CDL</li>
                  <li>Minimum 2 year experience</li>
                  <li>Clean MVR report</li><br/>
                </ul>
                <p style={{ fontWeight:'700', fontSize:'16px' }}> To apply - call us at 513-680-5334 or fill in the application form.</p>
          </div>

          <div className={classes.flexSection}>
            <h2 className="py-16">DRIVER'S APPLICATION</h2><br/>
            <br />
            {applicationSuccess ? (
              <ApplicationSuccess />
            ) : (
              <ApplicationForm onCreate={this.props.onCreate} />
            )}
          </div>
        </div>
        <ImageSection />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ application }) {
  return {
    applicationSuccess: application.candidate.applicationSuccess
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(HomePage)));
