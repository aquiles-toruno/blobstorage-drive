import DriveItemModel from "../../models/DriveItemModel";
import { useNavigate } from "react-router-dom"
import { Typography } from "@mui/material";

interface LocationItemProps {
    items: DriveItemModel[]
};

const LocationItem = ({ items }: LocationItemProps) => {
    const navigation = useNavigate();

    const getLocationImage = (): string => {
        let baseImagePath: string = "/images/"

        return `${baseImagePath}folder.png`;
    }

    const openFolder = (rid: number) => {
        navigation(`/location/${rid}`, { replace: false })
    }

    return (
        <>
            <div style={{ display: "inline-block", margin: "10px 0px 3px 0px" }}>
                {items.length > 0 &&
                    <Typography  fontSize={14} color="#5f6368" fontWeight="bold">Locations</Typography>
                }
            </div>
            <div style={{ display: "grid", gridGap: 0, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
                {
                    items.map(({ item_Rid, item_Name }) => (
                        <div key={item_Rid} style={{ display: "block" }}>
                            <div style={{ display: "flex", padding: "7px", position: "relative", maxWidth: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", outline: "none", overflow: "hidden" }}>
                                    <div style={{ border: "1px solid #dadce0", borderRadius: "6px", display: "flex", flex: "1 1 auto", flexDirection: "column", overflow: "hidden", position: "relative" }} onDoubleClick={() => { openFolder(item_Rid) }}>
                                        <div style={{ display: "flex", flex: "0 0 48px" }}>
                                            <div style={{ flex: "0 0 auto", height: "24px", padding: "12px 16px", position: "relative", width: "24px" }}>
                                                <div style={{ height: "24px", position: "relative", width: "24px" }}>
                                                    <img src={getLocationImage()} alt="doc" />
                                                </div>
                                            </div>
                                            <div style={{ alignSelf: "center", boxSizing: "border-box", flex: "1 1 auto", fontWeight: 500, overflow: "hidden", paddingRight: "12px", position: "relative", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {item_Name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}

export default LocationItem;