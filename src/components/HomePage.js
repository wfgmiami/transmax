import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
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
    fontSize: "26px"
  }
});

class HomePage extends Component {
  render() {
    const { classes } = this.props;
    const applicationSuccess = this.props.applySuccess;

    return (
      <div>
        <div className={classNames(classes.root, classes.flexContainer)}>
        <div className={classes.flexSection}>
        <h1 className="py-16">WE PAY UP TO $0.55 CENTS PER MILE</h1><br/>
            <p className={classes.mainText}>
                Transmax is a transportation company founded by a truck driver that knows what is takes to be a trucker. 
                We want our drivers to earn the most money in the industry!<br/>
                Do not spend days on the road without being adequately compensated for your hard work - contact us today!<br/>
                You can just call us at 513-680-5334 or fill in the short form on the right and we will be in touch with you.<br/>
                All you need is a CDL and a minimum of 2 years experience!
                Apply today and start earning one of the highest rates on the market!<br/><br/>
            </p>
        </div>

        <div className={classes.flexSection}>
            <h1 className="py-16">DRIVER'S APPLICATION</h1><br/>
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
export default withStyles(styles)(HomePage);
