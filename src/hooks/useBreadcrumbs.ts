import { useState, useEffect } from "react";
import { APIBaseUrl } from "../constants";
import LocationModel from "../models/LocationModel";
import ResponseApiModel from "../models/ResponseApiModel";

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export const useBreadcrumbs = (locationRid: number) => {
    const [isLoadingCrumbs, setIsLoadingCrumbs] = useState(false)
    const [crumbs, setCrumbs] = useState<LocationModel[]>([]);
    const uri = `${APIBaseUrl}/location/${locationRid}/hierarchy`

    useEffect(() => {
        const request: Promise<HttpResponse<ResponseApiModel<LocationModel[]>>> = fetch(uri)
        request.then(response => response.json())
            .then((data: ResponseApiModel<LocationModel[]>) => {
                setCrumbs(data.data)
            })
            .finally(() => {
                setIsLoadingCrumbs(false);
            })
    }, [locationRid])

    return { isLoadingCrumbs, crumbs };
}