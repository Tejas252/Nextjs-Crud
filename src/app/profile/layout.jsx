"use client";
import axios from "axios";
import { useRouter,usePathname } from "next/navigation";
import React from "react";
import { Button, Layout, theme, Menu, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
const { Header, Content, Footer, Sider } = Layout;

const Profilelayout = ({ children }) => {
  const ProfileImg = dynamic(() => import("@/component/ProfileImg"),{
    loading:()=>(
      <Spin size="medium" />
    )
  });
  const router = useRouter();
  const path = usePathname()
  console.log("🚀 ~ file: layout.jsx:16 ~ Profilelayout ~ router:", usePathname())
  const logout = async () => {
    try {
      console.log("-------Reached Logout-------");
      const response = await axios.get(
        "http://localhost:3000/api/users/logout"
      );
      toast.success(response?.data?.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onFormLayoutChange = async ({ layout }) => {
    setFormLayout(layout);
  };
  // Handle Submitted Student Data
  const items1 = ["DashBoard"].map((key) => ({
    key: "label",
    label: key,
  }));
  const items2 = ["Students"].map((text, index) => {
    return {
      key: `/profile/${text}`,
      icon: React.createElement(UserOutlined),
      label: text,
      onClick: (e) => {
        router.push(`${e.key}`);
        // console.log(e.key)
      },
      // selected:
    };
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    // <>
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // padding: 0,
        }}
      >
        <Link
          href={"/profile"}
          style={{ color: "white" }}
        >
          Home
        </Link>
        {/* <Menu theme="dark" mode="horizontal"  items={items1} /> */}
        <div className="demo-logo">
          <Button onClick={logout} danger>
            Log-Out
          </Button>
          <ProfileImg />
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              height: "100%",
            }}
            width={200}
          >
            <Menu
              mode="inline"
              selectedKeys={[path]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
            {/* <Button style={{"margin":"10px"}}> Tom </Button> */}
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              height: "100vh",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Developed By @me  © 2022
      </Footer>
    </Layout>
  );
};

export default Profilelayout;
