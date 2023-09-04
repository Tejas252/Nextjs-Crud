
import React from 'react'
import { cookies } from 'next/headers';
import axios from 'axios';
import { Table } from 'antd';


const PersonalPage = async({params}) => {
   async function getUserData() {
    try {
      const nextCookies =  cookies();
          const token =   nextCookies.get('token')
          console.log("🚀 ~ file: page.jsx:11 ~ getUserData ~ token:", token)
        const userData = await axios.get(`http://localhost:3000/api/students/${params?.id}`,{
            headers: {
                "token": token?.value,
            }})
        return userData
    } catch (error) {
      return error;
    }
  }
  
  const id = await getUserData();

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Second Name',
      dataIndex: 'secondName',
      key: 'secondName',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDate',
      key: 'birthDate',
    }

  ]
  return (
    <>
        <Table dataSource={id?.data?.student} columns={columns}>
        </Table>
    </>
  )
}

export default PersonalPage