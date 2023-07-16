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
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberSession, setRememberSession] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleUsernameChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(value);
    setIsUsernameValid(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberSessionChange = (event) => {
    setRememberSession(event.target.checked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Por favor, completa todos los campos');
      setIsUsernameValid(username.trim() !== '');
      setIsPasswordValid(password.trim() !== '');
      return;
    } else {
      if (username === process.env.REACT_APP_ADMIN) {
        if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
          await props.setUser('!$%&/fdsfsdfds3132%&%&$.');
          if (rememberSession) {
            localStorage.setItem('keyUser', '!$%&/fdsfsdfds3132%&%&$.');
          } else {
            sessionStorage.setItem('keyUser', '!$%&/fdsfsdfds3132%&%&$.');
          }
          navigate('/home');
          setErrorMessage('');
        } else {
          setIsPasswordValid(false);
          setErrorMessage('Contraseña Inválida');
        }
      } else if (username === process.env.REACT_APP_USER) {
        if (password === process.env.REACT_APP_USER_PASSWORD) {
          await props.setUser('!·$dfdsfdsfds1334');
          if (rememberSession) {
            localStorage.setItem('keyUser', '!·$dfdsfdsfds1334');
          } else {
            sessionStorage.setItem('keyUser', '!·$dfdsfdsfds1334');
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
