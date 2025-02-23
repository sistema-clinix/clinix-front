import {
    IconAperture,
    IconLayoutDashboard,
    IconLogin,
    IconUser,
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const MenuitemsPaciente = [
    {
      navlabel: true,
      subheader: "Início",
    },
    {
      id: uniqueId(),
      title: "Painel geral",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      navlabel: true,
      subheader: "Recursos",
    },
    {
      id: uniqueId(),
      title: "Meu perfil",
      icon: IconUser,
      href: "/userProfile",
    },
    {
      id: uniqueId(),
      title: "Consultas",
      icon: IconAperture,
      href: "/list_consultas",
    },
    {
      id: uniqueId(),
      title: "Clinicas",
      icon: IconAperture,
      href: "/list_clinicas",
    },
    {
      id: uniqueId(),
      title: "Exames",
      icon: IconAperture,
      href: "/list_exames",
    },
    {
      navlabel: true,
      subheader: "Configurações",
    },
    {
      id: uniqueId(),
      title: "Logout",
      icon: IconLogin,
      href: "/landing",
    },
  ];
  
  export default MenuitemsPaciente;