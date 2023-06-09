import {React, useState} from 'react';
import './index.css';
import DeviceInfoTable from './DeviceInfoTable';
import OutputPanel from './OutputPanel';
import { Breadcrumb, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {

  const [boxes, setBoxes] = useState({});
  const [outputPanelState, setOutputPanelState] = useState(
    { isActive: false, 
      formValues:{}, 
      rectangularArea: {},
    }
  );
  
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
        <h1 style={{color: "white"}}>
          Battery Site Configurator
        </h1>
      </Header>

    <Content className="site-layout" style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      </Breadcrumb>
        <DeviceInfoTable 
          outputPanelState={outputPanelState} 
          setOutputPanelState={setOutputPanelState}
          boxes={boxes}
          setBoxes={setBoxes}>
        </DeviceInfoTable>
    </Content>
    <OutputPanel 
      outputPanelState={outputPanelState} 
      setOutputPanelState={setOutputPanelState}
      boxes={boxes} 
      setBoxes={setBoxes}>
    </OutputPanel>
    <Footer style={{ textAlign: 'center' }}>Created by Ameya Kamat © 2023</Footer>
    </Layout>
  );
};

export default App;