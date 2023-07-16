import './App.css';
import Home from './pages/home';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Provider } from 'react-redux';
import store from './redux/store.js';

//funcion que genera el footer para el Copyright
function Copyright(props) {
  return (
    <Typography sx={{padding:"40px"}} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target='__blank' href="https://github.com/feerny">
        Felipe Ferrer
      </Link>{' '}
      {/* obtiene el año vigente */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//componente principal
function App() {
  return (
    <div className="App">
      {/* pasa todos de la store a los demas componentes */}
      <Provider store={store}>
      <Home Copyright={Copyright}></Home>
      </Provider>
    </div>
  );
}

export default App;
