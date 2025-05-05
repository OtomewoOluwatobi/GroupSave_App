import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

function DashboardScree() {
    return (

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {/* Status Bar */}
                <StatusBar barStyle="dark-content" />
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, paddingVertical: 20 }}>
                            <Text style={styles.title}>Lesley's Home</Text>
                            <Text style={{ color: '#777' }}>Welcome back!</Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: 'auto' }}>
                            <Feather name="menu" size={24} color="#444" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Balance Info */}
                <View style={{ backgroundColor: '#fff', padding: 20, marginHorizontal: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <View>
                            <Text style={{ color: '#777', fontSize: 14 }}>Total Balance</Text>
                            <Text style={{ fontSize: 24, fontWeight: '700', color: '#333', marginTop: 5 }}>₦250,000.00</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#777', fontSize: 14, textAlign: 'right' }}>Available Balance</Text>
                            <Text style={{ fontSize: 24, fontWeight: '700', color: '#00a97b', marginTop: 5 }}>₦120,500.00</Text>
                        </View>
                    </View>
                </View>

                {/* Top Groups */}
                <View>
                    {/* Tab Headers */}
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 10 }}>
                        <TouchableOpacity style={{ paddingVertical: 8, marginRight: 5, }}>
                            <Text style={{ color: '#111', fontWeight: '600' }}>All Groups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingVertical: 8, marginLeft: 5, }}>
                            <Text style={{ color: '#00a97b', fontWeight: '600' }}>My Groups</Text>
                        </TouchableOpacity>
                    </View>

                    {/* All Groups Tab Content */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10, marginHorizontal: 20 }}>
                        {[1, 2, 3].map((item) => (
                            <TouchableOpacity key={item} style={{
                                backgroundColor: '#00a97b',
                                padding: 15,
                                marginRight: 15,
                                width: 200,
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#e8f3f5' }}>Group {item}</Text>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff', marginTop: 5 }}>₦50,000.00</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                    <View>
                                        <Text style={{ color: '#e8f3f5', fontSize: 12 }}>Duration</Text>
                                        <Text style={{ color: '#eefdf7', fontSize: 14 }}>3 months</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#e8f3f5', fontSize: 12 }}>Members</Text>
                                        <Text style={{ color: '#eefdf7', fontSize: 14 }}>12/15</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* My Groups Tab Content (hidden by default) */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ display: 'none', paddingVertical: 10, marginHorizontal: 20 }}>
                        {[1, 2].map((item) => (
                            <TouchableOpacity key={item} style={{
                                backgroundColor: '#00a97b',
                                padding: 15,
                                marginRight: 15,
                                width: 200,
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#e8f3f5' }}>My Group {item}</Text>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff', marginTop: 5 }}>₦3,000.00</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                    <View>
                                        <Text style={{ color: '#e8f3f5', fontSize: 12 }}>Duration</Text>
                                        <Text style={{ color: '#eefdf7', fontSize: 14 }}>2 months</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#e8f3f5', fontSize: 12 }}>Members</Text>
                                        <Text style={{ color: '#eefdf7', fontSize: 14 }}>8/10</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Recent Transactions */}
                <View style={{ marginVertical: 5, }}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <ScrollView style={{ backgroundColor: '#fff', marginHorizontal: 20, marginVertical: 10, padding: 15, maxHeight: 500 }} showsVerticalScrollIndicator={false}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                            <View key={item} style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: 15,
                                borderBottomWidth: item !== 3 ? 1 : 0,
                                borderBottomColor: '#eee'
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: '#e8f3f5',
                                        padding: 10,
                                        borderRadius: 25
                                    }}>
                                        <Ionicons name="arrow-down" size={20} color="#00a97b" />
                                    </View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>Group Contribution</Text>
                                        <Text style={{ color: '#777', marginTop: 4 }}>Oct 12, 2023</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#00a97b' }}>+₦15,000</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#e8f3f5' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 40,
        paddingHorizontal: 20,
    },
    title: { fontSize: 24, fontWeight: '600', color: '#444' },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    weatherContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 20, paddingHorizontal: 20 },
    weatherBox: { width: '50%', padding: 10 },
    weatherValue: { fontSize: 20, fontWeight: '600', color: '#333' },
    weatherLabel: { fontSize: 12, color: '#777' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 5, color: '#555', paddingHorizontal: 20 },
    routines: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
    routine: { backgroundColor: '#eee', borderRadius: 10, padding: 10, alignItems: 'center', flexDirection: 'row' },
    routineActive: { backgroundColor: '#d36eff', borderRadius: 10, padding: 10, alignItems: 'center', flexDirection: 'row' },
    routineText: { marginLeft: 5, color: '#777' },
    routineTextActive: { marginLeft: 5, color: '#fff' },
    roomContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
    roomBox: { backgroundColor: '#fff', padding: 15, borderRadius: 10, width: '48%' },
    roomTitle: { fontWeight: '600', fontSize: 16 },
    roomStats: { color: '#777', marginTop: 5 },
    devicesScroll: { marginVertical: 10, paddingHorizontal: 20 },
    deviceBox: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginRight: 10 },
    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, backgroundColor: '#fff', borderRadius: 20, marginTop: 10, marginHorizontal: 20 },
});

export default DashboardScree;