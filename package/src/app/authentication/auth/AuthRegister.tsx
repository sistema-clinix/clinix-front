import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Link from 'next/link';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface User {
    role: string;
    nome: string;
    email: string;
    senha: string;
}

interface Clinica {
    id: 1;
    cnpj: string;
    gerente_id: string;
    horario_abertura: string;
    horario_fechamento: string;
    nome_fantasia: string;
    telefone: string;
    tipo: string;
}

const testeClinica = {
        id: 1,
        cnpj: '123',
        gerente_id: 1,
        horario_abertura: '12:00',
        horario_fechamento: '12:00',
        nome_fantasia: 'Funciona krl',
        telefone: '0000-0000',
        tipo: 'HOSPITAL'
    };

const AuthRegister = ({ title, subtitle, subtext }: { title?: string; subtitle?: JSX.Element | JSX.Element[]; subtext?: JSX.Element | JSX.Element[] }) => {
    const [role, setRole] = useState<string>('paciente');
    const [nome, setnome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setsenha] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [gerente_id, setGerente_id] = useState<number>(1);


    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
    };

    const handleRegister = async () => {
        const user: User = { role, nome, email, senha };
        console.log(testeClinica);

        try {
            const response = await fetch('http://localhost:8080/clinixServiceClinica/clinic/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testeClinica),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }

            alert('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}
            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" mb="5px">
                        Selecione seu perfil:
                    </Typography>
                    <RadioGroup row value={role} onChange={handleRoleChange} sx={{ mb: 3 }}>
                        <FormControlLabel value="paciente" control={<Radio />} label="Paciente" />
                        <FormControlLabel value="medico" control={<Radio />} label="Médico" />
                        <FormControlLabel value="gestor" control={<Radio />} label="Gestor" />
                    </RadioGroup>

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="nome" mb="5px">
                        Nome
                    </Typography>
                    <CustomTextField id="nome" variant="outlined" fullWidth value={nome} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setnome(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
                        E-mail
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="senha" mb="5px" mt="25px">
                        Senha
                    </Typography>
                    <CustomTextField id="senha" variant="outlined" fullWidth type="password" value={senha} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                        setsenha(e.target.value);
                    }} />
                </Stack>

                <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
                    Cadastrar
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
