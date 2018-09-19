import * as Actions from "../../actions/index";
import { loadsConfig } from "../../../configs/loadsConfig.js";
import { Datatable } from "../../../components/members/Datatable";

const initialState = loadsConfig;

const trips = (state = initialState, action) => {
  // console.log("trip reducer actionObj", action, " ", [
  //   ...state,
  //   { ...action.trip }
  // ]);

  switch (action.type) {
    case Actions.GET_TRIP: {
      return [...action.payload];
    }

    case Actions.GET_TRIP_DATE_RANGE: {

      // const startDate = action.payload.startDate;
      // const endDate = action.payload.endDate;

      // const filteredDateRange = Datatable.filter((item, index) => {
      //   let dt = new Date(item.bookDate);
      //   // console.log('dt', dt, 'start date', new Date(startDate), dt > new Date(startDate))
      //   return dt >= new Date(startDate) && dt <= new Date(endDate);
      // });

      // console.log("filteredDateRange", filteredDateRange);

      // return [...filteredDateRange];
      // console.log("trip reducer GET_TRIP_DATE_RANGE", action);
      return [...action.payload];
    }

    case Actions.SET_TRIP: {
      return [...state, { ...action.trip }];
    }

    case Actions.UPDATE_TRIP: {
      return [...action.trips.data];
    }

    case Actions.SAVE_TRIPS: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default trips;
