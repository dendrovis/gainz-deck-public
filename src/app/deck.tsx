import { Pressable, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ICON_EDIT, ICON_NEW } from '../assets';
import Swiper from '../components/Swiper';
import DeckCover from '../components/DeckCover';
import getDeckMockData from '../apis/getDeckData';
import { useDeckStore } from '../hooks';

const Deck = () => {
  const deckData = getDeckMockData.covers();
  const [isAnimatedLeft, setAnimatedLeft] = useState<boolean>(true);
  const { currentDeckIndex, setCurrentDeckIndex, setCreateDeck } = useDeckStore();

  const onSwipeLeft = () => setAnimatedLeft(true);
  const onSwipeRight = () => setAnimatedLeft(false);
  return (
    <View style={styles.container}>
      <View style={styles.deckContainer}>
        <Swiper
          initialItemIndex={0}
          maxItemIndex={deckData.length - 1}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          onCurrentItemIndexChange={(itemIndex) => {
            setCurrentDeckIndex(itemIndex);
          }}
        >
          <DeckCover
            id={`${currentDeckIndex}`}
            isAnimatedLeft={isAnimatedLeft}
            deckName={deckData[currentDeckIndex]?.deckName}
            imageRepresentative={deckData[currentDeckIndex]?.deckImage}
            imageRepresentativeAlt={deckData[currentDeckIndex]?.id}
          />
        </Swiper>
      </View>
      <View style={styles.buttonsContainer}>
        <Link href="/deck-edit" style={styles.buttonContainer} asChild>
          <Pressable onPress={() => setCreateDeck(false)}>
            <Image style={styles.button} source={ICON_EDIT} placeholder={'icon_edit'} />
          </Pressable>
        </Link>
        <Link href="/deck-edit" style={styles.buttonContainer} asChild>
          <Pressable onPress={() => setCreateDeck(true)}>
            <Image style={styles.button} source={ICON_NEW} placeholder={'icon_new'} />
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1,
  },
  buttonContainer: {
    width: '20%',
  },
  buttonsContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  deckContainer: {
    width: '100%',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 30,
  },
});
