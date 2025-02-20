import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, } from '@mui/material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack, styled } from '@mui/system';
import {
    CREATE_USUARIO,
    CREATE_PACIENTE,
    CREATE_MEDICO,
    CREATE_GERENTE
} from "@/app/APIroutes";

interface AuthRegisterProps {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

// Estilo para o Stack que envolve cada campo para melhor organização
const FieldWrapper = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    //alignItems: 'center', // Remove a centralização horizontal dos itens
}));

const AuthRegister: React.FC<AuthRegisterProps> = ({ title, subtitle, subtext }) => {
    const [role, setRole] = useState<string>('paciente');
    const [nome, setNome] = useState<string>('');
    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [rg, setRg] = useState<string>('');
    const [crm, setCrm] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
        // Limpar campos específicos ao trocar de role
        setCpf('');
        setRg('');
        setCrm('');
        setCnpj('');
        setNomeUsuario('');
    };

    const handleRegister = async () => {
        //Dados em comum a todos os usuários:
        const usuarioData = {
            nome: nome,
            nomeUsuario: nomeUsuario,
            email: email,
            senha: senha,
            cpf: cpf,
            rg: rg,
            enabled: true,
            dataCadastro: new Date().toISOString()
        };

        let specificData = {};
        let createSpecificUrl = '';

        switch (role) {
            case 'paciente':
                createSpecificUrl = CREATE_PACIENTE();
                break;
            case 'medico':
                createSpecificUrl = CREATE_MEDICO();
                specificData = { crm: crm };
                break;
            case 'gerente':
                createSpecificUrl = CREATE_GERENTE();
                specificData = { cnpj: cnpj };
                break;
            default:
                console.error('Perfil inválido');
                return;
        }

        try {
            // 1. Criar o usuário
            const usuarioResponse = await fetch(CREATE_USUARIO(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });

            if (!usuarioResponse.ok) {
                const errorData = await usuarioResponse.json();
                throw new Error(errorData.message || 'Erro ao cadastrar usuário (dados gerais)');
            }

            const usuarioResult = await usuarioResponse.json();
            const usuarioId = usuarioResult.id;

            // 2. Criar o perfil específico (paciente, médico, gerente)
            const specificResponse = await fetch(createSpecificUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...specificData, usuarioId: usuarioId }),
            });

            if (!specificResponse.ok) {
                const errorData = await specificResponse.json();
                throw new Error(errorData.message || 'Erro ao cadastrar perfil específico');
            }


            alert('Usuário cadastrado com sucesso!');
        } catch (error: any) {
            console.error(error);
            alert(`Erro ao cadastrar usuário: ${error.message}`);
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1} align="center">
                    {title}
                </Typography>
            )}
            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" mb="5px" align="center">
                        Selecione seu perfil:
                    </Typography>
                    <RadioGroup row value={role} onChange={handleRoleChange} sx={{ mb: 3, justifyContent: 'center' }}>
                        <FormControlLabel value="paciente" control={<Radio />} label="Paciente" />
                        <FormControlLabel value="medico" control={<Radio />} label="Médico" />
                        <FormControlLabel value="gerente" control={<Radio />} label="Gerente" />
                    </RadioGroup>

                   
                        
                            <FieldWrapper>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="nome" mb="5px" >
                                    Nome
                                </Typography>
                                <CustomTextField id="nome" variant="outlined" fullWidth value={nome} onChange={(e: any) => setNome(e.target.value)} />
                            </FieldWrapper>
                      

                            <FieldWrapper>
                                 <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="nomeUsuario" mb="5px" >
                                    Nome de usuário
                                </Typography>
                                <CustomTextField id="nomeUsuario" variant="outlined" fullWidth value={nomeUsuario} onChange={(e: any) => setNomeUsuario(e.target.value)} />
                            </FieldWrapper>
                    

                            <FieldWrapper>
                                 <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" >
                                    E-mail
                                </Typography>
                                <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e: any) => setEmail(e.target.value)} />
                            </FieldWrapper>
                      

                            <FieldWrapper>
                                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="senha" mb="5px" >
                                    Senha
                                </Typography>
                                <CustomTextField id="senha" variant="outlined" fullWidth type="password" value={senha} onChange={(e: any) => setSenha(e.target.value)} />
                            </FieldWrapper>
                        

                            <FieldWrapper>
                                 <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="cpf" mb="5px" >
                                    CPF
                                </Typography>
                                <CustomTextField id="cpf" variant="outlined" fullWidth value={cpf} onChange={(e: any) => setCpf(e.target.value)} />
                            </FieldWrapper>
                     

                            <FieldWrapper>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="rg" mb="5px" >
                                    RG
                                </Typography>
                                <CustomTextField id="rg" variant="outlined" fullWidth value={rg} onChange={(e: any) => setRg(e.target.value)} />
                            </FieldWrapper>
                      

                         {role === 'medico' && (
                            
                                <FieldWrapper>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="crm" mb="5px" >
                                        CRM
                                    </Typography>
                                    <CustomTextField id="crm" variant="outlined" fullWidth value={crm} onChange={(e: any) => setCrm(e.target.value)} />
                                </FieldWrapper>
                        
                        )}

                         {role === 'gerente' && (
                           
                                <FieldWrapper>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="cnpj" mb="5px" >
                                        CNPJ da Clínica
                                    </Typography>
                                    <CustomTextField id="cnpj" variant="outlined" fullWidth value={cnpj} onChange={(e: any) => setCnpj(e.target.value)} />
                                </FieldWrapper>
                           
                        )}
                    


                </Stack>

                <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister} sx={{maxWidth: '400px'}}>
                    Cadastrar
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
