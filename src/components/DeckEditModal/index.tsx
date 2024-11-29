import { Pressable, StyleSheet, View, Modal } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import {
  ICON_NEW,
  MODAL_ICON_CLONE,
  MODAL_ICON_CLOSED,
  MODAL_ICON_DELETE,
  MODAL_ICON_EXISTING_CARD,
  MODAL_ICON_EXISTING_DECK,
  MODAL_ICON_INTENSIFY,
  MODAL_ICON_SHUFFLE,
} from '../../assets';

type DeckEditModalProps = {
  isVisible?: boolean;
  onPressSelectExistingCard?: () => void;
  onPressSelectExistingDeck?: () => void;
  onPressNewCard?: () => void;
  onPressDeleteDeck?: () => void;
  onPressIntensity?: () => void;
  onPressClone?: () => void;
  onPressShuffle?: () => void;
  onPressClosed?: () => void;
};

const DeckEditModal = ({
  isVisible = false,
  onPressSelectExistingCard,
  onPressSelectExistingDeck,
  onPressNewCard,
  onPressDeleteDeck,
  onPressIntensity,
  onPressClone,
  onPressShuffle,
  onPressClosed,
}: DeckEditModalProps) => {
  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <View style={styles.modalContainer}>
        <Pressable onPress={onPressDeleteDeck}>
          <Image style={styles.button} source={MODAL_ICON_DELETE} alt={'icon_delete'} />
        </Pressable>
        <Pressable onPress={onPressIntensity}>
          <Image style={styles.button} source={MODAL_ICON_INTENSIFY} alt={'icon_intensity'} />
        </Pressable>
        <Pressable onPress={onPressClone}>
          <Image style={styles.button} source={MODAL_ICON_CLONE} alt={'icon_clone'} />
        </Pressable>
        <Pressable onPress={onPressShuffle}>
          <Image style={styles.button} source={MODAL_ICON_SHUFFLE} alt={'icon_existing_shuffle'} />
        </Pressable>
        <Pressable onPress={onPressSelectExistingDeck}>
          <Image
            style={styles.button}
            source={MODAL_ICON_EXISTING_DECK}
            alt={'icon_existing_deck'}
          />
        </Pressable>
        <Pressable onPress={onPressSelectExistingCard}>
          <Image
            style={styles.button}
            source={MODAL_ICON_EXISTING_CARD}
            alt={'icon_existing_card'}
          />
        </Pressable>
        <Pressable onPress={onPressNewCard}>
          <Image style={styles.button} source={ICON_NEW} alt={'icon_new'} />
        </Pressable>
        <Pressable onPress={onPressClosed}>
          <Image style={styles.button} source={MODAL_ICON_CLOSED} alt={'icon_closed'} />
        </Pressable>
      </View>
    </Modal>
  );
};

export default DeckEditModal;

const styles = StyleSheet.create({
  button: {
    width: 70,
    aspectRatio: 1,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 80,
    paddingHorizontal: 10,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
