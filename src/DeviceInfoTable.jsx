import { Table, InputNumber,  Button, Form, Input, Card, Breadcrumb } from 'antd';
import teslaDeviceOfferings from './DeviceInfo';
import calculateRectangularArea from './Utils';

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');

function genrateBoxProperties(formInput) {
  var boxes = {};
  var boxId=0;
  var columnFillPositions = new Array(10).fill(0);
  var currCol = 0;
  var rectangularAreaRight = 0;
  var rectangularAreaBottom = 0;
  for(const deviceType in formInput) {
    var boxDimensions = teslaDeviceOfferings[deviceType].dimensions;
    var title = teslaDeviceOfferings[deviceType].short_name;
    var count = formInput[deviceType];
    for (let i = 0; i < count; i++) {
      var xPos = currCol*10;
      var yPos = columnFillPositions[currCol]
      var leftOffset = xPos * PIXELS_PER_FOOT;
      var topOffset = yPos * PIXELS_PER_FOOT;
      columnFillPositions[currCol] += boxDimensions.length;
      boxDimensions.lengthPx = boxDimensions.length * PIXELS_PER_FOOT;
      boxDimensions.widthPx = boxDimensions.width * PIXELS_PER_FOOT;

      rectangularAreaBottom = Math.max(rectangularAreaBottom, yPos + boxDimensions.length);
      rectangularAreaRight = Math.max(rectangularAreaRight, xPos + boxDimensions.width);

      var newBox = { 
        top: topOffset, 
        left: leftOffset, 
        title: title, 
        dimensions: boxDimensions,
      }

      boxes[boxId] = newBox;
      currCol = (currCol+1)%10;
      boxId += 1;
    }
  }
  return {'boxes': boxes, 
          'rectangularAreaBottom': rectangularAreaBottom, 
          'rectangularAreaRight': rectangularAreaRight
        };
}

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
                                    rules={
                                      [
                                        // { pattern: /^\d{1,3}$/, message: 'Please input a number between 0 and 500'},
                                        { transform: (val) => val <= 500 ? val : 500, message: 'Please input a number between 0 and 500'},

                                    ({ getFieldValue }) => ({
                                      validator(_, value) {

                                        if(quantity_label == "transformer") {

                                          var m2xl_count = Number(getFieldValue("meg_2xl"));
                                          var m2_count = Number(getFieldValue("meg_2"));
                                          var m_count = Number(getFieldValue("meg"));
                                          var p_count = Number(getFieldValue("power"));

                                          var totalBatteryCount = m2xl_count + m2_count + m_count + p_count;
                                          if(totalBatteryCount <= 0) {
                                            return Promise.reject(new Error("At lease 1 industrial battery is needed"));
                                          }
                                          if(value*4 <= totalBatteryCount && totalBatteryCount>=4) {
                                            return Promise.reject(new Error(`At least 1 transformer is needed per 4 industrial batteries. 
                                            Number of batteries is: ${totalBatteryCount}`));
                                          }

                                        } 
                                        return Promise.resolve();
                                      },
                                    })
                                      ]
                                    }
                                        >
                                    <Input />
                                </Form.Item>
  },
];

const tablePagination = {
    hideOnSinglePage: true
}

const onFinish = (values, setOutputPanelState, setBoxes) => {
    var boxProperties = genrateBoxProperties(values);

    setOutputPanelState({
      isActive: true, 
      formValues:values,
      rectangularArea: calculateRectangularArea(boxProperties.boxes)
    })
    setBoxes(boxProperties.boxes);
  };
  
  const onFinishFailed = (errorInfo, setOutputPanelState, setBoxes) => {
    setOutputPanelState({isActive: false, formValues:errorInfo})
    setBoxes({});
    console.log('Failed:', errorInfo);
  };

function DeviceInfoTable({outputPanelState, setOutputPanelState, boxes, setBoxes}) {
    return (
      <Card title="Site Specifications" bordered={false}>
          <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values, setOutputPanelState, setBoxes)}
          onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, setOutputPanelState, setBoxes)}
          autoComplete="off"
          >
              <Table columns={columns} dataSource={Object.values(teslaDeviceOfferings)} size="small" pagination={tablePagination} />

              <Form.Item wrapperCol={{ offset: 18, span: 4 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb> 
                <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Generate Estimate
                </Button>
              </Form.Item>
          </Form>
        </Card>
    );
}
export default DeviceInfoTable;