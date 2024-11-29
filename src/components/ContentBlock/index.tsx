import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { secondaryColor } from '../../styles/common';
import { Image } from 'expo-image';

type ContentBlockProps = { title: string; description: string; source: string; alt: string };

const ContentBlock = ({ title, description, source, alt }: ContentBlockProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.media} source={source} alt={alt} />
      <View style={styles.content}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textDescription}>{description}</Text>
      </View>
    </View>
  );
};

export default ContentBlock;

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
