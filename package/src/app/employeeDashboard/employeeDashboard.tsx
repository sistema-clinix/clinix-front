'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const EmployeeDashboard = () => {
  return (
    <PageContainer title="Painel do Funcionário" description="Visão geral da clínica">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview /> {/* Balanço Financeiro */}
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup /> {/* Atendimentos Anuais */}
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings /> {/* Fluxo de Caixa Mensal */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions /> {/* Procedimentos Recentes */}
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance /> {/* Próximos Procedimentos */}
          </Grid>
          {/* Adicionar componente para gerenciar pacientes */}
          {/* Adicionar componente para visualizar horários dos médicos */}
          {/* Adicionar componente para relatórios e análises */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default EmployeeDashboard;