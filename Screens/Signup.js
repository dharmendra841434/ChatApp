import React, { useContext, useState, } from "react";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from "../Navigation/AuthProvider";

const Signup = () => {
    const [name, setname] = useState("");
    const [email_mob, setemail_mob] = useState("");
    const [pass, setpass] = useState("");
    const navigation = useNavigation();

    const { register } = useContext(AuthContext);


    // Set Data Into Database
    const SetData = () => {
        firestore()
            .collection('Users')
            .doc(email_mob)
            .set({
                Name: name,
                Email: email_mob,
                Password: pass,
                Image: "",
                Friends: [],
            })
            .then(() => {
                register(email_mob, pass)
                setname("");
                setemail_mob("");
                setpass("");
                alert("Signup Sucessfully..!");
            });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.addcontainer}>
                <Text style={styles.heading}>Signup</Text>
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setname} />
                <TextInput style={styles.input} placeholder="Email/Mob" value={email_mob} onChangeText={(e) => { setemail_mob(e) }} />
                <TextInput style={styles.input} placeholder="Password" value={pass} onChangeText={setpass} secureTextEntry={true} />
                <View style={styles.btn1}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        SetData();
                    }}>
                        <Text style={styles.txt}>Signup</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 90, marginStart: 40 }}>
                        <Text style={{ color: 'gray' }}>Already have account!! </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
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
        marginTop: 60,
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
export default Signup;