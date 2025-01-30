import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Link from 'next/link';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const [role, setRole] = useState<string>('paciente'); // Estado para controlar a opção selecionada

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole((event.target as HTMLInputElement).value);
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    {/* Radio buttons para selecionar o tipo de usuário */}
                    <Typography variant="subtitle1" fontWeight={600} component="label" mb="5px">
                        Selecione seu perfil:
                    </Typography>
                    <RadioGroup
                        row
                        value={role}
                        onChange={handleRoleChange}
                        sx={{ mb: 3 }}
                    >
                        <FormControlLabel value="paciente" control={<Radio />} label="Paciente" />
                        <FormControlLabel value="medico" control={<Radio />} label="Médico" />
                        <FormControlLabel value="gestor" control={<Radio />} label="Gestor" />
                    </RadioGroup>

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
                        Nome
                    </Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
                        E-mail
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
                        Senha
                    </Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth />
                </Stack>

                <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/authentication/login">
                    Cadastrar
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
