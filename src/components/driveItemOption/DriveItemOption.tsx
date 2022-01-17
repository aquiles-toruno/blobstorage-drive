import { DriveItemOptionModel } from "../../models/DriveItemOptionModel"

interface DriveItemOptionProps {
    option: DriveItemOptionModel
    onOptionClick(option: DriveItemOptionModel): void
}

const DriveItemOption = ({ option, onOptionClick }: DriveItemOptionProps) => {
    return <span style={{ height: "24px", width: "24px", margin: "3px", display: "inline-block", cursor: "pointer", backgroundImage: `url(${option.icon})` }} title={option.title} onClick={() => onOptionClick(option)}>

    </span>
}

export default DriveItemOption;