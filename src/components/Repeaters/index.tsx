import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import React from 'react';
import {
  getConsecutiveList,
  getGroupingContainerSizes,
  getNoRepeatConsecutiveList,
} from '../../utils';
import { CARD_GAP, CARD_HEIGHT } from '../../constants';
import Repeater from '../Repeater';
import { secondaryColor } from '../../styles/common';
import { CARDS_GROUPING_TYPE } from '../../apis/getDeckData';

type RepeatersProps = {
  currentGroup: CARDS_GROUPING_TYPE;
  style?: StyleProp<ViewStyle>;
  onLongPress?: (id: number, count: number) => void;
};

const Repeaters = ({ style, currentGroup, onLongPress }: RepeatersProps) => {
  const consecutiveList = getConsecutiveList(currentGroup.ids);
  const groupingContainerSize = getGroupingContainerSizes(consecutiveList);
  const idsRelativeToContainerSizeList = getNoRepeatConsecutiveList(currentGroup.ids);

  return (
    <View style={[styles.repeatersContainer, ...[style]]}>
      {groupingContainerSize.map((containerSize, index) => {
        return (
          <View
            key={index}
            style={[
              styles.repeaterContainer,
              {
                height: containerSize,
              },
            ]}
          >
            {containerSize !== CARD_HEIGHT && (
              <Repeater
                count={currentGroup.repeats[idsRelativeToContainerSizeList[index]]}
                onLongPress={() => {
                  if (onLongPress)
                    onLongPress(
                      idsRelativeToContainerSizeList[index],
                      currentGroup.repeats[idsRelativeToContainerSizeList[index]]
                    );
                }}
              />
            )}
            <View style={styles.connecter} />
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  connecter: {
    position: 'absolute',
    right: -50,
    height: '100%',
    width: 7,
    backgroundColor: secondaryColor,
  },
  repeatersContainer: {
    flex: 1,
    gap: CARD_GAP,
  },
  repeaterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default Repeaters;
