"use client";

import { ToggleContext } from "@/context/toggleContext";
import React, { useState } from "react";
import { NavLink } from "@/types/store";

export const ToggleProvider = ({ children }: {children : React.ReactNode}) => {
  const [open, setOpen] = useState<boolean>(false);

  const nav_links: NavLink[] = [
    {
        route: 'Home',
        path: "/"
    },
    {
      route: "Shop",
      path: "/collections/all-products",
    },
  ];

  const handleOpenClick = () => {
    console.log('hello world i am the one')
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const value = { open, handleOpenClick, handleCloseClick, nav_links };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};
