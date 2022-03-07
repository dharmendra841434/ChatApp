import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatBox = props => {
  const navigation = useNavigation();
  const data = props.route.params.FriendData;
  const [Message, setMessage] = useState('');
  const [Useremail, setUseremail] = useState('');
  var date = new Date().getDate();
  const [Recive, setRecive] = useState();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const RecivedMsg = {
    SendMsg: [],
    ReciveMsg: [],
  };

  const SendMessage = async () => {
    const email = auth().currentUser;
    //  console.log(email.email, data.Email, Message);
    firestore()
      .collection('MESSAGES')
      .doc(email.email)
      .collection('Friends')
      .doc(data.Email)
      .update({
        Message: firestore.FieldValue.arrayUnion({
          msg: Message,
          createdBAt: date + '-' + month + '-' + year,
          sendBy: email.email,
        }),
      })
      .then(() => {
        firestore()
          .collection('MESSAGES')
          .doc(data.Email)
          .collection('Friends')
          .doc(email.email)
          .update({
            Message: firestore.FieldValue.arrayUnion({
              msg: Message,
              createdBAt: date + '-' + month + '-' + year,
              sendBy: email.email,
            }),
          });
        setMessage(''), console.log('sent');
      });
  };

  const ReciveMessage = async () => {
    const email = await auth().currentUser;
    var userEmail = email.email;
    setUseremail(userEmail);
    const Allmsg = await firestore()
      .collection('MESSAGES')
      .doc(email.email)
      .collection('Friends')
      .doc(data.Email)
      .get();
    setRecive(Allmsg._data.Message);

    // console.log(Send, Recive);
  };
  useEffect(() => {
    ReciveMessage();
  }, [Recive]);
  //console.log(Useremail);
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              height: 40,
              width: 40,
              tintColor: '#c9b1c5',
              marginStart: 20,
              marginEnd: 20,
              marginTop: 8,
            }}
            source={require('../Images/previous.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#c9b1c5',
            width: '100%',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {data.Name}
        </Text>
      </View>
      <View
        style={{
          bottom: 5,
          borderRadius: 8,
          alignItems: 'center',
          backgroundColor: 'white',
          flexDirection: 'row',
          position: 'absolute',
          width: '90%',
          height: 40,
          marginStart: '3%',
        }}>
        <TextInput
          value={Message}
          style={{width: '85%', borderRadius: 6}}
          onChangeText={msg => {
            setMessage(msg);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            SendMessage();
          }}>
          <Text style={{color: 'black'}}>SEND</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={Recive}
          renderItem={({item}) => (
            <View
              style={{width: '100%', justifyContent: 'center', height: 'auto'}}>
              <Text
                style={{
                  color: item.sendBy == Useremail ? 'red' : 'yellow',
                  width: '30%',
                  justifyContent: 'center',
                  borderRadius: 5,
                  padding: 10,
                  marginTop: '2%',
                  backgroundColor: item.sendBy == Useremail ? 'gray' : 'gray',
                  marginStart: item.sendBy == Useremail ? '65%' : '2%',
                }}>
                {item.msg == '' ? null : item.msg}
              </Text>
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
    backgroundColor: '#1b3e6b',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
    backgroundColor: '#1b3e6b',
  },
});

export default ChatBox;
