import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";


export async function GET(){
    try{ 
        const session = await getServerSession(authOptions);
        console.log("ses",session);
        if(session?.user){
          return NextResponse.json({
            user : session.user
          })
        }

    }catch(err){
        return NextResponse.json({
            message : "Server Error"
        })
    }
    return NextResponse.json({
        message : "Server Error"
    })
      
}