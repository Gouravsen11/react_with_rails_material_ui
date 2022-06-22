import { Layout } from "antd";
import React from "react";
import Header from "./Header";
import Registration from "./Registration"
import Invitation from "./Invitation"

const { Content, Footer } = Layout;

export default () => (
  <Layout className="layout">
    <Header />
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content" style={{ margin: "100px auto" }}>
        <h1 style={{ textAlign: "center" }}>Welcome</h1>
        <br />
        <h2 style={{ textAlign: "center" }}>Invite a non app user</h2>
      </div>
      <Invitation />
    </Content>
    <Footer style={{ textAlign: "center" }}>
       ©20222.
    </Footer>
  </Layout>
);