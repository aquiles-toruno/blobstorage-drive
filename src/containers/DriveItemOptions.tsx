import DriveItemOption from "../components/driveItemOption/DriveItemOption";
import { DriveItemOptionModel } from "../models/DriveItemOptionModel";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";
import { useEffect, useState } from "react";

interface DriveItemOptionsProps {
    layout: DriveLayoutEnum
    onOptionClicked<T>(actionCode: string, args?: T): void
}

type ActionReducer<T> = {
    action: string,
    payload: T
}

const DriveItemOptions = ({ layout, onOptionClicked }: DriveItemOptionsProps) => {
    const baseImagePath: string = "/images/"

    const [options, setOptions] = useState<DriveItemOptionModel[]>([
        {
            option_rid: 1,
            icon: `${baseImagePath}lista.png`,
            label: "Vista de lista",
            title: "Vista de lista",
            visible: false,
            optionCode: "layout_list",
            action: () => {
                onOptionClicked("changeLayout", DriveLayoutEnum.List)
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
            }
        }
    ])

    useEffect(() => {
        let actionToShow: string = layout === DriveLayoutEnum.Card ? "layout_list" : "layout_table";
        let actionToHide: string = layout === DriveLayoutEnum.Card ? "layout_table" : "layout_list";

        let newArray = Reducer(options, { action: "SHOW_OPTION", payload: options.filter(el => el.optionCode === actionToShow)[0] })
        newArray = Reducer(options, { action: "HIDE_OPTION", payload: options.filter(el => el.optionCode === actionToHide)[0] })
        
        setOptions(newArray);
    }, [layout]);

    const onOptionClickedHandle = (option: DriveItemOptionModel) => {
        option.action()

        let newArray = Reducer(options, { action: "HIDE_OPTION", payload: option })

        if (option.optionCode === "layout_list") {
            newArray = Reducer(newArray, { action: "SHOW_OPTION", payload: newArray.filter(el => el.optionCode === "layout_table")[0] })
        }
        if (option.optionCode === "layout_table") {
            newArray = Reducer(newArray, { action: "SHOW_OPTION", payload: newArray.filter(el => el.optionCode === "layout_list")[0] })
        }

        setOptions(newArray)
    }

    const Reducer = (optionsArray: DriveItemOptionModel[], action: ActionReducer<DriveItemOptionModel>): DriveItemOptionModel[] => {
        const index = optionsArray.findIndex(el => el.option_rid === action.payload.option_rid);
        let newArray = [...optionsArray]

        switch (action.action) {
            case "HIDE_OPTION":
                newArray[index].visible = false;
                break;
            case "SHOW_OPTION":
                newArray[index].visible = true;
                break;
        }

        return newArray
    }

    return (
        <>
            {
                options.filter((el) => el.visible).map((optionItem, i) => {
                    return <DriveItemOption key={optionItem.option_rid} option={optionItem} onOptionClick={onOptionClickedHandle} />
                })
            }
        </>
    )
}

export default DriveItemOptions;