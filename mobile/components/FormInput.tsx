import React, { memo } from 'react';
import { TextInput, Text, StyleSheet, Platform, KeyboardTypeOptions } from 'react-native';

type FormInputProps = {
    field?: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    value?: string;
    handleChange?: (value: string) => void;
    errors?: any;
    touched?: any;
};

const FormInput: React.FC<FormInputProps> = ({
    field,
    placeholder,
    value,
    handleChange,
    touched,
    errors,
    secureTextEntry = false,
}) => {
    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={(value) => handleChange?.(value)} // Use optional chaining
                secureTextEntry={secureTextEntry}
            />
            {field && touched[field] && errors[field] && (
                <Text style={styles.error}>{errors[field]}</Text>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});

export default memo(FormInput);