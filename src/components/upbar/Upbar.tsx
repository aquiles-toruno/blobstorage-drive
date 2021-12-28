import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { APIBaseUrl } from '../../constants';
import LocationModel from '../../models/LocationModel';
import ResponseApiModel from '../../models/ResponseApiModel';
import { Link } from "react-router-dom";

interface UpbarProps {
    currentLocationRid: number
};

const Upbar = ({ currentLocationRid }: UpbarProps) => {
    const [crumbs, setCrumbs] = useState<LocationModel[]>([]);

    useEffect(() => {
        axios.get<ResponseApiModel<LocationModel[]>>(`${APIBaseUrl}/location/${currentLocationRid}/hierarchy`)
            .then((response) => {
                // handle success
                setCrumbs(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [currentLocationRid])

    const generateLinks = () => {
        if (currentLocationRid === 0)
            return <Typography color="text.primary" fontSize={18}>Mi unidad</Typography>

        return crumbs.map(({ file_Location_Rid, fileLocationName, isRoot }, i) => {
            if (i + 1 === crumbs.length) {
                return <Typography key={file_Location_Rid} fontSize={18} color="text.primary">{fileLocationName}</Typography>
            }
            else {
                let relativeUri = isRoot ? "/" : `/location/${file_Location_Rid}`
                return <Link key={file_Location_Rid} color="inherit" to={relativeUri} >
                    {fileLocationName}
                </Link>
            }
        });
    }

    return (
        <div style={{ height: "35px", width: "100%", borderBottom: "1px solid rgb(170, 174, 176)", position: "relative" }}>
            <div style={{ margin: "0", position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
                <Breadcrumbs aria-label="breadcrumb">
                    {
                        generateLinks()
                    }
                </Breadcrumbs>
            </div>
        </div>
    )
}

export default Upbar;
