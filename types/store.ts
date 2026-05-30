

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
