import React from 'react'
import Transactions from '../../../components/Transactions'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '@repo/db/client'
export default async function Transaction(){
     const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const p2pTransfer = await prisma.p2pTransfer.findMany({
      where: {
           fromUserId : Number(userId)
      },
      include :{
        fromUser : {
             select :{
              name : true
             }
        },
        toUser : {
             select :{
              name : true
             }
        }
      }
    });
    console.log("2pp2p",p2pTransfer);

  return (
    <Transactions txns={p2pTransfer}/>
  )
}
      

