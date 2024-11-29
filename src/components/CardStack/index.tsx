import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CardSlice from '../CardSlice';
import { CARD_GAP } from '../../constants';
import { CARDS_DATA_TYPE, CARDS_GROUPING_TYPE } from '../../apis/getDeckData';
import DropArea from '../DropArea';
import Connector from '../Connector';
import { slotCard } from '../../utils/slotCard';
import { grouping, ungrouping } from '../../utils/updateGrouping';
import { router } from 'expo-router';

type CardStackProps = {
  currentTasks: CARDS_DATA_TYPE;
  currentGroup: CARDS_GROUPING_TYPE;
  dropAreaOnPress: (args: {
    currentTasks: CARDS_DATA_TYPE;
    currentDeck: CARDS_GROUPING_TYPE;
  }) => void;
  connectorOnPress: (args: CARDS_GROUPING_TYPE) => void;
};

const CardStack = ({
  currentTasks,
  currentGroup,
  dropAreaOnPress,
  connectorOnPress,
}: CardStackProps) => {
  const [isTaskMoveMode, setTaskMoveMode] = useState(false);
  const [selectedTaskModeIndex, setSelectedTaskModeIndex] = useState(-1);

  const isTopDropAreaVisible = () => isTaskMoveMode && selectedTaskModeIndex !== 0;

  const isDropAreaVisible = (index: number) =>
    isTaskMoveMode && !(selectedTaskModeIndex === index || selectedTaskModeIndex - 1 === index);

  const dropAreaOnPressHandler = (index: number) => {
    if (isTaskMoveMode) {
      const result = slotCard(currentGroup, selectedTaskModeIndex, index, currentTasks);
      setSelectedTaskModeIndex(-1);
      setTaskMoveMode(false);
      dropAreaOnPress(result);
    }
  };

  const connectorOnPressHandler = (index: number, isConnected: boolean) => {
    let newGroup: CARDS_GROUPING_TYPE = { ids: [], repeats: {} };
    if (isConnected) {
      newGroup = ungrouping(currentGroup.ids, index, currentGroup.repeats);
    } else {
      newGroup = grouping(currentGroup.ids, index, currentGroup.repeats);
    }
    connectorOnPress(newGroup);
  };

  const isLastConnectorIndex = (array: CARDS_DATA_TYPE, currentIndex: number) =>
    array.length - 1 === currentIndex;

  const isConnectorConnected = (index: number) =>
    currentGroup.ids[index] === currentGroup.ids[index + 1] &&
    currentGroup.ids[index] !== -1 &&
    currentGroup.ids[index + 1] !== -1;

  const cardSliceLongPressHandler = (index: number) => {
    setSelectedTaskModeIndex(index);
    setTaskMoveMode(true);
  };

  const cardSliceNormalPressHandler = () => {
    if (!isTaskMoveMode) {
      //set card select id
      router.push('/card-edit');
    }
  };

  return (
    <View style={styles.cardStack}>
      <DropArea
        isDisplay={isTopDropAreaVisible()}
        onPress={() => dropAreaOnPressHandler(0)}
        style={{ top: -22 }}
      />
      {currentTasks.map((task, index) => (
        <View key={index} style={styles.card}>
          <CardSlice
            index={index + 1}
            onPress={cardSliceNormalPressHandler}
            onLongPress={() => cardSliceLongPressHandler(index)}
            type={task.type}
            duration={task.taskDuration}
            repeat={task.taskInfo as string}
            name={task.taskName}
            isSelected={isTaskMoveMode && selectedTaskModeIndex === index}
          />
          <DropArea
            isDisplay={isDropAreaVisible(index)}
            onPress={() => dropAreaOnPressHandler(index + 1)}
          />
          {!isLastConnectorIndex(currentTasks, index) && (
            <View style={styles.containerConnector}>
              <Connector
                onPress={() => connectorOnPressHandler(index, isConnectorConnected(index))}
                isConnected={isConnectorConnected(index)}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
  },
  cardStack: {
    flex: 0.75,
    gap: CARD_GAP,
  },
  containerConnector: {
    position: 'absolute',
    left: -25,
    top: 35,
  },
});

export default CardStack;
