import React from "react";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrincipalPage from "./PrincipalPage";
import { connect } from 'react-redux';

function Home(props) {
  //toma el estado de user del estado global
    var typeUser = props.user;
    return (
      <div>
        <Router>
          <Routes>
            {/* si el path esta vaco redirecciona a home */}
            <Route exact path="/" element={<Navigate to="/home" />} />
            {/* si no se ha logeado no lo deja entrar a la vista home y redirecciona a login */}
            <Route exact path="/home" element={typeUser === "notUser" ? <Navigate to="/login" replace={true} />:<PrincipalPage />} />
            {/* si ya esta logeado y quiere entrar a login lo redirecciona a home */}
            <Route
              exact
              path="/login"
              element={typeUser === "notUser" ? <Login /> : <Navigate to="/" replace={true} />}
            />
          </Routes>
        </Router>
        <props.Copyright />
      </div>
    );
  }
  

//toma el estado actual del Redux store como parámetro y devuelve un objeto que mapea las partes relevantes del estado a props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


  //conecta el componente DataList con el Redux store
export default connect(mapStateToProps)(Home);