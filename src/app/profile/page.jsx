'use client';
import React from 'react'
import dynamic from 'next/dynamic';
import { Spin } from 'antd';




const ProfilePage = async () => {
    const Students = dynamic(() => import("@/component/studentData"), {
        ssr: false,
        loading: () => (
          // <div className="d-flex justify-content-center align-items-center w-100">
            <Spin size="medium" />
          // </div>
        ),
      });

    return (
        <>
        <Students/>
            
        </>
    )
}
export default ProfilePage