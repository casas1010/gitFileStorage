import {
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  ADD_ITEM,
} from "../actions/types";
import _ from "lodash";

const itemReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
      // return _.uniqBy([action.payload, ...state], "barcode");

    case DELETE_ITEM:
      return _.omit(state, action.payload);
    case DELETE_ALL_ITEMS:
      return [];
    default:
      
      return state;
  }
};

export default itemReducer;
