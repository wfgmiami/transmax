import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Dark from "./DarkTheme";
import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";

export default class Theme extends Component {
  render() {
    const { children } = this.props;

    const theme = createMuiTheme({
      palette: {
        type: "light",
        primary: Dark,
        secondary: {
          light: lightBlue[400],
          main: lightBlue[600],
          dark: lightBlue[700]
        },
        error: red
      }
    });

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
  }
}
