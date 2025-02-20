// apiRoutes.ts

const BASE_URL = 'http://localhost:'; // Use uma variável de ambiente
const PORT_USER = '8080'; // Porta Usuario
const PORT_SCHEDULING = '8081'; // Porta Agendamento
const PORT_CLINIC = '8082'; // Use uma variável de ambiente

export const CREATE_USUARIO = () => `${BASE_URL + PORT_USER}/usuario/save`;
export const LIST_USUARIO = () => `${BASE_URL + PORT_USER}/usuario/list`;
export const UPDATE_USUARIO = (id: number) => `${BASE_URL + PORT_USER}/usuario/atualizar/${id}`;
export const DELETE_USUARIO = (id: number) => `${BASE_URL + PORT_USER}/usuario/deletar/${id}`;
export const BUSCAR_USUARIO = (id: number) => `${BASE_URL + PORT_USER}/usuario/buscar/${id}`;

export const CREATE_PACIENTE = () => `${BASE_URL + PORT_USER}/paciente/save`;
export const LIST_PACIENTE = () => `${BASE_URL + PORT_USER}/paciente/list`;
export const UPDATE_PACIENTE = (id: number) => `${BASE_URL + PORT_USER}/paciente/atualizar/${id}`;
export const DELETE_PACIENTE = (id: number) => `${BASE_URL + PORT_USER}/paciente/deletar/${id}`;


export const CREATE_MEDICO = () => `${BASE_URL + PORT_USER}/medico/save`;
export const LIST_MEDICO = () => `${BASE_URL + PORT_USER}/medico/list`;
export const UPDATE_MEDICO = (id: number) => `${BASE_URL + PORT_USER}/medico/atualizar/${id}`;
export const DELETE_MEDICO = (id: number) => `${BASE_URL+PORT_USER }/medico/deletar/${id}`;

export const CREATE_GERENTE = () => `${BASE_URL + PORT_USER}/gerente/save`;
export const LIST_GERENTE = () => `${BASE_URL + PORT_USER}/gerente/list`;
export const UPDATE_GERENTE = (id: number) => `${BASE_URL + PORT_USER}/gerente/atualizar/${id}`;
export const DELETE_GERENTE = (id: number) => `${BASE_URL+PORT_USER }/gerente/deletar/${id}`;

//Clinicas
export const CREATE_CLINICA = () => `${BASE_URL + PORT_CLINIC}/clinicas`;
export const LIST_CLINICA = () => `${BASE_URL + PORT_CLINIC}/clinicas`;
export const UPDATE_CLINICA = (id: number) => `${BASE_URL + PORT_CLINIC}/clinicas/${id}`;
export const DELETE_CLINICA = (id: number) => `${BASE_URL + PORT_CLINIC}/clinicas/${id}`;
export const BUSCAR_CLINICA = (id: number) => `${BASE_URL + PORT_CLINIC}/clinicas/${id}`;

//Vinculos de Clinica
export const SOLICITACOES_VINCULO = (c_id:number) => `${BASE_URL + PORT_CLINIC}/vinculos/solicitacoes/${c_id}`;
export const ATIVOS_VINCULO = (c_id:number) => `${BASE_URL + PORT_CLINIC}/vinculos/${c_id}`;
export const SOLICITAR_VINCULO = (c_id:number, m_id:number) => `${BASE_URL + PORT_CLINIC}/vinculos/solicitar/${c_id}/${m_id}`;
export const RECUSAR_VINCULO = (c_id:number, m_id:number) => `${BASE_URL + PORT_CLINIC}/vinculos/recusar/${c_id}/${m_id}`;
export const VINCULAR_CLINICA = (c_id:number, m_id:number) => `${BASE_URL + PORT_CLINIC}/vinculos/vincular/${c_id}/${m_id}`;
export const DESVINCULAR_CLINICA = (c_id:number, m_id:number) => `${BASE_URL + PORT_CLINIC}/vinculos/desvincular/${c_id}/${m_id}`;


//Agendamentos
export const CREATE_AGENDAMENTO = () => `${BASE_URL +  PORT_SCHEDULING}/agendamento/save`;
export const LIST_AGENDAMENTO = () => `${BASE_URL +  PORT_SCHEDULING}/agendamento/list`;
export const UPDATE_AGENDAMENTO = (id: number) => `${BASE_URL +  PORT_SCHEDULING}/agendamento/atualizar/${id}`;
export const DELETE_AGENDAMENTO = (id: number) => `${BASE_URL +  PORT_SCHEDULING}/agendamento/deletar/${id}+`;
export const BUSCAR_AGENDAMENTO = (id: number) => `${BASE_URL +  PORT_SCHEDULING}/agendamento/buscar/${id}`;
