import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomModal from './CustomModal';
import firestore from '@react-native-firebase/firestore';

const GroupChatBox = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [AllMessages, setAllMessages] = useState();
  const [MyEmail, setMyEmail] = useState('');
  const Gdata = props.route.params.GroupData;
  const [Message, setMessage] = useState('');
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const GetGroupMessages = async () => {
    const msg = await firestore().collection('Groups').doc(Gdata.id).get();
    setAllMessages(msg._data.Messages);
    //  console.log(AllMessages);
  };
  const GetMyEmail = async () => {
    const email = await auth().currentUser;
    setMyEmail(email.email);
  };
  const SendMessage = () => {
    firestore()
      .collection('Groups')
      .doc(Gdata.id)
      .update({
        Messages: firestore.FieldValue.arrayUnion({
          text: Message,
          createdAt: date + '-' + month + '-' + year,
          sendBy: MyEmail,
        }),
      })
      .then(() => {
        setMessage('');
      });
  };
  GetMyEmail;
  GetGroupMessages();

  const navigation = useNavigation();
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
            width: '60%',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {Gdata.Gname}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{
              height: 20,
              width: 20,
              tintColor: '#c9b1c5',
              marginStart: 60,
              marginEnd: 20,
            }}
            source={require('../Images/dots.png')}
          />
        </TouchableOpacity>
      </View>
      {/* <CustomModal
        modalVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      /> */}

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
          data={AllMessages}
          renderItem={({item}) => (
            <View>
              <Text
                style={{
                  color: item.sendBy == MyEmail ? 'red' : 'yellow',
                  width: '30%',
                  justifyContent: 'center',
                  borderRadius: 5,
                  padding: 10,
                  marginTop: '2%',
                  backgroundColor: item.sendBy == MyEmail ? 'gray' : 'gray',
                  marginStart: item.sendBy == MyEmail ? '65%' : '2%',
                }}>
                {item.text}
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

export default GroupChatBox;
