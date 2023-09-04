import Student from "@/model/studentModal"
import dynamic from "next/dynamic"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'
export async function GET() {   
    try {
        const nextCookies =  cookies();
        const token =  nextCookies.get('token')
        if(!token){
            nextCookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        try {
            
            var id =  jwt.verify(token?.value, process.env.TOKEN_SECRET)
            if(id?.isSuperAdmin){
                return NextResponse.json({ error: "SuperAdmin" }, { status: 401 });
            }
        } catch (error) {
            const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 })  
            response.cookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return response
        }

        const admin = id?.id

        const students = await Student.find({ admin: admin })
        return NextResponse.json({ students }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request){
    try {
        const nextCookies = cookies();
        const token = await nextCookies.get('token')
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
            const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 })  
            response.cookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return response
        }
        
        const {studentDetailss} = await request.json()
        console.log("🚀 ~ file: route.jsx:68 ~ PUT ~ studentDetailss:", studentDetailss)
        const { firstName, secondName, birthDate, contact } = studentDetailss
        const exist = await Student?.findOne({ contact: contact })
        console.log("🚀 ~ file: route.jsx:9 ~ POST ~ exist:", exist)
        if (exist) {
            const student = await Student.findOneAndUpdate({contact:contact}, {firstName,secondName,birthDate})
            return NextResponse.json({ message: "Student Created Successfully" }, { status: 200 })
        }
        return NextResponse.json({error:"Student Not Found"},{status:404})
        
    } catch (error) {
        console.log("🚀 ~ file: route.jsx:48 ~ PUT ~ error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}