import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { styled } from '@mui/system';
 interface RadioGroupProps {
    role: string;
    handleRoleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomRadioGroup: React.FC<RadioGroupProps> = ({role, handleRoleChange}) => (
    <>
      <Typography variant="subtitle1" fontWeight={600} component="label" mb="5px" align="center">
        Selecione seu perfil:
      </Typography>
        <RadioGroup row value={role} onChange={handleRoleChange} sx={{ mb: 3, justifyContent: 'center' }}>
            <FormControlLabel value="paciente" control={<Radio />} label="Paciente" />
            <FormControlLabel value="medico" control={<Radio />} label="Médico" />
            <FormControlLabel value="gerente" control={<Radio />} label="Gerente" />
        </RadioGroup>
    </>
);

export default CustomRadioGroup;