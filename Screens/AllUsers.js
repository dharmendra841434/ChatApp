import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

const AllUsers = () => {

    const [AllData, setAllData] = useState();
    const [nclm, setnclm] = useState(2);
    const [email, setemail] = useState("");
    const [FriendsData, setFriendsData] = useState();

    const navigation = useNavigation();
    const GetAll = async () => {
        const email = await auth().currentUser
        var userEmail = email.email;
        setemail(userEmail);
        const savedUser = await firestore().collection('Users').get();
        setAllData(savedUser._docs)
        // console.log(AllData);
    };
    useEffect(() => {
        GetAll();
        // console.log(FriendsData);
    }, [])

    GetAll();

    const AddFriends = () => {
        firestore()
            .collection('Users')
            .doc(email)
            .update({
                Friends: [
                    {
                        id: Math.random(),
                        email: FriendsData.Email,
                        Name: FriendsData.Name
                    }
                ]
            }).then(
                alert("add sucessfully")
            )
    };
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={{ height: 40, width: 40, marginStart: 20, tintColor: '#c9b1c5', marginTop: 8 }} source={require("../Images/previous.png")} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={AllData}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.Card}>
                        <Image style={styles.dp} source={require("../Images/dp.png")} />
                        <Text style={styles.Name}>{item._data.Name}</Text>
                        {
                            item._data.Email == email ? <View><Text>This is You</Text></View> :
                                <TouchableOpacity style={styles.addbtn} onPress={() => {
                                    setFriendsData(item._data);
                                    AddFriends();
                                    // console.log(FriendsData);

                                }}>
                                    <Text style={{ color: 'yellow' }}>Add Friend</Text>
                                </TouchableOpacity>
                        }
                    </View>
                )}
            />
        </View>
    )
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
    Card: {
        backgroundColor: 'gray',
        width: '45%',
        marginHorizontal: '2%',
        borderRadius: 10,
        marginTop: '5%',
        alignItems: 'center'
    },
    dp: {
        width: 50,
        height: 50
    }, Name: {
        color: 'black',
        padding: 5
    },
    addbtn: {
        backgroundColor: 'green',
        padding: 5,
        marginVertical: 5,
        borderRadius: 5
    }
})

export default AllUsers