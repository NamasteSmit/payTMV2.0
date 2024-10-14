'use client'
import { usePathname, useRouter } from "next/navigation";

interface SideBarComponentProps{
    title: string;
    href: string;
    icon: JSX.Element;
 
}


export const SideBarComponent = ({title , href , icon}:SideBarComponentProps)=>{
    console.log(href)
    const pathname = usePathname()
    const selected = pathname === href;
    const router = useRouter();
    return (
        <div className={`text-xl mt-5 bg-zinc-900 hover:bg-zinc-800 rounded-lg p-2 text-violet-600 w-[80%]  flex justify-between items-center cursor-pointer ${selected ? "bg-zinc-600" : ""}`} onClick={()=>{
                     router.push(href);
        }}> 
            <div className={`pr p-2`}>
                {title}
            </div>
            <div className="">
                {icon}
            </div>
        </div>
    )
}
