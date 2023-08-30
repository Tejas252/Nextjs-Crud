import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModal'
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await connect()
        const { userName, password } = await request?.json();
        console.log("🚀 ~ file: route.jsx:13 ~ POST ~ userName:", userName)

        // user Exists
        const user = await User.findOne({ userName: userName })
        if (!user) {
            return NextResponse.json({ error: 'User does not exists' }, { status: 400 })
        }

        // compare password

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: 'Password does not match' }, { status: 400 })
        }
        // Buiding Token 
        const tokenData = {
            id: user.id,
        }
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        const response = NextResponse.json(
            { message: "User Authenticated", token: token, status: 200, success: true }
        )

        response.cookies.set('token', token, {
            httpOnly: true,
        })

        return response
    } catch (error) {

        console.log("🚀 ~ file: route.jsx:13 ~ POST ~ error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}