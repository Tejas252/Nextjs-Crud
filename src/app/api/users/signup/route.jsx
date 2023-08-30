import {connect} from '@/dbConfig/dbConfig';
import User from '@/model/userModal'
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import formidable from 'formidable';
import path from 'path'
import fs from "fs/promises"
// import IncomingForm from 'formidable';




export async function POST(request){
    try {
        // console.log("🚀 ~ file: route.jsx:57 ~ POST ~ imageResponse:", imageResponse)
        await connect()      
        const {userName,email,password,profileImg} =  await request?.json();
        console.log("🚀 ~ file: route.jsx:39 ~ POST ~ password:", password)
        
        // Checking User Already Exists 
        const user = await User.findOne({email: email})
        // console.log("🚀 ~ file: route.jsx:18 ~ POST ~ user:", user)
        
        if(user){
            return NextResponse.json({error: 'User already exists'},{status:400})
        }
        // hash Password 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            userName,
            email,
            password:hashedPassword,
            profileImg
        })
        // Saving User 
        const savedUser = await newUser.save()
        console.log("🚀 ~ file: route.jsx:30 ~ POST ~ savedUser:", savedUser)
        const response = await  NextResponse.json(
            { message: "User Created Successfully", user: savedUser ,status: 200, success: true }
        );
        return response

    } catch (error) {

        console.log("🚀 ~ file: route.jsx:42 ~ POST ~ error.message:", error.message)
        NextResponse.json({error: error.message},{status:500})
    }
}

