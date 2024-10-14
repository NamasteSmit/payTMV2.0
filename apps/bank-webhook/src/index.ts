import express from 'express';
import prisma from '@repo/db/client';
const app = express();
app.use(express.json());

//this is the endpoint that the hdfc bank will hit whenever user pay money to hdfc bank and hdfc bank tranfer money to my bank and say transfer is done  
app.post('/hdfcWebhook',async(req : any,res : any)=>{
    //also add zod validation here
    //check if this request actually cam from hdfc banck , use a webhook secret here
   const paymentInformation :{
    token : string;
    userId : string;
    amount : number;
   } = {
    token : req.body.token,
    userId : req.body.user_identifier,
    amount : req.body.amount,
   }
   //update balance in db and add transaction
   //here we want both of them to happen at once (all at once) or nothing happend and it rolls back
    try{
        await prisma.$transaction([
            prisma.balance.update({
               where : {
                   userId : Number(paymentInformation.userId)
               },
               data:{
                    amount :
                    {
                       increment : Number(paymentInformation.amount)
                    } 
               }
              }),
               prisma.onRampTransactions.update({
               where : {
                   token : paymentInformation.token,
               },
               data :{
                   status : "Success"
               }
              })
       ])
       
          //this is very important to send (because lets say if send something else like status code 400 , then hdfc bank will understand that there was some issue and it will send the money back to user (as we are telling hdfc that there is some thing wrong on our side))
          res.status(200).json({
           message : "captured",
          })
    }
    catch(err){
    //here we want to send status code 500 to hdfc bank and also log the error in our database
       console.log(err);
       res.status(500).json({
        message : "error while processing webhook",
       })

   }
   
 
})

app.listen(3003,()=>{
    console.log("Webhook listening on port 3003");
})