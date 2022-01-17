import { Box, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
    columns: GridColDef[];
    rows: any[];
    onDoubleClick?(row: any): void,
    getRowId(row: any): string
};

const DataTable = ({ columns, rows, onDoubleClick, getRowId }: DataTableProps) => {
    return (
        <Box sx={{ height: 350, width: 1, margin: "10px 0px 3px 0px" }}>
            <DataGrid getRowId={getRowId}
                rows={rows}
                columns={columns}
                disableSelectionOnClick={true}
                onRowDoubleClick={onDoubleClick}
                disableColumnMenu={true}
                hideFooter={true}
                components={{
                    NoRowsOverlay: () => (<Stack height="100%" alignItems="center" justifyContent="center">
                        No items here
                    </Stack>)
                }}
            />
        </Box>
    )
}

export default DataTable;