import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación o enviar los datos a un servidor
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            label="Usuario"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
          />
          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
