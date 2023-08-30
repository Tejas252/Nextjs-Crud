// 'use client';
import axios from "axios";
import Image from "next/image";
import React from "react";

const image = async () => {
  try {
    const base64 = await axios.post("http://localhost:3000/api/users/user");
    return base64?.data.user.profileImg;
  } catch (error) {
    return error;
  }
};

const ProfileImg = async () => {
  const base = await image();
  return (
    base && <Image src={base} alt="Profile" width={50} height={50} style={{ borderRadius: "50%",border:"2px solid white",marginLeft:'6px' }} />
  );
};

export default ProfileImg;
