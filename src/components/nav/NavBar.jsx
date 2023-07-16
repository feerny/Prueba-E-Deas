import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack } from '@mui/material';
import { DataUsage, Add, ExitToApp } from '@mui/icons-material';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';

function NavBar(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    await props.setUser("notUser");
    navigate('/login');
  };
  

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit">
              <DataUsage />
            </IconButton>
            Data List
          </Link>
        </Typography>
        <Stack direction="row" spacing={9}>
          <Button component={Link} to="/home" color="inherit" startIcon={<Add />}>
            Agregar datos
          </Button>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Cerrar sesión
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
const mapDispatchToProps = {
  setUser,
};

export default connect(null,mapDispatchToProps)(NavBar);

