import { combineReducers } from "redux";
import driver from "./driver.reducer";
import truck from "./truck.reducer";
import firm from "./firm.reducer";
import broker from "./broker.reducer";
import earnings from "./earnings.reducer";
import fixedCost from "./fixedCost.reducer";

const companyReducers = combineReducers({
  driver,
  truck,
  firm,
  broker,
  earnings,
  fixedCost
});

export default companyReducers;
