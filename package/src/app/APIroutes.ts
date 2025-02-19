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

export const CREATE_CLINICA = () => `${BASE_URL}/clinica/save`;
export const LIST_CLINICA = () => `${BASE_URL}/clinica/list`;
export const UPDATE_CLINICA = (id: number) => `${BASE_URL}/clinica/atualizar/${id}`;
export const DELETE_CLINICA = (id: number) => `${BASE_URL}/clinica/deletar/${id}`;
export const BUSCAR_CLINICA = (id: number) => `${BASE_URL}/clinica/buscar/${id}`;

export const CREATE_AGENDAMENTO = () => `${BASE_URL}/agendamento/save`;
export const LIST_AGENDAMENTO = () => `${BASE_URL}/agendamento/list`;
export const UPDATE_AGENDAMENTO = (id: number) => `${BASE_URL}/agendamento/atualizar/${id}`;
export const DELETE_AGENDAMENTO = (id: number) => `${BASE_URL}/agendamento/deletar/${id}`;
export const BUSCAR_AGENDAMENTO = (id: number) => `${BASE_URL}/agendamento/buscar/${id}`;
