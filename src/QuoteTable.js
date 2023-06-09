import { Badge, Descriptions, theme } from 'antd';
import teslaDeviceOfferings from './DeviceInfo';
import FormatUSNumber from './NumberFormat';
import { QuestionCircleOutlined } from '@ant-design/icons';

function calculateQuote(formInput, rectangularArea) {
  var totalCost = 0;
  var totalEnergyMwh = 0;
  var totalFloorArea = 0;
  var rectangularArea = rectangularArea.width * rectangularArea.height;

  for(const deviceType in formInput) {
    var quantity = formInput[deviceType];
    var devicePrice =  teslaDeviceOfferings[deviceType]["cost"];
    var deviceDimensions = teslaDeviceOfferings[deviceType]["dimensions"];
    totalFloorArea += deviceDimensions["length"] * deviceDimensions["width"] * quantity;
    totalCost += quantity * devicePrice;
    totalEnergyMwh += teslaDeviceOfferings[deviceType]["energy"] * quantity;
  }
  return {
    'totalCost': totalCost, 
    'totalFloorArea': totalFloorArea, 
    'totalEnergyMwh': totalEnergyMwh,
    'energyDensityKwh': Math.round(1000 * 10 * totalEnergyMwh / rectangularArea) / 10,
  };
}

function QuoteTable({outputPanelState}) {
    
    const { token: { colorBgContainer } } = theme.useToken();
    var quoteInfo = calculateQuote(outputPanelState.formValues, outputPanelState.rectangularArea);
    return (
        <Descriptions className="site-layout">
            <Descriptions.Item label="Total cost" span={3}>
            &#36;{FormatUSNumber(quoteInfo["totalCost"])}
            </Descriptions.Item>
            <Descriptions.Item label="Rectangular land area needed" span={3}>
            {outputPanelState.rectangularArea.width * outputPanelState.rectangularArea.height} sq ft
            <span style={{width: "5px"}}></span>
            </Descriptions.Item>
            <Descriptions.Item label="Floor area needed" span={3}>
            {quoteInfo["totalFloorArea"]} sq ft
            </Descriptions.Item>
            <Descriptions.Item label="Total Energy Output" span={3}>
            {quoteInfo["totalEnergyMwh"]} MWh
            </Descriptions.Item>
            <Descriptions.Item label="Site Energy Density" span={3}>
            {quoteInfo["energyDensityKwh"]} kWh / sq ft
            </Descriptions.Item>       
        </Descriptions>
    )
}

export default QuoteTable;