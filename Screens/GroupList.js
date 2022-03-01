import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const GroupList = props => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        horizontal={true}
        data={props.List}
        renderItem={({item}) => (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginEnd: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GroupChat', {
                    GroupData: item,
                  });
                }}
                style={[
                  styles.Dp,
                  {borderWidth: 0, width: '100%', marginTop: 20},
                ]}>
                <Image
                  style={{height: 65, width: 70}}
                  source={require('../Images/group.png')}
                />
              </TouchableOpacity>
              <Text style={{color: '#c9b1c5', marginStart: 5}}>
                {item.Gname.toUpperCase()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Dp: {
    borderColor: '#c9b1c5',
    borderWidth: 6,
    width: '45%',
    borderRadius: 500,
    overflow: 'hidden',
  },
});

export default GroupList;
