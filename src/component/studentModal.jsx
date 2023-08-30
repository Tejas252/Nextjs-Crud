import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import StyledComponentsRegistry from "@/helpers/antdRegistery";
import { useRouter } from "next/navigation";

const studentModal = ({ student, type, onUpdate, operation, disable,...rest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const showModal = async (e) => {
    e.preventDefault();
    // await studentData();
    student && form.setFieldsValue(student);
    console.log("🚀 ~ file: updateModal.jsx:40 ~ showModal ~ record:", student);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
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
        contact: student?.contact,
      };
      const updatedStudent = await axios.put(
        "http://localhost:3000/api/students/student",
        { studentDetailss }
      );
      setIsModalOpen(false);
      onUpdate();
      updatedStudent && toast.success("Updated Successfully");
    } catch (error) {
      console.log(
        "🚀 ~ file: studentData.jsx:83 ~ handleUpdate ~ error:",
        error
      );
      toast.error(error.message);
    }
  };

  const handleAdd = async () => {
    try {
      const { firstName, secondName, birthDate, contact } =
        await form.getFieldsValue();
      const studentDetailss = {
        firstName,
        secondName,
        birthDate,
        contact,
      };
      console.log(
        "🚀 ~ file: studentModal.jsx:61 ~ handleAdd ~ studentDetailss:",
        studentDetailss
      );
      const updatedStudent = await axios.post(
        "http://localhost:3000/api/students/addStudent",
        { studentDetailss }
      );
      setIsModalOpen(false);
      onUpdate();
      updatedStudent && toast.success("Added Successfully");
    } catch (error) {
      console.log(
        "🚀 ~ file: studentData.jsx:83 ~ handleUpdate ~ error:",
        error
      );
      toast.error(error.message);
    }
  };
  // handleOK
  const handleOk = async (operation) => {
    form
          .validateFields()
          .then(values => {
            switch (operation) {
                case "STUDENT_UPDATE":
                  handleUpdate();
                  break;
                case "STUDENT_ADD":
                  handleAdd();
              }
          })
          .catch(info => {
            toast.error(info?.errorFields[0]?.errors)
          });
    
  };
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };

  //   regex
  const PhoneRegex = /^[0-9]\d{9}/;
  return (
    <StyledComponentsRegistry>
      <Button onClick={(e) => showModal(e)}  {...rest}>
        {type}
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => handleOk(operation)}
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
          <Form.Item label="FirstName" name="firstName" rules={[{ required: true, message: "Please input first name!" }]}>
            <Input placeholder="FirstName" />
          </Form.Item>
          <Form.Item label="SecondName" name="secondName" rules={[{ required: true, message: "Please input second name!" }]}>
            <Input placeholder="SecondName" />
          </Form.Item>
          {disable ?
          <Form.Item label="contact" name="contact" rules={[{ required: true, message: "Please input contact!" },{pattern:PhoneRegex,message:'Enter 10 digit number'}]}>
            <Input
              placeholder="Contact"
              value={student?.contact}
            disabled
            />
          </Form.Item>:
           <Form.Item label="contact" name="contact" rules={[{ required: true, message: "Please input contact!" },{pattern:PhoneRegex,message:'Enter 10 digit number'}]}>
           <Input
             placeholder="Contact"
             value={student?.contact}

           />
         </Form.Item>
          
        }
          <Form.Item label="BirthDate" name="birthDate">
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </StyledComponentsRegistry>
  );
};

export default studentModal;
