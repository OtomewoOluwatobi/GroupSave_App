import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface FormTextAreaProps {
  field: string;
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  touched?: { [key: string]: boolean };
  errors?: { [key: string]: string };
  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  field,
  placeholder,
  value,
  handleChange,
  touched,
  errors,
  numberOfLines = 4,
  maxLength,
  autoCapitalize = 'none',
}) => {
  const showError = touched?.[field] && errors?.[field];

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textArea,
          showError && styles.textAreaError
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={handleChange}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        textAlignVertical="top"
      />
      {showError && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textArea: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    marginVertical: 10,
  },
  textAreaError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});

export default FormTextArea;