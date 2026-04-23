'use client'
import { createContext, useContext} from "react";
import type { ToggleType } from "../types/store";

export const ToggleContext = createContext<ToggleType | null>(null)

export const useToggleContext = () => {
    const context = useContext(ToggleContext)
    if (!context) return null
    return context
}