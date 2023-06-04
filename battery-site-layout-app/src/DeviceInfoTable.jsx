import { Space, Table, Tag,  Button, Form, Input } from 'antd';
const columns = [
  {
    title: 'Device Name',
    dataIndex: 'device_name',
    key: 'device_name',
    render: (text) => text,
  },
  {
    title: 'Floor Dimensions',
    dataIndex: 'floor_dimensions',
    key: 'floor_dimensions',
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
const data = [
  {
    key: '1',
    device_name: 'Megapack 2XL',
    floor_dimensions: "40ft x 10ft",
    energy: 4,
    cost: 120000,
    release_date: 2022,
    quantity: 0,
    quantity_label: "meg_2xl",
  },
  {
    key: '2',
    device_name: 'Megapack 2',
    floor_dimensions: "30ft x 10ft",
    energy: 3,
    cost: 80000,
    release_date: 2021,
    quantity: 0,
    quantity_label: "meg_2",
  },
  {
    key: '3',
    device_name: 'Megapack',
    floor_dimensions: "30ft x 10ft",
    energy: 2,
    cost: 50000,
    release_date: 2005,
    quantity: 0,
    quantity_label: "meg",
  },
  {
    key: '4',
    device_name: 'Powerpack',
    floor_dimensions: "10ft x 10ft",
    energy: 1,
    cost: 20000,
    release_date: 2000,
    quantity: 0,
    quantity_label: "power",
  },
  {
    key: '5',
    device_name: 'Transformer',
    floor_dimensions: "10ft x 10ft",
    energy: -0.25,
    cost: 10000,
    release_date: "-",
    quantity: 0,
    quantity_label: "transformer",
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
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values, setOutputPanelState)}
        onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, setOutputPanelState)}
        autoComplete="off"
        >
            <Table columns={columns} dataSource={data} pagination={tablePagination} />

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Generate layout
            </Button>
            </Form.Item>
        </Form>
    );
}
export default DeviceInfoTable;