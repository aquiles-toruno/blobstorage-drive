import DriveItemOption from "../components/driveItemOption/DriveItemOption";
import { DriveItemOptionModel } from "../models/DriveItemOptionModel";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";
import { useState } from "react";

interface DriveItemOptionsProps {
    onOptionClicked<T>(actionCode: string, args?: T): void
}

const DriveItemOptions = ({ onOptionClicked }: DriveItemOptionsProps) => {
    let baseImagePath: string = "/images/"

    const [options, setOptions] = useState<DriveItemOptionModel[]>([
        {
            option_rid: 1,
            icon: `${baseImagePath}lista.png`,
            label: "Vista de lista",
            title: "Vista de lista",
            visible: true,
            optionCode: "layout_list",
            action: () => {
                onOptionClicked("changeLayout", DriveLayoutEnum.List)

                options.filter((el) => el.optionCode === "layout_list" || el.optionCode === "layout_table").map((el) => {
                    if (el.optionCode === "layout_list")
                        el.visible = false

                    if (el.optionCode === "layout_table")
                        el.visible = true
                })
            }
        },
        {
            option_rid: 2,
            icon: `${baseImagePath}cuadricula.png`,
            label: "Vista de cuadrícula",
            title: "Vista de cuadrícula",
            visible: false,
            optionCode: "layout_table",
            action: () => {
                onOptionClicked("changeLayout", DriveLayoutEnum.Card)

                options.filter((el) => el.optionCode === "layout_list" || el.optionCode === "layout_table").map((el) => {
                    if (el.optionCode === "layout_table")
                        el.visible = false

                    if (el.optionCode === "layout_list")
                        el.visible = true
                })
            }
        }
    ])

    return (
        <>
            {
                options.filter((el) => el.visible).map((optionItem, i) => {
                    return <DriveItemOption key={optionItem.option_rid} option={optionItem} />
                })
            }
        </>
    )
}

export default DriveItemOptions;