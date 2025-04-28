import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'

type RootStackParamList = {
    Signin: undefined;
};

function HomeScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('Signin');
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Group Save+</Text>
            <Text style={styles.text}>Welcome to the app!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '90%',
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFB850',
        marginBottom: 20,
    },
    text: {
        color: '#fff',
    },
});


export default HomeScreen

