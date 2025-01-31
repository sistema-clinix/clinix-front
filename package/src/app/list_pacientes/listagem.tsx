import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { useEffect, useState } from "react";

const ListagemPacientes = () => {
  interface Paciente {
    id: number;
    nome: string;
    nomeUsuario: string;
    enabled: boolean;
    data: string;
    email: string;
    rg: string;
    cpf: string;
  }

  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    fetch("https://seu-endpoint.com/api/pacientes") // Substitua pelo seu endpoint real
      .then((response) => response.json())
      .then((data) => {
        const pacientesFormatados = data.map(
          (paciente: {
            id: number;
            nome: string;
            nomeUsuario: string;
            enabled: boolean;
            dataCadastro: Date;
            email: string;
            rg: string;
            cpf: string;
          }) => ({
            id: paciente.id,
            nome: paciente.nome,
            nomeUsuario: paciente.nomeUsuario,
            enabled: paciente.enabled, // Ajuste se a API retornar um campo diferente
            data: paciente.dataCadastro, // Ajuste conforme necessário
            email: paciente.email,
            rg: paciente.rg,
            cpf: paciente.cpf,
          })
        );
        setPacientes(pacientesFormatados);
      })
      .catch((error) => console.error("Erro ao buscar pacientes:", error));
  }, []);

  return (
    <DashboardCard title="Listagem geral de pacientes">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nome
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Enabled
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Data cadastro
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  RG
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  CPF
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {paciente.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {paciente.nome}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {paciente.nomeUsuario}
                  </Typography>
                </TableCell>
                {/* <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: paciente.pbg,
                        color: "#fff",
                      }}
                      size="small"
                      label={paciente.prioridade}
                    />
                  </TableCell> */}

                <TableCell align="right">
                  <Typography variant="h6">{paciente.enabled}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{paciente.data}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{paciente.email}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{paciente.rg}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{paciente.cpf}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ListagemPacientes;
