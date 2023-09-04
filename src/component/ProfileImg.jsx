// 'use client';
import axios from "axios";
import Image from "next/image";
import React from "react";

import { redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const image = async () => {
  
  try {
    const base64 = await axios.post("http://localhost:3000/api/users/user");
    console.log("🚀 ~ file: ProfileImg.jsx:9 ~ image ~ base64:", base64)
    return base64?.data.user.profileImg;
  } catch (error) {
    
    return error;
  }
};


const logout = async (router) => {
  try {
    console.log("-------Reached Logout-------");
    const response = await axios.get(
      "http://localhost:3000/api/users/logout"
    );
    router.push("/login");
  } catch (error) {
    toast.error(error.message);
  }
};

const ProfileImg = async () => {
  const router = useRouter()
  

  const base = await image();

  // if it is Unauthorized then redirect 
  if(base?.response?.data?.error === "Unauthorized"){
    console.log('true')
    await logout(router)
    
  }

  // if oit is SuperAdmin then redirect
  if(base?.response?.data?.error === "SuperAdmin"){
    router.push('/superadmin')
  }
  return (
    base && <Image src={base} alt="Profile" width={50} height={50} style={{ borderRadius: "50%",border:"2px solid white",marginLeft:'6px' }} />
  );
};

export default ProfileImg;
