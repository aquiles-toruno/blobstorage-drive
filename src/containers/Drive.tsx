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
import { useParams } from "react-router-dom";

// interface DriveStateState {
//     driveRid: number;
//     items: DriveItemModel[];
//     layout: DriveLayoutEnum
// };

const columns: GridColDef[] = [
    {
        field: 'item_Name',
        headerName: 'Name',
        width: 200,
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

            return <div>
                <img src={imageUri} />
                <span>{params.value}</span>
            </div>
        }, // renderCell will render the component
    }
]

const Drive = () => {
    const [items, setItems] = useState<DriveItemModel[]>([]);
    const [layout, setLayout] = useState<DriveLayoutEnum>(DriveLayoutEnum.Card);
    let { rid } = useParams();
    const driveRid = 1

    let locationRid: number = rid === undefined ? 0 : +rid;

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
        driveItemComponent = <DriveItem locations={<LocationItem items={locations} />} files={<FileItem items={files} />} />
    else
        driveItemComponent = <DataTable columns={columns} rows={items} columnIdName="item_Rid" />

    return driveItemComponent;
}

export default Drive;