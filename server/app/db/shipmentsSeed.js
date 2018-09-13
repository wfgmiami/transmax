const path = require('path');

const ShipmentsData = [
  {
    bookDate: "08/31/18",
    loadNumber: "0277377",
    brokerName: "Transplace",
    pickUpCityState: "Columbus, IN",
    dropOffCityState: "Louisville, KY",
    pickUpAddress: "4411 N Long Rd, Columbus, IN 47203",
    dropOffAddress: "2000 Nelson Miller Pkwy, Louisville, KY 40223",
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

module.exports = ShipmentsData;
