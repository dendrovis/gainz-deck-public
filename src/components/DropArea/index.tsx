import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type PressableProps,
} from 'react-native';
import React from 'react';
import { ICON_DROPBOX } from '../../assets';
import { Image } from 'expo-image';

type DropAreaProps = { isDisplay: boolean; style?: StyleProp<ViewStyle> } & PressableProps;

const DropArea = ({ isDisplay = true, style, onPress }: DropAreaProps) =>
  isDisplay && (
    <Pressable style={[styles.dropboxContainer, ...[style]]} onPress={onPress}>
      <Image style={styles.dropbox} source={ICON_DROPBOX} alt={'icon-dropbox'} />
    </Pressable>
  );

const styles = StyleSheet.create({
  dropboxContainer: {
    position: 'absolute',
    right: 10,
    top: 54,
  },
  dropbox: {
    aspectRatio: 38 / 19,
    width: 38,
  },
});

export default DropArea;
