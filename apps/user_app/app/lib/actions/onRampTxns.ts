"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";



export async function onRampTxns(amount : string , provider : string){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    if(!session?.user || !session?.user?.id){
        return {
            statusCode: 401,
            message: "Unauthorized" ,
        }
    }
     const token = Math.random().toString();

    await prisma.onRampTransactions.create({
        data : {
           status : "Processing",
           token : token,
           provider : provider,
           amount : Number(amount),
           startTime : new Date(),
            userId : Number(userId),
        }
    })

    return {
        message : "On ramp transaction added"
    }


 
}