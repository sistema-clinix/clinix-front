
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const clinicas = [
    {
        id: "1",
        name: "Allan Amâncio",
        post: "Cardiologia",
        age: "19",
        priority: "Baixa",
        pbg: "primary.main",
        budget: "1000",
    },
    {
        id: "2",
        name: "Amanda Cruz",
        post: "Neurologia",
        age: "28",
        priority: "Média",
        pbg: "secondary.main",
        budget: "1000",
    },
    {
        id: "3",
        name: "George Lima",
        post: "Ortopedia",
        age: "31",
        priority: "Alta",
        pbg: "error.main",
        budget: "1000",
    },
    {
        id: "4",
        name: "Haniel Costa",
        post: "Pediatria",
        age: "20",
        priority: "Crítica",
        pbg: "success.main",
        budget: "1000",
    },
];


const ListagemClinicas = () => {
    return (

        <DashboardCard title="Listagem geral de pacientes">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
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
                                    Idade
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Prioridade
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Valor
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clinicas.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            {/* <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography> */}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.age}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">R$ {product.budget}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ListagemClinicas;
