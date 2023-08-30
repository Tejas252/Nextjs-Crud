import Student from "@/model/studentModal"
import { NextResponse } from "next/server"
import { useRouter } from "next/navigation"
export  async function DELETE(request,{params}){
    // console.log("🚀 ~ file: route.js:5 ~ DELETE ~ params:", params)
    try {

        console.log('i am here')
        const {contact} = params
        // const {contact} = await request.json()
        // console.log("🚀 ~ file: route.jsx:46 ~ DELETE ~ request?.json():", query.contact)
        // console.log("🚀 ~ file: route.jsx:46 ~ DELETE ~ number:", contact)

        const student = await Student.deleteOne({contact:contact})

        return NextResponse.json({student} ,{ status: 200 })
    } catch (error) {
        console.log("🚀 ~ file: route.jsx:54 ~ DELETE ~ error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(request,{params}){
    // console.log("🚀 ~ file: route.js:24 ~ GET ~ request:", request)
    try {
        console.log("🚀 ~ file: route.js:24 ~ GET ~ params:", params)
        const {contact} = params
        const student = await Student.findOne({contact:contact})
        if(!student){
            return NextResponse.json({ error: "Student not found" }, { status: 404 })
        }
        return NextResponse.json({student} ,{ status: 200 })
    } catch (error) {
        console.log("🚀 ~ file: route.js:27 ~ GET ~ error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

