import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react';
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

const FriendList = (props) => {
    return (
        <View>
            <FlatList
                horizontal={true}
                data={props.FriendsList}
                renderItem={({ item }) => (
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.Dp, { borderWidth: 0, width: '100%', marginTop: 20 }]}>
                                <Image style={{ height: 100, width: 100, }} source={require("../Images/dp.png")} />
                            </TouchableOpacity>
                            <Text style={{ color: '#c9b1c5', marginStart: 5 }}>{item.Name}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    Dp: {
        borderColor: '#c9b1c5', borderWidth: 6,
        width: "45%",
        borderRadius: 500, overflow: 'hidden'

    },
})

export default FriendList