import Nav from "@/components/header/nav";
// import close from "../../assets/icons/close1.svg";
import Image from "next/image";
import logo from "@/assets/405logo.png"
import close from "@/assets/bg/close1.svg"
import menu from "@/assets/bg/mobile/menu3.svg";
import { useToggleContext } from "@/context/toggleContext";

export default function LandingHeader() {
  const context = useToggleContext()
  console.log(`context is something else`, context)
  return (
    <>
      <header className="h-12 flex justify-between items-center bg-none p-3 absolute z-2 w-full">
        <Image src={logo} alt="logo" width={200}/>
        <nav className="max-md:hidden flex gap-3">
          {context && context.nav_links.map((nav, index) => {
            return <Nav key={index} nav={nav} />;
          })}
        </nav>
        <div className={`md:hidden hover:cursor-pointer`} onClick={context?.handleOpenClick}>
          <Image src={menu} alt="menu"/>
        </div>
        <aside className={`md:hidden absolute right-0 top-0 bg-black h-dvh w-4/5 z-99 p-4 flex flex-col ${context?.open ? '' : 'hidden'}`}>
          <div onClick={context?.handleCloseClick} className="self-end hover:cursor-pointer"><Image src={close} alt="" className="size-10"/></div>
          <nav className="flex flex-col gap-10">
            {context?.nav_links.map((nav, index) => {
              return <Nav key={index} nav={nav} />;
            })}
          </nav>
        </aside>
      </header>
    </>
  );
}
