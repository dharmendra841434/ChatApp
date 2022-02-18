import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const FriendList = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList
                horizontal={true}
                data={props.FriendsList}
                renderItem={({ item }) => (
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ChatBox", {
                                    FriendData: item
                                })
                            }} style={[styles.Dp, { borderWidth: 0, width: '100%', marginTop: 20 }]}>
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