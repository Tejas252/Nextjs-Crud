import User from "@/model/userModal";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

connect();

export async function GET(request) {
  try {
    const headerList = headers();
      const token = headerList.get("token");
      
    // const token = request.cookies.get("token");
      // console.log("🚀 ~ file: route.jsx:16 ~ GET ~ request.cookies:", request.cookies)
      console.log("🚀 ~ file: route.jsx:67 ~ GET ~ token:", token)

      // Has Token 
      if(!token){
            const response = NextResponse.redirect(new URL("/login", request.url),{status: 302});  
            response.cookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return response
      }

      // verifing token 
      const id =  jwt.verify(token, process.env.TOKEN_SECRET);
      console.log("🚀 ~ file: route.jsx:71 ~ GET ~ id:", id)

      // Checking Is Super Admin 
      if(id?.isSuperAdmin){
        const users = await User.find({});
        return NextResponse.json({ users }, { status: 200 });
      }else{
        console.log('redirecting')
        // const response = NextResponse.redirect(new URL("/login", request.url));
        // response.cookies.set("token", "", {
        //   httpOnly: true,
        //   expires: new Date(0),
        // })
        // return response
        const response = NextResponse.redirect(new URL("/login", request.url),{status: 302});  
        response.cookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return response
      }
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", request.url),{status: 302});  
    response.cookies.set('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            return response
  }
}

export async function POST(request) {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token");
    // const token = await request.cookies.get("token");
    console.log("🚀 ~ file: route.jsx:105 ~ POST ~ token:", token)
    if (!token) {
      await nextCookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      const response =  NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      return response
    }
    try {
      var id = jwt.verify(token?.value, process.env.TOKEN_SECRET);
      if(id?.isSuperAdmin){
        return NextResponse.json({ error: "SuperAdmin" }, { status: 401 });
      }
    } catch (error) {
      console.log("🚀 ~ file: route.jsx:54 ~ POST ~ error:", error);
      const response = NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
      nextCookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      // response.cookies.set("token", "", {
      //   httpOnly: true,
      //   expires: new Date(0),
      // });
      return response;
    }

    const admin = id?.id;

    const user = await User.findOne({ _id: admin });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
