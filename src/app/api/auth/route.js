import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
export async function GET(request) {
    try {
        const nextCookies =  cookies();
        const token =  nextCookies.get('token')
        const id =  jwt.verify(token?.value, process.env.TOKEN_SECRET)
        if(id?.isSuperAdmin){
            return NextResponse.json({message: "SuperAdmin",route: "superadmin"},{status: 200});
        }
        if(id?.value){
            return NextResponse.json({token,route: "profile"},{status: 200});
        }
        return NextResponse.json({token,route: "profile"},{status: 200});

        
    } catch (error) {
        console.log("🚀 ~ file: route.js:17 ~ GET ~ error:", error)
        const response = NextResponse.json({error: "Unauthorized",route: "login"},{status: 401});
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        return response
    }
}


