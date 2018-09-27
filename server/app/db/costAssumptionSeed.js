const CostAssumptionSeed = [

  {
    costName: "DieselPrice",
    dieselDollarPerGallon: 3.2,
    mpg: 6,
  },
  {
    costName: "DEF",
    defDollarPerGallon: 2.7,
    defConsumptionRate: 0.03
  },
  {
    costName: "OilChange",
    oilCost: 0.02,
    changeMiles: 15000
  },
  {
    costName: "TiresChange",
    tireCostFrontTruck_2: 450,
    tireCostBackTruck_8: 378,
    tireTrailer_8: 320,
    changeMiles: 80000,
  },

];

module.exports = CostAssumptionSeed;
