import * as Actions from "../../actions/index";

const initialState = { startDate: "", endDate: "" };

const dateRange = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DATE: {
      // console.log("DATE PICKER reducer action payload", action);
      return { ...action.payload };
    }
    case Actions.SET_DATE: {
      return {
        ...action.attribute
      };
    }
    case Actions.SET_DATE_VALUE: {
      // console.log("DATE PICKER reducer action ", action);
      return {
        ...state,
        ...action.value
      };
    }
    default: {
      return state;
    }
  }
};

export default dateRange;
