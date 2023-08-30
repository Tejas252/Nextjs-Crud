import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import StyledComponentsRegistry from "@/helpers/antdRegistery";
import { useRouter } from "next/navigation";

const updateModal = async ({ contact, onUpdate,student }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter()
  // render Student Data
  // const studentData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3000/api/students/student/${contact}`
  //     );
  //     const { firstName, secondName, birthDate } = res.data?.student;
  //     console.log(
  //       "🚀 ~ file: updateModal.jsx:27 ~ studentData ~ res.data?.student:",
  //       res.data?.student
  //     );
  //     form.setFieldsValue({
  //       firstName: firstName,
  //       secondName: secondName,
  //       birthDate: birthDate,
  //     });
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: updateModal.jsx:25 ~ studentData ~ error:",
  //       error
  //     );
  //     toast.error(error.message);
  //   }
  // };

  const showModal = async (e) => {
    e.preventDefault();
    // await studentData();
    form.setFieldsValue(student);
    console.log("🚀 ~ file: updateModal.jsx:40 ~ showModal ~ record:", student)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // update Function
  const handleUpdate = async () => {
    try {
      
      const { firstName, secondName, birthDate } = await form.getFieldsValue();
      const studentDetailss = {
        firstName,
        secondName,
        birthDate,
        contact:student.contact
      };
      const updatedStudent = await axios.put(
        "http://localhost:3000/api/students/student",
        { studentDetailss }
        );
        setIsModalOpen(false);
        // onUpdate()
        updatedStudent && toast.success("Updated Successfully");
        
    } catch (error) {
      console.log(
        "🚀 ~ file: studentData.jsx:83 ~ handleUpdate ~ error:",
        error
      );
      toast.error(error.message);
    }
  };
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  // await studentData();
  return (
    <StyledComponentsRegistry>
      <Button onClick={(e) => showModal(e)} loading={false}>Update</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          {...formItemLayout}
          layout={"horizontal"}
          form={form}
          initialValues={{ layout: "horizontal" }}
          // onValuesChange={onFormLayoutChange}
          style={{ maxWidth: "horizontal" === "inline" ? "none" : 600 }}
        >
          <Form.Item label="FirstName" name="firstName">
            <Input placeholder="FirstName" />
          </Form.Item>
          <Form.Item label="SecondName" name="secondName">
            <Input placeholder="SecondName" />
          </Form.Item>
          <Form.Item label="contact" name="contact">
            <Input placeholder="Contact" value={student.contact} disabled />
          </Form.Item>
          <Form.Item label="BirthDate" name="birthDate">
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </StyledComponentsRegistry>
  );
};

export default updateModal;
