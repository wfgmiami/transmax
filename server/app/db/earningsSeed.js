const path = require('path');

const EarningsSeed = [
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


module.exports = EarningsSeed;
