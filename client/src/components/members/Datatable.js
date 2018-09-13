const path = require("path");

const Datatable = [
  {
    bookDate: "08/31/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "0277377",
    brokerName: "Transplace",
    amount: 600,
    loadedMiles: 85,
    emptyMiles: 207,
    mileage: 0,
    dollarPerMile: 0,
    dieselPrice: 3.22,
    fuelCost: 0,
    driverPay: 160.6,
    dispatchFee: 60,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpense: 0,
    profit: 0,
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
    amount: 2700,
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
    amount: 1200,
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
    amount: 750,
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
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/091018_amstanLogistics.pdf"
    )
  },
  {
    bookDate: "09/11/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "0123724",
    brokerName: "Axle Logistics",
    amount: 2050,
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
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  }
];

const EmptyRow = {
  bookDate: "",
  truckNumber: "",
  driverName: "",
  loadNumber: "",
  broker: "",
  amount: 0,
  loadedMiles: 0,
  emptyMiles: 0,
  mileage: 0,
  dollarPerMile: 0,
  dieselPrice: 0,
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
  confirmFilePath: ""
};

const ShipmentsData = [
  {
    bookDate: "08/31/18",
    loadNumber: "0277377",
    brokerName: "Transplace",
    pickUpAddress: "4411 N LONG RD COLUMBUS IN 47203",
    dropOffAddress: "2000 NELSON MILLER PKWY LOUISVILLE KY 40223",
    miles: 83,
    payment: 600,
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
    loadNumber: "0012104",
    brokerName: "Reliable Source Logistics",
    pickUpAddress: "120 W Oak St Orestes IN 46063",
    dropOffAddress: "Concord NH 03301",
    miles: 860,
    payment: 2700,
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
    loadNumber: "99810",
    brokerName: "Transportation One",
    pickUpAddress: "92 Park Street Rutland VT 05701",
    dropOffAddress: "535 Shepherd Ave Cincinnati OH 45215",
    miles: 774,
    payment: 1200,
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
    loadNumber: "AMLO260554LN",
    brokerName: "Amstan Logistics",
    pickUpAddress: "4255 Thunderbird Lane, Fairfield, OH 45014",
    dropOffAddress: "13305 104th St, Pleasant Prairie, WI 53158",
    miles: 357,
    payment: 750,
    commodity: "NA",
    weight: 30687,
    trailer: "53V/R",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/091018_amstanLogistics.pdf"
    )
  },
  {
    bookDate: "09/11/18",
    loadNumber: "0123724",
    brokerName: "Axle Logistics",
    pickUpAddress: "800 Bilter Rd Aurora IL 60502",
    dropOffAddress: "22 Stauffer Industrial Park Taylor PA 18517",
    miles: 734,
    payment: 2050,
    commodity: "Packaging Materials",
    weight: 20000,
    trailer: "Van or Reefer",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  }
];

const Driver = [
  {
    firstName: "Kelvin",
    lastName: "Morris",
    ssn: "666-66-6666",
    driversLicense: "123456",
    hireDate: "05/01/18",
    phone: "568-456-7983",
    email: "kelvin@gmail.com",
    currentRate: "0.55",
    earnings: "20000"
  },
  {
    firstName: "Eric",
    lastName: "Shmidt",
    ssn: "666-66-1111",
    driversLicense: "654321",
    hireDate: "07/15/18",
    phone: "568-358-1110",
    email: "eric@gmail.com",
    currentRate: "0.55",
    earnings: "12500"
  }
];

export { Datatable, EmptyRow, ShipmentsData, Driver };
