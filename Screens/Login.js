import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, TextInput, Alert, StatusBar, TouchableOpacity } from 'react-native';

const Login = () => {
    const [email_mob, setemail_mob] = useState("");
    const [pass, setpass] = useState("");
    const [user, setuser] = useState("");
    const [name, setname] = useState("");

    const navigation = useNavigation();

    /* function User({ userId }) {
         useEffect(() => {
             const subscriber = firestore()
                 .collection('Users')
                 .doc(userId)
                 .onSnapshot(documentSnapshot => {
                     console.log('User data: ', documentSnapshot.data());
                 });
 
             Stop listening for updates when no longer required
             return () => subscriber();
         }, [userId]);
     }*/
    // Get Data From DataBase
    const User = async () => {

        const res = await firestore()
            .collection('Users')
            .doc("dhruv")
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
            });

    };

    return (
        <View style={styles.screen}>

            <View style={styles.addcontainer}>
                <Text style={styles.heading}>Login</Text>
                <TextInput style={styles.input} placeholder="Email" onChangeText={setemail_mob} />
                <TextInput style={styles.input} placeholder="Password" onChangeText={setpass} secureTextEntry={true} />
                <View style={styles.btn1}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        /*firestore()
                            .collection('Users')
                            .add({
                                name: 'Dharmendra Kumar',
                                age: 24,
                            })
                            .then(() => {
                                alert("User Added!")
                            })*/
                        // navigation.replace("Profile")
                        SetData();
                    }}>
                        <Text style={styles.txt}>Login</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 90, marginStart: 40 }}>
                        <Text style={{ color: 'gray' }}>I don't have account!! </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1b3e6b'
    },
    addcontainer: {
        marginTop: 100,
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15
    },
    heading: {
        color: 'white',
        marginTop: 40,
        marginStart: 10,
        fontSize: 45
    },
    btn1: {
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        marginBottom: 20
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#52071e',
        height: 50,
        width: "100%",
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});
export default Login;