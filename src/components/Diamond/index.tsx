import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { ICON_DIAMOND, ICON_DIAMOND_DARK } from '../../assets';
import { appStyles } from '../../styles/common';

type DiamondProps = {
  digit: number;
  isHidden?: boolean;
  isDark?: boolean;
  isEditable?: boolean;
  onChange?: (value: number) => void;
};

const Diamond = ({ digit, isHidden, isDark, isEditable, onChange }: DiamondProps) => {
  const StyleDiamondContainer = [styles.diamondContainer, isHidden && appStyles.hidden];
  const StyleDiamondText = [styles.diamondText, isDark && appStyles.darkModeText];
  const onIncrementHandler = () => {
    if (!onChange) return;
    if (digit !== 9) onChange(digit + 1);
    else onChange(0);
  };

  const onDecrementHandler = () => {
    if (!onChange) return;
    if (digit !== 0) onChange(digit - 1);
    else onChange(9);
  };

  return (
    <View style={StyleDiamondContainer}>
      {isDark ? (
        <Image style={styles.diamond} source={ICON_DIAMOND_DARK} alt={'icon_diamond_dark'} />
      ) : (
        <Image style={styles.diamond} source={ICON_DIAMOND} alt={'icon_diamond'} />
      )}
      <Text style={StyleDiamondText}>{digit}</Text>
      {isEditable && (
        <>
          <Pressable style={styles.incrementButton} onPress={onIncrementHandler} />
          <Pressable style={styles.decrementButton} onPress={onDecrementHandler} />
        </>
      )}
    </View>
  );
};

export default Diamond;

const styles = StyleSheet.create({
  diamondContainer: {
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamondText: {
    position: 'absolute',
    fontSize: 20,
  },
  diamond: {
    width: '100%',
    aspectRatio: 49 / 70,
  },
  incrementButton: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
  },
  decrementButton: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    bottom: 0,
  },
});
