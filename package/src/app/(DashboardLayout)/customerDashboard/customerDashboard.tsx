'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import NearbyClinics from '@/app/(DashboardLayout)/components/dashboard/Blog'; // Renomeado
import UpcomingProcedures from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance'; // Renomeado
import RecentProcedures from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions'; // Renomeado

const CustomerDashboard = () => {
  return (
    <PageContainer title="Meu Painel" description="Visão geral da sua conta">
      <Box>
        <Typography variant="h4" gutterBottom>
          Bem-vindo(a), [Nome do Cliente]!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <UpcomingProcedures /> {/* Próximos Agendamentos */}
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentProcedures /> {/* Histórico de Consultas */}
          </Grid>
          <Grid item xs={12}>
            <NearbyClinics /> {/* Clínicas Próximas */}
          </Grid>
          {/* Adicionar mais componentes relevantes para o cliente aqui */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default CustomerDashboard;