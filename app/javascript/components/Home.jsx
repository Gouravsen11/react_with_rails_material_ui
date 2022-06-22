import { Layout } from "antd";
import React from "react";
import Header from "./Header";
import Registration from "./Registration"

const { Content, Footer } = Layout;

export default () => (
  <Layout className="layout">
    <Header />
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content" style={{ margin: "100px auto" }}>
        <Registration />
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
       ©20222.
    </Footer>
  </Layout>
);