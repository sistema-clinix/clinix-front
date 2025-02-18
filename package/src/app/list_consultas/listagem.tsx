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
import { Edit, Delete, AccessTime } from "@mui/icons-material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { Switch, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

const ListagemConsultas = () => {
    interface Consulta {
        id: number;
        medico: Medico;
        horario: string;
        reservado: boolean;
        paciente: Paciente;
    }

    interface HorarioAtendimento {
        id: number;
        horario: string;
        reservado: boolean;
        paciente?: string;
    }

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

    interface Paciente {
        id: number;
        nome: string;
        nomeUsuario: string;
        enabled: boolean;
        data: string;
        email: string;
        rg: string;
        cpf: string;
        senha: string;
    }

    let [consultas, setConsultas] = useState<Consulta[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [consultaEdit, setConsultaEdit] = useState<Consulta | null>(null);
    const [consultaDelete, setConsultaDelete] = useState<Consulta | null>(null);

    const [horarios, setHorarios] = useState<HorarioAtendimento[]>([]);

    const [openHorarios, setOpenHorarios] = useState(false);
    const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/clinixSistemaUsuarios/medico/list") //Corrigir para a rota correta.
            .then((response) => response.json())
            .then((data) => {
                setConsultas(data);
            })
            .catch((error) => console.error("Erro ao buscar Consultas:", error));
    }, []);


    const handleHorariosClick = (consulta: Consulta) => {
        setConsultaSelecionada(consulta);
        setOpenHorarios(true);

        fetch(`http://localhost:8080/clinixSistemaUsuarios/horarios/listHorarios/${consulta.id}`)
            .then((response) => response.json())
            .then((data: HorarioAtendimento[]) => setHorarios(data))
            .catch((error) => console.error("Erro ao buscar horários:", error));
    };


    const handleEditClick = (medico: Consulta) => {
        setConsultaEdit(medico);
        setOpenEdit(true);
    };

    const handleDeleteClick = (medico: Consulta) => {
        setConsultaDelete(medico);
        setOpenDelete(true);
    };

    const handleSave = () => {
        if (consultaEdit) {
            fetch(
                `http://localhost:8080/clinixSistemaUsuarios/medico/update/${consultaEdit.id}`, //Corrigir para a rota correta.
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(consultaEdit),
                }
            )
                .then((response) => response.json())
                .then((updatedMedico) => {
                    setConsultas(
                        consultas.map((p) =>
                            p.id === updatedMedico.id ? updatedMedico : p
                        )
                    );
                    setOpenEdit(false);
                })
                .catch((error) => console.error("Erro ao atualizar Consulta:", error));
        }
    };

    const handleDelete = () => {
        if (consultaDelete) {
            fetch(
                `http://localhost:8080/clinixSistemaUsuarios/medico/delete/${consultaDelete.id}`, //Corrigir para a rota correta.
                {
                    method: "DELETE",
                }
            )
                .then(() => {
                    setConsultas(consultas.filter((p) => p.id !== consultaDelete.id));
                    setOpenDelete(false);
                })
                .catch((error) => console.error("Erro ao excluir Consulta:", error));
        }
    };

    const reservarHorario = async (horarioId: number) => {
        const username = prompt("Digite seu username para reservar este horário:");
        if (!username) return;

        try {
            const response = await fetch("/api/reservar-horario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, horarioId })
            });

            if (!response.ok) {
                throw new Error("Erro ao reservar o horário");
            }

            alert("Horário reservado com sucesso!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <DashboardCard title="Listagem geral de Consultas">
            <>
                <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
                    <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Médio</TableCell>
                                <TableCell>Horário</TableCell>
                                <TableCell>Reservado</TableCell>
                                <TableCell>Paciente</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {consultas.map((consulta) => (
                                <TableRow key={consulta.id}>
                                    <TableCell>{consulta.id}</TableCell>
                                    <TableCell>{consulta.medico?.nome}</TableCell>
                                    <TableCell>{consulta.horario}</TableCell>
                                    <TableCell>{consulta.reservado ? "Sim" : "Não"}</TableCell>
                                    <TableCell>{consulta.paciente?.nome}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleHorariosClick(consulta)}
                                            color="secondary">
                                            <AccessTime />
                                        </IconButton>

                                        <IconButton
                                            onClick={() => handleEditClick(consulta)}
                                            color="primary"
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteClick(consulta)}
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

                {/* Modal para exibir os horários */}
                <Modal open={openHorarios} onClose={() => setOpenHorarios(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 900,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            textAlign: "center",
                        }}
                    >
                        <h2>Horários de {consultaSelecionada?.medico.nome}</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Horário</TableCell>
                                    <TableCell>Disponível</TableCell>
                                    <TableCell>Paciente</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {horarios.length > 0 ? (
                                    horarios.map((horario) => (
                                        <TableRow key={horario.id}>
                                            <TableCell>{new Date(horario.horario).toLocaleString()}</TableCell>
                                            <TableCell>{horario.reservado ? "Não" : "Sim"}</TableCell>
                                            <TableCell>{horario.paciente ? horario.paciente : "—"}</TableCell>
                                            <TableCell>
                                                {!horario.reservado && (
                                                    <Button 
                                                        variant="contained" 
                                                        color="primary"
                                                        onClick={() => reservarHorario(horario.id)}
                                                    >
                                                        Reservar
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Nenhum horário encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={() => setOpenHorarios(false)}
                        >
                            Fechar
                        </Button>
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
                            Editar Consulta
                        </Typography>
                        {consultaEdit && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Nome do Médico"
                                    value={consultaEdit.medico.nome}
                                    onChange={(e) =>
                                        setConsultaEdit({
                                            ...consultaEdit,
                                            medico: { ...consultaEdit.medico, nome: e.target.value },
                                        })
                                    }
                                />

                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Email do Médico"
                                    value={consultaEdit.medico.email}
                                    onChange={(e) =>
                                        setConsultaEdit({
                                            ...consultaEdit,
                                            medico: { ...consultaEdit.medico, email: e.target.value },
                                        })
                                    }
                                />

                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Username"
                                    value={consultaEdit.medico.nomeUsuario}
                                    onChange={(e) =>
                                        setConsultaEdit({
                                            ...consultaEdit,
                                            medico: { ...consultaEdit.medico, nomeUsuario: e.target.value },
                                        })
                                    }
                                />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={consultaEdit.medico.enabled}
                                            onChange={(e) =>
                                                setConsultaEdit({
                                                    ...consultaEdit,
                                                    medico: { ...consultaEdit.medico, enabled: e.target.checked },
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
                                    label="RG do Médico"
                                    value={consultaEdit.medico.rg}
                                    onChange={(e) =>
                                        setConsultaEdit({
                                            ...consultaEdit,
                                            medico: { ...consultaEdit.medico, rg: e.target.value },
                                        })
                                    }
                                />

                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="CPF do Médico"
                                    value={consultaEdit.medico.cpf}
                                    onChange={(e) =>
                                        setConsultaEdit({
                                            ...consultaEdit,
                                            medico: { ...consultaEdit.medico, cpf: e.target.value },
                                        })
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

export default ListagemConsultas;