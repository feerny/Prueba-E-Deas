import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AccountCircle, Visibility, Lock, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  //defino navigate
  const navigate = useNavigate();
  //estados del componente
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberSession, setRememberSession] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  //funcion par controlar el estado del input de usuario
  const handleUsernameChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(value);
    setIsUsernameValid(true);
  };
  //funcion par controlar el estado del input de password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
  };
  //funcion par controlar el estado de la visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //funcion par controlar el estado de la sesion
  const handleRememberSessionChange = (event) => {
    setRememberSession(event.target.checked);
  };

  //funcion que se dispara al dar click en el boton de entrar
  const handleLogin = async (event) => {
    event.preventDefault();
    //valida que los campos esten llenos
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Por favor, completa todos los campos');
      setIsUsernameValid(username.trim() !== '');
      setIsPasswordValid(password.trim() !== '');
      return;
    } else {
      //valida que tipo de usuario es y envia un token dependiendo de cual es 
      if (username === process.env.REACT_APP_ADMIN) {
        if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
          await props.setUser(`${process.env.REACT_APP_ADMIN_TOKEN}`);
          if (rememberSession) {
            localStorage.setItem('keyUser', `${process.env.REACT_APP_ADMIN_TOKEN}`);
          } else {
            sessionStorage.setItem('keyUser', `${process.env.REACT_APP_ADMIN_TOKEN}`);
          }
          navigate('/home');
          setErrorMessage('');
        } else {
          setIsPasswordValid(false);
          setErrorMessage('Contraseña Inválida');
        }
      } else if (username === process.env.REACT_APP_USER) {
        if (password === process.env.REACT_APP_USER_PASSWORD) {
          await props.setUser(`${process.env.REACT_APP_USER_TOKEN}`);
          if (rememberSession) {
            localStorage.setItem('keyUser', `${process.env.REACT_APP_USER_TOKEN}`);
          } else {
            sessionStorage.setItem('keyUser', `${process.env.REACT_APP_USER_TOKEN}`);
          }
          navigate('/home');
          setErrorMessage('');
        } else {
          setIsPasswordValid(false);
          setErrorMessage('Contraseña Inválida');
        }
      } else {
        setIsUsernameValid(false);
        setErrorMessage('Usuario Inválido');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <AccountCircle fontSize="large" />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 3 }}>
          <TextField
            label="Usuario"
            required
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            error={!isUsernameValid}
            sx={{
              ...(isUsernameValid ? {} : { '& .MuiOutlinedInput-root': { backgroundColor: '#fff8e1' } }),
            }}
          />
          <TextField
            required
            label="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!isPasswordValid}
            sx={{
              ...(isPasswordValid ? {} : { '& .MuiOutlinedInput-root': { backgroundColor: '#fff8e1' } }),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox checked={rememberSession} onChange={handleRememberSessionChange} color="primary" />
            }
            label="Recordar sesión"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
//props del estado global
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
//acciones disponibles
const mapDispatchToProps = {
  setUser,
};

//despacha el componente
export default connect(mapStateToProps, mapDispatchToProps)(Login);
