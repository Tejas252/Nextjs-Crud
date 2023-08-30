// 'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import {cookies} from 'next/headers'
// import {Table} from 'reactstrap'

// const router = useRouter()
export async function getUserData() {
    try {
        // const userData = await fetch("http://localhost:3000/api/users/user")
        const userData = await axios.get("http://localhost:3000/api/users/user")
        

        // const token = await document.cookie.get('token')
        // console.log("🚀 ~ file: userData.jsx:13 ~ getUserData ~ token:", token)
        // console.log("🚀 ~ file: page.jsx:8 ~ getUserData ~ userData:", userData)  
        return userData

    } catch (error) {
        console.log("🚀 ~ file: page.jsx:12 ~ getUserData ~ error:", error.message)

        return error
    }

}

const userData = async () => {
    try {
        const users = await getUserData()
        // const Logout = await logout()
        // console.log("🚀 ~ file: page.jsx:19 ~ ProfilePage ~ users:", users?.data?.users)
        return (
            <>
                <div className="container">
                    <div className="row">

                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4 mt-5 p-5 bg-white rounded shadow shadow-lg border border-gray-200 border-2">
                            <table className="table table-striped table-hover table-bordered  text-center">
                             <thead className="table-dark text-white">
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

export default userData