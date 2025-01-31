import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Link from 'next/link';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface User {
    role: string;
    name: string;
    email: string;
    password: string;
}

const AuthRegister = ({ title, subtitle, subtext }: { title?: string; subtitle?: JSX.Element | JSX.Element[]; subtext?: JSX.Element | JSX.Element[] }) => {
    const [role, setRole] = useState<string>('paciente');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
    };

    const handleRegister = async () => {
        const user: User = { role, name, email, password };

        try {
            const response = await fetch('http://localhost:8080/clinixSistemaUsuarios/paciente/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
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

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
                        Nome
                    </Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
                        E-mail
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
                        Senha
                    </Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth type="password" value={password} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)} />
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
