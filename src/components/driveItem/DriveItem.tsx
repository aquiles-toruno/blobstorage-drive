import React from "react";

interface DriveItemProps {
    locations: React.ReactElement;
    files: React.ReactElement;
};

function DriveItem({ locations, files }: DriveItemProps) {
    return <div style={{ display: "block" }}>
        {locations}
        {files}
    </div>
}

export default DriveItem;