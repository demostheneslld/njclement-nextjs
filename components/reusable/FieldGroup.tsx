import { Field, ErrorMessage } from 'formik';
import React from 'react';

interface FieldGroupProps {
    name: string;
    label: string;
    type?: string;
    as?: 'input' | 'textarea' | 'select'; // Add more as required
    placeholder?: string;
}

const FieldGroup: React.FunctionComponent<FieldGroupProps> = ({ name, label, type = 'text', as, placeholder }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium">{label}</label>
            <Field 
                type={type}
                name={name}
                id={name}
                as={as}
                placeholder={placeholder}
                className="p-2 border rounded focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition"
            />
            <ErrorMessage name={name} component="div" className="text-bad-500 text-sm mt-1" />
        </div>
    );
}

export default FieldGroup;
