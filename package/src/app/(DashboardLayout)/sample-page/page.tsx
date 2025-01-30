'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Pacientes" description="Pacientes">
      <DashboardCard title="Pacientes">
        <Typography>Listagem de pacientes</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

