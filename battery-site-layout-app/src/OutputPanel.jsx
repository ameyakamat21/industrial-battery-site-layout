import {React, useState} from 'react';
import './index.css';
import DragAndDropPanel from './DragAndDropPanel';
import { Breadcrumb, Layout, Menu, Empty,  Card, Col, Row, theme } from 'antd';
import QuoteTable from './QuoteTable';

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');
const { Header, Content, Footer } = Layout;

function OutputPanel({outputPanelState, setOutputPanelState, boxes, setBoxes}) {

    const { token: { colorBgContainer } } = theme.useToken();
    if(outputPanelState["isActive"]) { 
        return (
            <Layout  className="site-layout" style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <Content style={{ minHeight: 280 }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card  title="Site Layout" bordered={false} style={{overflow: "auto"}}>
                            <DragAndDropPanel 
                                outputPanelState={outputPanelState}
                                setOutputPanelState={setOutputPanelState} 
                                boxes={boxes} 
                                setBoxes={setBoxes}>
                            </DragAndDropPanel>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Bill of materials" bordered={false}>
                            <QuoteTable outputPanelState={outputPanelState}></QuoteTable>
                        </Card>
                    </Col>
                </Row>

            </Content>
                
            </Layout>
        )
    }  else {
        return (
            <></>
        )
    }
}

export default OutputPanel;