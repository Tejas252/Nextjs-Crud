import { Button, Table } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const { Column } = Table;

const dataSource = async () => {
  try {
    const students = await axios.get(
      "http://localhost:3000/api/students/student"
    );
    var dataStudent = [];
    students?.data?.students?.map((item) => {
      dataStudent.push({
        key: item._id,
        firstName: item.firstName,
        secondName: item.secondName,
        contact: item.contact,
        birthDate: item.birthDate,
      });
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: studentData.jsx:28 ~ dataSource ~ error:",
      error.message
    );
  }
  return dataStudent;
};

const StudentModal = dynamic(() => import("./studentModal"), {
  ssr: false,
  // loading: () => (
  //   <div className="d-flex justify-content-center align-items-center w-100 h-100">
  //     <Spin size="medium" />
  //   </div>
  // )
})

// const UpdateModal = dynamic(() => import("./updateModal"), {
//   ssr: false,
//   loading: () => (
//     <div className="d-flex justify-content-center align-items-center w-100 h-100">
//       <Spin size="medium" />
//     </div>
//   ),
// });

const studentData = async () => {
  const [tableData, setTableData] = useState();

  // Effect When render
  useEffect(() => {
    (async () => {
      const data = await dataSource();
      setTableData(data);
    })();
  }, [dataSource, setTableData]);

  // Delete Function
  const handleDelete = async (contact) => {
    try {
      const answer = confirm("Are you sure you want to delete this student?");
      if (!answer) return;
      const student = await axios.delete(
        `http://localhost:3000/api/students/student/${contact}`
      );
      student && toast.success("Deleted Successfully");
      handleUpdate();
    } catch (error) {
      console.log(
        "🚀 ~ file: studentData.jsx:70 ~ handleDelete ~ error:",
        error
      );
      toast.error(error.message);
    }
  };
  const handleUpdate = async () => {
    const newData = await dataSource();
    setTableData(newData);
  };

  return (
    <>
     <StudentModal
        onUpdate={() => handleUpdate()}
        operation="STUDENT_ADD"
        type="add"
        style={{"float":"right", "marginRight":"20px", "marginBottom":"20px"}}
        className="btn btn-dark btn-sm "
      />
      {tableData && (
        <Table dataSource={tableData}>
          <Column
            title="First Name"
            dataIndex="firstName"
            key="firstName"
            render={(text, record) => (
              <Link href={`/profile/Students/${record.key}`}>{text}</Link>
            )}
          />
          <Column title="SecondName" dataIndex="secondName" key="secondName" />
          <Column title="Contact" dataIndex="contact" key="contact" />
          <Column title="Birth-Date" dataIndex="birthDate" key="birthDate" />
          <Column
            title="Operation"
            key="birthDate"
            render={(_, record) => (
              <>
                <Button onClick={() => handleDelete(record.contact)}>
                  Delete
                </Button>
                {"   "}
                {/* <UpdateModal
                  contact={record.contact}
                  student={record}
                  onUpdate={() => handleUpdate()}
                /> */}
                <StudentModal
                  student={record}
                  onUpdate={() => handleUpdate()}
                  operation={"STUDENT_UPDATE"}
                  type={'Update'}
                  disable={true}
                />
              </>
            )}
          />
        </Table>
      )}
    </>
  );
};

export default studentData;
