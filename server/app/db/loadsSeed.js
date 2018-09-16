const path = require('path');

const LoadsData = [
  {
    bookDate: "08/31/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "0277377",
    brokerName: "Transplace",
    pickUpCityState: "Columbus, IN",
    dropOffCityState: "Louisville, KY",
    pickUpAddress: "4411 N Long Rd, Columbus, IN 47203",
    dropOffAddress: "2000 Nelson Miller Pkwy, Louisville, KY 40223",
    payment: 600,
    loadedMiles: 85,
    emptyMiles: 207,
    mileage: 0,
    dollarPerMile: 0,
    dieselPrice: 3.22,
    fuelCost: 0,
    driverPay: 160.6,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpense: 0,
    profit: 0,
    commodity: "NA",
    weight: 38738,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/083118_Transplace.pdf"
    )
  },
  {
    bookDate: "09/05/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "0012104",
    brokerName: "Reliable Source Logistics",
    pickUpCityState: "Orestes, IN",
    dropOffCityState: "Concord, NH",
    brokerName: "Reliable Source Logistics",
    pickUpAddress: "120 W Oak St, Orestes, IN 46063",
    dropOffAddress: "Concord, NH 03301",
    payment: 2700,
    loadedMiles: 970,
    emptyMiles: 136,
    mileage: 0,
    dollarPerMile: 0,
    dieselPrice: 3.22,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpense: 0,
    profit: 0,
    commodity: "Canned Foods",
    weight: 42120,
    trailer: "Van or Reefer",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    bookDate: "09/07/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "99810",
    brokerName: "Transportation One",
    pickUpCityState: "Rutland, VT",
    dropOffCityState: "Cincinnati, OH",
    brokerName: "Transportation One",
    pickUpAddress: "92 Park Street, Rutland, VT 05701",
    dropOffAddress: "535 Shepherd Ave, Cincinnati, OH 45215",
    payment: 1200,
    loadedMiles: 842,
    emptyMiles: 105,
    mileage: 0,
    dollarPerMile: 0,
    dieselPrice: 3.22,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpense: 0,
    profit: 0,
    commodity: "Crackers FSC",
    weight: 12680,
    trailer: "53V",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  },

  {
    bookDate: "09/10/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "AMLO260554LN",
    brokerName: "Amstan Logistics",
    pickUpCityState: "Fairfield, OH",
    dropOffCityState: "Pleasant Prairie, WI",
    brokerName: "Amstan Logistics",
    pickUpAddress: "4255 Thunderbird Lane, Fairfield, OH 45014",
    dropOffAddress: "13305 104th St, Pleasant Prairie, WI 53158",
    payment: 750,
    loadedMiles: 357,
    emptyMiles: 5,
    mileage: 0,
    dollarPerMile: 0,
    dieselPrice: 3.22,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpense: 0,
    profit: 0,
    commodity: "NA",
    weight: 30687,
    trailer: "53V/R",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  },
  {
    bookDate: "09/11/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "0123724",
    brokerName: "Axle Logistics",
    pickUpCityState: "Aurora, IL",
    dropOffCityState: "Taylor, PA",
    pickUpAddress: "800 Bilter Rd, Aurora, IL 60502",
    dropOffAddress: "22 Stauffer Industrial Park, Taylor, PA 18517",
    payment: 2050,
    loadedMiles: 737,
    emptyMiles: 72,
    mileage: 0,
    dollarPerMile: 0,
    dieselPrice: 3.22,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpense: 0,
    profit: 0,
    commodity: "Packaging Materials",
    weight: 20000,
    trailer: "Van or Reefer",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  },

];

module.exports = LoadsData;
