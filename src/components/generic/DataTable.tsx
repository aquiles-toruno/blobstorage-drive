import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
    columns: GridColDef[];
    rows: any[];
    columnIdName?: string;
};

const DataTable = ({ columns, rows, columnIdName = "id" }: DataTableProps) => {
    return (
        <DataGrid getRowId={r => r[columnIdName]}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
        />
    )
}

export default DataTable;