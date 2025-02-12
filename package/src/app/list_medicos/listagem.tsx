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

const ListagemMedicos = () => {
  interface Medico {
    id: number;
    nome: string;
    nomeUsuario: string;
    enabled: boolean;
    data: string;
    email: string;
    rg: string;
    cpf: string;
    crm: string;
    inicioAtendimento: string;
    fimAtendimento: string;
  }

  let [medicos, setMedicos] = useState<Medico[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [medicoEdit, setMedicoEdit] = useState<Medico | null>(null);
  const [medicoDelete, setMedicoDelete] = useState<Medico | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/clinixSistemaUsuarios/medico/list") //Corrigir para a rota correta.
      .then((response) => response.json())
      .then((data) => {
        setMedicos(data);
      })
      .catch((error) => console.error("Erro ao buscar pacientes:", error));
  }, []);

  const handleEditClick = (medico: Medico) => {
    setMedicoEdit(medico);
    setOpenEdit(true);
  };

  const handleDeleteClick = (medico: Medico) => {
    setMedicoDelete(medico);
    setOpenDelete(true);
  };

  const handleSave = () => {
    if (medicoEdit) {
      fetch(
        `http://localhost:8080/clinixSistemaUsuarios/medico/update/${medicoEdit.id}`, //Corrigir para a rota correta.
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicoEdit),
        }
      )
        .then((response) => response.json())
        .then((updatedMedico) => {
          setMedicos(
            medicos.map((p) =>
              p.id === updatedMedico.id ? updatedMedico : p
            )
          );
          setOpenEdit(false);
        })
        .catch((error) => console.error("Erro ao atualizar medico:", error));
    }
  };

  const handleDelete = () => {
    if (medicoDelete) {
      fetch(
        `http://localhost:8080/clinixSistemaUsuarios/medico/delete/${medicoDelete.id}`, //Corrigir para a rota correta.
        {
          method: "DELETE",
        }
      )
        .then(() => {
          setMedicos(medicos.filter((p) => p.id !== medicoDelete.id));
          setOpenDelete(false);
        })
        .catch((error) => console.error("Erro ao excluir medico:", error));
    }
  };

  return (
    <DashboardCard title="Listagem geral de medicos">
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
              {medicos.map((medico) => (
                <TableRow key={medico.id}>
                  <TableCell>{medico.id}</TableCell>
                  <TableCell>{medico.nome}</TableCell>
                  <TableCell>{medico.nomeUsuario}</TableCell>
                  <TableCell>{medico.enabled ? "Sim" : "Não"}</TableCell>
                  <TableCell>{medico.data}</TableCell>
                  <TableCell>{medico.email}</TableCell>
                  <TableCell>{medico.rg}</TableCell>
                  <TableCell>{medico.cpf}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEditClick(medico)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(medico)}
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
              Editar Medico
            </Typography>
            {medicoEdit && (
              <>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Nome"
                  value={medicoEdit.nome}
                  onChange={(e) =>
                    setMedicoEdit({ ...medicoEdit, nome: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Email"
                  value={medicoEdit.email}
                  onChange={(e) =>
                    setMedicoEdit({ ...medicoEdit, email: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Username"
                  value={medicoEdit.nomeUsuario}
                  onChange={(e) =>
                    setMedicoEdit({
                      ...medicoEdit,
                      nomeUsuario: e.target.value,
                    })
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={medicoEdit.enabled}
                      onChange={(e) =>
                        setMedicoEdit({
                          ...medicoEdit,
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
                  value={medicoEdit.email}
                  onChange={(e) =>
                    setMedicoEdit({ ...medicoEdit, email: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="RG"
                  value={medicoEdit.rg}
                  onChange={(e) =>
                    setMedicoEdit({ ...medicoEdit, rg: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="CPF"
                  value={medicoEdit.cpf}
                  onChange={(e) =>
                    setMedicoEdit({ ...medicoEdit, cpf: e.target.value })
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

export default ListagemMedicos;