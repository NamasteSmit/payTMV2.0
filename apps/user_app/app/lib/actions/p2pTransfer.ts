"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function p2pTransfer(to: string, amount: string){
    console.log(to , amount);
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return {
            message : "Error While Sending"
        }
    }
    console.log("from" , from);

    const toUser = await prisma.user.findFirst({
        where : {
            number : to
        }
    });

    console.log("to" , toUser);

    if(!toUser){
        return {
            message : "User Not Found"
        }
    }

    await prisma.$transaction(async (txn)=>{
        //THIS WIll lock our cuurent session , so that no onw can send multiple request at a time (prisma doesnt provide locks out of thr box so we use raw sql query to do locking )
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
        const fromBalance = await txn.balance.findFirst({
            where : {
                userId : Number(from)
            }
        })
        console.log("sleep");
        if(!fromBalance || fromBalance.amount < Number(amount)){
            throw new Error("Insuufficient funds");
            //   return {
            //     success : false ,
            //     message : "Insufficient funds"
            //   }
             

        }
        console.log('wake')

        await txn.balance.update({
            where : {
                userId : Number(from)
            },
            data : {
                amount : {
                    decrement : Number(amount)
                }
            }
        })

        await txn.balance.update({
            where : {
                userId : Number(toUser.id)
            },
            data : {
                amount : {
                    increment : Number(amount)
                }
            }
        })

        await txn.p2pTransfer.create({
            data : {
                amount : Number(amount),
                fromUserId : Number(from),
                timeStamp : new Date(),
                toUserId : Number(toUser.id),
                
            }
        })
    })
}