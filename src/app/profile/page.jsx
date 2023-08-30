// 'use client';
import React from 'react'
import axios from 'axios';

export async function getUserData() {
  try {
      const userData = await axios.get("http://localhost:3000/api/users/user")
      return userData

  } catch (error) {
      console.log("🚀 ~ file: page.jsx:12 ~ getUserData ~ error:", error.message)

      return error
  }

}

const ProfilePage = async () => {

  try {
    const users = await getUserData()
    return (
        <>
            <div className="container">
                <div className="row">

                </div>
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
                                        <td>{user?.userName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>

        </>
    )

} catch (error) {
    return <>
        {error.toString()}
    </>
}
}
export default ProfilePage