import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const GroupChatBox = props => {
  const Gdata = props.route.params.GroupData;

  const [Message, setMessage] = useState('');

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
            width: '100%',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {Gdata.Gname}
        </Text>
        <Text>dhrub</Text>
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
        {/* <FlatList
          data={AllMessages.send}
          renderItem={({item}) => (
            <View>
              <Text style={{color: 'white'}}>{item.msg}</Text>
            </View>
          )}
        /> */}
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
