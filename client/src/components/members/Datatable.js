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
  },
  {
    bookDate: "09/12/18",
    truckNumber: "119",
    driverName: "Kelvin",
    loadNumber: "10069",
    brokerName: "Rotana Logistics",
    amount: 1100,
    loadedMiles: 678,
    emptyMiles: 125,
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
    pickUpCityState: "COLUMBUS, IN",
    dropOffCityState: "LOUISVILLE, KY",
    pickUpAddress: "4411 N LONG RD, COLUMBUS, IN 47203",
    dropOffAddress: "2000 NELSON MILLER PKWY, LOUISVILLE, KY 40223",
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
    pickUpCityState: "Orestes, IN",
    dropOffCityState: "Concord, NH",
    brokerName: "Reliable Source Logistics",
    pickUpAddress: "120 W Oak St, Orestes, IN 46063",
    dropOffAddress: "Concord, NH 03301",
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
    pickUpCityState: "Rutland, VT",
    dropOffCityState: "Cincinnati, OH",
    brokerName: "Transportation One",
    pickUpAddress: "92 Park Street, Rutland, VT 05701",
    dropOffAddress: "535 Shepherd Ave, Cincinnati, OH 45215",
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
    pickUpCityState: "Fairfield, OH",
    dropOffCityState: "Pleasant Prairie, WI",
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
    pickUpCityState: "Aurora, IL",
    dropOffCityState: "Taylor, PA",
    brokerName: "Axle Logistics",
    pickUpAddress: "800 Bilter Rd, Aurora, IL 60502",
    dropOffAddress: "22 Stauffer Industrial Park, Taylor, PA 18517",
    miles: 734,
    payment: 2050,
    commodity: "Packaging Materials",
    weight: 20000,
    trailer: "Van or Reefer",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  },
  {
    bookDate: "09/12/18",
    loadNumber: "10069",
    pickUpCityState: "Bensalem, PA",
    dropOffCityState: "Merriville, IN",
    brokerName: "Rotana Logistics",
    pickUpAddress: "1810 Byberry Road, Bensalem, PA 19020",
    dropOffAddress: "1410 E 86th Pl, Merriville, IN 46410",
    miles: 678,
    payment: 1100,
    commodity: "NA",
    weight: 0,
    trailer: "Van",
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

const Truck = [
  {
    model: "Volvo VNL670",
    year: "2007",
    purchaseDate: "06/01/2013",
    purchasePrice: 40000,
    originalMiles: 405000,
    maintenanceDate: "",
    maintenanceType: "",
    maintenanceCost: "",
    repairDate: "",
    repairType: "",
    repairCost: "",
    company: "AIK Transport"
  },
  {
    model: "Fraightliner Coronado",
    year: "2014",
    purchaseDate: "11/1/2017",
    purchasePrice: 0,
    originalMiles: "",
    maintenanceDate: "",
    maintenanceType: "",
    maintenanceCost: "",
    repairDate: "",
    repairType: "",
    repairCost: "",
    company: "AIK Transport"
  },
  {
    model: "Fraightliner Cascadia",
    year: "2015",
    purchaseDate: "8/30/2018",
    purchasePrice: 67500,
    originalMiles: 350000,
    maintenanceDate: "",
    maintenanceType: "",
    maintenanceCost: "",
    repairDate: "",
    repairType: "",
    repairCost: "",
    company: "Transmax"
  }

]

const Firm = [
  {
    taxId: "123",
    name: "AIK Transport LLC",
    foundedDate: "06/01/2013",
    incorporatedState: "OH",
    numberOfEmployees: "3",
    numberOfTrucks: "2",
    numberOfTrailers: "2"
  },
  {
    taxId: "345",
    name: "Transmax LLC",
    foundedDate: "7/31/2018",
    incorporatedState: "OH",
    numberOfEmployees: "0",
    numberOfTrucks: "1",
    numberOfTrailers: "1"
  }
];

const Broker = [
  {
    brokerId: "1",
    name: "Transplace",
    address: "",
    phone: "",
    email: "",
    bookedLoads: 1,
    totalBooked: 600,
    totalMiles: 85,
    avgDollarPerMile: 0
  },
  {
    brokerId: "2",
    name: "TransportationOne",
    address: "",
    phone: "",
    email: "",
    bookedLoads: 1,
    totalBooked: 1200,
    totalMiles: 842,
    avgDollarPerMile: 0
  },
  {
    brokerId: "3",
    name: "Reliable Source Logistics",
    address: "",
    phone: "",
    email: "",
    bookedLoads: 1,
    totalBooked: 2700,
    totalMiles: 970,
    avgDollarPerMile: 0
  },
];

const EarningsData = [
  {
    weekNumber: 1,
    begWeekDate: "08/27/18",
    endWeekDate: "09/02/18",
    weekRange: "08/27/18-09/02/18",
    revenue: 600,
    dispatchFee: 60,
    milesPaid: 292,
    driverPay: 160.6,
    fuelCost: 370.46,
    toll: 0,
    docFilePath: path.join(
      __dirname,
      "/brokerConfirmations/083118_Transplace.pdf"
    )
  },
  {
    weekNumber: 2,
    begWeekDate: "09/03/18",
    endWeekDate: "09/09/18",
    weekRange: "09/03/18-09/09/18",
    revenue: 4650,
    dispatchFee: 465,
    milesPaid: 1908,
    driverPay: 1049.40,
    fuelCost: 1603.98,
    toll: 0,
    docFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    weekNumber: 3,
    begWeekDate: "09/10/18",
    endWeekDate: "09/16/18",
    weekRange: "09/10/18-09/16/18",
    revenue: 2800,
    dispatchFee: 280,
    milesPaid: 1174,
    driverPay: 170.7,
    fuelCost: 809.35,
    toll: 142.8,
    docFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },

];


const FixedCost = [
  {
    costName: "Truck Loan Payment",
    monthlyAmount: 1781.1,
    yearlyAmount: 21373.2
  },
  {
    costName: "Trailer Loan Payment",
    monthlyAmount: 255.12,
    yearlyAmount: 3061.44
  },
  {
    costName: "Liability Insurance",
    monthlyAmount: 754,
    yearlyAmount: 9048
  },
  {
    costName: "Physical Damage & NTL Ins Truck",
    monthlyAmount: 238.53,
    yearlyAmount: 2862.36
  },
  {
    costName: "Collision & Comprehen Ins Trailer",
    monthlyAmount: 98.63,
    yearlyAmount: 1183.56
  },
  {
    costName: "Truck IRP Registration",
    monthlyAmount: 137.55,
    yearlyAmount: 1650.6
  },
  {
    costName: "Trailer IRP Registration",
    monthlyAmount: 6.53,
    yearlyAmount: 78.36
  },
  {
    costName: "Highway Tax",
    monthlyAmount: 38.19,
    yearlyAmount: 458.28
  },
  {
    costName: "DOT Inspection(truck&trailer)",
    monthlyAmount: 12.5,
    yearlyAmount: 150
  },
  {
    costName: "United Carrier Reg License",
    monthlyAmount: 6.5,
    yearlyAmount: 78
  },
  {
    costName: "Driver Occupational Accident Ins",
    monthlyAmount: 130,
    yearlyAmount: 1560
  },
  {
    costName: "ELD Monthly Fee",
    monthlyAmount: 14.95,
    yearlyAmount: 179.4
  },
  {
    costName: "GPS Tracking",
    monthlyAmount: 10,
    yearlyAmount: 120
  },
  {
    costName: "Parking",
    monthlyAmount: 75,
    yearlyAmount: 900
  },
  {
    costName: "Load Board Fee",
    monthlyAmount: 0,
    yearlyAmount: 0
  },
  {
    costName: "Maintenance Truck",
    monthlyAmount: 0,
    yearlyAmount: 0
  },
  {
    costName: "Maintenance Trailer",
    monthlyAmount: 0,
    yearlyAmount: 0
  },

];

const VariableCost =[
  {
    costName: "Driver",
    dollarPerMile: 0.55,
  },
  {
    costName: "Diesel",
    dollarPerMile: 0.54,
  },
  {
    costName: "DEF",
    dollarPerMile: 0.05,
  },
  {
    costName: "OilChange",
    dollarPerMile: 0.02,
  },
  {
    costName: "TiresChange",
    dollarPerMile: 0.08,
  },


];

export { Datatable, EmptyRow, ShipmentsData, Driver, Truck, Firm, Broker, EarningsData, FixedCost, VariableCost };
