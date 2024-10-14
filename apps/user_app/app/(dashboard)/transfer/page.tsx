import React from 'react'
import AddmoneyCard from '../../../components/AddmoneyCard'
import {BalanceCard} from '../../../components/BalanceCard'
import { OnRampTransactions } from '../../../components/OnRampTransaction'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '@repo/db/client'
async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransactions.findMany({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where : {
      userId : Number(session?.user?.id)
    }
  })

  return {
    amount : balance?.amount || 0,
    locked : balance?.locked || 0
  }
}


const page = async() => {
  const transactions = await getOnRampTransactions();
  const balance = await getBalance();
  return (
    <div className='text-zinc-50 flex flex-col w-[100%]'>
        <div className='w-[100%]  p-4 text-4xl font-semibold'>
          <h1>Transfer</h1>
        </div>
        <div className='flex justify-center'>
            <div className='w-[40%] mt-10'>
              <AddmoneyCard/>
            </div>
            <div className='w-[60%] h-[100%] flex flex-col gap-4  p-10'>
                  <BalanceCard amount={balance.amount} locked={balance.locked}/>
                 <OnRampTransactions transactions={transactions}/>
            </div>
        </div>
    </div>
  )
}

export default page
