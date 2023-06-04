import {React, useState} from 'react';
import './index.css';
import { Breadcrumb, Layout, Menu, Empty,  Card, Col, Row, theme } from 'antd';

const { Header, Content, Footer } = Layout;

function OutputPanel({outputPanelState}) {

    const { token: { colorBgContainer } } = theme.useToken();
    if(outputPanelState["isActive"]) { 
        return (
            <Layout  className="site-layout" style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Site Layout</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ minHeight: 280 }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card  title="Site Layout" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Bill of materials" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>

            </Content>
                
            </Layout>
        )
    }  else {
        return (
            <Content className="site-layout" style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Site Layout</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <Empty></Empty>
            </div>
            </Content> 
        )
    }
}

export default OutputPanel;