import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Platform, ActivityIndicator } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import MenuActionSheet from '../../../components/MenuActionSheet';


type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
    Signup: undefined;
    Dashboard: undefined;
};

const DashboardScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [activeTab, setActiveTab] = useState('topGroups');
    const [user, setUser] = useState<{ name?: string } | null>(null);
    const actionSheetRef = React.useRef<ActionSheetRef>(null!);
    // ...existing state...
    const [topGroups, setTopGroups] = useState<any[]>([]);
    const [myGroup, setMyGroup] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Add this function to fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                method: 'get',
                url: 'https://groupsave-main-7jvzme.laravel.cloud/api/user/dashboard',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.request(config);
            const data = response.data as { all_groups: any[]; owned_groups: any[] };
            setTopGroups(data.all_groups || []);
            setMyGroup(data.owned_groups || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        const fetchData = async () => {
            await fetchDashboardData();
        };

        fetchUserData();
        fetchData();
    }, []);

    const handleSignOut = async () => {
        actionSheetRef.current?.hide();
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Signin' }],
            });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.title}>
                                Hi {user?.name ? user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1) : ''},
                            </Text>
                            <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>Welcome back!</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => actionSheetRef.current?.show()}
                        >
                            <Feather name="menu" size={24} color="#444" />
                        </TouchableOpacity>
                        <MenuActionSheet
                            actionSheetRef={actionSheetRef}
                            onSignOut={handleSignOut}
                        />
                    </View>
                </View>
                <View style={styles.balanceInfo}>
                    <View style={styles.balanceRow}>
                        <View>
                            <Text style={styles.balanceLabel}>Avilable Balance</Text>
                            <Text style={styles.balanceValue}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(20500.00)}</Text>
                        </View>
                        <View>
                            <Text style={[styles.balanceLabel, styles.textRight]}>Contributed Amount</Text>
                            <Text style={[styles.balanceValue, styles.contributedAmount]}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(120500.00)}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={styles.tabHeaders}>
                            <TouchableOpacity
                                onPress={() => setActiveTab('topGroups')}
                                style={styles.tabButton}>
                                <Text style={[
                                    styles.tabText,
                                    activeTab === 'topGroups' && styles.activeTabText
                                ]}>Top Groups</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setActiveTab('myGroup')}
                                style={styles.tabButton}>
                                <Text style={[
                                    styles.tabText,
                                    activeTab === 'myGroup' && styles.activeTabText
                                ]}>My Groups</Text>
                            </TouchableOpacity>
                        </View>
                        {activeTab === 'topGroups' && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#00a97b" />
                                ) : (
                                    topGroups.map((group) => (
                                        <TouchableOpacity key={group.id} style={[styles.groupCard, shadowStyles]}>
                                            <Text style={styles.groupTitle}>{group.title}</Text>
                                            <Text style={styles.groupAmount}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(group.target_amount)}</Text>
                                            <View style={styles.groupDetails}>
                                                <View>
                                                    <Text style={styles.groupDetailLabel}>Duration</Text>
                                                    <Text style={styles.groupDetailValue}>{group.total_users} months</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.groupDetailLabel}>Members</Text>
                                                    <Text style={styles.groupDetailValue}>{group.members_count}/{group.total_users}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </ScrollView>
                        )}
                        {activeTab === 'myGroup' && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#00a97b" />
                                ) : (
                                    myGroup.map((group) => (
                                        <TouchableOpacity key={group.id} style={[styles.groupCard, shadowStyles]}>
                                            <Text style={styles.groupTitle}>{group.title}</Text>
                                            <Text style={styles.groupAmount}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(group.target_amount)}</Text>
                                            <View style={styles.groupDetails}>
                                                <View>
                                                    <Text style={styles.groupDetailLabel}>Duration</Text>
                                                    <Text style={styles.groupDetailValue}>{group.total_users} months</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.groupDetailLabel}>Members</Text>
                                                    <Text style={styles.groupDetailValue}>{group.members_count}/{group.total_users}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                )}
                                <TouchableOpacity style={[styles.addGroupButton, shadowStyles]}>
                                    <MaterialIcons name="format-list-bulleted-add" size={30} color="#fff" />
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </View>
                    <View style={styles.recentTransactions}>
                        <Text style={[styles.sectionTitle, styles.boldText]}>Recent Transactions</Text>
                        <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <View key={item} style={[
                                    styles.transactionItem,
                                    item !== 3 && styles.transactionItemBorder
                                ]}>
                                    <View style={styles.transactionDetails}>
                                        <View style={styles.transactionIcon}>
                                            <Ionicons name="arrow-down" size={20} color="#fff" />
                                        </View>
                                        <View style={styles.transactionText}>
                                            <Text style={styles.transactionTitle}>Group Contribution</Text>
                                            <Text style={styles.transactionDate}>Oct 12, 2023</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.transactionAmount}>+£15,000</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    );
}

