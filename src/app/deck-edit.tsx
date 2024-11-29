import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { CardStack, DeckCover, DeckEditModal, Repeaters } from '../components';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Accordion from '../components/Accordion';
import getDeckMockData, { CARDS_GROUPING_TYPE, type CARDS_DATA_TYPE } from '../apis/getDeckData';
import { SCREEN_HEIGHT } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { ICON_EXERCISE_TYPE_1, ICON_NEW } from '../assets';
import RepeaterModal from '../components/RepeaterModal';
import { router } from 'expo-router';

const DeckEdit = () => {
  const DATA = getDeckMockData.cards('1729000848');
  const insets = useSafeAreaInsets();
  const FLATLIST_MAX_HEIGHT = useMemo(
    () => ((SCREEN_HEIGHT - insets.top - insets.bottom) * 70) / 100,
    []
  );
  if (!DATA) throw new Error('undefined card data');

  // accordion states
  const isExpanded = useSharedValue(-1);
  const setExpand = (expandIndex: number) => {
    // only one panel can expand at a time
    if (isExpanded.value === expandIndex) isExpanded.value = -1;
    else isExpanded.value = expandIndex;
  };

  // cards states
  const [currentTasks, setTasks] = useState(DATA.tasks);
  const [currentGroup, setGrouping] = useState(DATA.tasksGrouping);

  // deck edit modal states
  const [isModalVisible, setModalVisible] = useState(false);

  // change repeater modal
  const [repeaterID, setRepeaterID] = useState(-1);
  const [isRepeaterModalVisible, setRepeaterModalVisible] = useState(false);
  const [repeaterCount, setRepeaterCount] = useState(-1);

  const dropAreaOnPressHandler = ({
    currentTasks,
    currentDeck,
  }: {
    currentTasks: CARDS_DATA_TYPE;
    currentDeck: CARDS_GROUPING_TYPE;
  }) => {
    setTasks(currentTasks);
    setGrouping(currentDeck);
  };

  const connectorOnPressHandler = (newGroup: CARDS_GROUPING_TYPE) => {
    setGrouping(newGroup);
  };

  return (
    <Animated.View style={styles.container}>
      <Accordion>
        <Accordion.Header onPress={() => setExpand(0)}>
          <Text>01</Text>
          <Text>deckname</Text>
          <Text>01</Text>
        </Accordion.Header>
        <Accordion.Panel id={0} isExpanded={isExpanded} isUsingChildrenLayout>
          <DeckCover
            id={`${0}`}
            imageRepresentative={ICON_EXERCISE_TYPE_1}
            imageRepresentativeAlt={''}
            deckName={'deckname'}
            isEditable={true}
            isAnimated={false}
            customStyles={{ width: '65%' }}
          />
        </Accordion.Panel>
      </Accordion>
      <View style={[styles.content, { maxHeight: FLATLIST_MAX_HEIGHT }]}>
        <ScrollView style={styles.contentScrollContainer}>
          <View style={styles.bufferTopSpace} />
          <View style={styles.contentContainer}>
            <Repeaters
              currentGroup={currentGroup}
              style={styles.repeatersContainer}
              onLongPress={(id, count) => {
                setRepeaterModalVisible(true);
                setRepeaterID(id);
                setRepeaterCount(count);
              }}
            />
            <View style={styles.verticalBuffer} />
            <CardStack
              currentTasks={currentTasks}
              currentGroup={currentGroup}
              dropAreaOnPress={dropAreaOnPressHandler}
              connectorOnPress={connectorOnPressHandler}
            />
          </View>
          <View style={styles.bufferBottomSpace} />
        </ScrollView>
      </View>
      <View style={styles.editButtonContainer}>
        <Pressable
          style={styles.editButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image style={styles.edit} source={ICON_NEW} alt={'icon_new'} />
        </Pressable>
      </View>
      <DeckEditModal
        isVisible={isModalVisible}
        onPressClosed={() => {
          setModalVisible(false);
        }}
        onPressSelectExistingCard={() => {
          router.push('card-select');
        }}
        onPressSelectExistingDeck={() => {
          router.push('deck-select');
        }}
      />
      <RepeaterModal
        isVisible={isRepeaterModalVisible}
        count={repeaterCount}
        onDecrement={(count) => {
          setRepeaterCount(count);
        }}
        onIncrement={(count) => {
          setRepeaterCount(count);
        }}
        onClosed={() => {
          currentGroup.repeats[repeaterID] = repeaterCount;
          setRepeaterModalVisible(false);
          setRepeaterID(-1);
          setRepeaterCount(-1);
        }}
      />
    </Animated.View>
  );
};

export default DeckEdit;

const styles = StyleSheet.create({
  bufferBottomSpace: {
    height: 50,
  },
  bufferTopSpace: {
    height: 25,
  },
  repeatersContainer: { flex: 0.25 },
  container: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: '5%',
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  verticalBuffer: {
    flex: 0.05,
  },
  contentScrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
  },
  editButton: {
    width: '100%',
  },
  edit: {
    width: 70,
    aspectRatio: 1,
  },
});
