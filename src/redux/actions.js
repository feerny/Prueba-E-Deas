// actions.js

export const SET_DATA_LIST = 'SET_DATA_LIST';
export const SET_USER = 'SET_USER';
export const SET_DATA_FILTER = 'SET_DATA_FILTER';


export const setDataList = (dataList) => {
  return {
    type: SET_DATA_LIST,
    payload: dataList,
  };
};

export const setUser = (User) => {
    return {
      type: SET_USER,
      payload: User,
    };
  };

  export const setDataFilter= (Data) => {
    return {
      type: SET_DATA_FILTER,
      payload: Data,
    };
  };


