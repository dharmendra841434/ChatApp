import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";


const ChatBox = (props) => {
    const navigation = useNavigation();
    const data = props.route.params.FriendData;
    const [Message, setMessage] = useState("");
    const [count, setcount] = useState(1);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const messaage = '';

    //alert(date + '-' + month + '-' + year);

    const StoreMessage = async () => {
        const email = await auth().currentUser
        //console.log(data.email);
        firestore()
            .collection('Messages')
            .doc()
            .set({

                sender: email.email,
                recever: data.email,
                msg: Message,

            })
            .then(() => {
                setMessage("");
                setcount(count + 1);
                console.log("sent");
            });
    }

    //console.log(data);
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ alignItems: 'center', }}>
                    <Image style={{ height: 40, width: 40, tintColor: '#c9b1c5', marginStart: 20, marginEnd: 20, marginTop: 8 }} source={require("../Images/previous.png")} />
                </TouchableOpacity>
                <Text style={{ color: '#c9b1c5', width: '100%', fontSize: 20, fontWeight: 'bold', }}>{data.Name}</Text>
            </View>
            <View style={{ bottom: 5, borderRadius: 8, alignItems: 'center', backgroundColor: 'white', flexDirection: 'row', position: 'absolute', width: '90%', height: 40, marginStart: "3%" }}>
                <TextInput value={Message} style={{ width: '85%', borderRadius: 6, }} onChangeText={(msg) => {
                    setMessage(msg)
                }} />
                <TouchableOpacity onPress={() => { StoreMessage() }}>
                    <Text style={{ color: 'black' }}>SEND</Text>
                </TouchableOpacity>
            </View>
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

});

export default ChatBox