import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

const Dailogbox = () => {
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
  return (
    <View>
      <Dialog.Container>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" />
        <Dialog.Button label="Delete" />
      </Dialog.Container>
    </View>
  );
};

export default Dailogbox;
