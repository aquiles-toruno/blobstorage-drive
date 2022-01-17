import { useState, useEffect } from "react";
import axios from "axios";
import ResponseApiModel from "../models/ResponseApiModel";
import DriveItemModel from "../models/DriveItemModel";
import { APIBaseUrl } from "../constants";
import DriveItem from "../components/driveItem/DriveItem";
import LocationItem from "../components/driveItem/LocationItem";
import FileItem from "../components/driveItem/FileItem";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";
import DataTable from "../components/generic/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";

interface DriveProps {
    layout: DriveLayoutEnum
};

const columns: GridColDef[] = [
    {
        field: 'item_Name',
        headerName: 'Name',
        minWidth: 200,
        flex: 1,
        sortable: false,
        renderCell: (params) => {
            let imageUri: string = ''

            if (params.row.itemType === "Location") {
                imageUri = '/images/folder.png';
            }
            else {
                switch (params.row.fileType) {
                    case ".docx":
                        imageUri = `/images/doc-thumbnail.png`;
                        break;
                    case ".xlsx":
                        imageUri = `/images/sheets-thumbnail.png`;
                        break;
                    case ".pptx":
                        imageUri = `/images/pptx-thumbnail.png`;
                        break;
                    default:
                        imageUri = `/images/generic-file-thumbnail.png`;
                }
            }

            return <div style={{ display: "flex", flex: "0 0 48px" }}>
                <div style={{ flex: "0 0 auto", height: "24px", padding: "12px 16px", position: "relative", width: "24px" }}>
                    <div style={{ height: "24px", position: "relative", width: "24px" }}>
                        <img src={imageUri} alt="doc" />
                    </div>
                </div>
                <div style={{ alignSelf: "center", boxSizing: "border-box", flex: "1 1 auto", fontWeight: 500, overflow: "hidden", paddingRight: "12px", position: "relative", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {params.value}
                </div>
            </div>
        }
    }
]

const Drive = ({ layout}: DriveProps) => {
    const [items, setItems] = useState<DriveItemModel[]>([]);
    let { rid } = useParams();
    const navigation = useNavigate();
    const driveRid = 1

    let locationRid: number = rid === undefined ? 0 : +rid;

    const openFolder = (rid: number) => {
        navigation(`/location/${rid}`, { replace: false })
    }

    const onRowDoubleClickHandle = (row: DriveItemModel) => {
        if (row.itemType === "Location") {
            openFolder(row.item_Rid);
        }
    }

    const getRowId = (row: DriveItemModel) => `${row.item_Rid}_${row.itemType}`

    useEffect(() => {
        let rootChildrenEndPoint = `${APIBaseUrl}/drive/${driveRid}/children`
        let itemChildrenEndPoint = `${APIBaseUrl}/drive/${driveRid}/items/${locationRid}/children`
        let uri = rid === undefined ? rootChildrenEndPoint : itemChildrenEndPoint;

        axios.get<ResponseApiModel<DriveItemModel[]>>(uri)
            .then((response) => {
                // handle success
                setItems(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [locationRid])

    let locations = items.filter(({ itemType }) => itemType === 'Location');
    let files = items.filter(({ itemType }) => itemType === 'File');

    let driveItemComponent: JSX.Element;

    if (layout == DriveLayoutEnum.Card)
        driveItemComponent = <DriveItem locations={<LocationItem items={locations} onDoubleClik={onRowDoubleClickHandle} />} files={<FileItem items={files} />} />
    else
        driveItemComponent = <DataTable columns={columns} rows={items} getRowId={getRowId} onDoubleClick={rw => { onRowDoubleClickHandle(rw.row) }} />

    return driveItemComponent;
}

export default Drive;