import User from "@/model/userModal"
import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';
import dynamic from "next/dynamic";
import me from "@/helpers/me"
import  jwt  from "jsonwebtoken";
import Student from "@/model/studentModal";

export async function GET(request) {
    await connect()
    try {
        // // me(request)
        // const token = request?.cookies?.get('token') || ''
        // console.log("🚀 ~ file: me.js:4 ~ token:", token)
        // const id  = token && jwt?.verify(token?.value, process.env.TOKEN_SECRET)
        // if(!id?.value || !id){

        //     const response = NextResponse.redirect(new URL('/login', request.url))
        //     response.cookies.set('token', token, {
        //         httpOnly: true,
        //         expires: new Date(0)
        //     })
        //     return response
        // }

        const users = await User.find({})
        return NextResponse.json({ users }, { status: 200 })
    } catch (error) {
        console.log("🚀 ~ file: route.jsx:10 ~ GET ~ error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST() {
    try {
        const nextCookies =  cookies();
        const token =   nextCookies.get('token')
        if(!token){
            nextCookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        try {
            
            var id =  jwt.verify(token?.value, process.env.TOKEN_SECRET)
        } catch (error) {
            console.log("🚀 ~ file: route.jsx:54 ~ POST ~ error:", error)
            const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 })  
            response.cookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return response
        }

        const admin = id?.id

        const user = await User.findOne({ _id: admin })
        return NextResponse.json({ user }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


