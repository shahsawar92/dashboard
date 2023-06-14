import { useRef } from "react";
import { saveAs } from "file-saver";

export const useTableExport = () => {
  const tableRef = useRef(null);

  const exportTableData = () => {
    const tableHtml = tableRef.current.outerHTML;
    const blob = new Blob([tableHtml], { type: "text/html;charset=utf-8" });
    saveAs(blob, "table.html");
  };

  return { tableRef, exportTableData };
};
