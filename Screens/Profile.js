import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../Navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import FriendList from './FriendList';
import Dialog from 'react-native-dialog';
import AwesomeLoading from 'react-native-awesome-loading';
import GroupList from './GroupList';

const Profile = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [Friends, setFriends] = useState();
  const [loading, setloading] = useState(true);
  const [name, setname] = useState('');
  const [AllGroups, setAllGroups] = useState();
  const [dp, setdp] = useState('');
  const [defaultDp, setdefaultDp] = useState('');
  const [GroupName, setGroupName] = useState('');

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  const GetUser = async () => {
    const email = await auth().currentUser;
    var userEmail = email.email;
    const savedUser = await firestore()
      .collection('Users')
      .doc(userEmail)
      .get()
      .then(setloading(false));
    var F = savedUser._data.Friends;
    setFriends(F);
    //console.log(Friends);
    var name = savedUser._data.Name;
    setname(name);
    if (savedUser != undefined) {
      var dpurl = savedUser._data.Image;
      if (dpurl != '') {
        setdp(dpurl);
        setdefaultDp(false);
      }
    }
  };

  const GetAllGroups = async () => {
    const Groups = await firestore().collection('Users').doc(UserEmail).get();
    setAllGroups(Groups._data.Groups);
    // console.log(AllGroups);
  };
  useEffect(() => {
    const userData = auth().currentUser;
    setUserEmail(userData.email);
    GetUser();
    GetAllGroups();
  }, [Friends]);

  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AllUsers');
          }}
          style={{
            backgroundColor: 'white',
            padding: 4,
            paddingStart: 20,
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 5,
            marginStart: 40,
          }}>
          <Text style={{color: 'black'}}>Find Friends</Text>
          <Image
            style={{
              height: 25,
              width: 25,
              marginStart: 20,
              marginEnd: 20,
              marginTop: 8,
            }}
            source={require('../Images/find.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chating', {
              AllFriends: Friends,
            });
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
              marginStart: 100,
              tintColor: '#c9b1c5',
              marginTop: 8,
            }}
            source={require('../Images/chatbox.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={styles.Dp}>
          <Image
            style={{height: 80, width: 90}}
            source={require('../Images/dp.png')}
          />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Name : </Text>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Email : </Text>
          <Text
            style={[
              styles.text,
              {fontSize: 16, alignSelf: 'center', marginTop: 8},
            ]}>
            {UserEmail}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{
            backgroundColor: 'white',
            marginTop: '3%',
            padding: 5,
            borderRadius: 5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 30, color: 'yellow', fontWeight: 'bold'}}>
          Your Groups
        </Text>
        <View
          style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            setVisible(true);
          }}>
          <GroupList List={AllGroups} />
          <TouchableOpacity
            style={{marginStart: 10}}
            onPress={() => {
              setVisible(true);
            }}>
            <Image
              style={{
                height: 40,
                width: 40,
                tintColor: '#c9b1c5',
              }}
              source={require('../Images/add.png')}
            />
          </TouchableOpacity>
        </View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Create Your Group</Dialog.Title>
          <Dialog.Input
            placeholder="Enter Group Name"
            onChangeText={g => {
              setGroupName(g);
            }}
          />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button
            label="Create"
            onPress={() => {
              var id = Math.random() * (1000 - 1) + 1;
              handleDelete;
              firestore()
                .collection('Groups')
                .doc(id.toString())
                .set({
                  Messages: [
                    {
                      text: '',
                      createdAt: '',
                      sendBy: '',
                    },
                  ],
                })
                .then(() => {
                  firestore()
                    .collection('Users')
                    .doc(UserEmail)
                    .update({
                      Groups: firestore.FieldValue.arrayUnion({
                        id: id.toString(),
                        Gname: GroupName,
                      }),
                    });
                  alert('Group Created');
                  setVisible(false);
                });
            }}
          />
        </Dialog.Container>
      </View>
      <View style={styles.friends}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 30, color: 'green', fontWeight: 'bold'}}>
            Your Friends
          </Text>
        </View>
        {Friends == '' ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllUsers');
            }}
            style={{
              backgroundColor: 'white',
              marginTop: '3%',
              marginHorizontal: '30%',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Find Friends
            </Text>
          </TouchableOpacity>
        ) : (
          <FriendList FriendsList={Friends} />
        )}
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
  Dp: {
    borderColor: '#c9b1c5',
    borderWidth: 6,
    width: 100,
    borderRadius: 90,
    overflow: 'hidden',
  },
  detailContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#c9b1c5',
    fontSize: 22,
    fontWeight: 'bold',
  },
  friends: {},
});

export default Profile;
