import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { appStyles, primaryColor, secondaryColor } from '../../styles/common';

type CardTaskProps = {
  taskName: string;
  isDark?: boolean;
  isEditable?: boolean;
  onChange?: (text: string) => void;
};

const CardTask = ({ taskName, isDark = false, isEditable = false, onChange }: CardTaskProps) => {
  const [inputTaskName, onEditTaskName] = useState(taskName);
  const StyleInputContainer = [styles.inputContainer, isDark && styles.inputContainerDark];
  const StyleInput = [styles.input, isDark && appStyles.darkModeText];

  const onChangeTextHandler = (text: string) => {
    onEditTaskName(text);
    if (onChange) onChange(text);
  };

  return (
    <View style={StyleInputContainer}>
      <TextInput
        style={StyleInput}
        onChangeText={onChangeTextHandler}
        placeholder="please enter task name"
        keyboardType="default"
        value={inputTaskName}
        maxLength={25}
        readOnly={!isEditable}
      />
    </View>
  );
};

export default CardTask;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: secondaryColor,
    borderColor: primaryColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 100,
    width: '80%',
    marginBottom: 20,
  },
  inputContainerDark: {
    backgroundColor: primaryColor,
    borderColor: secondaryColor,
  },
  input: {
    textAlign: 'center',
    padding: 2,
    color: primaryColor,
  },
});
