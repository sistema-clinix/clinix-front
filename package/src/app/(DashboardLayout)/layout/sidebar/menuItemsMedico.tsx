import {
    IconLayoutDashboard,
    IconLogin,
    IconUser,
    IconCopy,
    IconAperture
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const MenuitemsMedico = [
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
      title: "Pacientes",
      icon: IconAperture,
      href: "/list_pacientes",
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
      href: "/utilities/typography",
    },
    {
      navlabel: true,
      subheader: "Configurações",
    },
    {
      id: uniqueId(),
      title: "Meu perfil",
      icon: IconUser,
      href: "/userProfile",
    },
    {
      id: uniqueId(),
      title: "Logout",
      icon: IconLogin,
      href: "/landing",
    },
  ];
  
  export default MenuitemsMedico;