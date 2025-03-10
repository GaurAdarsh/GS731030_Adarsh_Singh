import React, { useState, useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { skus } from "./common";

interface SkuData {
  id: string;
  label: string;
  price: number;
  cost: number;
}

const Sku: React.FC = () => {
  const [rowData, setRowData] = useState<SkuData[]>(skus);
  const [gridKey, setGridKey] = useState<number>(0); // Key to force re-render
  const gridRef = useRef<AgGridReact>(null);

  // Function to handle row deletion
  const handleDelete = useCallback((id: string) => {
    setRowData((prevData) => {
      const updatedData = prevData.filter((sku) => sku.id !== id);
      setGridKey((prevKey) => prevKey + 1); // Force re-render
      return updatedData;
    });
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "",
        cellRenderer: (params: any) => (
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => handleDelete(params.data.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 4v6m4-6v6"></path>
              <line x1="10" y1="4" x2="14" y2="4"></line>
            </svg>
          </button>
        ),
        width: 50,
        headerClass: "custom-header",
      },
      {
        headerName: "S.No",
        valueGetter: (params: any) => (params.node?.rowIndex ?? 0) + 1, // Auto-increment
        width: 80,
        headerClass: "custom-header",
      },
      { headerName: "SKU", field: "label", flex: 1, headerClass: "custom-header" },
      { headerName: "Price", field: "price", flex: 1, headerClass: "custom-header" },
      { headerName: "Cost", field: "cost", flex: 1, headerClass: "custom-header" },
    ],
    [handleDelete]
  );

  return (
    <div className="flex">
      <div className="flex-1 p-8 overflow-auto">
        <div
          className="ag-theme-alpine shadow-lg rounded-lg p-4"
          style={{ height: "500px", width: "100%" }}
        >
          {/* Add key to force re-render */}
          <AgGridReact
            key={gridKey}
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            animateRows={true}
          />
        </div>

        <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600">
          NEW SKU
        </button>
      </div>
    </div>
  );
};

export default Sku;
