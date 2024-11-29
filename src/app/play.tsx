import { Pressable, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { Card, CardSlice } from '../components';
import { Image } from 'expo-image';
import { ICON_DIAMOND, ICON_STOP } from '../assets';
import { useSharedValue } from 'react-native-reanimated';

const Play = () => {
  const roundCount = useSharedValue(30);
  const totalTimeRemain = useSharedValue(40);

  //assets strategy - https://docs.expo.dev/versions/latest/sdk/filesystem/
  //string data strategy - https://docs.expo.dev/versions/latest/sdk/async-storage/ , assets path attached here

  return (
    <View style={styles.container}>
      <View style={styles.stopContainer}>
        <Link href="/reports" asChild>
          <Pressable>
            <Image style={styles.stop} source={ICON_STOP} alt={'icon_stop'} />
          </Pressable>
        </Link>
      </View>
      <View style={styles.cardContainer}>
        <Card
          index={998}
          type={'break'}
          image={ICON_DIAMOND}
          taskName={'test'}
          roundCount={roundCount}
          totalRoundCount={100}
          totalTimeRemain={totalTimeRemain}
          totalTime={120}
          duration={180}
          repeatCount={13}
          isEditable={false}
        />
      </View>
      <View style={styles.cardSliceContainer}>
        <CardSlice index={999} type={'active'} duration={30} repeat={'30'} name={'task name'} />
      </View>
    </View>
  );
};

export default Play;

const styles = StyleSheet.create({
  cardSliceContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 30,
    bottom: '18%',
    elevation: 5,
  },
  stopContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
  },
  stop: {
    width: '14%',
    aspectRatio: 1,
  },
  cardContainer: {
    width: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 130,
    position: 'relative',
  },
});
