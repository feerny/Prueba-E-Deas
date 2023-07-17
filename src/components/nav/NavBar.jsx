import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useMediaQuery, useTheme } from '@mui/material';
import { DataUsage, Add, ExitToApp, Search, Clear } from '@mui/icons-material';
import { connect } from 'react-redux';
import { setUser, setDataList, setDataFilter } from '../../redux/actions';

function NavBar({ setUser, setDataList, dataList, user, dataFilter, setDataFilter }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [newData, setNewData] = useState({
    id: '0',
    cedula: '',
    nombre: '',
    apellido: '',
    profesion: '',
  });

  // Función para generar ids aleatorios
  const generateRandomId = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomSuffix}`;
  };

  const handleLogout = async () => {
    localStorage.removeItem("keyUser");
    sessionStorage.removeItem("keyUser");
    await setUser("notUser");
    await navigate('/login');
    window.location.reload();
  };
  

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewData({
      id: "0",
      cedula: '',
      nombre: '',
      apellido: '',
      profesion: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddData = () => {
    // Validar que todos los campos estén completos antes de agregar los datos
    if (Object.values(newData).every((value) => value.trim() !== '')) {
      // Generar ID aleatorio
      const id = generateRandomId();

      // Agregar los nuevos datos al estado global
      const newDataWithId = { ...newData, id };
      const updatedDataList = [...dataList, newDataWithId];
      setDataList(updatedDataList);
      handleCloseModal();
    }
  };

  const theme = useTheme();
  const isMobileResolution = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit">
                <DataUsage />
              </IconButton>
              <span>Data List</span>
            </Link>
          </Typography>

          {isMobileResolution ? null : (
            <TextField
              value={dataFilter}
              onChange={(e) => setDataFilter(e.target.value)}
              id="search"
              variant="standard"
              margin="dense"
              InputProps={{
                startAdornment: <Search />,
                endAdornment: (
                  <IconButton onClick={()=>setDataFilter("")} edge="end" color="inherit">
                    <Clear />
                  </IconButton>
                ),
                sx: {
                  color: '#ffffff',
                  borderBottom: '1px solid #ffffff',
                },
              }}
              sx={{ width: '400px' }}
            />
          )}
          {user === process.env.REACT_APP_ADMIN_TOKEN && (
            <Button color="inherit" onClick={handleOpenModal} startIcon={<Add />}>
              Agregar datos
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Modal de Agregar datos */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregar Datos</DialogTitle>
        <DialogContent>
          <TextField
            label="Cédula"
            name="cedula"
            value={newData.cedula}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Nombre"
            name="nombre"
            value={newData.nombre}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={newData.apellido}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Profesión"
            name="profesion"
            value={newData.profesion}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleAddData} disabled={Object.values(newData).some((value) => value.trim() === '')}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    user: state.user,
    dataFilter:state.dataFilter
  };
};

const mapDispatchToProps = {
  setUser,
  setDataList,
  setDataFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
