import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Edit, Save, Delete, Close } from '@mui/icons-material';
import { setDataList } from '../../redux/actions';

function DataList({ dataList, setDataList, user, dataFilter }) {
  //defino estados del componente
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedDataList, setEditedDataList] = useState(dataList);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [cedulaExist, setCedulaExist] = useState(false);

  //al recargar el componete o cambiar los datos del estado global de datalist actualiza el estado del componente
  useEffect(() => {
    setEditedDataList(dataList);
  }, [dataList, reloadComponent]);

  //funcion que se ejecuta solo si cambia el filtro del buscador
  useEffect(() => {
    //si esta vacio envia los datos del estado del componente
    if (dataFilter === '') {
      setFilteredDataList(editedDataList);
    } else {
      //si hay datos en el filtro filtra lo que se busque y lo envia al estado del componente
      const filteredList = editedDataList.filter((data) => {
        const { cedula, nombre, apellido, profesion } = data;
        const filterValue = dataFilter.toLowerCase();
        return (
          cedula.toLowerCase().includes(filterValue) ||
          nombre.toLowerCase().includes(filterValue) ||
          apellido.toLowerCase().includes(filterValue) ||
          profesion.toLowerCase().includes(filterValue)
        );
      });
      setFilteredDataList(filteredList);
    }
  }, [dataFilter, editedDataList]);

  //funcion para obtener el id que se esta editando
  const handleEdit = (rowId) => {
    setEditingRowId(rowId);
  };

  //funcion para guardar los datos editados
  const handleSave = () => {
    //valida que el id de la fila exista y trae todos sus datos
    const editedRow = editedDataList.find((row) => row.id === editingRowId);
    //si existe y no hay datos vacios envia los nuevos datos al estado global de la pagina
    if (editedRow && !Object.values(editedRow).some((value) => value === '')) {
      // Verificar si la cédula ya existe en otro registro
      const existingData = editedDataList.find((row) => row.id !== editingRowId && row.cedula === editedRow.cedula);
      if (existingData) {
        // Mostrar mensaje de cédula duplicada y no guardar los datos
        setCedulaExist(true);
      } else {
        // Guardar los datos editados
        setDataList(editedDataList);
        setEditingRowId(null);
        setCedulaExist(false);
      }
    }
  };

  //funcion para cancelar la edicion
  const handleCancel = () => {
    setEditingRowId(null);
    setEditedDataList(dataList);
    setCedulaExist(false);
  };

  //funcion para controlar la edicion
  const handleInputChange = (event, field, rowId) => {
    const value = event.target.value;
    setEditedDataList((prevDataList) =>
      prevDataList.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            [field]: value,
          };
        }
        return row;
      })
    );
    setCedulaExist(false);
  };

  //funcion para obtener el id de la fila que se quiere eliminar y abrir alerta de confirmacion
  const handleDelete = (rowId) => {
    setDeletingRowId(rowId);
    setDeleteDialogOpen(true);
  };

  //funcion para eliminar fila del listado
  const handleConfirmDelete = () => {
    //filtra todo menos lo que se quiere eliminar
    const updatedDataList = editedDataList.filter((row) => row.id !== deletingRowId);
    //envia nuevos datos al estado global de la pagina
    setDataList(updatedDataList);
    setDeleteDialogOpen(false);
    setReloadComponent(!reloadComponent);
  };

  //funcion para cancelar la eliminacion y cerrar alerta
  const handleCancelDelete = () => {
    setDeletingRowId(null);
    setDeleteDialogOpen(false);
  };

  const theme = useTheme(); // Obtener el tema actual

  return (
    <div style={{ paddingTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Datos
      </Typography>
      {filteredDataList.length === 0 ? (
        <Typography variant="body1" align="center">
          No se encontraron datos que coincidan con el filtro
        </Typography>
      ) : (
        <TableContainer style={{ maxHeight: 'calc(100vh - 240px)', overflow: 'auto' }}>
          <Table>
            <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <TableRow style={{ backgroundColor: theme.palette.secondary.main }}>
                <TableCell align="center">Cédula</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Profesión</TableCell>
                {/* si el usuario es admin muestra esta columna de resto no */}
                {user === process.env.REACT_APP_ADMIN_TOKEN ? (
                  <TableCell align="center" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    Acciones
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDataList.map((data) => (
                <TableRow key={data.id}>
                  <TableCell align="center">
                    {editingRowId === data.id ? (
                      <>
                        <input
                          type="text"
                          value={data.cedula}
                          onChange={(event) => handleInputChange(event, 'cedula', data.id)}
                        />
                        {cedulaExist && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            <AlertTitle>Error</AlertTitle>
                            La cédula ya existe. Por favor, ingrese una cédula válida.
                          </Alert>
                        )}
                      </>
                    ) : (
                      data.cedula
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowId === data.id ? (
                      <input
                        type="text"
                        value={data.nombre}
                        onChange={(event) => handleInputChange(event, 'nombre', data.id)}
                      />
                    ) : (
                      data.nombre
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowId === data.id ? (
                      <input
                        type="text"
                        value={data.apellido}
                        onChange={(event) => handleInputChange(event, 'apellido', data.id)}
                      />
                    ) : (
                      data.apellido
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowId === data.id ? (
                      <input
                        type="text"
                        value={data.profesion}
                        onChange={(event) => handleInputChange(event, 'profesion', data.id)}
                      />
                    ) : (
                      data.profesion
                    )}
                  </TableCell>
                  {/* si el usuario es admin muestra las acciones de resto no */}
                  {user === process.env.REACT_APP_ADMIN_TOKEN ? (
                    <TableCell align="center">
                      {editingRowId === data.id ? (
                        <>
                          <IconButton aria-label="Guardar" onClick={handleSave} disabled={Object.values(data).some((value) => value === '')}>
                            <Save />
                          </IconButton>
                          <IconButton aria-label="Cancelar" onClick={handleCancel}>
                            <Close />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton aria-label="Editar" onClick={() => handleEdit(data.id)}>
                            <Edit />
                          </IconButton>
                          <IconButton aria-label="Eliminar" onClick={() => handleDelete(data.id)}>
                            <Delete />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">¿Desea eliminar el registro seleccionado?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//lista las props a usar del estado global
const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    user: state.user,
    dataFilter: state.dataFilter,
  };
};

//lista las acction a usar
const mapDispatchToProps = {
  setDataList,
};

//despacho el componente
export default connect(mapStateToProps, mapDispatchToProps)(DataList);

