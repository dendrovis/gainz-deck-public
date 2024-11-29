import { PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { secondaryColor } from '../../styles/common';
import { CapitalizedWords } from '../../utils';
import ToggleForm from '../ToggleForm';
import BinForm from '../BinForm';

type CategoryType = {
  title: string;
  labelContent: LabelContentType;
  onPress?: (value: boolean) => void;
} & PressableProps;

export type LabelContentType = {
  label: string;
  value?: boolean;
  type: FormTypeType;
}[];

type FormTypeType = 'toggle' | 'bin';

const Category = ({ title, labelContent, onPress }: CategoryType) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.title}>{CapitalizedWords(title)}</Text>
      {labelContent.map((content, index) =>
        content.type === 'toggle' ? (
          <ToggleForm key={index} label={content.label} value={content.value} onPress={onPress} />
        ) : (
          <BinForm key={index} label={content.label} onPress={onPress} />
        )
      )}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  title: {
    color: secondaryColor,
    fontSize: 22,
  },
  categoryContainer: {
    paddingVertical: 10,
  },
});
