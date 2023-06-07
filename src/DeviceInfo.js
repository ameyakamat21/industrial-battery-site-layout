const teslaDeviceOfferings = {
    'meg_2xl': {
      key: '1',
      device_name: 'Megapack 2XL',
      short_name: 'Mega 2XL',
      dimensions: {length: 40, width: 10},
      energy: 4,
      cost: 120000,
      release_date: 2022,
      quantity: 0,
      quantity_label: "meg_2xl",
    },
    'meg_2': {
      key: '2',
      device_name: 'Megapack 2',
      short_name: 'Mega 2',
      dimensions: {length: 30, width: 10},
      energy: 3,
      cost: 80000,
      release_date: 2021,
      quantity: 0,
      quantity_label: "meg_2",
    },
    'meg':  {
      key: '3',
      device_name: 'Megapack',
      short_name: 'Mega',
      dimensions: {length: 30, width: 10},
      energy: 2,
      cost: 50000,
      release_date: 2005,
      quantity: 0,
      quantity_label: "meg",
    },
    'power': {
      key: '4',
      device_name: 'Powerpack',
      short_name: 'Powerpack',
      dimensions: {length: 10, width: 10},
      energy: 1,
      cost: 20000,
      release_date: 2000,
      quantity: 0,
      quantity_label: "power",
    },
    'transformer': {
      key: '5',
      device_name: 'Transformer',
      short_name: 'Transformer',
      dimensions: {length: 10, width: 10},
      energy: -0.25,
      cost: 10000,
      release_date: "-",
      quantity: 0,
      quantity_label: "transformer",
    },
};

  export default teslaDeviceOfferings;