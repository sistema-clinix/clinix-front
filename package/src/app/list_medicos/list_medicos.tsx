"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import MSidebar from "../(DashboardLayout)/layout/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/header/Header";
import ListagemMedicos from "./listagem";

const listMedicos = () => {
    return (
      <PageContainer title="Medicos" description="Medicos">
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
            <ListagemMedicos />
          </div>
        </div>
      </PageContainer>
    );
  };

  export default listMedicos;
