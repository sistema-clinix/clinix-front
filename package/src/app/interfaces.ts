// interfaces.ts

export interface Paciente {
    id: number;
    nome: string;
    nomeUsuario: string;
    enabled: boolean;
    data: string;
    email: string;
    rg: string;
    cpf: string;
    senha: string;
}

export interface Medico {
    id: number;
    nome: string;
    nomeUsuario: string;
    enabled: boolean;
    data: string;
    email: string;
    rg: string;
    cpf: string;
    crm: string;
    inicioAtendimento: string;
    fimAtendimento: string;
}

export interface HorarioAtendimento {
    id: number;
    horario: string;
    reservado: boolean;
    paciente?: string;
}

export interface Consulta {
    id: number;
    medico: Medico;
    horario: string;
    reservado: boolean;
    paciente: Paciente;
}

export interface Clinica {
    id: number;
    nomeFantasia: string;
    cnpj: string;
    telefone: string;
    horarioAbertura: string;
    horarioFechamento: string;
}