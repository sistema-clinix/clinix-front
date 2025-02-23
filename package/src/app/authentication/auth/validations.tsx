//Funções de validação
export const validateName = (nome: string) => {
    return nome.length >= 3;
};

export const validateUsername = (username: string) => {
    return username.length >= 3;
};

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
    return password.length >= 5;
};

export const validateCPF = (cpf: string) => {
    if (!cpf) return true; // Permitir CPF vazio

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
};

export const validateRG = (rg: string) => {
    if (!rg) return true; // Permitir RG vazio
    const rgRegex = /^\d{1}\.\d{3}\.\d{3}$/;
    return rgRegex.test(rg);
};

// export const validateTime = (time: string) => {
//     const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     return timeRegex.test(time);
// };

export const validateCRM = (crm: string) => {
    const crmRegex = /^\d{6}$/;
    return crmRegex.test(crm);
};

export const formatNumber = (value: string, pattern: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    let formattedValue = '';
    let cleanedIndex = 0;

    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === 'X' && cleanedIndex < cleanedValue.length) {
            formattedValue += cleanedValue[cleanedIndex];
            cleanedIndex++;
        } else if (pattern[i] !== 'X') {
            formattedValue += pattern[i];
        }
    }

    return formattedValue;
};

