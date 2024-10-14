"use client"
import React, { useState } from 'react'
// import { Card } from '@repo/ui/card'
import { Select } from '@repo/ui/select';
import { onRampTxns } from '../app/lib/actions/onRampTxns';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

const AddmoneyCard = () => {
    const [redirectUrl , setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount , setAmount] = useState<number>(0);
    const [provider , setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
      return (
    <div className='flex flex-col p-6 bg-zinc-800 rounded-3xl'>
          <h1 className='p-2 text-2xl text-zinc-50 ml-10'>Add Money</h1>
          <div className='p-10 flex flex-col gap-2'>
              <div className='flex flex-col w-[100%] p-4 gap-2'>
                <label className='text-lg'>Amount</label>
                <input className='bg-transparent w-[100%] p-2 outline-none border-[1px] border-zinc-500 ' type="text" placeholder='Enter amount' onChange={(e)=>setAmount(Number(e.target.value))}/>
              </div>
              <div className='flex flex-col w-[100%] p-4 gap-2'>
                <label className='text-lg'>Bank</label>
                <Select  options={SUPPORTED_BANKS.map(x=>({
                    key : x.name,
                    value : x.name
                }))} onSelect={(value)=>{
                  setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?. redirectUrl || "");
                  setProvider(value);
                }
                }/>
              </div>
              <div className='w-[100%] flex justify-center items-center'>
              <button className='border-[1px] border-zinc-500 p-2 px-10' onClick={async()=>{
                const result =await onRampTxns((amount * 100).toString(),provider)
                window.location.href = redirectUrl || ""
              } 

                }>Add Money</button>
              </div>
              
          </div>
    </div>
  )
}

export default AddmoneyCard
