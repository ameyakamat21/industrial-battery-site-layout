import React from 'react';
import './index.css';
import DeviceInfoTable from './DeviceInfoTable';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

function FormContainer() {
  return (
    <div></div>
  )
}

function HeaderText() {
  return (
    <h1>
      Battery Site App
    </h1>
  )
}

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <h1>
          Battery Site App
        </h1>
      </Header>

    <Content className="site-layout" style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Site Specifications</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
        <DeviceInfoTable></DeviceInfoTable>
      </div>
    </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Ameya Kamat © 2023</Footer>
    </Layout>
  );
};

export default App;