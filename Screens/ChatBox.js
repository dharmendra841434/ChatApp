import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatBox = (props) => {
    const navigation = useNavigation();
    const data = props.route.params.FriendData;
    const [Message, setMessage] = useState("");
    const [SendMsg, setSendMsg] = useState()
    const [RecivedMsg, setRecivedMsg] = useState();
    const [count, setcount] = useState(1);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    //  const messaage = '';

    //alert(date + '-' + month + '-' + year);

    const SendMessage = async () => {
        const email = auth().currentUser
        //  console.log(email.email, data.Email, Message);
        firestore()
            .collection("MESSAGES")
            .doc(email.email)
            .collection("Friends").doc(data.Email).update({
                Message: firestore.FieldValue.arrayUnion({
                    msg: Message,
                    createdBy: date + '-' + month + '-' + year,
                    sendBy: email.email,
                })
            })
            .then(() => {
                setMessage(""),
                    console.log("sent");
            })
    }




    const ReciveMessage = async () => {
        const email = await auth().currentUser
        var userEmail = email.email;
        // setemail(userEmail);
        const Allmsg = await firestore()
            .collection("MESSAGES")
            .doc(email.email)
            .collection("Friends").doc(data.Email).get()
        setSendMsg(Allmsg._data.Message)
        const Allmsg2 = await firestore()
            .collection("MESSAGES")
            .doc(data.Email)
            .collection("Friends").doc(email.email).get()
        setRecivedMsg(Allmsg2._data.Message);
    };
    useEffect(() => {
        ReciveMessage();
    }, [RecivedMsg])

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
                <TouchableOpacity onPress={() => { SendMessage() }}>
                    <Text style={{ color: 'black' }}>SEND</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={SendMsg}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ color: 'white' }}>{item.msg}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={RecivedMsg}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ color: 'yellow' }}>{item.msg}</Text>
                        </View>
                    )} />
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