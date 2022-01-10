export interface DriveItemOptionModel {
    option_rid: number
    label: string
    title: string
    icon: string
    visible: boolean
    optionCode: string
    action(): void
}