import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import { primaryColor, secondaryColor } from '../../styles/common';

type TwoOptionModalProps = {
  description: string;
  actionAText: string;
  actionBText: string;
  isVisible?: boolean;
  onPressActionA?: () => void;
  onPressActionB?: () => void;
};

const TwoOptionModal = ({
  description,
  actionAText,
  actionBText,
  isVisible = false,
  onPressActionA,
  onPressActionB,
}: TwoOptionModalProps) => {
  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalDescription}>{description}</Text>
          <View style={styles.modalActionContainwer}>
            <Pressable onPress={onPressActionA}>
              <View style={styles.modalAction}>
                <Text style={styles.modalActionText}>{actionAText}</Text>
              </View>
            </Pressable>
            <Pressable onPress={onPressActionB}>
              <View style={styles.modalAction}>
                <Text style={styles.modalActionText}>{actionBText}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TwoOptionModal;

const styles = StyleSheet.create({
  modalAction: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  modalActionContainwer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
  modalActionText: {
    color: secondaryColor,
  },
  modalDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: secondaryColor,
  },
  modal: {
    padding: 30,
    justifyContent: 'space-between',
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
});
