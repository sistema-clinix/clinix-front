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
    styled
} from '@mui/material';
import { Edit, Delete, AccessTime } from "@mui/icons-material";
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { Switch, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { LIST_GERENTE, UPDATE_GERENTE, DELETE_GERENTE } from "../APIroutes";
import { Gerente } from "../interfaces";
import { useTheme } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        cursor: 'pointer',
    },
}));

const Component = () => {
    const theme = useTheme();
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedGerente, setSelectedGerente] = useState<Gerente | null>(null);

    let [gerentes, setGerentes] = useState<Gerente[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [gerenteEdit, setGerenteEdit] = useState<Gerente | null>(null);
    const [gerenteDelete, setGerenteDelete] = useState<Gerente | null>(null);
    const [gerenteSelecionado, setGerenteSelecionado] = useState<Gerente | null>(null);

    useEffect(() => {
        fetch(LIST_GERENTE())
            .then((response) => response.json())
            .then((data) => {
                setGerentes(data);
            })
            .catch((error) => console.error("Erro ao buscar gerentes:", error));
    }, []);

    const handleEditClick = (gerente: Gerente) => {
        setGerenteEdit(gerente);
        setOpenEdit(true);
    };

    const handleDeleteClick = (gerente: Gerente) => {
        setGerenteDelete(gerente);
        setOpenDelete(true);
    };

    const handleSave = () => {
        if (gerenteEdit) {
            fetch(
                UPDATE_GERENTE(gerenteEdit.id),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(gerenteEdit),
                }
            )
                .then((response) => response.json())
                .then((updatedGerente) => {
                    setGerentes(
                        gerentes.map((p) =>
                            p.id === updatedGerente.id ? updatedGerente : p
                        )
                    );
                    setOpenEdit(false);
                })
                .catch((error) => console.error("Erro ao atualizar gerente:", error));
        }
    };

    const handleDelete = () => {
        if (gerenteDelete) {
            fetch(DELETE_GERENTE(gerenteDelete.id),
                {
                    method: "DELETE",
                }
            )
                .then(() => {
                    setGerentes(gerentes.filter((p) => p.id !== gerenteDelete.id));
                    setOpenDelete(false);
                })
                .catch((error) => console.error("Erro ao excluir gerente:", error));
        }
    };

    const handleOpenDetails = (gerente: Gerente) => {
        setSelectedGerente(gerente);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedGerente(null);
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
                                <TableCell>Email</TableCell>
                                <TableCell>RG</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gerentes.map((gerente) => (
                                <StyledTableRow key={gerente.id} onClick={() => handleOpenDetails(gerente)}>
                                    <TableCell>{gerente.id}</TableCell>
                                    <TableCell>{gerente.nome}</TableCell>
                                    <TableCell>{gerente.nomeUsuario}</TableCell>
                                    <TableCell>{gerente.enabled ? "Sim" : "Não"}</TableCell>
                                    <TableCell>{gerente.email}</TableCell>
                                    <TableCell>{gerente.rg}</TableCell>
                                    <TableCell>{gerente.cpf}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            color="secondary">
                                            <AccessTime />
                                        </IconButton>

                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(gerente);
                                            }}
                                            color="primary"
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(gerente);
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
                            Detalhes do Médico
                        </Typography>
                        {selectedGerente && (
                            <Table aria-label="clinic details table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Nome:</TableCell>
                                        <TableCell>{selectedGerente.nome}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Username:</TableCell>
                                        <TableCell>{selectedGerente.nomeUsuario}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Email:</TableCell>
                                        <TableCell>{selectedGerente.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">CPF:</TableCell>
                                        <TableCell>{selectedGerente.cpf}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">RG:</TableCell>
                                        <TableCell>{selectedGerente.rg}</TableCell>
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
                            Editar Gerente
                        </Typography>
                        {gerenteEdit && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Nome"
                                    value={gerenteEdit.nome}
                                    onChange={(e) =>
                                        setGerenteEdit({ ...gerenteEdit, nome: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Email"
                                    value={gerenteEdit.email}
                                    onChange={(e) =>
                                        setGerenteEdit({ ...gerenteEdit, email: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Username"
                                    value={gerenteEdit.nomeUsuario}
                                    onChange={(e) =>
                                        setGerenteEdit({
                                            ...gerenteEdit,
                                            nomeUsuario: e.target.value,
                                        })
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={gerenteEdit.enabled}
                                            onChange={(e) =>
                                                setGerenteEdit({
                                                    ...gerenteEdit,
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
                                    value={gerenteEdit.email}
                                    onChange={(e) =>
                                        setGerenteEdit({ ...gerenteEdit, email: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="RG"
                                    value={gerenteEdit.rg}
                                    onChange={(e) =>
                                        setGerenteEdit({ ...gerenteEdit, rg: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="CPF"
                                    value={gerenteEdit.cpf}
                                    onChange={(e) =>
                                        setGerenteEdit({ ...gerenteEdit, cpf: e.target.value })
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

export default Component;