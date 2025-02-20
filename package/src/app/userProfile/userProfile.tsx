'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import MSidebar from '../(DashboardLayout)/layout/sidebar/Sidebar';
import Header from '../(DashboardLayout)/layout/header/Header';


const UserProfile = () => {
  const theme = useTheme();
  const [name, setName] = useState('George Lima');
  const [email, setEmail] = useState('george.lima@example.com');
  const [phone, setPhone] = useState('5511999999999');
  const [address, setAddress] = useState('Rua Example, 123');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
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

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar os dados no backend
    console.log('Dados salvos:', { name, email, phone, address });
    setSnackbarMessage('Perfil atualizado com sucesso!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleDeleteAccount = () => {
    // Aqui você implementaria a lógica para excluir a conta
    console.log('Excluir conta');
    setSnackbarMessage('Conta excluída com sucesso!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
      <Box sx={{ display: 'flex' }}> {/* Layout com menu lateral */}
          <MSidebar // Renderiza o menu lateral do paciente
              isSidebarOpen={isSidebarOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              onSidebarClose={handleSidebarClose}
          />
          <Box sx={{ flexGrow: 1 }}> {/* Adicione um Box para envolver o Header e o PageContainer */}
              <Header toggleMobileSidebar={toggleMobileSidebar} /> {/* Renderiza o Header */}
              <Container maxWidth="md">
                  <DashboardCard title="Perfil do Usuário">
                      <Box
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 3,
                              padding: 3,
                          }}
                      >
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Avatar
                                  alt="Foto do Perfil"
                                  src="/images/profile.jpg" // Substitua pela URL da foto do perfil
                                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                              />
                          </Box>

                          <TextField
                              label="Nome Completo"
                              variant="outlined"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                          />
                          <TextField
                              label="Email"
                              variant="outlined"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                          />
                          <TextField
                              label="Telefone"
                              variant="outlined"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              type="tel"
                          />
                          <TextField
                              label="Endereço"
                              variant="outlined"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              multiline
                              rows={3}
                          />

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                              <Button variant="contained" color="primary" onClick={handleSave}>
                                  Salvar Alterações
                              </Button>
                              <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
                                  Excluir Conta
                              </Button>
                          </Box>
                      </Box>
                  </DashboardCard>
                  <Snackbar
                      open={openSnackbar}
                      autoHideDuration={6000}
                      onClose={handleCloseSnackbar}
                  >
                      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                          {snackbarMessage}
                      </Alert>
                  </Snackbar>
              </Container>
          </Box>
      </Box>
  );
};

export default UserProfile;