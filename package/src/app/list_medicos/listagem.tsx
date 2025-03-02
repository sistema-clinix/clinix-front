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
    styled,
    TableContainer,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { Edit, Delete, AccessTime } from "@mui/icons-material";
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { SetStateAction, useEffect, useState} from "react";
import {LIST_MEDICO, UPDATE_MEDICO, DELETE_MEDICO, LIST_ESPECIALIDADES} from "../APIroutes";
import {Medico, HorarioAtendimento} from "../interfaces";
import {useTheme} from "@mui/material/styles";

// Estilização para a linha da tabela com hover
const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        cursor: 'pointer',
    },
}));

const ListagemMedicos = () => {
    const theme = useTheme();
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);

    let [medicos, setMedicos] = useState<Medico[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [medicoEdit, setMedicoEdit] = useState<Medico | null>(null);
    const [medicoDelete, setMedicoDelete] = useState<Medico | null>(null);
    const [horarios, setHorarios] = useState<HorarioAtendimento[]>([]);
    const [openHorarios, setOpenHorarios] = useState(false);
    const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);

    const [especialidades, setEspecialidades] = useState<string[]>([]);
    const [especialidadeFiltro, setEspecialidadeFiltro] = useState("");

    useEffect(() => {
        fetch(LIST_ESPECIALIDADES())
            .then((response) => response.json())
            .then((data) => {
                setEspecialidades(data);
            })
            .catch((error) => console.error("Erro ao buscar ESPECIALIDADES:", error));

        fetch(LIST_MEDICO())
            .then((response) => response.json())
            .then((data) => {
                setMedicos(data);
            })
            .catch((error) => console.error("Erro ao buscar medicos:", error));

    }, []);


    const medicosFiltrados = especialidadeFiltro
        ? medicos.filter((medico) => medico.especialidade == especialidadeFiltro)
        : medicos;

    const handleFiltroChange = (event: any) => {
        setEspecialidadeFiltro(event.target.value);
    };

    const handleHorariosClick = (medico: Medico) => {
        setMedicoSelecionado(medico);
        setOpenHorarios(true);

        fetch(LIST_MEDICO()) // TODO: Trocar para rota de busca de médico.
            .then((response) => response.json())
            .then((data: HorarioAtendimento[]) => setHorarios(data))
            .catch((error) => console.error("Erro ao buscar horários:", error));
    };

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
                UPDATE_MEDICO(medicoEdit.id),
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
            fetch(DELETE_MEDICO(medicoDelete.id),
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

    const handleOpenDetails = (medico: Medico) => {
        setSelectedMedico(medico);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedMedico(null);
    };

    return (
        <DashboardCard title="Listagem geral de medicos">
            <>
                <FormControl sx={{ mb: 2, width: 300 }}>
                    <InputLabel>Filtrar por Especialidade</InputLabel>
                    <Select value={especialidadeFiltro} onChange={handleFiltroChange}>
                        <MenuItem value="">Todas</MenuItem>
                        {especialidades.map((esp, index) => (
                            <MenuItem key={index} value={esp}>{esp}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Especialidade</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Ativo</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>RG</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>CRM</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicosFiltrados.map((medico) => (
                                    <StyledTableRow key={medico.id} onClick={() => handleOpenDetails(medico)}>
                                        <TableCell>{medico.id}</TableCell>
                                        <TableCell>{medico.nome}</TableCell>
                                        <TableCell>{medico.especialidade}</TableCell>
                                        <TableCell>{medico.nomeUsuario}</TableCell>
                                        <TableCell>{medico.enabled ? "Sim" : "Não"}</TableCell>
                                        <TableCell>{medico.email}</TableCell>
                                        <TableCell>{medico.rg}</TableCell>
                                        <TableCell>{medico.cpf}</TableCell>
                                        <TableCell>{medico.crm}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleHorariosClick(medico);
                                                }}
                                                color="secondary"
                                            >
                                                <AccessTime />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(medico);
                                                }}
                                                color="primary"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(medico);
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
                    </TableContainer>
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
                            Detalhes do Médico
                        </Typography>
                        {selectedMedico && (
                            <Table aria-label="clinic details table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Nome:</TableCell>
                                        <TableCell>{selectedMedico.nome}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Especialidade:</TableCell>
                                        <TableCell>{selectedMedico.especialidade}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Username:</TableCell>
                                        <TableCell>{selectedMedico.nomeUsuario}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Email:</TableCell>
                                        <TableCell>{selectedMedico.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">CPF:</TableCell>
                                        <TableCell>{selectedMedico.cpf}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">RG:</TableCell>
                                        <TableCell>{selectedMedico.rg}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">CRM:</TableCell>
                                        <TableCell>{selectedMedico.crm}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Início do Atendimento:</TableCell>
                                        <TableCell>{selectedMedico.inicioAtendimento}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Fim do Atendimento:</TableCell>
                                        <TableCell>{selectedMedico.fimAtendimento}</TableCell>
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
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="CRM"
                                    value={medicoEdit.crm}
                                    onChange={(e) =>
                                        setMedicoEdit({ ...medicoEdit, crm: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Início Atendimento"
                                    value={medicoEdit.inicioAtendimento}
                                    onChange={(e) =>
                                        setMedicoEdit({ ...medicoEdit, inicioAtendimento: e.target.value })
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Fim Atendimento"
                                    value={medicoEdit.fimAtendimento}
                                    onChange={(e) =>
                                        setMedicoEdit({ ...medicoEdit, fimAtendimento: e.target.value })
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