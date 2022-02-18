import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../Navigation/AuthProvider';
import auth from "@react-native-firebase/auth";
import FriendList from './FriendList';
import AwesomeLoading from 'react-native-awesome-loading';


const Profile = () => {

    const [UserEmail, setUserEmail] = useState("");
    const [Friends, setFriends] = useState();
    const [loading, setloading] = useState(true);
    const [name, setname] = useState("");
    const [dp, setdp] = useState("");
    const [defaultDp, setdefaultDp] = useState("")

    const GetUser = async () => {
        const email = await auth().currentUser
        var userEmail = email.email;
        const savedUser = await firestore().collection('Users').doc(userEmail).get().then(
            setloading(false)
        )
        var F = savedUser._data.Friends;
        setFriends(F)
        //console.log(Friends);
        var name = savedUser._data.Name
        setname(name);
        if (savedUser != undefined) {
            var dpurl = savedUser._data.Image
            if (dpurl != "") {
                setdp(dpurl);
                setdefaultDp(false)
            }
        }
    };
    //console.log(name);
    //GetUser();
    useEffect(() => {
        const userData = auth().currentUser;
        setUserEmail(userData.email);
        // console.log(UserEmail);
        GetUser();

    }, [Friends]);

    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate("AllUsers") }} style={{ backgroundColor: 'white', padding: 4, paddingStart: 20, alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginStart: 40 }}>
                    <Text style={{ color: 'black' }}>Find Friends</Text>
                    <Image style={{ height: 25, width: 25, marginStart: 20, marginEnd: 20, marginTop: 8 }} source={require("../Images/find.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Chating", {
                        AllFriends: Friends
                    })
                }}>
                    <Image style={{ height: 40, width: 40, marginStart: 100, tintColor: '#c9b1c5', marginTop: 8 }} source={require("../Images/chatbox.png")} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={styles.Dp}>
                    <Image style={{ height: 150, width: 150 }} source={require("../Images/dp.png")} />
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Name : </Text><Text style={styles.text}>{name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Email  : </Text><Text style={[styles.text, { fontSize: 16, alignSelf: 'center', marginTop: 8 }]}>{UserEmail}</Text>
                </View>
                <TouchableOpacity onPress={() => { logout() }}
                    style={{ backgroundColor: 'white', marginTop: '3%', padding: 5, borderRadius: 5 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.friends}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <Text style={{ fontSize: 30, color: 'green', fontWeight: 'bold' }}>Your Friends</Text>
                </View>
                {Friends == "" ?
                    <TouchableOpacity onPress={() => { navigation.navigate("AllUsers") }} style={{ backgroundColor: 'white', marginTop: '3%', marginHorizontal: '30%', alignItems: 'center', padding: 5, borderRadius: 5 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Find Friends</Text>
                    </TouchableOpacity> :
                    <FriendList
                        FriendsList={Friends} />
                }
            </View>
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
