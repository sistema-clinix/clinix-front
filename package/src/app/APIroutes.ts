// apiRoutes.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // Use uma variável de ambiente

export const LIST_PACIENTES_URL = `${BASE_URL}/clinixSistemaUsuarios/paciente/list`;
export const UPDATE_PACIENTE_URL = (id: number) => `${BASE_URL}/clinixSistemaUsuarios/paciente/update/${id}`;
export const DELETE_PACIENTE_URL = (id: number) => `${BASE_URL}/clinixSistemaUsuarios/paciente/delete/${id}`;

export const LIST_MEDICOS_URL = `${BASE_URL}/clinixSistemaUsuarios/medico/list`;
export const UPDATE_MEDICO_URL = (id: number) => `${BASE_URL}/clinixSistemaUsuarios/medico/update/${id}`;
export const DELETE_MEDICO_URL = (id: number) => `${BASE_URL}/clinixSistemaUsuarios/medico/delete/${id}`;
export const LIST_HORARIOS_MEDICO_URL = (medicoId: number) => `${BASE_URL}/clinixSistemaUsuarios/horarios/listHorarios/${medicoId}`;

//TODO: Corrigir as rotas abaixo
export const LIST_CONSULTAS_URL = `${BASE_URL}/clinixSistemaUsuarios/consulta/list`; //TODO: Alterar para a rota correta
export const UPDATE_CONSULTA_URL = (id: number) => `${BASE_URL}/clinixSistemaUsuarios/consulta/update/${id}`; //TODO: Alterar para a rota correta
export const DELETE_CONSULTA_URL = (id: number) => `${BASE_URL}/clinixSistemaUsuarios/consulta/delete/${id}`; //TODO: Alterar para a rota correta

export const LIST_CLINICAS_URL = `${BASE_URL}/clinixServiceClinica/clinic/list`;
export const UPDATE_CLINICA_URL = (id: number) => `${BASE_URL}/clinixServiceClinica/clinic/update/${id}`;
export const DELETE_CLINICA_URL = (id: number) => `${BASE_URL}/clinixServiceClinica/clinic/delete/${id}`;

// Adicione outras rotas aqui