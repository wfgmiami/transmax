import React, { Component } from "react";
import ReactTable from "react-table";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { Datatable } from "./Datatable";
import ColumnChooser from "./ColumnChooser.js";
import SideMenu from "./SideMenu";
import ActionBtn from "./ActionBtn";

import * as companyActions from "../../store/actions/company";

const copyOfDatable = [].concat(Datatable);

const styles = theme => ({
  root: {},
  toolbar: {
    background: "#7D818C"
  }
});

class BrokersData extends Component {
  constructor() {
    super();
    this.state = {
      data: copyOfDatable,
      columns: [],
      editableRowIndex: []
    };

    this.editTable = this.editTable.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
  }

  componentDidMount() {
    this.props.getBroker();
  }

  editTable(cellInfo) {
    // console.log(
    //   "cell info........",
    //   cellInfo,
    //   "id: ",
    //   cellInfo.row[cellInfo.column.id]
    // );
    let dollarSign;
    let fieldValue;

    dollarSign = cellInfo.column.id === "totalPayment" ? "$" : "";
    fieldValue = this.props.broker[cellInfo.index][cellInfo.column.id];
    if( typeof(fieldValue) === 'string' && !isNaN(fieldValue)) {
      fieldValue = isNaN(Number(fieldValue)) ? fieldValue : Number(fieldValue).toLocaleString()
    }

    return  (
      <div
        style={{ backgroundColor: "#fafafa" }}
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.broker];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.updateBroker({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign +
            fieldValue.toLocaleString()
        }}
      />
    );
  }

  calculateTotal({ data, column }) {
    // console.log("....data",data, "column", column);
    let dollarSign = false;
    const brokersCount = data.length;
    let value;

    const total = data.reduce((memo, broker) => {
      // console.log("....info", broker,column.id, broker[column.id]);
      if (typeof broker[column.id] === "object") {
        value = broker[column.id].props.dangerouslySetInnerHTML.__html;
        if (typeof value === "string" && value.substring(0, 1) === "$") {
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      } else {
        let amount = broker[column.id];
        if (amount === "") amount = 0;
        if (typeof amount === "string") {
          amount = parseFloat(broker[column.id].replace(/,/g, ""));
        }
        memo += amount;
      }
      return memo;
    }, 0);

    if (dollarSign || column.id === "totalPayment") {
      if (column.id === "avgDollarPerMile") {
        return "$" + Number((total / brokersCount).toFixed(2)).toLocaleString();
      }
      return "$" + Number(total.toFixed(0)).toLocaleString();
    } else if (column.id === "brokerId") {
      return `Brokers: ${brokersCount}`;
    }

    return Number(Number(total).toFixed(0)).toLocaleString();
  }

  onColumnUpdate(index) {
     console.log("onColumnUpdate index ", index, "...", this.state.columns);
    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    // console.log("onColumnUpdate index ", index, "...", columns[index]);
    this.setState(
      prevState => {
        const columns1 = [];
        columns1.push(...columns);
        columns1[index].show = !columns1[index].show;
        if (columns1[index].columns) {
          columns1[index].columns.forEach(item => {
            item.show = !item.show;
          });
        }

        return {
          columns: columns1
        };
      },
      () => {
        // console.log('onColumnUpdate columns: ', this.state.columns)
      }
    );
  }

  createColumns() {
    // console.log("BrokersData.js createColumns this.props: ", this.props);

    return [
      {
        Header: "Broker Id",
        Footer: this.calculateTotal,
        accessor: "id",
        show: false,
        className: "columnBorder",
      },
      {
        Header: "Name",
        accessor: "name",
        show: true,
        minWidth: 170,
        className: "columnBorder",
      },
      {
        Header: "Address",
        accessor: "address",
        show: false,
        className: "columnBorder",
      },
      {
        Header: "Phone",
        accessor: "phone",
        show: false,
        className: "columnBorder",
      },
      {
        Header: "Email",
        accessor: "email",
        show: false,
        className: "columnBorder",
      },
      {
        Header: "Booked Loads",
        Footer: this.calculateTotal,
        accessor: "bookedLoads",
        show: true,
        className: "columnBorder",
      },
      {
        Header: "Total Payment",
        Footer: this.calculateTotal,
        accessor: "totalPayment",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "Total Loaded Miles",
        Footer: this.calculateTotal,
        accessor: "totalLoadedMiles",
        show: true,
        className: "columnBorder",
        Cell: this.editTable
      },
      {
        Header: "$/Mile",
        Footer: this.calculateTotal,
        id: "avgDollarPerMile",
        show: true,
        className: "columnBorder",
        accessor: d => {
        let dollarPerMile = Number(d.totalPayment) / Number(d.totalLoadedMiles);
        dollarPerMile = isNaN(dollarPerMile) ? null : dollarPerMile;
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: "$" + Number(dollarPerMile).toFixed(2)
            }}
          />
        );
        }
      },

    ];
  }

  render() {
    // const { data } = this.state;
    const { broker, classes } = this.props;

    // console.log("TripsData.js this.state ", this.state);

    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <SideMenu />
          <ActionBtn saveRow={this.saveRow} addEmptyRow={this.addEmptyRow} />
          &nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
        </Toolbar>

        <ReactTable
          data={broker}
          showPaginationBottom={true}
          columns={columns}
          defaultPageSize={20}
          style={
           {
              height: "700px"
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
    broker: company.broker
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBroker: companyActions.getBroker,
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BrokersData)
  )
);
