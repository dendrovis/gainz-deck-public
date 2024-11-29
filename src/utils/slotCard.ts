import { CARDS_GROUPING_TYPE, CARDS_DATA_TYPE } from '../apis/getDeckData';
import { cloneDeep } from 'lodash';

export const slotCard = (
  currentDeck: CARDS_GROUPING_TYPE,
  selectedIndex: number,
  targetIndex: number,
  currentTasks: CARDS_DATA_TYPE
) => {
  const newCurrentTasks = cloneDeep(currentTasks);
  const newCurrentDeck = cloneDeep(currentDeck);
  //pre-populate grouping before removal and insertion
  //index is first
  if (isFirstIndex(selectedIndex)) {
    //#-* *
    if (
      isNextConnected(newCurrentDeck.ids, selectedIndex) &&
      !isNextTwoConnected(newCurrentDeck.ids, selectedIndex)
    ) {
      newCurrentDeck.ids[selectedIndex + 1] = -1;
    }
  }

  //index is last
  else if (isLastIndex(newCurrentDeck.ids, selectedIndex)) {
    //* *-#
    if (
      !isPreviousTwoConnected(newCurrentDeck.ids, selectedIndex) &&
      isPreviousConnected(newCurrentDeck.ids, selectedIndex)
    ) {
      newCurrentDeck.ids[newCurrentDeck.ids.length - 2] = -1;
    }
  }

  //index is second
  else if (isSecondIndex(selectedIndex)) {
    // *-# *
    if (
      isPreviousConnected(newCurrentDeck.ids, selectedIndex) &&
      !isNextConnected(newCurrentDeck.ids, selectedIndex)
    ) {
      newCurrentDeck.ids[selectedIndex - 1] = -1;
    }
    // * #-* *
    else if (
      !isPreviousConnected(newCurrentDeck.ids, selectedIndex) &&
      isNextConnected(newCurrentDeck.ids, selectedIndex) &&
      !isNextTwoConnected(newCurrentDeck.ids, selectedIndex)
    ) {
      newCurrentDeck.ids[selectedIndex + 1] = -1;
    }
    // *-#-* -* # *- //do nothing
  }

  // if index is last second
  else if (isLastSecondIndex(newCurrentDeck.ids, selectedIndex)) {
    // * #-*
    if (
      isNextConnected(newCurrentDeck.ids, selectedIndex) &&
      !isPreviousConnected(newCurrentDeck.ids, selectedIndex)
    ) {
      newCurrentDeck.ids[selectedIndex + 1] = -1;
    }
    // * *-# *
    else if (
      isPreviousConnected(newCurrentDeck.ids, selectedIndex) &&
      !isNextConnected(newCurrentDeck.ids, selectedIndex) &&
      !isPreviousTwoConnected(newCurrentDeck.ids, selectedIndex)
    ) {
      newCurrentDeck.ids[selectedIndex - 1] = -1;
    }
    // *-#-* -* # *- //do nothing
  }
  //index is middle
  else {
    // * *-# *
    if (
      !isPreviousPreviousConnected(newCurrentDeck.ids, selectedIndex) &&
      isPreviousConnected(newCurrentDeck.ids, selectedIndex) &&
      !isNextConnected(newCurrentDeck.ids, selectedIndex)
    )
      newCurrentDeck.ids[selectedIndex - 1] = -1;
    // * #-* *
    if (
      !isNextNextConnected(newCurrentDeck.ids, selectedIndex) &&
      isNextConnected(newCurrentDeck.ids, selectedIndex) &&
      !isPreviousConnected(newCurrentDeck.ids, selectedIndex)
    )
      newCurrentDeck.ids[selectedIndex + 1] = -1;
    // *-#-* -* # *- //do nothing
  }
  //insert of card and re-grouping drop
  let targetGroupID = -1;
  // *-#-* set new combine group if they are not first or last index
  if (
    !isFirstIndex(targetIndex) &&
    !isLastIndex(newCurrentDeck.ids, targetIndex) &&
    isPreviousConnected(newCurrentDeck.ids, targetIndex)
  ) {
    targetGroupID = newCurrentDeck.ids[targetIndex];
  }
  // -* # *- | * # * | first | last, ignore

  // removal of card and groupID
  const [selectedCard] = newCurrentTasks.splice(selectedIndex, 1);
  newCurrentDeck.ids.splice(selectedIndex, 1);

  //insert of card and groupID
  //if target place above selected index
  if (targetIndex < selectedIndex) {
    newCurrentTasks.splice(targetIndex, 0, selectedCard);
    newCurrentDeck.ids.splice(targetIndex, 0, targetGroupID);
  }
  //if target place below selected index
  else {
    newCurrentTasks.splice(targetIndex - 1, 0, selectedCard);
    newCurrentDeck.ids.splice(targetIndex - 1, 0, targetGroupID);
  } //because the top array has -1 length due to removal of previous index, Thus, index is consider -1

  return { currentTasks: newCurrentTasks, currentDeck: newCurrentDeck };
};

type IsPreviousTwoIndexExist = (currentIndex: number) => boolean;
type IsNextTwoIndexExist<T> = (array: T[], currentIndex: number) => boolean;

const isPreviousTwoIndexExist: IsPreviousTwoIndexExist = (currentIndex) => currentIndex > 1;
const isNextTwoIndexExist: IsNextTwoIndexExist<number> = (array, currentIndex) =>
  array.length > 2 && array.length - 2 > currentIndex;

const isFirstIndex = (currentIndex: number) => currentIndex === 0;
const isSecondIndex = (currentIndex: number) => currentIndex === 1;
const isLastIndex = (array: number[], currentIndex: number) => array.length - 1 === currentIndex;
const isLastSecondIndex = (array: number[], currentIndex: number) =>
  array.length - 2 === currentIndex;

// *-#
const isPreviousConnected = (array: number[], currentIndex: number) => {
  if (isFirstIndex(currentIndex)) throw new Error('previous numbers may not exist');
  return array[currentIndex] === array[currentIndex - 1];
};

// #-*
const isNextConnected = (array: number[], currentIndex: number) => {
  if (isLastIndex(array, currentIndex)) throw new Error('next numbers may not exist');
  return array[currentIndex] === array[currentIndex + 1];
};

// *-* #
const isPreviousTwoConnected = (array: number[], currentIndex: number) => {
  if (!isPreviousTwoIndexExist(currentIndex)) throw new Error('previous numbers may not exist');
  return array[currentIndex - 1] === array[currentIndex - 2];
};

// # *-*
const isNextTwoConnected = (array: number[], currentIndex: number) => {
  if (!isNextTwoIndexExist(array, currentIndex)) throw new Error('previous numbers may not exist');
  return array[currentIndex + 1] === array[currentIndex + 2];
};

// #-*-*
const isNextNextConnected = (array: number[], currentIndex: number) =>
  isNextTwoConnected(array, currentIndex) && isNextConnected(array, currentIndex);

// *-*-#
const isPreviousPreviousConnected = (array: number[], currentIndex: number) =>
  isPreviousTwoConnected(array, currentIndex) && isPreviousConnected(array, currentIndex);
