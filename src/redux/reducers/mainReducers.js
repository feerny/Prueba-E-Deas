// reducers.js

import {  SET_DATA_LIST } from '../actions';


//estado global
const initialState = {
  user:"notUser",
  dataList: JSON.parse(localStorage.getItem('data')) ,
  rangeValue: [0, 11],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_LIST:
      localStorage.setItem("data", JSON.stringify(action.payload))
      return {
        ...state,
        dataList: action.payload,
      };
      default:
        return state;

  }
};

export default rootReducer;