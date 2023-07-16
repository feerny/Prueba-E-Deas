import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataUsage, Add, ExitToApp } from '@mui/icons-material';
import { connect } from 'react-redux';
import { setUser, setDataList } from '../../redux/actions';

function NavBar({ setUser, setDataList, dataList, user }) {
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
    localStorage.clear();
    sessionStorage.clear();
    await setUser("notUser");
    navigate('/login');
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

  return (
    <>
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
            {user===process.env.REACT_APP_ADMIN_TOKEN?<Button color="inherit" onClick={handleOpenModal} startIcon={<Add />}>
              Agregar datos
            </Button>:null}
            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
              Cerrar sesión
            </Button>
          </Stack>
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
    user:state.user
  };
};

const mapDispatchToProps = {
  setUser,
  setDataList,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
