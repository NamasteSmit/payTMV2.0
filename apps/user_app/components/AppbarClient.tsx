"use client"

import React from 'react'
import { signIn , signOut ,useSession } from 'next-auth/react'
import { Appbar } from '@repo/ui/appbar'
import { useRouter } from 'next/navigation'

export const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();
  return (
    <div>
        <Appbar onSignout={async () =>{
           await signOut();
           router.push('/api/auth/signin')
        }} onSignin={signIn} user={session.data?.user}/>
    </div>
  )
}

export default AppbarClient
