import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FormInput from '../../../../components/FormInput';
import { FormikHelpers } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const initialValues = {
    title: '',
    totalUsers: '',
    targetAmount: '',
    expectedStartDate: '',
    payment_out_day: '',
    membersEmails: [] as string[],
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    totalUsers: Yup.number().required('Total users is required'),
    targetAmount: Yup.number().required('Target amount is required'),
    expectedStartDate: Yup.string().required('Start date is required'),
    payment_out_day: Yup.number()
        .min(1, 'Day must be between 1 and 31')
        .max(31, 'Day must be between 1 and 31')
        .required('Payment day is required'),
    membersEmails: Yup.array()
        .of(Yup.string().email('Invalid email'))
        .test('len', 'Number of members must match total users', function (val) {
            return val?.length === parseInt(this.parent.totalUsers) || val?.length === 0;
        }),
});

const CreateGroupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [newEmail, setNewEmail] = useState('');
    const [memberError, setMemberError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (!userData) {
                    navigation.navigate('Signin');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    interface GroupFormValues {
        title: string;
        totalUsers: string;
        targetAmount: string;
        expectedStartDate: string;
        payment_out_day: string;
        membersEmails: string[];
    }

    type SetFieldValueType = (
        field: keyof GroupFormValues,
        value: any,
        shouldValidate?: boolean
    ) => void;

    const handleAddEmail = (
        values: GroupFormValues,
        setFieldValue: SetFieldValueType
    ): void => {
        if (!newEmail.includes('@')) return;

        if (values.membersEmails.includes(newEmail)) {
            setMemberError('This email has already been added.');
        } else if (values.membersEmails.length >= parseInt(values.totalUsers)) {
            setMemberError('Cannot add more members. Maximum limit reached.');
        } else {
            setFieldValue('membersEmails', [...values.membersEmails, newEmail]);
            setNewEmail('');
        }
    };

    interface GroupFormValues {
        title: string;
        totalUsers: string;
        targetAmount: string;
        expectedStartDate: string;
        payment_out_day: string;
        membersEmails: string[];
    }

    const handleFormSubmit = async (
        values: GroupFormValues,
        { setSubmitting, resetForm }: FormikHelpers<GroupFormValues>
    ): Promise<void> => {
        try {
            const response = await fetch('https://api.example.com/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred while creating the group.');
            }

            resetForm();
            Alert.alert('Success', 'Group created successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create group.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.title}>Create Group</Text>
                            <Text style={styles.subtitle}>Fill in the details below:</Text>
                        </View>
                        <Ionicons name="close" size={24} color="#ff1400" onPress={() => navigation.navigate('Dashboard')} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                                <>
                                    <Text style={styles.inputLabel}>Title</Text>
                                    <FormInput
                                        field="title"
                                        placeholder="Group Title"
                                        value={values.title}
                                        handleChange={handleChange('title')}
                                        touched={touched}
                                        errors={errors}
                                        inputmode="text"
                                    />

                                    <View style={styles.rowBetween}>
                                        <View style={styles.flexOneMarginRight}>
                                            <Text style={styles.inputLabel}>Total Users</Text>
                                            <FormInput
                                                field="totalUsers"
                                                placeholder="Total Users"
                                                keyboardType="numeric"
                                                value={values.totalUsers}
                                                handleChange={handleChange('totalUsers')}
                                                touched={touched}
                                                errors={errors}
                                                inputmode="numeric"
                                            />
                                        </View>
                                        <View style={styles.flexTwo}>
                                            <Text style={styles.inputLabel}>Target Amount</Text>
                                            <FormInput
                                                field="targetAmount"
                                                placeholder="Target Amount"
                                                value={values.targetAmount}
                                                handleChange={handleChange('targetAmount')}
                                                touched={touched}
                                                errors={errors}
                                                inputmode="decimal"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                    </View>

                                    <Text style={styles.inputLabel}>Expected Start Date</Text>
                                    <FormInput
                                        field="expectedStartDate"
                                        placeholder="Start Date"
                                        value={values.expectedStartDate}
                                        handleChange={handleChange('expectedStartDate')}
                                        touched={touched}
                                        errors={errors}
                                        inputmode="text"
                                    />

                                    <Text style={styles.inputLabel}>Payment Day</Text>
                                    <FormInput
                                        field="payment_out_day"
                                        placeholder="Payment Day"
                                        value={values.payment_out_day}
                                        handleChange={handleChange('payment_out_day')}
                                        touched={touched}
                                        errors={errors}
                                        inputmode="numeric"
                                    />

                                    <Text style={styles.inputLabel}>Members Emails</Text>
                                    <Text style={styles.subNote}>
                                        Added {values.membersEmails.length} of {values.totalUsers} members
                                    </Text>

                                    <View style={styles.emailBox}>
                                        <Text style={styles.emailListText}>
                                            {values.membersEmails.length > 0
                                                ? values.membersEmails.map((email, index) => `${index + 1}. ${email}\n`)
                                                : 'No members added yet'}
                                        </Text>
                                    </View>

                                    {parseInt(values.totalUsers) > values.membersEmails.length && (
                                        <View style={styles.rowBetweenMarginBottom}>
                                            <View style={styles.flexThreeMarginRight}>
                                                <FormInput
                                                    field="membersEmail"
                                                    placeholder="Enter member email"
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    value={newEmail}
                                                    handleChange={(value) => setNewEmail(value)}
                                                    touched={touched}
                                                    errors={errors}
                                                    inputmode="email"
                                                />
                                                <Text style={styles.errorText}>{memberError}</Text>
                                            </View>
                                            <View style={styles.flexOne}>
                                                <TouchableOpacity
                                                    style={[styles.button, isSubmitting && styles.disabledButton, styles.blackButton]}
                                                    onPress={() => handleAddEmail(values, setFieldValue)}
                                                >
                                                    <Text style={styles.buttonText}>Add</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}

                                    {parseInt(values.totalUsers) === values.membersEmails.length && (
                                        <TouchableOpacity
                                            style={[styles.button, isSubmitting && styles.disabledButton]}
                                            onPress={() => handleSubmit()}
                                            disabled={isSubmitting}
                                        >
                                            <Text style={styles.buttonText}>
                                                {isSubmitting ? 'Submitting...' : 'Create Group'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </Formik>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 16,
        marginTop: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexOneMarginRight: {
        flex: 1,
        marginRight: 8,
    },
    flexTwo: {
        flex: 2,
    },
    subNote: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    emailBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        minHeight: 150,
    },
    emailListText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        flex: 1,
    },
    rowBetweenMarginBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    flexThreeMarginRight: {
        flex: 3,
        marginRight: 8,
    },
    flexOne: {
        flex: 1,
    },
    button: {
        backgroundColor: '#146459',
        padding: 15,
        height: 50,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    blackButton: {
        backgroundColor: '#111',
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default CreateGroupScreen;

