import { Image } from 'expo-image';
import { CardSliceType } from '.';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CARD_HEIGHT } from '../../constants';
import { ICON_ACTIVE_DARK, ICON_TIME, ICON_TIME_DARK } from '../../assets';

type CardSliceImageProps = { type: CardSliceType; isSelected: boolean };

const CardSliceImage = ({ type, isSelected = false }: CardSliceImageProps) =>
  type === 'active' ? (
    <Image style={styles.imageRepType} source={ICON_ACTIVE_DARK} placeholder={'icon_work-dark'} />
  ) : (
    <Image
      style={styles.imageRepType}
      source={isSelected ? ICON_TIME_DARK : ICON_TIME}
      placeholder={'icon_time'}
    />
  );

const styles = StyleSheet.create({
  imageRepType: {
    aspectRatio: 1,
    height: CARD_HEIGHT - 20,
  },
});

export default CardSliceImage;
