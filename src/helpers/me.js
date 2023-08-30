// 'use server';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server'
// import jwt from 'jsonwebtoken'

import React from 'react'

const me = async() => {
    const router = useRouter()
    const nextCookies = cookies();
            const token = await nextCookies.get('token')
            if(!token){
                nextCookies.set('token', '', {
                    httpOnly: true,
                    expires: new Date(0)
                })
                router.push('/login')
            }
            const id = await jwt.verify(token?.value, process.env.TOKEN_SECRET)
        return id?.id
    // const token = document?.cookies?.get('token') || ''
    // console.log("🚀 ~ file: me.js:4 ~ token:", token)
    // const {id} = token && jwt.verify(token?.value, process.env.TOKEN_SECRET)
   
    // return id
}
// const id = await me()

export default me
