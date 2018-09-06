import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Datatable from './Datatable';

export default class TripsData extends Component {
  constructor() {
    super();
    this.state = {
      data: Datatable,
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
  }

  editTable(cellInfo) {
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
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
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
    this.setState({
      data: this.state.data.concat({})
    });
  }

  render() {
    const { data } = this.state;
    const editFunc = this.state.editable ? this.editTable : null;

    return (
      <div>
        <div>
          <button onClick={this.addEmptyRow}>Add</button>&nbsp;
          <button onClick={this.saveRows}>Save</button>
        </div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Date",
              accessor: "bookDate",
              Cell: editFunc
            },
            {
              Header: "Truck Number",
              accessor: "truckNumber",
              Cell: editFunc
            },
            {
              Header: "Driver",
              accessor: "driverName",
              Cell: editFunc
            },
            {
              Header: "Load",
              accessor: "loadNumber",
              Cell: editFunc
            },
            {
              Header: "Broker",
              accessor: "broker",
              Cell: editFunc
            },
            {
              Header: "Amount",
              accessor: "amount",
              Cell: editFunc
            },
            {
              Header: "Loaded Miles",
              accessor: "loadedMiles",
              Cell: editFunc
            },
            {
              Header: "Empty Miles",
              accessor: "emptyMiles",
              Cell: editFunc
            },
            {
              Header: "Mileage",
              id: "mileage",
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
              accessor: d => {
                let dollarPerMile =
                  Number(d.amount) /
                  (Number(d.loadedMiles) + Number(d.emptyMiles));
                dollarPerMile = isNaN(dollarPerMile) ? null : dollarPerMile;
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: '$' + Number(dollarPerMile).toFixed(2)
                    }}
                  />
                );
              }
            },

            {
              Header: "Diesel Price",
              accessor: "dieselPrice",
            },
            {
              Header: "Fuel Cost",
              id: "fuelCost",
              accessor: d => {
                let fuelCost =
                  ((Number(d.loadedMiles) + Number(d.emptyMiles)) / this.state.mpg)
                  * Number(d.dieselPrice);

                  fuelCost = isNaN(fuelCost) ? null : fuelCost;

                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: '$' + Number(fuelCost).toFixed(2)
                    }}
                  />
                );
              }
            },
            {
              Header: "Driver Pay",
              id: "driverPay",
              accessor: d => {
                let driverPay =
                  (Number(d.loadedMiles) + Number(d.emptyMiles)) * this.state.driverPay

                  driverPay = isNaN(driverPay) ? null : driverPay;

                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: '$' + Number(driverPay).toFixed(2)
                    }}
                  />
                );
              }
            },
            {
              Header: "Dispatch Fee",
              id: "dispatchFee",
              accessor: d => {
                let dispatchFee =
                  Number(d.amount) * this.state.dispatchFee

                  dispatchFee = isNaN(dispatchFee) ? null : dispatchFee;

                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: '$' + Number(dispatchFee).toFixed(2)
                    }}
                  />
                );
              }
            },
            {
              Header: "Lumper",
              accessor: "lumper",
              Cell: editFunc
            },
            {
              Header: "Detention",
              accessor: "detention",
              Cell: editFunc
            },
            {
              Header: "Detention Driver Pay",
              accessor: "detentionDriverPay",
              Cell: editFunc
            },
            {
              Header: "Late Fee",
              accessor: "lateFee",
              Cell: editFunc
            },
            {
              Header: "Toll",
              accessor: "toll",
              Cell: editFunc
            },
            {
              Header: "Road Maintenance",
              accessor: "roadMaintenance",
              Cell: editFunc
            },
            {
              Header: "Other Expenses",
              accessor: "otherExpenses",
              Cell: editFunc
            },
            {
              Header: "Total Expenses",
              id: "totalExpenses",
              accessor: d => {

                let totalExpenses =
                ((Number(d.loadedMiles) + Number(d.emptyMiles)) / this.state.mpg) * Number(d.dieselPrice) +
                (Number(d.loadedMiles) + Number(d.emptyMiles)) * this.state.driverPay +
                  Number(d.amount) * this.state.dispatchFee +
                  d.lumper + d.detention + d.detentionDriverPay + d.lateFee + d.toll + d.roadMaintenance +
                  d.otherExpenses

                  totalExpenses = isNaN(totalExpenses) ? null : totalExpenses;

                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: '$' + Number(totalExpenses).toFixed(2)
                    }}
                  />
                );
              }
            },
            {
              Header: "Profit",
              id: "profit",
              accessor: d => {
                let profit =
                  Number(d.amount) -
                  (((Number(d.loadedMiles) + Number(d.emptyMiles)) / this.state.mpg) * Number(d.dieselPrice) +
                (Number(d.loadedMiles) + Number(d.emptyMiles)) * this.state.driverPay +
                  Number(d.amount) * this.state.dispatchFee +
                  d.lumper + d.detention + d.detentionDriverPay + d.lateFee + d.toll + d.roadMaintenance +
                  d.otherExpenses)

                  profit = isNaN(profit) ? null : profit;

                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: '$' + Number(profit).toFixed(2)
                    }}
                  />
                );
              }
            },
            {
              id: "edit",
              accessor: "edit",
              Cell: row => (
                <div>
                  <button onClick={() => this.editRow(row)}>Edit</button>&nbsp;
                  <button onClick={() => this.deleteRow(row)}>Delete</button>
                </div>
              )
            },


          ]}
          defaultPageSize={10}
          style={{
            height: "400px"
          }}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
