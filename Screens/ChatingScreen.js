import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
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

const ChatingScreen = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={{ height: 40, width: 40, marginStart: 20, tintColor: '#c9b1c5', marginTop: 8 }} source={require("../Images/previous.png")} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={Data}
                renderItem={({ item }) => (
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity style={[styles.Dp, { borderWidth: 0, width: '22%', marginStart: 10 }]}>
                                <Image style={{ height: 80, width: 80, }} source={require("../Images/dp.png")} />
                            </TouchableOpacity>
                            <Text style={{ color: '#c9b1c5' }}>{item.name}</Text>
                        </View>
                    </View>
                )}
            />

        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1b3e6b'
    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 7,
        backgroundColor: '#1b3e6b'

    },
    Dp: {
        borderColor: '#c9b1c5', borderWidth: 6,
        width: "45%",
        borderRadius: 500, overflow: 'hidden'

    },
})

export default ChatingScreen;
