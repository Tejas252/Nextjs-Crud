"use client";
import React, { useState } from "react";
import { Layout, Spin } from "antd";
import dynamic from "next/dynamic";
const { Content } = Layout;
const Students = dynamic(() => import("@/component/studentData"), {
  ssr: false,
  loading: () => (
    // <div className="d-flex justify-content-center align-items-center w-100">
      <Spin size="medium" />
    // </div>
  ),
});
//   try {
//     const students = await axios.get(
//       "http://localhost:3000/api/students/student"
//     );
//     var dataStudent = [];
//     await students?.data?.students?.map((item) => {
//       dataStudent.push({
//         key: item._id,
//         firstName: item.firstName,
//         secondName: item.secondName,
//         contact: item.contact,
//         birthDate: item.birthDate,
//       });
//     });
//     // return dataStudent;
//   } catch (error) {
//     console.log("🚀 ~ file: studentData.jsx:28 ~ dataSource ~ error:", error.message);
//   }
//   return dataStudent;
// };
// const columsData = async () => {
//   const columns = [
//     {
//       title: "First Name",
//       dataIndex: "firstName",
//       key: "firstName",
//     },
//     {
//       title: "Second Name",
//       dataIndex: "secondName",
//       key: "secondName",
//     },
//     {
//       title: "Contact",
//       dataIndex: "contact",
//       key: "contact",
//     },
//     {
//       title: "birthDate",
//       dataIndex: "birthDate",
//       key: "birthDate",
//     },
//   ];
//   return columns;
// };

const StudentsPage = () => {
  return <Students />;
};

export default StudentsPage;
