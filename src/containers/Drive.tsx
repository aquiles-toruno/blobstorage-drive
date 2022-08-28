import { useState, useEffect, useMemo, useContext } from "react";
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
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import LocationItemModel from "../models/LocationItemModel";
import FileModel from "../models/FileModel";
import { withLoading } from "../hoc/withLoading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLayout } from "../hooks/useLayout";
import DriveModel from "../models/DriveModel";

interface DriveProps {
    onLoadingChange?: (isLoading: boolean) => void;
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

const acceptStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#1b76c4',
    backgroundColor: 'rgba(27, 118, 196, 0.1)'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const Drive = ({ onLoadingChange }: DriveProps) => {
    const [alertMessage, setAlertMessage] = useState<React.ReactNode>("")
    const [severityMessage, setSeverityMessage] = useState<AlertColor>("info")
    const [items, setItems] = useState<DriveItemModel[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<LocationItemModel>({
        childCount: 0,
        fileLocationName: "Mi unidad",
        file_Location_Rid: 0,
        url: "",
        createdAt: new Date()
    });
    const [driveRid, setDriveRid] = useState<number>(0)
    const [locationRid, setLocationRid] = useState<number>(0)

    let { rid } = useParams();
    const navigation = useNavigate();

    if (rid !== undefined)
        setLocationRid(+rid);

    const openFolder = (rid: number) => {
        navigation(`/location/${rid}`, { replace: false })
    }

    const onRowDoubleClickHandle = (row: DriveItemModel) => {
        if (row.itemType === "Location") {
            openFolder(row.item_Rid);
        }
    }

    const getRowId = (row: DriveItemModel) => `${row.item_Rid}_${row.itemType}`

    let { getAccessTokenSilently, user } = useAuth0()

    const getTokenFn = async (locationUri: string) => {
        let token = await getAccessTokenSilently()
        let response = await axios.get<ResponseApiModel<LocationItemModel>>(locationUri, {
            headers: { 'Authorization': 'Bearer ' + token }
        })

        setCurrentLocation(response.data.data);
    }

    useEffect(() => {
        let endPoint = `${APIBaseUrl}/drive/CreateIfNotExists?userId=${user?.sub}`
        axios.post<ResponseApiModel<DriveModel>>(endPoint)
            .then((response) => {
                // handle success
                setDriveRid(response.data.data.drive_Rid)

                if (rid === undefined)
                    setLocationRid(response.data.data.root_Rid)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    useEffect(() => {
        if (driveRid === 0)
            return

        let rootChildrenEndPoint = `${APIBaseUrl}/drive/${driveRid}/children`
        let itemChildrenEndPoint = `${APIBaseUrl}/drive/${driveRid}/items/${locationRid}/children`
        let uri = rid === undefined ? rootChildrenEndPoint : itemChildrenEndPoint;
        let locationUri = `${APIBaseUrl}/location/${locationRid}`

        getTokenFn(locationUri)

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

    const onDrop = (acceptedFiles: File[]) => {
        // Do something with the files
        console.log(acceptedFiles)
        const uri = `${APIBaseUrl}/drive/file/new`
        const formData = new FormData();

        acceptedFiles.forEach(async file => {
            formData.append("file", file, file.name)
        });

        let body = JSON.stringify({ location: currentLocation.fileLocationName === "Mi unidad" ? "" : currentLocation.fileLocationName })

        formData.append("Location_Rid", locationRid.toString())
        formData.append("UserId", user?.sub ?? "")
        formData.append("Location", currentLocation.fileLocationName ?? "")

        if (onLoadingChange)
            onLoadingChange(true)

        axios.post<ResponseApiModel<FileModel>>(uri, formData)
            .then(response => {
                console.log(response.data)

                setAlertMessage("New item added")
                setSeverityMessage("success")
                setOpenSnackbar(true)
                setItems([
                    ...items
                    , {
                        fileType: response.data.data.fileType,
                        itemType: "File",
                        item_Name: response.data.data.item_Name,
                        item_Rid: response.data.data.item_Rid,
                        item_Url: ''
                    }
                ])
            })
            .catch(err => console.log(err))
            .finally(() => {
                if (onLoadingChange)
                    onLoadingChange(false)
            })
    }

    const { getRootProps
        , getInputProps
        , isDragActive
        , isFocused
        , isDragAccept
        , isDragReject
    } = useDropzone({ onDrop, noClick: true })

    const style = useMemo(() => ({
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    if (isDragAccept && !openSnackbar) {
        setAlertMessage(<p>Drop the files to upload immediatly to: <strong>{currentLocation.fileLocationName ?? 'Mi unidad'}</strong></p>)
        setOpenSnackbar(true)
    }

    let locations = items.filter(({ itemType }) => itemType === 'Location');
    let files = items.filter(({ itemType }) => itemType === 'File');

    let driveItemComponent: JSX.Element;
    const { layout } = useLayout()

    if (layout === DriveLayoutEnum.Card)
        driveItemComponent = <DriveItem locations={<LocationItem items={locations} onDoubleClik={onRowDoubleClickHandle} />} files={<FileItem items={files} />} />
    else
        driveItemComponent = <DataTable columns={columns} rows={items} getRowId={getRowId} onDoubleClick={rw => { onRowDoubleClickHandle(rw.row) }} />

    return (
        <>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity={severityMessage} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {driveItemComponent}
            </div>
        </>
    )
}

// export default withLoading(Drive)
export default withAuthenticationRequired(withLoading(Drive), {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>
});