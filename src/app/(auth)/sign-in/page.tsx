'use client';
import {useSession, signIn, signOut} from 'next-auth/react';

export default function Component(){
    const {data: session} = useSession();
    if(session){
        return (
            <div>
                <p>Signed in as {session.user.username}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div>
            <p>Not signed in</p>
            <button className='bg-orange-500 py-1 px-2 rounded-md' onClick={() => signIn()}>Sign in</button>
        </div>
    )
}