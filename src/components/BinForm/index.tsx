import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CapitalizedWords } from '../../utils';
import { secondaryColor } from '../../styles/common';
import { Image } from 'expo-image';
import { ICON_DELETE } from '../../assets';

type BinFormType = {
  label: string;
  onPress?: (value: boolean) => void;
} & PressableProps;

const BinForm = ({ label, onPress }: BinFormType) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>{CapitalizedWords(label)}</Text>
      <Pressable onPress={onPress} style={styles.delete}>
        <View style={styles.delete}>
          <Image style={styles.delete} source={ICON_DELETE} alt={'icon-delete'} />
        </View>
      </Pressable>
    </View>
  );
};

export default BinForm;

const styles = StyleSheet.create({
  delete: {
    width: 25,
    aspectRatio: 16 / 18,
  },
  formContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  label: {
    color: secondaryColor,
    fontSize: 16,
  },
});
