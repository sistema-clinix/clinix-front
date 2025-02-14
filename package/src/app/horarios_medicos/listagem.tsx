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
import React from "react";


const HorariosMedicos = () => {
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

    interface HorarioAtendimento {
        id: number;
        medico: number;
        horario: string;
        reservado: boolean;
        paciente?: string;
    }

    let [medicos, setMedicos] = useState<Medico[]>([]);
    //const [openEdit, setOpenEdit] = useState(false);
    //const [openDelete, setOpenDelete] = useState(false);


    const [openHorarios, setOpenHorarios] = useState(false);
    const [openEditHorario, setOpenEditHorario] = useState(false);
    const [openDeleteHorario, setOpenDeleteHorario] = useState(false);
    const [novoHorario, setNovoHorario] = useState("");

    const [horarios, setHorarios] = useState<HorarioAtendimento[]>([]);
    const [horarioSelecionado, setHorarioSelecionado] = useState<HorarioAtendimento | null>(null);


    //const [horarioDelete, setHorarioDelete] = useState<HorarioAtendimento | null>(null);
    const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);



    useEffect(() => {
        fetch("http://localhost:8080/clinixSistemaUsuarios/medico/list") //Corrigir para a rota correta.
            .then((response) => response.json())
            .then((data) => {
                setMedicos(data);
            })
            .catch((error) => console.error("Erro ao buscar medicos:", error));
    }, []);


    const handleHorariosClick = (medico: Medico) => {
        setMedicoSelecionado(medico);
        setOpenHorarios(true);

        fetch(`http://localhost:8080/clinixSistemaUsuarios/horarios/listHorarios/${medico.id}`)
            .then((response) => response.json())
            .then((data: HorarioAtendimento[]) => setHorarios(data))
            .catch((error) => console.error("Erro ao buscar horários:", error));
    };

    const handleEditHorarioClick = (horario: HorarioAtendimento) => {
        setHorarioSelecionado(horario);
        setNovoHorario(horario.horario);
        setOpenEditHorario(true);
    };

    const handleDeleteHorarioClick = (horario: HorarioAtendimento) => {
        setHorarioSelecionado(horario);
        setOpenDeleteHorario(true);
    };

    const handleSaveHorario = () => {
        if (horarioSelecionado) {
            fetch(`http://localhost:8080/clinixSistemaUsuarios/horarios/update/${horarioSelecionado.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...horarioSelecionado, horario: novoHorario }),
            })
                .then((response) => response.json())
                .then((updatedHorario) => {
                    setHorarios(horarios.map((h) => (h.id === updatedHorario.id ? updatedHorario : h)));
                    setOpenEditHorario(false);
                })
                .catch((error) => console.error("Erro ao atualizar horário:", error));
        }
    };

    const handleDeleteHorario = () => {
        if (horarioSelecionado) {
            fetch(`http://localhost:8080/clinixSistemaUsuarios/horarios/delete/${horarioSelecionado.id}`, {
                method: "DELETE",
            })
                .then(() => {
                    setHorarios(horarios.filter((h) => h.id !== horarioSelecionado.id));
                    setOpenDeleteHorario(false);
                })
                .catch((error) => console.error("Erro ao deletar horário:", error));
        }
    };



    return (
        <DashboardCard title="Listagem geral de medicos e seus horários">
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
                                <TableCell align="right">Horários</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicos.map((medico) => (
                                <TableRow key={medico.id}>
                                    <TableCell>{medico.id}</TableCell>
                                    <TableCell>{medico.nome}</TableCell>
                                    <TableCell>{medico.nomeUsuario}</TableCell>
                                    <TableCell>{medico.enabled ? "Sim" : "Não"}</TableCell>
                                    <TableCell>{medico.email}</TableCell>
                                    <TableCell>{medico.rg}</TableCell>
                                    <TableCell>{medico.cpf}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleHorariosClick(medico)}
                                            color="secondary">
                                            <AccessTime />
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
                        <h2>Horários de {medicoSelecionado?.nome}</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Horário</TableCell>
                                    <TableCell>Disponível</TableCell>
                                    <TableCell>Paciente</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {horarios.length > 0 ? (
                                    horarios.map((horario) => (
                                        <TableRow key={horario.id}>
                                            <TableCell>{new Date(horario.horario).toLocaleString()}</TableCell>
                                            <TableCell>{horario.reservado ? "Não" : "Sim"}</TableCell>
                                            <TableCell>{horario.paciente ? horario.paciente.nome : "—"}</TableCell>
                                            <IconButton
                                                onClick={() =>  handleEditHorarioClick(horario)}
                                                color="primary"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeleteHorarioClick(horario)}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
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
                            Adicionar Novo Horário
                        </Button>
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
                <Modal open={openEditHorario} onClose={() => setOpenEditHorario(false)}>
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
                            Editar Horário
                        </Typography>
                            <>
                                <TextField
                                    label="Novo horário" fullWidth
                                    value={novoHorario}
                                    onChange={(e) =>
                                        setNovoHorario(e.target.value)} />
                            </>
                        <Box
                            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
                        >
                            <Button variant="contained" color="primary" onClick={handleSaveHorario}>
                                Salvar
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => setOpenEditHorario(false)}>
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Modal de Exclusão */}
                <Modal open={openDeleteHorario} onClose={() => setOpenDeleteHorario(false)}>
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
                            Deseja realmente excluir esse horpa? <br></br> Esta ação não pode ser desfeita.
                        </Typography>
                        <Box
                            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
                        >
                            <Button variant="contained" color="error" onClick={handleDeleteHorario}>
                                Excluir
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setOpenDeleteHorario(false)}
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
    export default HorariosMedicos;

    /*
<DashboardCard title="Listagem geral de médicos">
        <Box sx={{overflow: "auto", width: {xs: "280px", sm: "auto"}}}>
            <Table aria-label="simple table" sx={{whiteSpace: "nowrap", mt: 2}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicos.map((medico) => (
                        <TableRow key={medico.id}>
                                <TableCell>{medico.nome}</TableCell>
                                <TableCell>{medico.email}</TableCell>


<TableCell colSpan={8}>
    <Box sx={{ml: 4}}>
        <h4>Horários de {medico.nome}</h4>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Horário</TableCell>
                    <TableCell>Disponível</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell align="right">Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {horarios.filter(h => h.medico === medico.id).length > 0 ? (
                    horarios
                        .filter(h => h.medico === medico.id)
                        .map((horario) => (
                            <TableRow key={horario.id}>
                                <TableCell>{new Date(horario.horario).toLocaleString()}</TableCell>
                                <TableCell>{horario.reservado ? "Não" : "Sim"}</TableCell>
                                <TableCell>{horario.paciente ? horario.paciente : "—"}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditClick(medico)} color="primary">
                                        <Edit/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(medico)} color="error">
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            Nenhum horário disponível.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>

        </Table>
    </Box>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</Box>
</DashboardCard>

*/