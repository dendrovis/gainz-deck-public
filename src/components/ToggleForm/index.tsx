import { PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CapitalizedWords } from '../../utils';
import { secondaryColor } from '../../styles/common';
import Toggle from '../Toggle';

type ToggleFormType = {
  value?: boolean;
  label: string;
  onPress?: (value: boolean) => void;
} & PressableProps;

const ToggleForm = ({ value = false, label, onPress }: ToggleFormType) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>{CapitalizedWords(label)}</Text>
      <Toggle isToggle={value} onPress={onPress} />
    </View>
  );
};

export default ToggleForm;

const styles = StyleSheet.create({
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
