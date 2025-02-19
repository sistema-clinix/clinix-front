'use client'
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import NearbyClinics from '@/app/(DashboardLayout)/components/dashboard/Blog'; // Renomeado
import UpcomingProcedures from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance'; // Renomeado
import RecentProcedures from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions'; // Renomeado
import MSidebarPaciente from '../(DashboardLayout)/layout/sidebar/SidebarPaciente';
import Header from '../(DashboardLayout)/layout/header/Header';


const CustomerDashboard = () => {
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
      <MSidebarPaciente // Renderiza o menu lateral do paciente
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={handleSidebarClose}
      />
      <Box sx={{ flexGrow: 1 }}> {/* Adicione um Box para envolver o Header e o PageContainer */}
        <Header toggleMobileSidebar={toggleMobileSidebar} /> {/* Renderiza o Header */}
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
      </Box>
    </Box>
  );
};

export default CustomerDashboard;