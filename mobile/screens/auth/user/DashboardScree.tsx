import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Platform } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

function DashboardScree() {
    const [activeTab, setActiveTab] = React.useState('topGroups');

    return (
        <SafeAreaProvider>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Status Bar */}
                    <StatusBar barStyle="dark-content" />

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.title}>Lesley's Home</Text>
                                <Text style={styles.subtitle}>Welcome back!</Text>
                            </View>
                            <TouchableOpacity style={styles.menuButton}>
                                <Feather name="menu" size={24} color="#444" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Balance Info */}
                    <View style={styles.balanceInfo}>
                        <View style={styles.balanceRow}>
                            <View>
                                <Text style={styles.balanceLabel}>Target Amount</Text>
                                <Text style={styles.balanceValue}>₦250,000.00</Text>
                            </View>
                            <View>
                                <Text style={[styles.balanceLabel, styles.textRight]}>Contributed Amount</Text>
                                <Text style={[styles.balanceValue, styles.contributedAmount]}>₦120,500.00</Text>
                            </View>
                        </View>
                    </View>

                    {/* Top Groups */}
                    <View>
                        {/* Tab Headers */}
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

                        {/* All Groups Tab Content */}
                        {activeTab === 'topGroups' && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                {[1, 2, 3].map((item) => (
                                    <TouchableOpacity key={item} style={[styles.groupCard, shadowStyles]}>
                                        <Text style={styles.groupTitle}>Group {item}</Text>
                                        <Text style={styles.groupAmount}>₦50,000.00</Text>
                                        <View style={styles.groupDetails}>
                                            <View>
                                                <Text style={styles.groupDetailLabel}>Duration</Text>
                                                <Text style={styles.groupDetailValue}>3 months</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.groupDetailLabel}>Members</Text>
                                                <Text style={styles.groupDetailValue}>12/15</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        {/* My Groups Tab Content */}
                        {activeTab === 'myGroup' && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                {[1].map((item) => (
                                    <TouchableOpacity key={item} style={[styles.groupCard, shadowStyles]}>
                                        <Text style={styles.groupTitle}>My Group {item}</Text>
                                        <Text style={styles.groupAmount}>₦3,000.00</Text>
                                        <View style={styles.groupDetails}>
                                            <View>
                                                <Text style={styles.groupDetailLabel}>Duration</Text>
                                                <Text style={styles.groupDetailValue}>2 months</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.groupDetailLabel}>Members</Text>
                                                <Text style={styles.groupDetailValue}>8/10</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={[styles.addGroupButton, shadowStyles]}>
                                    <MaterialIcons name="format-list-bulleted-add" size={30} color="#fff" />
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </View>

                    {/* Recent Transactions */}
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
                                            <Ionicons name="arrow-down" size={20} color="#00a97b" />
                                        </View>
                                        <View style={styles.transactionText}>
                                            <Text style={styles.transactionTitle}>Group Contribution</Text>
                                            <Text style={styles.transactionDate}>Oct 12, 2023</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.transactionAmount}>+₦15,000</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
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
    transactionIcon: { backgroundColor: '#e8f3f5', padding: 10, borderRadius: 25 },
    transactionText: { marginLeft: 15 },
    transactionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
    transactionDate: { color: '#777', marginTop: 4 },
    transactionAmount: { fontSize: 16, fontWeight: '600', color: '#00a97b' },
});

export default DashboardScree;
