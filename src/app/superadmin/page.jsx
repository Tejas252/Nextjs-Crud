import React from "react";
import axios from "axios";
import { cookies } from 'next/headers';
import Link from "next/link";
export async function getUserData() {
  try {
    const nextCookies =  cookies();
        const token =   nextCookies.get('token')
        console.log("🚀 ~ file: page.jsx:11 ~ getUserData ~ token:", token)
      const userData = await axios.get("http://localhost:3000/api/users/user",{
          headers: {
              "token": token?.value,
              "Cookie": token
          }})
      // console.log("🚀 ~ file: page.jsx:17 ~ getUserData ~ userData:", userData)
      return userData
  } catch (error) {
   
    return error;
  }
}


const ProfilePage = async () => {
  try {
    const users = await getUserData();
    if(users?.response?.data?.error === "Unauthorized"){
      return <>{users?.response?.data?.error}</>;
    }
    return (
      <>
        <div className="container">
          <div className="row"></div>
          <div className="row h-100">
            <div className="col-4"></div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <table className="table table-hover ">
                <thead className=" text-white">
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.users?.map((user) => (
                    <tr key={user?._id}>
                      <td>{user?.email}</td>
                      <td><Link href={`/superadmin/${user?._id}`}>{user?.userName}</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <>{error.toString()}</>;
  }
};
export default ProfilePage;
