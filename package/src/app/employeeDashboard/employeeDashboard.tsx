'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import MSidebarMedico from '../(DashboardLayout)/layout/sidebar/SidebarMedico';
import Header from '../(DashboardLayout)/layout/header/Header';
import { useState } from 'react';

const EmployeeDashboard = () => {
  // Defina os estados para controlar a abertura e fechamento do menu (se necessário)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Exemplo: Inicia aberto
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setIsMobileSidebarOpen(false);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const toggleMobileSidebar = (event: React.MouseEvent<HTMLElement>) => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}> {/* Layout com menu lateral */}
      <MSidebarMedico // Renderiza o menu lateral do paciente
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={handleSidebarClose}
      />
      <Box sx={{ flexGrow: 1 }}> {/* Adicione um Box para envolver o Header e o PageContainer */}
        <Header toggleMobileSidebar={toggleMobileSidebar} /> {/* Renderiza o Header */}
        <PageContainer title="Meu Painel" description="Visão geral da sua conta">
          <Box>
            <Typography variant="h4" gutterBottom>
              Bem-vindo(a), [Nome do Funcionário]!
            </Typography>
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
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;