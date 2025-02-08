
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip, IconButton, Modal, TextField, FormControlLabel, Switch, Button
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import {useEffect, useState} from "react";
import {Delete, Edit} from "@mui/icons-material";

const ListagemClinicas = () => {
    interface Clinica {
        id: number;
        nome: string;
        nomeUsuario: string;
        enabled: boolean;
        data: string;
        email: string;
        rg: string;
        cpf: string;
    }

    let [clinicas, setClinicas] = useState<Clinica[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [clinicaEdit, setClinicaEdit] = useState<Clinica | null>(null);
    const [clinicaDelete, setClinicaDelete] = useState<Clinica | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/clinixServiceClinica/clinic/list") //Corrigir para a rota correta.
            .then((response) => response.json())
            .then((data) => {
                setClinicas(data);
            })
            .catch((error) => console.error("Erro ao buscar clinicas:", error));
    }, []);

    const handleEditClick = (clinica: Clinica) => {
        setClinicaEdit(clinica);
        setOpenEdit(true);
    };

    const handleDeleteClick = (clinica: Clinica) => {
        setClinicaDelete(clinica);
        setOpenDelete(true);
    };

    const handleSave = () => {
        if (clinicaEdit) {
            fetch(
                `http://localhost:8080/clinixServiceClinica/clinic/update/${clinicaEdit.id}`, //Corrigir para a rota correta.
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(clinicaEdit),
                }
            )
                .then((response) => response.json())
                .then((updatedClinica) => {
                    setClinicas(
                        clinicas.map((p) =>
                            p.id === updatedClinica.id ? updatedClinica : p
                        )
                    );
                    setOpenEdit(false);
                })
                .catch((error) => console.error("Erro ao atualizar clinica:", error));
        }
    };

    const handleDelete = () => {
        if (clinicaDelete) {
            fetch(
                `http://localhost:8080/clinixServiceClinica/clinic/delete/${clinicaDelete.id}`, //Corrigir para a rota correta.
                {
                    method: "DELETE",
                }
            )
                .then(() => {
                    setClinicas(clinicas.filter((p) => p.id !== clinicaDelete.id));
                    setOpenDelete(false);
                })
                .catch((error) => console.error("Erro ao excluir clinica:", error));
        }
    };


    return (
        <DashboardCard title="Listagem geral de clinicas">
            <>
                <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
                    <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Nome Usuário</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Rg</TableCell>
                                <TableCell>Horário abertura</TableCell>
                                <TableCell>Horário fechamento</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clinicas.map((clinica) => (
                                <TableRow key={clinica.id}>
                                    <TableCell>{clinica.nomeFantasia}</TableCell>
                                    <TableCell>{clinica.cnpj}</TableCell>
                                    <TableCell>{clinica.telefone}</TableCell>
                                    <TableCell>{clinica.tipo}</TableCell>
                                    <TableCell>{clinica.horarioAbertura}</TableCell>
                                    <TableCell>{clinica.horarioFechamento}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleEditClick(clinica)}
                                            color="primary"
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteClick(clinica)}
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
                            Editar Clinica
                        </Typography>
                        {clinicaEdit && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="nomeFantasia"
                                    value={clinicaEdit.nomeFantasia}
                                    onChange={(e) =>
                                        setClinicaEdit({ ...clinicaEdit, nomeFantasia: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="cnpj"
                                    value={clinicaEdit.cnpj}
                                    onChange={(e) =>
                                        setClinicaEdit({ ...clinicaEdit, cnpj: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="telefone"
                                    value={clinicaEdit.telefone}
                                    onChange={(e) =>
                                        setClinicaEdit({
                                            ...clinicaEdit,
                                            telefone: e.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="tipo"
                                    value={clinicaEdit.tipo}
                                    onChange={(e) =>
                                        setClinicaEdit({ ...clinicaEdit, tipo: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="horarioAbertura"
                                    value={clinicaEdit.horarioAbertura}
                                    onChange={(e) =>
                                        setClinicaEdit({ ...clinicaEdit, horarioAbertura: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="horarioFechamento"
                                    value={clinicaEdit.horarioFechamento}
                                    onChange={(e) =>
                                        setClinicaEdit({ ...clinicaEdit, horarioFechamento: e.target.value })
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


export default ListagemClinicas;
