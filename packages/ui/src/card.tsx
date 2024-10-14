"use client"
export function Card({title , children}:{
  title : string, 
  children? : React.ReactNode
}):JSX.Element{
   return (
    <div className="flex flex-col gap-4 p-10 bg-gray-800 rounded-lg">
       <h1 className="text-xl">{title}</h1>
        <div className="w-[100%] p-2">{children}</div>
    </div>
   )
}