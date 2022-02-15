import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const Data = [
    {
        id: 1,
        name: "Dharmendra"
    },
    {
        id: 2,
        name: "Sachin"
    },
    {
        id: 3,
        name: "Anup"
    },
    {
        id: 4,
        name: "Dhruv"
    },
]

const Profile = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate("Chating") }}>
                    <Image style={{ height: 40, width: 40, marginStart: 300, tintColor: '#c9b1c5', marginTop: 8 }} source={require("../Images/chatbox.png")} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={styles.Dp}>
                    <Image style={{ height: 150, width: 150 }} source={require("../Images/dp.png")} />
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Name : </Text><Text style={styles.text}>Dharmendra Kumar</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Email  : </Text><Text style={[styles.text, { fontSize: 16, alignSelf: 'center', marginTop: 8 }]}>dhk7283013741@gmail.com</Text>
                </View>
            </View>
            <View style={styles.friends}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <Text style={{ fontSize: 30, color: 'green', fontWeight: 'bold' }}>Your Friends</Text>
                </View>
                <FlatList
                    horizontal={true}
                    data={Data}
                    renderItem={({ item }) => (
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.Dp, { borderWidth: 0, width: '100%', marginTop: 20 }]}>
                                    <Image style={{ height: 100, width: 100, }} source={require("../Images/dp.png")} />
                                </TouchableOpacity>
                                <Text style={{ color: '#c9b1c5', marginStart: 5 }}>{item.name}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1b3e6b'
    },
    Dp: {
        borderColor: '#c9b1c5', borderWidth: 6,
        width: "45%",
        borderRadius: 500, overflow: 'hidden'

    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 7,
        backgroundColor: '#1b3e6b'

    },
    detailContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        color: '#c9b1c5',
        fontSize: 22,
        fontWeight: 'bold'
    },
    friends: {

    }
})

export default Profile;
