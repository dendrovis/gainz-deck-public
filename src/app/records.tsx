import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Chart, ContentBlock } from '../components';
import { ICON_TIME_BADGE } from '../assets';
import { convertSSToHHMMSS } from '../utils';

const Records = () => {
  const CONTENT = {
    totalTimeSpend: 9999999999,
    playTimeStamps: [
      1762858430000, 1733914430000, 1733914432000, 1733914433000, 1728644030000, 1699700030000,
    ],
  };

  const { hours, minutes, seconds } = convertSSToHHMMSS(CONTENT.totalTimeSpend);

  return (
    <View style={styles.container}>
      <ContentBlock
        source={ICON_TIME_BADGE}
        alt={'icon-time-badge'}
        title={`${hours}h ${minutes}m ${seconds}s`}
        description={'total time spend'}
      />
      <Chart utcTimestamps={CONTENT.playTimeStamps} />
    </View>
  );
};
export default Records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
