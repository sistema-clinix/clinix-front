import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
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
    title: "Relatórios",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    id: uniqueId(),
    title: "Pacientes",
    icon: IconAperture,
    href: "/list_pacientes",
  },
  {
    id: uniqueId(),
    title: "Clinicas",
    icon: IconAperture,
    href: "/list_clinicas",
  },
  {
    id: uniqueId(),
    title: "Médicos",
    icon: IconAperture,
    href: "/list_medicos",
  },
  {
    id: uniqueId(),
    title: "Consultas",
    icon: IconAperture,
    href: "/list_consultas",
  },
  // {
  //   id: uniqueId(),
  //   title: "Exames",
  //   icon: IconAperture,
  //   href: "/utilities/typography",
  // },
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
  {
    id: uniqueId(),
    title: "Editar perfil",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  // {
  //   navlabel: true,
  //   subheader: "Listagens",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Solicitações",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "resultados",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
