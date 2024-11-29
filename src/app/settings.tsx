import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import React, { useState } from 'react';
import { Divider, TwoOptionModal } from '../components';
import Category, { LabelContentType } from '../components/Category';

const Setting = () => {
  const onPressBin = () => {
    console.log('bin');
    setModalVisible(true);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const onPressActionYesHandler = () => {
    setModalVisible(false);
  };
  const onPressModalNoAction = () => {
    setModalVisible(false);
  };

  const onPressToggle = (value: boolean) => {
    console.log('toggle', value);
  };

  //data fetch is omitted as this point
  const CONTENT: { [category: string]: LabelContentType }[] = [
    {
      report: [
        {
          label: 'always select recorded',
          value: false,
          type: 'toggle',
        },
      ],
    },
    {
      cache: [
        {
          label: 'records',
          type: 'bin',
        },
      ],
    },
  ];

  const onPressContent = [onPressToggle, onPressBin];

  type onPressType = ((value: boolean) => void) & ((event: GestureResponderEvent) => void);

  return (
    <View style={styles.container}>
      {CONTENT.map((category, index) => {
        const title = Object.keys(category)[0];
        const categoryContent = CONTENT[index];
        return (
          <View key={index}>
            <Category
              title={title}
              labelContent={categoryContent[title as keyof typeof categoryContent]}
              onPress={onPressContent[index] as onPressType}
            />
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
          </View>
        );
      })}
      <TwoOptionModal
        isVisible={isModalVisible}
        description={'Warning, this action is not reversible! Confirm?'}
        actionAText={'Yes'}
        actionBText={'No'}
        onPressActionA={onPressActionYesHandler}
        onPressActionB={onPressModalNoAction}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dividerContainer: {
    alignItems: 'center',
  },
});
