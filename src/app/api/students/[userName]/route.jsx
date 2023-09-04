import { NextResponse } from "next/server"
import Student from "@/model/studentModal"
import { headers } from "next/headers";
import jwt from 'jsonwebtoken'

export async function GET(request,{ params }) {

    const headerList = headers();
      const token = headerList.get("token");
      console.log("🚀 ~ file: route.jsx:67 ~ GET ~ token:", token)
      if(!token){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const id = await jwt.verify(token, process.env.TOKEN_SECRET);
      console.log("🚀 ~ file: route.jsx:71 ~ GET ~ id:", id)
      if(id?.isSuperAdmin){
        const student = await Student.find({admin: params?.userName});
        return NextResponse.json({ student }, { status: 200 });
      }else{
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

}