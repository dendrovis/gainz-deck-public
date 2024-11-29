import { Pressable, StyleSheet, View, Modal, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { ICON_ADD, ICON_MINUS, ICON_REPEAT } from '../../assets';
import { primaryColor, secondaryColor } from '../../styles/common';

type RepeaterModalProps = {
  isVisible?: boolean;
  onIncrement?: (count: number) => void;
  onDecrement?: (count: number) => void;
  onClosed?: () => void;
  count: number;
};

const RepeaterModal = ({
  isVisible = false,
  onIncrement,
  onDecrement,
  onClosed,
  count,
}: RepeaterModalProps) => {
  const onInrementHandler = () => {
    if (onIncrement) onIncrement(count + 1);
  };
  const onDecrementHandler = () => {
    if (onDecrement) onDecrement(count > 1 ? count - 1 : count);
  };

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.repeaterContainer}>
            <Pressable style={styles.buttonContainer} onPress={onDecrementHandler}>
              <Image style={styles.image} source={ICON_MINUS} alt={'icon-minus'} />
            </Pressable>
            <Pressable style={styles.repeatContainer}>
              <Image style={styles.image} source={ICON_REPEAT} alt={'icon-repeat'} />
              <Text style={styles.text}>x{count}</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={onInrementHandler}>
              <Image style={styles.image} source={ICON_ADD} alt={'icon-add'} />
            </Pressable>
          </View>
          <Pressable style={styles.modalAction} onPress={onClosed}>
            <Text style={styles.modalActionText}>closed</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default RepeaterModal;

const styles = StyleSheet.create({
  repeaterContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  modalAction: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  modalActionText: {
    color: secondaryColor,
  },
  modal: {
    padding: 30,
    justifyContent: 'space-around',
    gap: 20,
    alignItems: 'center',
    width: '80%',
    height: '25%',
    borderRadius: 15,
    backgroundColor: primaryColor,
    borderColor: secondaryColor,
    borderWidth: 2,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  repeatContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    aspectRatio: 31 / 37,
  },
  text: {
    paddingTop: 10,
    position: 'absolute',
    color: secondaryColor,
  },
  buttonContainer: {
    width: 50,
    aspectRatio: 1,
  },
});
