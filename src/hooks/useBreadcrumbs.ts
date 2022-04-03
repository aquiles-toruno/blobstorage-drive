import { useState, useEffect } from "react";
import { APIBaseUrl } from "../constants";
import LocationModel from "../models/LocationModel";
import ResponseApiModel from "../models/ResponseApiModel";
import { AuthDelegate } from "../types/authDelegate";

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export const useBreadcrumbs = (locationRid: number, authDelegate: AuthDelegate) => {
    const [isLoadingCrumbs, setIsLoadingCrumbs] = useState(false)
    const [crumbs, setCrumbs] = useState<LocationModel[]>([]);
    const uri = `${APIBaseUrl}/location/${locationRid}/hierarchy`

    useEffect(() => {
        const getToken = async () => {
            var token = await authDelegate()

            const request: Promise<HttpResponse<ResponseApiModel<LocationModel[]>>> = fetch(uri, {
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            })
            request.then(response => response.json())
                .then((data: ResponseApiModel<LocationModel[]>) => {
                    setCrumbs(data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setIsLoadingCrumbs(false);
                })
        }

        getToken()
    }, [locationRid])

    return { isLoadingCrumbs, crumbs };
}