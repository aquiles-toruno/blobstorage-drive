import { DriveItemOptionModel } from "../../models/DriveItemOptionModel"

interface DriveItemOptionProps {
    option: DriveItemOptionModel
}

const DriveItemOption = ({ option }: DriveItemOptionProps) => {
    return <span style={{ height: "24px", width: "24px", margin: "3px", display: "inline-block", cursor: "pointer", backgroundImage: `url(${option.icon})` }} title={option.title} onClick={option.action}>

    </span>
}

export default DriveItemOption;