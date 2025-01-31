"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Dashboard from "../(DashboardLayout)/page";
import MSidebar from "../(DashboardLayout)/layout/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/header/Header";
import ProductPerformance from "../(DashboardLayout)/components/dashboard/ProductPerformance";
import ListagemClinicas from "./listagem";

const listClinicas = () => {
    return (
      <PageContainer title="Clinicas" description="Clinicas">
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar ocupando uma largura fixa */}
          <MSidebar
            isMobileSidebarOpen={false}
            onSidebarClose={() => {}}
            isSidebarOpen={true}
          />
  
          {/* Área de conteúdo ocupando o restante do espaço */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Header toggleMobileSidebar={() => {}} />
            <ListagemClinicas />
          </div>
        </div>
      </PageContainer>
    );
  };

  export default listClinicas;
