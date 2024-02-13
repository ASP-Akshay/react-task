import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';

import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";

const columns = [
  { field: "id", headerName: "ID", width: 150, sortable: false },
  { field: "firstName", headerName: "FirstName", width: 150, sortable: false },
  { field: "age", headerName: "Age", width: 150, sortable: false},
  { field: "phone", headerName: "Phone", width: 150, sortable: false},
];

export default function DataTable({
  users,
  setPaginationModel,
  paginationModel,
  dataSelection,
  setRowSelectionModel,
  totalCount,
  isLoading
}) {

  return (
      <DataGrid
        style={{ height: 700 }}
        density="standard"
        rows={users}
        pagination
        paginationMode="server"
        columns={columns}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        rowCount={totalCount}
        onRowSelectionModelChange={setRowSelectionModel}
        rowSelectionModel={dataSelection}
        onPaginationModelChange={setPaginationModel}
        initialState={{
          pagination: {
            paginationModel: {
              page: paginationModel.page,
              pageSize: paginationModel?.pageSize,
            },
          },
        }}
        disableColumnMenu
        checkboxSelection
        sortModel={[]} 
      />
  );
}
