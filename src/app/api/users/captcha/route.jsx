import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(request ){
    const {token} = await request?.json()
    // console.log("🚀 ~ file: route.jsx:5 ~ POST ~ token:", token)
    const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=6LcJOM4nAAAAAH_iRVkXWc2kg4F2MAKknLncOvpz&response=${token}`)
      
    //   console.log("🚀 ~ file: captcha.jsx:14 ~ handleCaptchaSubmission ~ res:", res)
      if (res.data.success) {
        return NextResponse.json({ success: true })
        // setIsverified(true)
      } else {
        return NextResponse.json({ success: false })
        // setIsverified(false)
        // toast.info("Enter Vaild Captcha")
      }
}