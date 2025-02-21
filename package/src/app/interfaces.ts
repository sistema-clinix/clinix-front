// interfaces.ts

export interface Usuario {
    id: number;
    nome: string;
    nomeUsuario: string;
    cpf?: string;
    rg?: string;
    enabled: boolean;
    dataCadastro: string;
    email: string;
    senha: string;
}

export interface Paciente extends Usuario{
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

export interface Medico extends Usuario{
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

export interface Gerente extends Usuario {
    clinicas_id: number[];
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
    tipo: string;
    gerenteId: number;
    telefone: string;
    horarioAbertura: string;
    horarioFechamento: string;
}