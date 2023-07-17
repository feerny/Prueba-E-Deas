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
} from '@mui/material';
import { Edit, Save, Delete, Close } from '@mui/icons-material';
import { setDataList } from '../../redux/actions';

function DataList({ dataList, setDataList, user, dataFilter }) {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedDataList, setEditedDataList] = useState(dataList);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    setEditedDataList(dataList);
  }, [dataList, reloadComponent]);

  useEffect(() => {
    if (dataFilter === '') {
      setFilteredDataList(editedDataList);
    } else {
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

  const handleEdit = (rowId) => {
    setEditingRowId(rowId);
  };

  const handleSave = () => {
    const editedRow = editedDataList.find((row) => row.id === editingRowId);
    if (editedRow && !Object.values(editedRow).some((value) => value === '')) {
      setDataList(editedDataList);
      setEditingRowId(null);
    }
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditedDataList(dataList);
  };

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
  };

  const handleDelete = (rowId) => {
    setDeletingRowId(rowId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedDataList = editedDataList.filter((row) => row.id !== deletingRowId);
    setDataList(updatedDataList);
    setDeleteDialogOpen(false);
    setReloadComponent(!reloadComponent);
  };

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
        <TableContainer  style={{ maxHeight: 'calc(100vh - 240px)', overflow: 'auto' }}>
          <Table>
            <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <TableRow style={{ backgroundColor: theme.palette.secondary.main }}>
                <TableCell align="center" >
                  Cédula
                </TableCell>
                <TableCell align="center" >
                  Nombre
                </TableCell>
                <TableCell align="center" >
                  Apellido
                </TableCell>
                <TableCell align="center" >
                  Profesión
                </TableCell>
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
                      <input
                        type="text"
                        value={data.cedula}
                        onChange={(event) => handleInputChange(event, 'cedula', data.id)}
                      />
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

const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    user: state.user,
    dataFilter: state.dataFilter,
  };
};

const mapDispatchToProps = {
  setDataList,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataList);
