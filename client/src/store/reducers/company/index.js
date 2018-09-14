import { combineReducers } from "redux";
import driver from "./driver.reducer";
import truck from "./truck.reducer";
import firm from "./firm.reducer";
import broker from "./broker.reducer";

const companyReducers = combineReducers({
  driver,
  truck,
  firm,
  broker
});

export default companyReducers;
