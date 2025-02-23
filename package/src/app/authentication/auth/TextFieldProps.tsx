import React from 'react';
import { Typography, Stack } from '@mui/material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { styled } from '@mui/system';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (e: any) => void;
    error: boolean;
    helperText: string;
    placeholder?: string;
    type?: string;
    inputProps?: any;
}

const FieldWrapper = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    //alignItems: 'center', // Centraliza os itens horizontalmente
}));

const CustomFormTextField: React.FC<TextFieldProps> = ({ label, value, onChange, error, helperText, placeholder, type, inputProps }) => (
    <FieldWrapper>
        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor={label} mb="5px">
            {label}
        </Typography>
        <CustomTextField
            id={label}
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            type={type}
            inputProps={inputProps}
        />
    </FieldWrapper>
);

export default CustomFormTextField;