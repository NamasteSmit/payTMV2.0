
import React from 'react'

interface txnsProps {
    id: number,
    amount: number,
    timeStamp: Date,
    fromUserId: number,
    toUserId: number,
    fromUser: { name: string | null} , // Assuming fromUser has a name property
   toUser: { name: string | null};
}

interface TransactionProps {
    txns : txnsProps[]
}

const Transactions = ({txns} : TransactionProps) => {
    console.log("txns",txns);
    const sortedTxns = txns.sort((a, b) => {
        return b.timeStamp.getTime() - a.timeStamp.getTime();
      });
  return (
    <div> 
          <div className='text-zinc-50 flex flex-col gap-4'>
              <h2 className='text-6xl'>Transactions</h2>
              {sortedTxns.map(txn => (
                  <div key={txn.id} className='flex flex-col w-[60%] border-[1px] border-zinc-800 bg-zinc-900 p-4'>
                    <div className='flex justify-between p-2 text-xl'>
                    <p>
                                {txn.fromUserId === txn.toUserId ? (
                                    `To: ${txn.toUser.name}` // If it's the same user, show only toUser
                                ) : (
                                    `From: ${txn.fromUser.name} To: ${txn.toUser.name}` // Show both names if different
                                )}
                            </p>
                        <p>${txn.amount /100}</p>
                    </div>
                    <div className='font-thin text-sm px-2'>{txn.timeStamp.getDate()} {txn.timeStamp.toLocaleString('default', { month: 'long' })}</div>
                  </div>
              ))}
             </div>
          </div>
  )
}

export default Transactions
