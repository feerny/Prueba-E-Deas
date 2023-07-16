// reducers.js

import { SET_DATA_LIST, SET_USER } from '../actions';

let dataDefault=[{}]

const initialState = {
  user: localStorage.getItem("keyUser") || sessionStorage.getItem("keyUser") || "notUser",
  dataList: JSON.parse(localStorage.getItem('data')),
  rangeValue: [0, 11],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_LIST:
      localStorage.setItem("data", JSON.stringify(action.payload));
      return {
        ...state,
        dataList: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
