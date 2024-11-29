import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Card, Swiper } from '../components';
import { useSharedValue } from 'react-native-reanimated';
import { ICON_DELETE, ICON_DIAMOND, ICON_EXERCISE_TYPE_2, ICON_EXERCISE_TYPE_3 } from '../assets';
import getDeckMockData from '../apis/getDeckData';
import { useDeckStore } from '../hooks';
import { Image } from 'expo-image';
import { secondaryColor } from '../styles/common';

const CardEdit = () => {
  const CONTENT = [
    {
      index: 997,
      type: 'break',
      image: ICON_DIAMOND,
      taskName: 'task A',
      roundCount: 10,
      totalTimeRemain: 50,
      totalRoundCount: 20,
      totalTime: 60,
      duration: 180,
      repeatCount: 50,
    },
    {
      index: 998,
      type: 'active',
      image: ICON_EXERCISE_TYPE_2,
      taskName: 'task B',
      roundCount: 20,
      totalTimeRemain: 40,
      totalRoundCount: 25,
      totalTime: 120,
      duration: 180,
      repeatCount: 20,
    },
    {
      index: 999,
      type: 'break',
      image: ICON_EXERCISE_TYPE_3,
      taskName: 'task C',
      roundCount: 30,
      totalTimeRemain: 30,
      totalRoundCount: 45,
      totalTime: 1000,
      duration: 120,
      repeatCount: 30,
    },
  ];

  const { currentDeckIndex, setCurrentDeckIndex } = useDeckStore();
  const deckData = getDeckMockData.covers();
  const roundCount = useSharedValue(CONTENT[currentDeckIndex].roundCount);
  const totalTimeRemain = useSharedValue(CONTENT[currentDeckIndex].totalTimeRemain);

  return (
    <View style={styles.container}>
      <Swiper
        initialItemIndex={0}
        maxItemIndex={deckData.length - 1}
        onCurrentItemIndexChange={(itemIndex) => {
          setCurrentDeckIndex(itemIndex);
        }}
      >
        <Card
          index={CONTENT[currentDeckIndex].index}
          type={CONTENT[currentDeckIndex].type as 'break' | 'active'}
          image={CONTENT[currentDeckIndex].image}
          taskName={CONTENT[currentDeckIndex].taskName}
          roundCount={roundCount}
          totalRoundCount={CONTENT[currentDeckIndex].totalRoundCount}
          totalTimeRemain={totalTimeRemain}
          totalTime={CONTENT[currentDeckIndex].totalTime}
          duration={CONTENT[currentDeckIndex].duration}
          repeatCount={CONTENT[currentDeckIndex].repeatCount}
          isEditable={true}
        />
      </Swiper>
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => {
            console.log('delete');
          }}
          style={styles.buttonContainer}
        >
          <Image style={styles.button} source={ICON_DELETE} placeholder={'icon_delete'} />
        </Pressable>
      </View>
    </View>
  );
};

export default CardEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    alignItems: 'center',
    gap: 20,
  },
  buttonContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: secondaryColor,
    padding: 10,
    borderRadius: 15,
  },
  buttonsContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  button: {
    width: 25,
    aspectRatio: 1,
  },
});
