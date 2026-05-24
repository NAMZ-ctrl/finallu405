
import { insertProductSchema, ProductInterface } from "@/libs/validators";

export interface NavLink{
    route: string,
    path: string
}

export interface ToggleType{
    open: boolean,
    handleOpenClick: () => void,
    handleCloseClick: () => void,
    nav_links: NavLink[]
}

export interface ProductShape extends ProductInterface{
    id: string,
    createdAt: Date,
    updatedAt: Date
}