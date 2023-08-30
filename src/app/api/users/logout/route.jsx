import { NextRequest, NextResponse } from "next/server"
// import { cookies } from 'next/headers'

export async function GET(request){
    try {
        // const cookieStore = cookies()
        // const token =  cookieStore.get('token')
        // console.log("🚀 ~ file: route.jsx:7 ~ GET ~ token:", token)
        // const url = await request.url
        //  console.log("🚀 ~ file: route.jsx:7 ~ GET ~ request.cookies.get:", NextRequest.cookies.get("token"))
        // await request.cookies.set("token","")
        // return NextResponse.cookies.set("token","")
        const response =  NextResponse.json({
            message:'Logged Out',
            status:200
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response
    } catch (error) {
        console.log("🚀 ~ file: route.jsx:10 ~ GET ~ error:", error)
        return NextResponse.json({error: error.message},{status:500})
    }
}