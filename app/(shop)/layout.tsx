import Header from "@/components/shared/main-header";
import React from "react";

export default function ShopLayout({children}: Readonly<{children: React.ReactNode}>){
    return(
        <>
            <Header/>
            <main>{children}</main>
            <footer></footer>
        </>
    )
}