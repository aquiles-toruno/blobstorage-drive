import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { APIBaseUrl } from "../constants";
import LocationModel from "../models/LocationModel";
import ResponseApiModel from "../models/ResponseApiModel";

export interface WithBreadcrumbsProps {
    children?: JSX.Element | JSX.Element[]
}

export function withBreadcrumbs<P extends WithBreadcrumbsProps>(
    WrappedComponent: React.ComponentType<P>,
    currentLocationRid: number
) {
    const ComponentWithBreadcrumbs = (props: P) => {
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

        return <WrappedComponent {...props}>
            <>
                {props.children}
            </>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    generateLinks()
                }
            </Breadcrumbs>
        </WrappedComponent>;
    };

    return ComponentWithBreadcrumbs;
}