import { View, StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { ICON_REPEAT } from '../assets';
import { secondaryColor } from '../styles/common';

type RepeaterType = { count: number; onLongPress?: () => void };

const Repeater = ({ count, onLongPress }: RepeaterType) => {
  return (
    <View style={styles.container}>
      <Pressable onLongPress={onLongPress} style={styles.container}>
        <Image style={styles.image} source={ICON_REPEAT} alt={'icon-repeat'} />
        <Text style={styles.text}>x{count}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default Repeater;
