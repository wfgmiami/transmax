import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class TripsData extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          date: "08/31/18",
          id: "012345",
          broker: "Transplace",
          amount: 600,
          loadedMiles: 300,
          emptyMiles: 258
        },
        {
          date: "09/05/18",
          id: "0123",
          broker: "Transplace",
          amount: 1200,
          loadedMiles: 500,
          emptyMiles: 118
        },
        {
          date: "09/15/18",
          id: "0123893",
          broker: "Transplace",
          amount: 1800,
          loadedMiles: 600,
          emptyMiles: 198
        }
      ]
    };

    this.editTable = this.editTable.bind(this);
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

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Date",
              accessor: "date",
              Cell: this.editTable
            },
            {
              Header: "Id",
              accessor: "id",
              Cell: this.editTable
            },
            {
              Header: "Broker",
              accessor: "broker",
              Cell: this.editTable
            },
            {
              Header: "Amount",
              accessor: "amount",
              Cell: this.editTable
            },
            {
              Header: "Loaded Miles",
              accessor: "loadedMiles",
              Cell: this.editTable
            },
            {
              Header: "Empty Miles",
              accessor: "emptyMiles",
              Cell: this.editTable
            },
            {
              Header: "Total Miles",
              id: "totalMiles",
              accessor: d => {
                const totalMiles = d.loadedMiles + d.emptyMiles;
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: totalMiles
                    }}
                  />
                );
              }
            }
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
