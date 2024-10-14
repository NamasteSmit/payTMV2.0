import { PrismaClient } from "@prisma/client";
import bycrpt from "bcryptjs"

const prisma = new PrismaClient();

async function main(){
    const alice = await prisma.user.upsert({
        where : {
            number : "11111111"
        },
        update : {},
        create : {
            number : "11111111",
            password : await bycrpt.hash('alice',10),
            name : "Alice",
            balances : {
                create : {
                    amount : 20000,
                    locked : 0
                }
            },
            onRampTransactions : {
                create : {
                    startTime : new Date(),
                    status : "Success",
                    amount : 20000,
                    token : "token_1",
                    provider : "HDFC Bank"
                }
            }
        }
    })

    const bob = await prisma.user.upsert({
        where: { number: '2222222222' },
        update: {},
        create: {
          number: '2222222222',
          password: await bycrpt.hash('bob', 10),
          name: 'bob',
          balances: {
            create: {
                amount: 2000,
                locked: 0
            }
          },
          onRampTransactions: {
            create: {
              startTime: new Date(),
              status: "Failure",
              amount: 2000,
              token: "token__2",
              provider: "HDFC Bank",
            },
        },
    },
})
}

main().then(async ()=>{
    await prisma.$disconnect()
}).catch(async (e)=>{
    console.error(e)
    await prisma.$disconnect()
})