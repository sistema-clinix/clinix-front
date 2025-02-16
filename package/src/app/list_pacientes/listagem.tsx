import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { Switch, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

const ListagemPacientes = () => {
  interface Paciente {
    id: number;
    nome: string;
    nomeUsuario: string;
    enabled: boolean;
    dataCadastro: string;
    email: string;
    rg: string;
    cpf: string;
    senha: string;
  }

  let [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);
  const [pacienteDelete, setPacienteDelete] = useState<Paciente | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/clinixSistemaUsuarios/paciente/list") //Corrigir para a rota correta.
      .then((response) => response.json())
      .then((data) => {
        setPacientes(data);
      })
      .catch((error) => console.error("Erro ao buscar pacientes:", error));
  }, []);

  /* A variável abaixo é um teste para ser usado quando o back-end não estiver rodando.
  pacientes = [
    {
      id: 1,
      nome: "Lucas Almeida",
      nomeUsuario: "lucas.almeida",
      enabled: true,
      dataCadastro: "2021-10-10",
      email: "teste@mail.com",
      rg: "87547898",
      cpf: "7136464757",
      senha: "123",
    },
  ];
  */


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
      fetch(
        `http://localhost:8080/clinixSistemaUsuarios/paciente/update/${pacienteEdit.id}`, //Corrigir para a rota correta.
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
      fetch(
        `http://localhost:8080/clinixSistemaUsuarios/paciente/delete/${pacienteDelete.id}`, //Corrigir para a rota correta.
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
                <TableRow key={paciente.id}>
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
                      onClick={() => handleEditClick(paciente)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(paciente)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

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