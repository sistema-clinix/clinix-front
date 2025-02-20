// apiRoutes.ts

const BASE_URL = 'http://localhost:8080'; // Use uma variável de ambiente

export const CREATE_USUARIO = () => `${BASE_URL}/usuario/save`;
export const LIST_USUARIO = () => `${BASE_URL}/usuario/list`;
export const UPDATE_USUARIO = (id: number) => `${BASE_URL}/usuario/atualizar/${id}`;
export const DELETE_USUARIO = (id: number) => `${BASE_URL}/usuario/deletar/${id}`;
export const BUSCAR_USUARIO = (id: number) => `${BASE_URL}/usuario/buscar/${id}`;

export const CREATE_PACIENTE = () => `${BASE_URL}/paciente/save`;
export const LIST_PACIENTE = () => `${BASE_URL}/paciente/list`;
export const UPDATE_PACIENTE = (id: number) => `${BASE_URL}/paciente/atualizar/${id}`;
export const DELETE_PACIENTE = (id: number) => `${BASE_URL}/paciente/deletar/${id}`;


export const CREATE_MEDICO = () => `${BASE_URL}/medico/save`;
export const LIST_MEDICO = () => `${BASE_URL}/medico/list`;
export const UPDATE_MEDICO = (id: number) => `${BASE_URL}/medico/atualizar/${id}`;
export const DELETE_MEDICO = (id: number) => `${BASE_URL}/medico/deletar/${id}`;

export const CREATE_GERENTE = () => `${BASE_URL}/gerente/save`;
export const LIST_GERENTE = () => `${BASE_URL}/gerente/list`;
export const UPDATE_GERENTE = (id: number) => `${BASE_URL}/gerente/atualizar/${id}`;
export const DELETE_GERENTE = (id: number) => `${BASE_URL}/gerente/deletar/${id}`;

//Clinicas
export const CREATE_CLINICA = () => `${BASE_URL}/clinicas`;
export const LIST_CLINICA = () => `${BASE_URL}/clinicas`;
export const UPDATE_CLINICA = (id: number) => `${BASE_URL}/clinicas/${id}`;
export const DELETE_CLINICA = (id: number) => `${BASE_URL}/clinicas/${id}`;
export const BUSCAR_CLINICA = (id: number) => `${BASE_URL}/clinicas/${id}`;

//Vinculos de Clinica
export const SOLICITACOES_VINCULO = (c_id:number) => `${BASE_URL}/vinculos/solicitacoes/${c_id}`;
export const ATIVOS_VINCULO = (c_id:number) => `${BASE_URL}/vinculos/${c_id}`;
export const SOLICITAR_VINCULO = (c_id:number, m_id:number) => `${BASE_URL}/vinculos/solicitar/${c_id}/${m_id}`;
export const RECUSAR_VINCULO = (c_id:number, m_id:number) => `${BASE_URL}/vinculos/recusar/${c_id}/${m_id}`;
export const VINCULAR_CLINICA = (c_id:number, m_id:number) => `${BASE_URL}/vinculos/vincular/${c_id}/${m_id}`;
export const DESVINCULAR_CLINICA = (c_id:number, m_id:number) => `${BASE_URL}/vinculos/desvincular/${c_id}/${m_id}`;


//Agendamentos
export const CREATE_AGENDAMENTO = () => `${BASE_URL}/agendamento/save`;
export const LIST_AGENDAMENTO = () => `${BASE_URL}/agendamento/list`;
export const UPDATE_AGENDAMENTO = (id: number) => `${BASE_URL}/agendamento/atualizar/${id}`;
export const DELETE_AGENDAMENTO = (id: number) => `${BASE_URL}/agendamento/deletar/${id}`;
export const BUSCAR_AGENDAMENTO = (id: number) => `${BASE_URL}/agendamento/buscar/${id}`;
