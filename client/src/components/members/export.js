export function encode(data, columns) {
    const csv = [];
    if (data && data.length && columns && columns.length) {
      const headers = [];
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        let header = column.Header;
        if (header && header instanceof String) {
          header = `${header
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/\r/gm, "\\r")
            .replace(/\n/gm, "\\n")
            .replace(/\t/gm, "\\t")}"`;
        }
        headers.push(header);
      }
      csv.push(headers.join(","));

      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        const row = [];
        for (let j = 0; j < columns.length; j++) {
          const column = columns[j];
          const { accessor } = column;
          const { id } = column;

          let cell = id ? obj[id] : obj[accessor];

          if (typeof cell === "string") {
            cell = `"${cell
              .replace(/\\/g, "\\\\")
              .replace(/\n/g, "\\n")
              .replace(/\r/gm, "\\r")
              .replace(/\n/gm, "\\n")
              .replace(/\t/gm, "\\t")}"`;
          } else if (typeof cell === "object") {
            cell = cell.props.dangerouslySetInnerHTML.__html;
          }

          row.push(cell);
        }
        csv.push(row.join(","));
      }
    }
    return csv.join("\n");
  }

  export function downloadCsv(csv, filename) {
    // console.log("downloadCsv:", csv, filename);
    const csvFile = new Blob([csv], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  export function downloadJSON(json, filename) {
    const jsonFile = new Blob([json], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(jsonFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  export function encodeJson(data) {
    const jsonData = [];

    var i;
    for (i = 0; i < data.length; i++) {
      var a = data[i]._original;
      jsonData.push(a);
    }

    return jsonData;
  }
  export function exportTableToJSON(data, filename) {
    const data_json = {
      data: encodeJson(data)
    };

    downloadJSON(JSON.stringify(data_json), filename);
  }

  export function exportTableToCSV(data, columns, filename) {
    // console.log("downloadCsv: ", data, columns, filename);
    const csv = encode(data, columns);
    downloadCsv(csv, filename);
  }
