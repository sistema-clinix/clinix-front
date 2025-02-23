import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip, IconButton, Modal, TextField, FormControlLabel, Switch, Button, styled
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import {useEffect, useState} from "react";
import {Delete, Edit} from "@mui/icons-material";
import {LIST_PACIENTE, UPDATE_PACIENTE, DELETE_PACIENTE} from "../APIroutes";
import { Paciente } from "../interfaces";
import {useTheme} from "@mui/material/styles";

// Estilização para a linha da tabela com hover
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
  },
}));

const ListagemPacientes = () => {
  const theme = useTheme();
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);

  let [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);
  const [pacienteDelete, setPacienteDelete] = useState<Paciente | null>(null);

  useEffect(() => {
      fetch(LIST_PACIENTE())
          .then(response => response.json())
          .then(data => {
              setPacientes(data);
          })
          .catch(error => console.error('Erro ao buscar pacientes:', error));
  }, []);

  const handleEditClick = (paciente: Paciente) => {
      setPacienteEdit(paciente);
      setOpenEdit(true);
  };

  const handleDeleteClick = (paciente: Paciente) => {
      setPacienteDelete(paciente);
      setOpenDelete(true);
  };

  const handleSave = () => {
      if (pacienteEdit) {
          fetch(UPDATE_PACIENTE(pacienteEdit.id),
              {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(pacienteEdit),
              }
          )
              .then((response) => response.json())
              .then((updatedPaciente) => {
                  setPacientes(
                      pacientes.map((p) =>
                          p.id === updatedPaciente.id ? updatedPaciente : p
                      )
                  );
                  setOpenEdit(false);
              })
              .catch((error) => console.error("Erro ao atualizar paciente:", error));
      }
  };

  const handleDelete = () => {
      if (pacienteDelete) {
          fetch(DELETE_PACIENTE(pacienteDelete.id),
              {
                  method: "DELETE",
              }
          )
              .then(() => {
                  setPacientes(pacientes.filter((p) => p.id !== pacienteDelete.id));
                  setOpenDelete(false);
              })
              .catch((error) => console.error("Erro ao excluir paciente:", error));
      }
  };

  const handleOpenDetails = (paciente: Paciente) => {
      setSelectedPaciente(paciente);
      setOpenDetails(true);
  };

  const handleCloseDetails = () => {
      setOpenDetails(false);
      setSelectedPaciente(null);
  };


  return (
      <DashboardCard title="Listagem geral de pacientes">
          <>
              <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
                  <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                      <TableHead>
                          <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Nome</TableCell>
                              <TableCell>Username</TableCell>
                              <TableCell>Ativo</TableCell>
                              <TableCell>Data de cadastro</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>RG</TableCell>
                              <TableCell>CPF</TableCell>
                              <TableCell align="right">Ações</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {pacientes.map((paciente) => (
                              <StyledTableRow key={paciente.id} onClick={() => handleOpenDetails(paciente)}>
                                  <TableCell>{paciente.id}</TableCell>
                                  <TableCell>{paciente.nome}</TableCell>
                                  <TableCell>{paciente.nomeUsuario}</TableCell>
                                  <TableCell>{paciente.enabled ? "Sim" : "Não"}</TableCell>
                                  <TableCell>{paciente.dataCadastro}</TableCell>
                                  <TableCell>{paciente.email}</TableCell>
                                  <TableCell>{paciente.rg}</TableCell>
                                  <TableCell>{paciente.cpf}</TableCell>
                                  <TableCell align="right">
                                      <IconButton
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              handleEditClick(paciente);
                                          }}
                                          color="primary"
                                      >
                                          <Edit />
                                      </IconButton>
                                      <IconButton
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteClick(paciente);
                                          }}
                                          color="error"
                                      >
                                          <Delete />
                                      </IconButton>
                                  </TableCell>
                              </StyledTableRow>
                          ))}
                      </TableBody>
                  </Table>
              </Box>

              {/* Modal de Detalhes */}
              <Modal
                  open={openDetails}
                  onClose={handleCloseDetails}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                  <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      bgcolor: theme.palette.background.paper,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: '8px',
                      boxShadow: theme.shadows[5],
                      p: 4,
                  }}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" mb={2} textAlign="center">
                          Detalhes do Paciente
                      </Typography>
                      {selectedPaciente && (
                          <Table aria-label="clinic details table">
                              <TableBody>
                                  <TableRow>
                                      <TableCell component="th" scope="row">Nome:</TableCell>
                                      <TableCell>{selectedPaciente.nome}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell component="th" scope="row">Username:</TableCell>
                                      <TableCell>{selectedPaciente.nomeUsuario}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell component="th" scope="row">Email:</TableCell>
                                      <TableCell>{selectedPaciente.email}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell component="th" scope="row">CPF:</TableCell>
                                      <TableCell>{selectedPaciente.cpf}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell component="th" scope="row">RG:</TableCell>
                                      <TableCell>{selectedPaciente.rg}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell component="th" scope="row">Data de Cadastro:</TableCell>
                                      <TableCell>{selectedPaciente.dataCadastro}</TableCell>
                                  </TableRow>
                              </TableBody>
                          </Table>
                      )}
                      <Box display="flex" justifyContent="center">
                          <Button onClick={handleCloseDetails} sx={{ mt: 3 }} variant="outlined">Fechar</Button>
                      </Box>
                  </Box>
              </Modal>

              {/* Modal de Edição */}
              <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                  <Box
                      sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 300,
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                          textAlign: "center",
                      }}
                  >
                      <Typography variant="h6" gutterBottom>
                          Editar Paciente
                      </Typography>
                      {pacienteEdit && (
                          <>
                              <TextField
                                  fullWidth
                                  margin="dense"
                                  label="Nome"
                                  value={pacienteEdit.nome}
                                  onChange={(e) =>
                                      setPacienteEdit({ ...pacienteEdit, nome: e.target.value })
                                  }
                              />
                              <TextField
                                  fullWidth
                                  margin="dense"
                                  label="Email"
                                  value={pacienteEdit.email}
                                  onChange={(e) =>
                                      setPacienteEdit({ ...pacienteEdit, email: e.target.value })
                                  }
                              />
                              <TextField
                                  fullWidth
                                  margin="dense"
                                  label="Username"
                                  value={pacienteEdit.nomeUsuario}
                                  onChange={(e) =>
                                      setPacienteEdit({
                                          ...pacienteEdit,
                                          nomeUsuario: e.target.value,
                                      })
                                  }
                              />
                              <FormControlLabel
                                  control={
                                      <Switch
                                          checked={pacienteEdit.enabled}
                                          onChange={(e) =>
                                              setPacienteEdit({
                                                  ...pacienteEdit,
                                                  enabled: e.target.checked,
                                              })
                                          }
                                          color="primary"
                                      />
                                  }
                                  label="Ativo"
                              />
                              <TextField
                                  fullWidth
                                  margin="dense"
                                  label="Email"
                                  value={pacienteEdit.email}
                                  onChange={(e) =>
                                      setPacienteEdit({ ...pacienteEdit, email: e.target.value })
                                  }
                              />
                              <TextField
                                  fullWidth
                                  margin="dense"
                                  label="RG"
                                  value={pacienteEdit.rg}
                                  onChange={(e) =>
                                      setPacienteEdit({ ...pacienteEdit, rg: e.target.value })
                                  }
                              />
                              <TextField
                                  fullWidth
                                  margin="dense"
                                  label="CPF"
                                  value={pacienteEdit.cpf}
                                  onChange={(e) =>
                                      setPacienteEdit({ ...pacienteEdit, cpf: e.target.value })
                                  }
                              />
                          </>
                      )}
                      <Box
                          sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
                      >
                          <Button variant="contained" color="primary" onClick={handleSave}>
                              Salvar
                          </Button>
                          <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => setOpenEdit(false)}
                          >
                              Cancelar
                          </Button>
                      </Box>
                  </Box>
              </Modal>

              {/* Modal de Exclusão */}
              <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                  <Box
                      sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 300,
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                          textAlign: "center",
                      }}
                  >
                      <Typography variant="h6" gutterBottom>
                          Deseja realmente excluir? <br></br> Esta ação não pode ser desfeita.
                      </Typography>
                      <Box
                          sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
                      >
                          <Button variant="contained" color="error" onClick={handleDelete}>
                              Excluir
                          </Button>
                          <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => setOpenDelete(false)}
                          >
                              Cancelar
                          </Button>
                      </Box>
                  </Box>
              </Modal>
          </>
      </DashboardCard>
  );
};

export default ListagemPacientes;