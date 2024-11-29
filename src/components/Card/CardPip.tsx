import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { primaryColor, secondaryColor } from '../../styles/common';
import { Image } from 'expo-image';
import { ICON_ACTIVE_DARK, ICON_TIME } from '../../assets';

type CardPipProps = { isFlip?: boolean; index: number; type: 'active' | 'break' };

const CardPip = ({ isFlip = false, index, type }: CardPipProps) => {
  const StylePipText = type === 'break' ? styles.pipTextDark : styles.pipText;
  const StylePip = isFlip ? styles.pipBottom : styles.pipTop;

  return (
    <View style={StylePip}>
      <Text style={StylePipText}>{index}</Text>
      {type === 'break' ? (
        <Image style={styles.pipType} source={ICON_TIME} alt={'icon_time'} />
      ) : (
        <Image style={styles.pipType} source={ICON_ACTIVE_DARK} alt={'icon_active'} />
      )}
    </View>
  );
};

export default CardPip;

const styles = StyleSheet.create({
  pipType: {
    width: '30%',
    aspectRatio: 1,
  },
  pipTop: {
    position: 'absolute',
    top: '2%',
    left: '4%',
  },
  pipBottom: {
    position: 'absolute',
    bottom: '2%',
    right: '4%',
    transform: [{ rotate: '180deg' }],
  },
  pipText: {
    color: primaryColor,
  },
  pipTextDark: {
    color: secondaryColor,
  },
});
