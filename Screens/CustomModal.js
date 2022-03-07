import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const CustomModal = ({modalVisible, onRequestClose}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        alert('close');
      }}
      style={[styles.centeredView, {backgroundColor: 'red'}]}>
      <Modal
        animationType=""
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <TouchableOpacity>
          <Text>modal</Text>
        </TouchableOpacity>
      </Modal>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    marginHorizontal: 20,
    marginStart: 20,
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 2,
    width: 200,
    marginStart: 170,
    padding: 10,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  button: {
    marginVertical: 20,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default CustomModal;
