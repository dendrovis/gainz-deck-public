import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { CardSlice } from '../components';

const CardSelect = () => {
  const CARDS = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        {CARDS.map((_, index) => (
          <CardSlice
            key={index}
            index={999}
            type={'active'}
            duration={30}
            repeat={'30'}
            name={'task name'}
            style={styles.card}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CardSelect;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  cardContainer: {
    paddingVertical: 10,
    gap: 10,
    width: '80%',
    alignSelf: 'center',
  },
  card: {
    width: '100%',
  },
});