const shadowStyles = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    android: {
        elevation: 5,
    },
});

const styles = StyleSheet.create({
    signOutButton: { marginTop: 20, borderTopWidth: 1, justifyContent: 'center', borderTopColor: '#eee', paddingTop: 20 },
    signOutText: { color: 'red', marginLeft: 10 },
    profileName: { fontSize: 16, fontWeight: '600', color: '#333' },
    profileDetail: { fontSize: 14, color: '#666', marginTop: 4 },
    profileInfo: { flex: 1 },
    menuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 10 },
    menuGridItem: { alignItems: 'center', width: '25%', marginVertical: 10 },
    menuGridText: { marginTop: 5, fontSize: 12, color: '#666' },
    menuItem: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#e8f3f5' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 40,
        paddingHorizontal: 20,
    },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
    headerTextContainer: { flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, paddingVertical: 20 },
    title: { fontSize: 24, fontWeight: '600', color: '#444' },
    subtitle: { color: '#777' },
    menuButton: { marginLeft: 'auto' },
    balanceInfo: { backgroundColor: '#fff', padding: 20, marginHorizontal: 20, marginBottom: 20 },
    balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    balanceLabel: { color: '#777', fontSize: 14 },
    balanceValue: { fontSize: 24, fontWeight: '700', color: '#333', marginTop: 5 },
    contributedAmount: { color: '#00a97b' },
    textRight: { textAlign: 'right' },
    tabHeaders: { flexDirection: 'row', marginHorizontal: 20 },
    tabButton: { paddingVertical: 8, marginHorizontal: 5 },
    tabText: { color: '#111', fontWeight: '600' },
    activeTabText: { color: '#00a97b' },
    horizontalScroll: { paddingVertical: 10, marginHorizontal: 20 },
    groupCard: { backgroundColor: '#00a97b', padding: 15, marginRight: 15, width: 200 },
    groupTitle: { fontSize: 18, fontWeight: '600', color: '#e8f3f5' },
    groupAmount: { fontSize: 20, fontWeight: '700', color: '#fff', marginTop: 5 },
    groupDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    groupDetailLabel: { color: '#e8f3f5', fontSize: 12 },
    groupDetailValue: { color: '#eefdf7', fontSize: 14 },
    addGroupButton: {
        backgroundColor: '#111',
        padding: 15,
        marginRight: 15,
        height: 70,
        width: 70,
        alignSelf: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recentTransactions: { marginVertical: 5 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 5, color: '#555', paddingHorizontal: 20 },
    boldText: { fontWeight: 'bold' },
    transactionsList: { backgroundColor: '#fff', marginHorizontal: 20, marginVertical: 10, padding: 15, maxHeight: 500 },
    transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    transactionItemBorder: { borderBottomWidth: 1, borderBottomColor: '#eee' },
    transactionDetails: { flexDirection: 'row', alignItems: 'center' },
    transactionIcon: { backgroundColor: '#444', padding: 10, borderRadius: 25 },
    transactionText: { marginLeft: 15 },
    transactionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
    transactionDate: { color: '#777', marginTop: 4 },
    transactionAmount: { fontSize: 16, fontWeight: '600', color: '#00a97b' },
});

export default DashboardScreen;
