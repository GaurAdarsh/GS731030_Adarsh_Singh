import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { calculations, skus, stores } from "./common";
import { ColDef, ICellRendererParams } from "ag-grid-community";

// Define TypeScript types
type Calculation = {
  store: string;
  sku: string;
  week: string;
  salesUnits?: number;
  salesDollars?: number | string;
  gmDollars?: number | string;
  gmPercent?: number | string;
};

type Store = {
  id: string;
  label: string;
};

type SKU = {
  id: string;
  department: string;
};

// Custom Cell Renderer for GM Percent
const GMCellRenderer = (params: ICellRendererParams) => {
  const value = parseFloat(params.value as string);
  let bgColor = "#ffffff"; // Default white
  console.log("Colorvalue",value)
  if (!isNaN(value)) {
    if (value > 80) bgColor = "#4CAF50"; // Green
    else if (value > 50) bgColor = "#FFEB3B"; // Yellow
    else if (value > 30) bgColor = "#FF9800"; // Orange
    else bgColor = "#FFCDD2"; // Red
  }else{
     bgColor = "#FFCDD2"
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "5px",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: "4px",
      }}
    >
      {isNaN(value) ? "0.00%" : `${value.toFixed(2)}%`}
    </div>
  );
};


const Planning = () => {
  const [rowData, setRowData] = useState<Record<string, string | number>[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    const weeks = [...new Set(calculations.map((item) => item.week))].sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      return numA - numB;
    });
  
    const mapDataDynamically = (data: Calculation[], storeList: SKU[], store: Store[]) => {
      const storeMap = Object.fromEntries(store.map((s) => [s.id, s.label]));
      const skuMap = Object.fromEntries(storeList.map((s) => [s.id, s.department]));
    
      const dataMap: Record<string, Record<string, string | number>> = {};
      const validWeeks = new Set<string>(); // Stores weeks with valid GM Percent values
    
      data.forEach((item) => {
        const key = `${item.store}-${item.sku}`;
        
        // ✅ Ensure GM Percent is always a number
        const gmPercent = isNaN(parseFloat(item.gmPercent as string)) ? 0 : parseFloat(item.gmPercent as string);
    
        if (!dataMap[key]) {
          dataMap[key] = {
            store: storeMap[item.store] || item.store,
            sku: skuMap[item.sku] || item.sku,
          };
        }
    
        dataMap[key][`${item.week}_salesUnits`] = item.salesUnits || 0;
        dataMap[key][`${item.week}_salesDollars`] = `$${(parseFloat(item.salesDollars as string) || 0).toFixed(2)}`;
        dataMap[key][`${item.week}_gmDollars`] = `$${(parseFloat(item.gmDollars as string) || 0).toFixed(2)}`;
        dataMap[key][`${item.week}_gmPercent`] = gmPercent.toFixed(2); // Convert back to string for display
    
        // ✅ Keep track of weeks that have at least one non-zero GM Percent
        if (gmPercent !== 0) {
          validWeeks.add(item.week);
        }
      });
    
      return { transformedData: Object.values(dataMap), validWeeks };
    };
    
    const { transformedData, validWeeks } = mapDataDynamically(calculations, skus, stores);
    setRowData(transformedData as Record<string, string | number>[]);
  
    const baseColumns: ColDef[] = [
      { headerName: "Store", field: "store", pinned: "left", sortable: true, filter: true, resizable: true },
      { headerName: "SKU", field: "sku", pinned: "left", sortable: true, filter: true, resizable: true },
    ];
  
    // ✅ Create dynamic columns but **only keep weeks that have valid GM Percent values**
    const dynamicColumns: ColDef[] = weeks
      .filter((week) => validWeeks.has(week)) // ❌ Remove weeks with only 0.00% GM Percent
      .map((week) => ({
        headerName: `Week ${week}`,
        children: [
          { headerName: "Sales Units", field: `${week}_salesUnits`, sortable: true, filter: true, resizable: true },
          { headerName: "Sales Dollars", field: `${week}_salesDollars`, sortable: true, filter: true, resizable: true },
          { headerName: "GM Dollars", field: `${week}_gmDollars`, sortable: true, filter: true, resizable: true },
          {
            headerName: "GM Percent",
            field: `${week}_gmPercent`,
            cellRenderer: GMCellRenderer, // ✅ Keep color styling
            sortable: true,
            filter: true,
            resizable: true,
          },
        ],
      }));
  
    setColumnDefs([...baseColumns, ...dynamicColumns]);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%", overflow: "auto" }}>
      <AgGridReact 
        rowData={rowData} 
        columnDefs={columnDefs} 
        pagination={true} 
        domLayout="normal"
        defaultColDef={{ resizable: true, sortable: true, filter: true }}
      />
    </div>
  );
};

export default Planning;
