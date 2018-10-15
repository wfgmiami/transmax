const path = require('path');

const LoadsData = [
  {
    pickupDate: "08/31/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "0277377",
    brokerId: 1,
    brokerName: "Transplace",
    shipper: "Columbus Warehouse & Cartage, Inc",
    consignee: "Kroger",
    pickUpCityState: "Columbus, IN",
    dropOffCityState: "Louisville, KY",
    pickUpAddress: "4411 N Long Rd, Columbus, IN 47203",
    dropOffAddress: "2000 Nelson Miller Pkwy, Louisville, KY 40223",
    payment: 600,
    loadedMiles: 85,
    emptyMiles: 207,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 160.6,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
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
    pickupDate: "09/05/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "0012104",
    brokerId: 2,
    brokerName: "Reliable Source Logistics",
    shipper: "Red Gold",
    consignee: "WIC/CSFP",
    pickUpCityState: "Orestes, IN",
    dropOffCityState: "Concord, NH",
    pickUpAddress: "120 W Oak St, Orestes, IN 46063",
    dropOffAddress: "Concord, NH 03301",
    payment: 2700,
    loadedMiles: 970,
    emptyMiles: 136,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
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
    pickupDate: "09/07/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "99810",
    brokerId: 3,
    brokerName: "Transportation One",
    shipper: "Westminster-satellite warehouse",
    consignee: "Reinhard foodservice",
    pickUpCityState: "Rutland, VT",
    dropOffCityState: "Cincinnati, OH",
    pickUpAddress: "92 Park Street, Rutland, VT 05701",
    dropOffAddress: "535 Shepherd Ave, Cincinnati, OH 45215",
    payment: 1200,
    loadedMiles: 842,
    emptyMiles: 105,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
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
    pickupDate: "09/10/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "AMLO260554LN",
    brokerId: 4,
    brokerName: "Amstan Logistics",
    shipper: "Heritage Bag Company",
    consignee: "Uline",
    pickUpCityState: "Fairfield, OH",
    dropOffCityState: "Pleasant Prairie, WI",
    pickUpAddress: "4255 Thunderbird Lane, Fairfield, OH 45014",
    dropOffAddress: "13305 104th St, Pleasant Prairie, WI 53158",
    payment: 750,
    loadedMiles: 357,
    emptyMiles: 5,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
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
    pickupDate: "09/11/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "0123724",
    brokerId: 5,
    brokerName: "Axle Logistics",
    shipper: "UT Logistics Agfa",
    consignee: "Agfa c/o Kane Warehousing",
    pickUpCityState: "Aurora, IL",
    dropOffCityState: "Taylor, PA",
    pickUpAddress: "800 Bilter Rd, Aurora, IL 60502",
    dropOffAddress: "22 Stauffer Industrial Park, Taylor, PA 18517",
    payment: 2050,
    loadedMiles: 737,
    emptyMiles: 72,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Packaging Materials",
    weight: 20000,
    trailer: "Van or Reefer",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090718_transportationOne.pdf"
    )
  },
  {
    pickupDate: "09/17/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "929395",
    brokerId: 6,
    brokerName: "American Logistics Inc.",
    shipper: "Huhtamaki Batavia Dist",
    consignee: "Gordon Food Service",
    pickUpCityState: "Batavia, OH",
    dropOffCityState: "Kenosha, WI",
    pickUpAddress: "1985 James E. Sauls Sr. Drive, Batavia, OH 45103",
    dropOffAddress: "10901 38th St, Kenosha, WI 53144",
    payment: 1000,
    loadedMiles: 391,
    emptyMiles: 35,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "NA",
    weight: 20404,
    trailer: "Van or Reefer",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "09/18/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "41612",
    brokerId: 7,
    brokerName: "Gateway Logistics Inc.",
    shipper: "Cree Lighting",
    consignee: "Gateway Distribution",
    pickUpCityState: "Racine, WI",
    dropOffCityState: "Cincinnati, OH",
    pickUpAddress: "9201 Washington Ave, Racine, WI 53406",
    dropOffAddress: "11755 Lebanon Rd, Cincinnati, OH 45241",
    payment: 1050,
    loadedMiles: 375,
    emptyMiles: 11,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Light poles & fixtures",
    weight: 35000,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "09/19/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "0198170",
    brokerId: 8,
    brokerName: "Time Definite Services, Inc.",
    shipper: "Samuel Adams",
    consignee: "Hendricks Beverage",
    pickUpCityState: "Cincinnati, OH",
    dropOffCityState: "Manitowoc, WI",
    pickUpAddress: "1625 Central Pkwy Cincinnati, OH 45214",
    dropOffAddress: "4402 Custer St, Manitowoc, WI 54220",
    payment: 940,
    loadedMiles: 468,
    emptyMiles: 12,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "NA",
    weight: 29673,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "09/20/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "5058259",
    brokerId: 9,
    brokerName: "Grane Logistics Express",
    shipper: "AL3",
    consignee: "Navistar Cross Dock Co Dayton",
    pickUpCityState: "Racine, WI",
    dropOffCityState: "Huber Heights, OH",
    pickUpAddress: "1312 North Memorial Drive, Racine, WI 53404",
    dropOffAddress: "6265 Executive Blvd, Huber Heights, OH 45424",
    payment: 1150,
    loadedMiles: 375,
    emptyMiles: 160,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "NA",
    weight: 4813,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "09/25/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "6758247",
    brokerId: 10,
    brokerName: "XPO Logistics",
    shipper: "R&B Inc Motormite",
    consignee: "DC 41 Hartford",
    pickUpCityState: "Warsaw, KY",
    dropOffCityState: "Enfield, CT",
    pickUpAddress:  "25 Dorman Drive, Warsaw, KY 41095",
    dropOffAddress:  "300 Shaker Rd, Enfield, CT 06082",
    payment: 2350,
    loadedMiles: 820,
    emptyMiles: 50,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Consumer goods",
    weight: 16000,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "09/27/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "57119136",
    brokerId: 11,
    brokerName: "PLS Logistics Services",
    shipper: "Tristar Products Inc",
    consignee: "Sams DC",
    pickUpCityState: "Meriden, CT",
    dropOffCityState: "Greenfield, IN",
    pickUpAddress:  "550 Research Pkwy, Meriden, CT 06450",
    dropOffAddress:  "488 W Muskegon Rd, Greenfield, IN 46140",
    payment: 1250,
    loadedMiles: 800,
    emptyMiles: 42,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Dry goods",
    weight: 10500,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "10/01/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "150753",
    brokerId: 12,
    brokerName: "AuptiX, Inc.",
    shipper: "Chris Heinzman",
    consignee: "Brecknock Orchard Farms",
    pickUpCityState: "Columbus, IN",
    dropOffCityState: "Mohnton, PA",
    pickUpAddress:  "6848 East 500 South, Columbus, IN 47201",
    dropOffAddress:  "390 Orchard Road, Mohnton, PA 19540",
    payment: 2450,
    loadedMiles: 610,
    emptyMiles: 91,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Pumpkins",
    weight: 40000,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "10/02/18",
    truckId: 119,
    driverId: 1,
    driverName: "Kelvin",
    loadNumber: "5416902",
    brokerId: 13,
    brokerName: "Trinity Logistics",
    shipper: "Brunner Manufacturing",
    consignee: "Meritor",
    pickUpCityState: "Medina, NY",
    dropOffCityState: "Florence, KY",
    pickUpAddress:  "3959 Bates Rd, Medina, NY 14103",
    dropOffAddress:  "7975 Dixie Highway, Florence, KY 41042",
    payment: 925,
    loadedMiles: 487,
    emptyMiles: 330,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 25,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Palletized parts",
    weight: 43200,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "10/09/18",
    truckId: 119,
    driverId: 3,
    driverName: "Tim",
    loadNumber: "5420192",
    brokerId: 13,
    brokerName: "Trinity Logistics",
    shipper: "Argadh Glass",
    consignee: "Yankee Candle",
    pickUpCityState: "Winchester, IN 47394",
    dropOffCityState: "Chicopee, MA 01021",
    pickUpAddress:  "Ardagh 603 E North St, Winchester, IN 47394",
    dropOffAddress:  "1 Better Way, Chicopee, MA 01021",
    payment: 2400,
    loadedMiles: 820,
    emptyMiles: 82,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Glass",
    weight: 42883,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "10/11/18",
    truckId: 119,
    driverId: 3,
    driverName: "Tim",
    loadNumber: "OHB113391",
    brokerId: 14,
    brokerName: "West Motor Freight of PA",
    shipper: "RTL Enterprises",
    consignee: "Minerva Enterprises",
    pickUpCityState: "Portland, CT 06480",
    dropOffCityState: "Waynesburg, OH 44688",
    pickUpAddress:  "173 Pickering St, Portland, CT 06480",
    dropOffAddress:  "8955 Minerva Rd, Waynesburg, OH 44688",
    payment: 900,
    loadedMiles: 546,
    emptyMiles: 53,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Construction Debris/Landfill material",
    weight: 40000,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
  {
    pickupDate: "10/12/18",
    truckId: 119,
    driverId: 3,
    driverName: "Tim",
    loadNumber: "5578769",
    brokerId: 15,
    brokerName: "Landstar",
    shipper: "Graphic Packaging International",
    consignee: "Sygma",
    pickUpCityState: "Marion, OH 43302",
    dropOffCityState: "Ft Worth, TX 76115",
    pickUpAddress:  "1171 W Center St, Marion, OH 43302",
    dropOffAddress:  "5500 S Freeway, Ft Worth, TX 76115",
    payment: 2150,
    loadedMiles: 1114,
    emptyMiles: 115,
    mileage: 0,
    dollarPerMile: 0,
    fuelCost: 0,
    driverPay: 0,
    dispatchFee: 0,
    lumper: 0,
    detention: 0,
    detentionDriverPay: 0,
    secondStopDriverPay: 0,
    lateFee: 0,
    toll: 0,
    roadMaintenance: 0,
    otherExpenses: 0,
    totalExpenses: 0,
    profit: 0,
    commodity: "Consumer goods or appliances",
    weight: 40000,
    trailer: "Dry Van",
    confirmFilePath: path.join(
      __dirname,
      "/brokerConfirmations/090518_reliableSourceLogistics.pdf"
    )
  },
];



module.exports = LoadsData;
