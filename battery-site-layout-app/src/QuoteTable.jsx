import { Badge, Descriptions, theme } from 'antd';
import teslaDeviceOfferings from './DeviceInfo';

function calculateQuote(formInput) {
  var totalCost = 0;
  var totalEnergyMwh = 0;
  var totalFloorArea = 0;

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
    'energyDensityKwh': Math.round(1000 * 10 * totalEnergyMwh / totalFloorArea) / 10,
  };
}

function QuoteTable({formInput}) {

    const { token: { colorBgContainer } } = theme.useToken();
    var quoteInfo = calculateQuote(formInput);
    return (
        <Descriptions className="site-layout">
            <Descriptions.Item label="Total cost" span={3}>
            &#36;{quoteInfo["totalCost"]}
            </Descriptions.Item>
            <Descriptions.Item label="Total Floor area" span={3}>
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