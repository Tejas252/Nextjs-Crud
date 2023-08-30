'use client';

// import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios"

// React Hookes 
import React, { useState, } from 'react'
import { toast } from 'react-hot-toast';
import { Button, Form, FormGroup, Label,Input } from 'reactstrap';
// import {Input} from 'antd'

// import Captcha from '@/component/captcha'
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
const Captcha = dynamic(() => import('@/component/captcha'),{
  ssr:false,
  loading:()=>(
    <Spin/>
  )
})
const SignupPage = () => {
  // regex dec 
  const regexPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
  const regexEmail = /^[.a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  // States 
  const [userDetails, setUserDetails] = useState({})
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState();

  // Router 
  const router = useRouter()
  const handleClick = async (e) => {
    console.log(e)
    e.preventDefault()
    if (userDetails?.userName && userDetails?.email && userDetails?.password) {
      if (regexPassword.test(userDetails.password) && regexEmail.test(userDetails?.email)) {
        try {
          //  create User 
          const response = await axios.post("/api/users/signup", userDetails)
          toast.success(response.data.message)
          setUserDetails({})
          router.push('/login')

        } catch (error) {

          toast.error(error?.response?.data?.error)
        }

      } else {

        !regexPassword.test(userDetails.password) ? toast.error('Input Correct Formated Password') :
          toast.error('Input Correct Formated Email')
      }
    } else {
      toast.error('Input All Details');
    }
  }

  // handle Changed Value  
  const handleChange = (e) => {
    const {name,value} = e.target
    setUserDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

    //   Image ONload Function 
    const convertBase64 = async(file) => {
      const imgData = URL.createObjectURL(file)
      console.log("🚀 ~ file: page.jsx:65 ~ convertBase64 ~ imgData:", imgData)
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
              setImage(URL.createObjectURL(file))
              resolve(fileReader.result);

          }
          fileReader.onerror = (error) => {
              reject(error);
          }
      })
  }

  const handleFileRead = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setUserDetails((userDetails) => ({ ...userDetails, profileImg:base64 }))

    
  }

  return (
    <>
      {/* Signup Form  */}
      <div className='container my-5 '>
        <Form onSubmit={handleClick}>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-4 bg-dark text-white p-5">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="Photo" />
            </div>
            <div className="col-4 bg-dark text-white p-5">

              <h1 className='from-heading text-center '>Signup</h1>

              <FormGroup>
                <Label for="userName" className='text-white'>userName</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="UserName"
                  value={userDetails?.userName || ""}
                  name='userName'
                  onChange={e => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email" className='text-white'>Email</Label>
                <Input id="email" type="text" placeholder='Email' invalid={(userDetails?.email && !regexEmail.test(userDetails?.email))} value={userDetails?.email || ""} name='email' onChange={e => handleChange(e)} />
                <span className='errorMsg'>{
                  (!regexEmail.test(userDetails.email)) && (userDetails.email) &&
                  ("Enter Vaild Email")
                }</span>
              </FormGroup>
              <FormGroup>
                <Label for="password" className='text-white'>Password</Label>
                <Input id="password" type="password" invalid={(userDetails?.password && !regexPassword.test(userDetails.password))} placeholder='password' value={userDetails?.password || ""} name='password' onChange={e => handleChange(e)} />
                <span className='errorMsg'>{
                  (!regexPassword.test(userDetails.password)) && (userDetails.password) &&
                  ("Must Contain 8 combination of a-Z 1-9 @_")
                }</span>
              </FormGroup>
              <FormGroup>
                <Label for="profileImg" className='text-white'>Prifile Image</Label>
                <Input id="profileImg" type="file" name='file' onChange={handleFileRead} />
              </FormGroup>
              <Captcha />
            </div>
            <div className="col-2"></div>
          </div>
        </Form>
      </div>
    </>
  )
}
export default SignupPage
