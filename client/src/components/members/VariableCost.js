import React, { Component } from "react";
import ReactTable from "react-table";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { Datatable } from "./Datatable";

import * as companyActions from "../../store/actions/company";

const copyOfDatable = [].concat(Datatable);

const styles = theme => ({
  root: {},
  toolbar: {
    background: "#7D818C"
  }
});

class VariableCost extends Component {
  constructor() {
    super();
    this.state = {
      data: copyOfDatable,
      columns: [],
    };

    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    this.props.getVariableCost();
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const variableCostCount = data.length;
    let value;

    const total = data.reduce((memo, variableCost) => {
      // console.log("....info", variableCost,column.id, variableCost[column.id]);
      if (typeof variableCost[column.id] === "object") {
        value = variableCost[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = variableCost[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(variableCost[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "dollarPerMile") {
      return "$" + Number(total.toFixed(2)).toLocaleString();
    } else if (column.id === "costName") {
      return `Total Count: ${variableCostCount}`;
    }

    return Number(Number(total).toFixed(2)).toLocaleString();
  }

  createColumns() {
    // console.log("variableCostsData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Variable Cost",
        Footer: this.calculateTotal,
        id: "costName",
        accessor: "costName",
        show: true,
        className: "columnBorder",

      },
      {
        Header: "Dollar Per Mile",
        Footer: this.calculateTotal,
        accessor: "dollarPerMile",
        show: true,
        className: "columnBorder",

      },

    ];
  }

  render() {
    // const { data } = this.state;
    const { variableCost, classes } = this.props;

    // console.log("TripsData.js this.state ", this.state);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div className={classes.root}>

        <ReactTable
          data={variableCost}
          showPaginationBottom={false}
          columns={columns}
          defaultPageSize={10}
          style={
            {
              height: "300px"
            }
          }
          className="-striped -highlight"
        />
      </div>
    );
  }
}

function mapStateToProps({ company }) {
  return {
    variableCost: company.variableCost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getVariableCost: companyActions.getVariableCost,
      setVariableCost: companyActions.setVariableCost,
      updateVariableCost: companyActions.updateVariableCost,
      updateDirectVariableCost: companyActions.updateDirectVariableCost,
      saveVariableCost: companyActions.saveVariableCost
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(VariableCost)
  )
);
