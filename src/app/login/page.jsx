"use client";

// import React from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";

// React Hookes
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { Teko } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
// Font
const teko = Teko({
  subsets: ["latin"],
  weight: "400",
});

const LoginPage = () => {
  // regex dec
  const regexPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  // States
  const [userDetails, setUserDetails] = useState({});

  //Router
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    if (userDetails?.userName && userDetails?.password) {
      if (regexPassword.test(userDetails.password)) {
        try {
          //  create User
          const response = await axios.post(
            "http://localhost:3000/api/users/login",
            userDetails
          );
          console.log('🚀 ~ file: page.jsx:31 ~ handleClick ~ response:', response)
          if(response?.data.isSuperAdmin){
            console.log("🚀 ~ file: page.jsx:43 ~ handleClick ~ response:", response?.data?.isSuperAdmin)
            router.push("/superadmin");
          }else{
            router.push("/profile");
          }
          toast.success(response.data.message);
          setUserDetails({});
          // router.push("/profile");
        } catch (error) {
          toast.error(error?.response?.data?.error);
        }
      } else {
        !regexPassword.test(userDetails.password)
          ? toast.error("Input Correct Formated Password")
          : toast.error("Input Correct Formated Email");
      }
    } else {
      toast.error("Input All Details");
    }
  };

  // handle Changed Value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <main className='d-flex justify-content-center align-items-center'>
      
      {/* Signup Form  */}
      <div className='container my-5'>
        <Form className="mt-5" onSubmit={handleClick}>
          <div className="row g-3 my-5">
            <div className="col-2"></div>
            <div className="col-4  text-white d-flex justify-content-center align-items-center">
              <Image src="/next.svg" width={400} height={400} alt="Photo"  className="" />
            </div>
            <div className="col-4 bg-dark text-white p-5">

              <h1 className='from-heading text-center '>Login</h1>

              <FormGroup>
                <Label for="userName">userName</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="UserName"
                  name="userName"
                  value={userDetails?.userName || ""}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password  ">Password</Label>
                <Input
                  id="password "
                  type="password"
                  invalid={
                    userDetails?.password &&
                    !regexPassword.test(userDetails.password)
                  }
                  placeholder="password"
                  value={userDetails?.password || ""}
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <span className="errorMsg">
                  {!regexPassword.test(userDetails.password) &&
                    userDetails.password &&
                    "Must Contain 8 combination of a-Z 1-9 @_"}
                </span>
              </FormGroup>
              <div className="d-grid gap-2">
                <Link className="color-text" href="/signup"> Don't have an account</Link>
                <Button className=" " color="primary">
                  Log in
                </Button>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </Form>
      </div>
      {/* <div className="container" style={{ position: "relative" }}>
        <Form onSubmit={handleClick}>
          <div className="row  gap-4">
            <div className="col-4"></div>
            <div className="col-4">
              <h1 className="from-heading text-center">Log in</h1>

             
            </div>
            <div className="col-4"></div>
          </div>
        </Form>
      </div> */}
    </main>
  );
};
export default LoginPage;
