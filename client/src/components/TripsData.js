import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import "react-table/react-table.css";
import { Datatable, EmptyRow } from "./Datatable";
import ColumnChooser from "./ColumnChooser.js";

export default class TripsData extends Component {
  constructor() {
    super();
    this.state = {
      data: Datatable,
      columns: [],
      mpg: 6,
      driverPay: 0.55,
      dispatchFee: 0.1,
      editable: false
    };

    this.editTable = this.editTable.bind(this);
    this.editRow = this.editRow.bind(this);
    this.saveRows = this.saveRows.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
    this.onColumnUpdate = this.onColumnUpdate.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  editTable(cellInfo) {
    // console.log("cell info........", cellInfo);
    let dollarSign = "";
    if (cellInfo.column.id === "amount") {
      dollarSign = "$";
    }
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            dollarSign + this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  editRow(row) {
    console.log("edit", row);
    this.setState({ editable: true });
  }

  deleteRow(row) {
    console.log("delete", row);
  }

  saveRows() {
    console.log("save");
  }

  addEmptyRow() {
    let newEmptyRow = Object.assign({}, EmptyRow);
    this.setState({
      data: this.state.data.concat(newEmptyRow)
    });
  }

  calculateTotal({data, column}) {
    // console.log("....data",data);
    let dollarSign = false;

    const total = data.reduce( (memo, trip) => {
      // console.log("....info", trip,column.id, trip[column.id]);
      if(typeof(trip[column.id]) === 'object'){
        let value = trip[column.id].props.dangerouslySetInnerHTML.__html;
        if(typeof(value) === 'string' && value.substring(0,1) === '$'){
          dollarSign = true;
          value = value.slice(1);
        }
        memo += Number(value);
      }else{
        memo += trip[column.id];
      }

      return memo;
    }, 0)
    if(dollarSign){
      return '$' + Number(total.toFixed(0)).toLocaleString();
    }
    return Number(total.toFixed(0)).toLocaleString();
  }

  onColumnUpdate(index) {
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
    // console.log('TripsData createColumns: ', this.state)
    const editFunc = this.state.editable ? this.editTable : null;

    return [
      {
        Header: "Date",
        accessor: "bookDate",
        show: true,
        Cell: editFunc
      },
      {
        Header: "Truck Number",
        accessor: "truckNumber",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Driver",
        accessor: "driverName",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Load",
        accessor: "loadNumber",
        show: true,
        Cell: editFunc
      },
      {
        Header: "Broker",
        accessor: "broker",
        show: true,
        Cell: editFunc
      },
      {
        Header: "Amount",
        accessor: "amount",
        show: true,
        Footer:this.calculateTotal,
        Cell: editFunc
      },
      {
        Header: "Loaded Miles",
        accessor: "loadedMiles",
        Footer: this.calculateTotal,
        show: true,
        Cell: editFunc
      },
      {
        Header: "Empty Miles",
        accessor: "emptyMiles",
        Footer: this.calculateTotal,
        show: true,
        Cell: editFunc
      },
      {
        Header: "Mileage",
        id: "mileage",
        show: true,
        Footer: this.calculateTotal,
        accessor: d => {
          const totalMiles = Number(d.loadedMiles) + Number(d.emptyMiles);

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: totalMiles
              }}
            />
          );
        }
      },
      {
        Header: "$/Mile",
        id: "dollarPerMile",
        show: true,
        accessor: d => {
          let dollarPerMile =
            Number(d.amount) / (Number(d.loadedMiles) + Number(d.emptyMiles));
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

      {
        Header: "Diesel Price",
        show: true,
        accessor: "dieselPrice",
        Cell: editFunc
      },
      {
        Header: "Fuel Cost",
        Footer: this.calculateTotal,
        id: "fuelCost",
        show: true,
        accessor: d => {
          let fuelCost =
            ((Number(d.loadedMiles) + Number(d.emptyMiles)) / this.state.mpg) *
            Number(d.dieselPrice);

          fuelCost = isNaN(fuelCost) ? null : fuelCost;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(fuelCost).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Driver Pay",
        Footer: this.calculateTotal,
        id: "driverPay",
        show: true,
        accessor: d => {
          let driverPay =
            (Number(d.loadedMiles) + Number(d.emptyMiles)) *
            this.state.driverPay;

          driverPay = isNaN(driverPay) ? null : driverPay;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(driverPay).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Dispatch Fee",
        Footer:this.calculateTotal,
        id: "dispatchFee",
        show: true,
        accessor: d => {
          let dispatchFee = Number(d.amount) * this.state.dispatchFee;

          dispatchFee = isNaN(dispatchFee) ? null : dispatchFee;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(dispatchFee).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Lumper",
        Footer:this.calculateTotal,
        accessor: "lumper",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Detention",
        Footer:this.calculateTotal,
        accessor: "detention",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Detention Driver Pay",
        Footer:this.calculateTotal,
        accessor: "detentionDriverPay",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Late Fee",
        Footer:this.calculateTotal,
        accessor: "lateFee",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Toll",
        Footer:this.calculateTotal,
        accessor: "toll",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Road Maintenance",
        Footer:this.calculateTotal,
        accessor: "roadMaintenance",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Other Expenses",
        Footer:this.calculateTotal,
        accessor: "otherExpenses",
        show: false,
        Cell: editFunc
      },
      {
        Header: "Total Expenses",
        Footer:this.calculateTotal,
        id: "totalExpenses",
        show: true,
        accessor: d => {
          let totalExpenses =
            ((Number(d.loadedMiles) + Number(d.emptyMiles)) / this.state.mpg) *
              Number(d.dieselPrice) +
            (Number(d.loadedMiles) + Number(d.emptyMiles)) *
              this.state.driverPay +
            Number(d.amount) * this.state.dispatchFee +
            d.lumper +
            d.detention +
            d.detentionDriverPay +
            d.lateFee +
            d.toll +
            d.roadMaintenance +
            d.otherExpenses;

          totalExpenses = isNaN(totalExpenses) ? null : totalExpenses;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(totalExpenses).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Profit",
        Footer:this.calculateTotal,
        id: "profit",
        show: true,
        accessor: d => {
          let profit =
            Number(d.amount) -
            (((Number(d.loadedMiles) + Number(d.emptyMiles)) / this.state.mpg) *
              Number(d.dieselPrice) +
              (Number(d.loadedMiles) + Number(d.emptyMiles)) *
                this.state.driverPay +
              Number(d.amount) * this.state.dispatchFee +
              d.lumper +
              d.detention +
              d.detentionDriverPay +
              d.lateFee +
              d.toll +
              d.roadMaintenance +
              d.otherExpenses);

          profit = isNaN(profit) ? null : profit;

          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "$" + Number(profit).toFixed(0)
              }}
            />
          );
        }
      },
      {
        Header: "Edit",
        id: "edit",
        accessor: "edit",
        show: true,
        minWidth: 150,
        Cell: row => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.editRow(row)}
            >
              Edit
            </Button>&nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.deleteRow(row)}
            >
              Delete
            </Button>
          </div>
        )
      }
    ];
  }

  render() {
    const { data } = this.state;
    // console.log("this.state: ", this.state);
    const columns =
      this.state.columns.length > 0 ? this.state.columns : this.createColumns();
    return (
      <div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.addEmptyRow}
          >
            Add
          </Button>&nbsp;
          <Button variant="contained" color="primary" onClick={this.saveRows}>
            Save
          </Button>&nbsp;
          <ColumnChooser
            columns={columns}
            onColumnUpdate={this.onColumnUpdate}
          />
          <div>&nbsp;</div>
        </div>
        <ReactTable
          data={data}
          showPaginationBottom={true}
          columns={columns}
          defaultPageSize={10}
          style={
            {
              // height: "400px"
            }
          }
          className="-striped -highlight"
        />
      </div>
    );
  }
}
