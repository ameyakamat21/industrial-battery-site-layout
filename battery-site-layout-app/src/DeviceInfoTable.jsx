import { Space, Table, Tag,  Button, Form, Input, Card, Breadcrumb } from 'antd';
import teslaDeviceOfferings from './DeviceInfo';

const columns = [
  {
    title: 'Device Name',
    dataIndex: 'device_name',
    key: 'device_name',
    render: (text) => text,
  },
  {
    title: 'Floor Dimensions',
    dataIndex: 'dimensions',
    key: 'dimensions',
    render: (dimens) => <p>{dimens["length"]}ft x {dimens["width"]}ft</p>
  },
  {
    title: 'Energy Output',
    dataIndex: 'energy',
    key: 'energy',
    render: (energy_value) => <p>{energy_value} MWh</p>
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
    render: (cost) => <p>&#36;{cost}</p>
  },
  {
    title: 'Release Year',
    dataIndex: 'release_date',
    key: 'release_date',
  },

  {
    title: 'Quantity',
    dataIndex: 'quantity_label',
    key: 'quantity_label',
    render: (quantity_label) => <Form.Item
                                    label=""
                                    name={quantity_label}
                                    rules={[{ required: true, message: 'Please input quantity' }]}
                                        >
                                    <Input />
                                </Form.Item>
  },
];

const tablePagination = {
    hideOnSinglePage: true
}

const onFinish = (values, setOutputPanelState) => {
    setOutputPanelState({isActive: true, formValues:values})
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo, setOutputPanelState) => {

    setOutputPanelState({isActive: false, formValues:errorInfo})
    console.log('Failed:', errorInfo);
  };

function DeviceInfoTable({outputPanelState, setOutputPanelState}) {
    return (
      <Card title="Site Specifications" bordered={false}>
          <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values, setOutputPanelState)}
          onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, setOutputPanelState)}
          autoComplete="off"
          >
              <Table columns={columns} dataSource={Object.values(teslaDeviceOfferings)} pagination={tablePagination} />

              <Form.Item wrapperCol={{ offset: 18, span: 4 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb> 
                <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Generate layout
                </Button>
              </Form.Item>
          </Form>
        </Card>
    );
}
export default DeviceInfoTable;