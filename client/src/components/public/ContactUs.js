import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContactUsForm from "./ContactUsForm";
import ContactUsSend from "./ContactUsSend";

const styles = theme => ({
  root: {}
});

class ContactUs extends Component {
  render() {
    const formSend = this.props.formSend;
    return (
      <div>
        {formSend ? (
          <ContactUsSend />
        ) : (
          <ContactUsForm onFormSend={this.props.onFormSend} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ContactUs);
