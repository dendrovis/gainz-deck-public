import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { DeckCover, Swiper } from '../components';
import { useDeckStore } from '../hooks';
import getDeckMockData from '../apis/getDeckData';

const DeckSelect = () => {
  const deckData = getDeckMockData.covers();
  const [isAnimatedLeft, setAnimatedLeft] = useState<boolean>(true);
  const { currentDeckIndex, setCurrentDeckIndex } = useDeckStore();

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
    </View>
  );
};

export default DeckSelect;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
  },
  deckContainer: {
    width: '100%',
  },
});
