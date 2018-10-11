import * as Actions from "../../actions/index";
import { loadsConfig } from "../../../configs/loadsConfig.js";
// import { Datatable } from "../../../components/members/Datatable";

const initialState = loadsConfig;

const loads = (state = initialState, action) => {
  // console.log("load reducer actionObj", action, " ", [
  //   ...state,
  //   { ...action.load }
  // ]);

  switch (action.type) {
    case Actions.GET_LOAD: {
      return [...action.payload];
    }

    case Actions.GET_LOAD_DATE_RANGE: {

      // const startDate = action.payload.startDate;
      // const endDate = action.payload.endDate;

      // const filteredDateRange = Datatable.filter((item, index) => {
      //   let dt = new Date(item.bookDate);
      //   // console.log('dt', dt, 'start date', new Date(startDate), dt > new Date(startDate))
      //   return dt >= new Date(startDate) && dt <= new Date(endDate);
      // });

      // console.log("filteredDateRange", filteredDateRange);

      // return [...filteredDateRange];
      // console.log("load reducer GET_LOAD_DATE_RANGE", action);
      return [...action.payload];
    }

    case Actions.SET_LOAD: {
      return [...state, { ...action.load }];
    }

    case Actions.UPDATE_LOAD: {
      return [...action.loads.data];
    }

    case Actions.SAVE_LOADS: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default loads;
