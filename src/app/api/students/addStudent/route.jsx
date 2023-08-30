import Student from "@/model/studentModal"
import dynamic from "next/dynamic"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'

export async function POST(request) {
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
        const { firstName, secondName, birthDate, contact } = studentDetailss
        console.log("🚀 ~ file: route.jsx:7 ~ POST ~ contact:", contact,typeof(contact))
        const exist = await Student?.findOne({ contact: contact })
        console.log("🚀 ~ file: route.jsx:9 ~ POST ~ exist:", exist)
        if (exist) {
            return NextResponse.json({ error: "Student already exists" }, { status: 400 })
        }
        // const me = dynamic(() => import('@/helpers/me'))
        // const id = await me()
        console.log("🚀 ~ file: route.jsx:17 ~ POST ~ id:", id)

        const newStudent = new Student({
            firstName,
            secondName,
            contact,
            admin:id?.id,
            birthDate
        })

        await newStudent.save()
        return NextResponse.json({ message: "Student Created Successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}