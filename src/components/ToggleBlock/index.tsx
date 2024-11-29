import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { secondaryColor } from '../../styles/common';
import { Image } from 'expo-image';
import Toggle from '../Toggle';

type ToggleBlockProps = { isToggle: boolean; description: string; source: string; alt: string };

const ToggleBlock = ({ isToggle, description, source, alt }: ToggleBlockProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.media} source={source} alt={alt} />
      <View style={styles.content}>
        <Toggle isToggle={isToggle} />
        <Text style={styles.textDescription}>{description}</Text>
      </View>
    </View>
  );
};

export default ToggleBlock;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 20,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: secondaryColor,
  },
  textDescription: {
    color: secondaryColor,
    fontSize: 16,
  },
  media: {
    width: 50,
    aspectRatio: 1,
  },
});
