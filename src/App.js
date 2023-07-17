import './App.css';
import Home from './pages/home';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import store from './redux/store.js';

// Función que genera el footer para el Copyright
function Copyright(props) {
  return (
    <Typography sx={{ padding: '40px' }} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="__blank" href="https://github.com/feerny">
        Felipe Ferrer
      </Link>{' '}
      {/* Obtiene el año vigente */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#303f9f', // Azul oscuro
    },
    secondary: {
      main: '#e3f2fd', // Azul claro
    },
  },
  // atributos personalizados
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
  },
});

// Componente principal
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* Pasa todos de la store a los demás componentes */}
        <Provider store={store}>
          <Home Copyright={Copyright}/>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
