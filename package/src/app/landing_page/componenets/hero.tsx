'use client';

import { Box, Button, Container, Grid, Typography, Avatar } from '@mui/material';
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Timeline from '@mui/lab/Timeline/Timeline';
import timelineOppositeContentClasses from '@mui/lab/TimelineOppositeContent/timelineOppositeContentClasses';
import TimelineItem from '@mui/lab/TimelineItem/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent/TimelineContent';

const LandingPage = () => {
  return (
     <PageContainer title="Clinix" description="Sua ferramenta para saúde e gestão.">
       {/* Hero Section */}
    <div>
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          bgcolor: 'primary.main',
          color: 'white',
          backgroundImage: 'url(/images/backgrounds/hero.jpg)', // Substitua pelo caminho da imagem
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
  <Typography 
    variant="h1" // Aumenta o tamanho da fonte
    sx={{ 
      fontWeight: 'bold', 
      color: 'black', // Cor preta para o nome
      fontSize: '3rem', // Tamanho maior
    }}
  >
    Clinix
  </Typography>
  <Typography 
    variant="h5" 
    sx={{ 
      mt: 2, 
      color: 'black', // Cor preta para o slogan
      fontWeight: 'normal',
    }}
  >
    Sua ferramenta para saúde e gestão.
  </Typography>
  <Button 
    variant="contained" 
    color="secondary" 
    sx={{ 
      mt: 4, 
      paddingX: 4, // Maior largura do botão
      paddingY: 2, // Maior altura do botão
      fontSize: '1.2rem', // Tamanho de fonte maior
    }}
    component={Link} // Definindo o componente Link para envolver o botão
  href="/authentication/register" // A rota padrão (home)
  >
    Cadastrar
  </Button>
</Container>

      </Box>

       {/* Features Section */}
       <Grid container spacing={4} sx={{ mt: 4 }}>
         <Grid item xs={12} md={6}>
           <Timeline
             className="theme-timeline"
             sx={{
               p: 0,
               mb: '-40px',
               '& .MuiTimelineConnector-root': {
                 width: '1px',
                 backgroundColor: '#efefef'
               },
               [`& .${timelineOppositeContentClasses.root}`]: {
                 flex: 0.5,
                 paddingLeft: 0,
               },
             }}
           >
             <TimelineItem>
               <TimelineOppositeContent></TimelineOppositeContent>
               <TimelineSeparator>
                 <TimelineDot color="success" variant="outlined" />
                 <TimelineConnector />
               </TimelineSeparator>
               <TimelineContent>✔ Agendamento de Consultas</TimelineContent>
             </TimelineItem>
             <TimelineItem>
               <TimelineOppositeContent></TimelineOppositeContent>
               <TimelineSeparator>
                 <TimelineDot color="success" variant="outlined" />
                 <TimelineConnector />
               </TimelineSeparator>
               <TimelineContent>✔ Prontuários Digitais</TimelineContent>
             </TimelineItem>
             <TimelineItem>
               <TimelineOppositeContent></TimelineOppositeContent>
               <TimelineSeparator>
                 <TimelineDot color="success" variant="outlined" />
                 <TimelineConnector />
               </TimelineSeparator>
               <TimelineContent>✔ Relatórios Personalizados</TimelineContent>
             </TimelineItem>
           </Timeline>
         </Grid>
         <Grid item xs={12} md={6}>
           <Timeline
             className="theme-timeline"
             sx={{
               p: 0,
               mb: '-40px',
               '& .MuiTimelineConnector-root': {
                 width: '1px',
                 backgroundColor: '#efefef'
               },
               [`& .${timelineOppositeContentClasses.root}`]: {
                 flex: 0.5,
                 paddingLeft: 0,
               },
             }}
           >
             <TimelineItem>
               <TimelineOppositeContent></TimelineOppositeContent>
               <TimelineSeparator>
                 <TimelineDot color="success" variant="outlined" />
                 <TimelineConnector />
               </TimelineSeparator>
               <TimelineContent>✔ Gestão Financeira</TimelineContent>
             </TimelineItem>
             <TimelineItem>
               <TimelineOppositeContent></TimelineOppositeContent>
               <TimelineSeparator>
                 <TimelineDot color="success" variant="outlined" />
                 <TimelineConnector />
               </TimelineSeparator>
               <TimelineContent>✔ Notificações e Lembretes</TimelineContent>
             </TimelineItem>
             <TimelineItem>
               <TimelineOppositeContent></TimelineOppositeContent>
               <TimelineSeparator>
                 <TimelineDot color="success" variant="outlined" />
               </TimelineSeparator>
               <TimelineContent>✔ Suporte Multiplataforma</TimelineContent>
             </TimelineItem>
           </Timeline>
         </Grid>
       </Grid>

       {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold">Depoimentos</Typography>
          <Grid container spacing={1} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }} src="/path/to/avatar1.jpg" /> {/* Substitua pelo caminho do avatar */}
              <Typography variant="body1">"Clinix transformou minha clínica! Muito mais organização e eficiência."</Typography>
              <Typography variant="subtitle2">- Dr. João</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }} src="/path/to/avatar2.jpg" /> {/* Substitua pelo caminho do avatar */}
              <Typography variant="body1">"Ferramenta indispensável para qualquer profissional de saúde."</Typography>
              <Typography variant="subtitle2">- Dra. Maria</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }} src="/path/to/avatar3.jpg" /> {/* Substitua pelo caminho do avatar */}
              <Typography variant="body1">"Facilidade de uso e suporte excelente. Recomendo!"</Typography>
              <Typography variant="subtitle2">- Enfermeira Clara</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

       {/* CTA Section */}
      <Container sx={{ textAlign: 'center', py: 6 }}>
      <Button 
  variant="contained" 
  color="primary" 
  sx={{ mx: 2 }}
  component={Link} // Definindo o componente Link para envolver o botão
  href="/" // A rota padrão (home)
>
  Cadastrar
</Button>
        <Button variant="outlined" color="primary" sx={{ mx: 2 }}>Entrar em contato</Button>
      </Container>

       {/* Footer */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', textAlign: 'center', py: 3 }}>
        <Typography variant="body2">© 2024 Clinix. Todos os direitos reservados.</Typography>
      </Box>
      </div>
     </PageContainer>
  );
};

export default LandingPage;
