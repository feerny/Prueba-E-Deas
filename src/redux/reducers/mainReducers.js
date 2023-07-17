// reducers.js

import { SET_DATA_LIST, SET_USER, SET_DATA_FILTER } from '../actions';

//define un listado por defecto por si no hay ninguno en almacenamiento local
let dataDefault = [{ id: "1", cedula: "123456", nombre: "Juan", apellido: "perez", profesion: "ingeniero" },
{ id: "2", cedula: "654321", nombre: "catalina", apellido: "martinez", profesion: "estudiante" },
{ id: "3", cedula: "456789", nombre: "pedro", apellido: "gonzalez", profesion: "comerciante" },
{ id: "4", cedula: "987654", nombre: "carilina", apellido: "alzate", profesion: "ingeniera" },]

//estado global de la pagina
const initialState = {
  user: localStorage.getItem("keyUser") || sessionStorage.getItem("keyUser") || "notUser",
  dataList: JSON.parse(localStorage.getItem('data')) || dataDefault,
  dataFilter: ""
};
//funciones a ejecutar o actualizar dado el action pasado
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
    case SET_DATA_FILTER:
      return {
        ...state,
        dataFilter: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
