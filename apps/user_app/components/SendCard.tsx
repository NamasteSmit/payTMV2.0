"use client"
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const SendCard = ()=>{
    const [amount , setAmount] = useState<string>("");
  const [number , setNumber] = useState<string>("");

    return <div className='w-[100%] min-h-screen flex justify-center items-center'>
    <div className='w-[40%]'>
        <Card title='Send'> 
          <div className='flex flex-col gap-2'>
            <label className='text-xl text-zinc-50'>Number</label>
            <input className='p-2 bg-transparent outline-none border-[1px] border-zinc-500 text-zinc-100' type="text" placeholder='Number' required onChange={(e)=>setNumber(e.target.value)}/>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-xl text-zinc-50'>Amount</label>
            <input className='p-2 bg-transparent outline-none border-[1px] border-zinc-500 text-zinc-100' type="text" placeholder='Amount' required onChange={(e)=>setAmount(e.target.value)}/>
          </div>
          <div className='p-2 flex justify-center items-center mt-8'>
            <button className='rounded-md p-2 bg-zinc-950 text-zinc-300 px-12' onClick={async()=>{
              const result = await p2pTransfer(number, (Number(amount)* 100).toString());
              setNumber('');
              setAmount('');
            }}>Send</button>
          </div>
        </Card>
    </div>
    </div>
} 