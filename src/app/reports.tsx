import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ContentBlock, ToggleBlock } from '../components';
import { ICON_ACTIVE_BADGE, ICON_RECORDS, ICON_TIME_BADGE } from '../assets';
import { convertSSToHHMMSS } from '../utils';

const Reports = () => {
  const CONTENT = {
    totalTimeSpend: 9999,
    round: 999,
    defaultToggle: true,
  };

  const { hours, minutes, seconds } = convertSSToHHMMSS(CONTENT.totalTimeSpend);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ContentBlock
          source={ICON_ACTIVE_BADGE}
          alt={'icon-active-badge'}
          title={`${hours}h ${minutes}m ${seconds}s`}
          description={'time taken'}
        />
        <ContentBlock
          source={ICON_TIME_BADGE}
          alt={'icon-time-badge'}
          title={`${CONTENT.round}`}
          description={'rounds'}
        />
        <ToggleBlock
          isToggle={CONTENT.defaultToggle}
          description={'recorded'}
          source={ICON_RECORDS}
          alt={'icon_records'}
        />
      </View>
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    gap: 15,
    paddingTop: 30,
  },
});
