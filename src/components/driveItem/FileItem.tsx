import { Typography } from "@mui/material";
import DriveItemModel from "../../models/DriveItemModel";

interface FileItemProps {
    items: DriveItemModel[]
};

function FileItem({ items }: FileItemProps) {
    function getFileImage(fileType: string): string {
        let baseImagePath: string = "/images/"

        switch (fileType) {
            case ".docx":
                return `${baseImagePath}doc.png`;
            case ".xlsx":
                return `${baseImagePath}sheets.png`;
            case ".pptx":
                return `${baseImagePath}pptx.png`;
            default:
                return `${baseImagePath}generic-file.png`;
        }
    }

    function getFileImageThumbnail(fileType: string): string {
        let baseImagePath: string = "/images/"

        switch (fileType) {
            case ".docx":
                return `${baseImagePath}doc-thumbnail.png`;
            case ".xlsx":
                return `${baseImagePath}sheets-thumbnail.png`;
            case ".pptx":
                return `${baseImagePath}pptx-thumbnail.png`;
            default:
                return `${baseImagePath}generic-file-thumbnail.png`;
        }
    }

    return (
        <>
            <div style={{ display: "inline-block", margin: "10px 0px 3px 0px" }}>
                {items.length > 0 &&
                    <Typography fontSize={14} color="#5f6368" fontWeight="bold">Files</Typography>
                }
            </div>
            <div style={{ display: "grid", gridGap: 0, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
                {items.map(({ item_Rid, item_Name, fileType }) => (
                    <div key={item_Rid} style={{ display: "block" }}>
                        <div style={{ display: "flex", padding: "7px", position: "relative", maxWidth: "100%" }}>
                            <div style={{ display: "flex", flex: "1 1 auto", outline: "none", overflow: "hidden" }}>
                                <div style={{ border: "1px solid #dadce0", borderRadius: "6px", display: "flex", flex: "1 1 auto", flexDirection: "column", overflow: "hidden", position: "relative" }}>
                                    <div style={{ flex: "1 1 auto", position: "relative", width: "100%" }}>
                                        <div style={{ height: "100%", backgroundColor: "#fff", left: 0, overflow: "hidden", paddingTop: 30, paddingBottom: 30, textAlign: "center", top: 0, transition: "opacity 200ms ease-in-out", width: "100%" }}>
                                            <div style={{ boxSizing: "border-box", height: "100%", left: 0, position: "absolute", top: 0, width: "100%" }}></div>
                                            <div style={{ display: "inline-block", height: "100%", verticalAlign: "middle" }}></div>
                                            <img src={getFileImage(fileType)} alt="doc" style={{ backgroundRepeat: "no-repeat", backgroundSize: "64px", display: "inline-block", height: "64px", verticalAlign: "middle" }} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flex: "0 0 48px" }}>
                                        <div style={{ flex: "0 0 auto", height: "24px", padding: "12px 16px", position: "relative", width: "24px" }}>
                                            <div style={{ height: "24px", position: "relative", width: "24px" }}>
                                                <img src={getFileImageThumbnail(fileType)} alt="doc" />
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
                ))}
            </div >
        </>
    )
}

export default FileItem;