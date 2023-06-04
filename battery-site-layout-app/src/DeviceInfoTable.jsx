import { Space, Table, Tag } from 'antd';
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
];
const data = [
  {
    key: '1',
    device_name: 'Megapack 2XL',
    floor_dimensions: "40ft x 10ft",
    energy: 4,
    cost: 120000,
  },
  {
    key: '2',
    device_name: 'Megapack 2',
    floor_dimensions: "30ft x 10ft",
    energy: 3,
    cost: 80000,
  },
  {
    key: '3',
    device_name: 'Megapack',
    floor_dimensions: "30ft x 10ft",
    energy: 2,
    cost: 50000,
  },
  {
    key: '3',
    device_name: 'Powerpack',
    floor_dimensions: "10ft x 10ft",
    energy: 1,
    cost: 20000,
  },
  {
    key: '3',
    device_name: 'Transformer',
    floor_dimensions: "10ft x 10ft",
    energy: -0.25,
    cost: 10000,
  },
];

const tablePagination = {
    hideOnSinglePage: true
}

function DeviceInfoTable() {
    return (
        <Table columns={columns} dataSource={data} pagination={tablePagination} />
    );
}
export default DeviceInfoTable;