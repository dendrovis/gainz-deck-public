import { CARD_GAP, CARD_HEIGHT } from '../constants';

export const CapitalizedWords = (statement: string): string =>
  statement
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');

export const isUndefined = (value: string | number) => value == null;

export const getConsecutiveList = (arr: number[]) => {
  const result: number[][] = [];
  let count = 1;
  //start from second index
  for (let index = 1; index <= arr.length; index++) {
    if (arr[index] === arr[index - 1]) {
      count++;
    } else {
      result.push([arr[index - 1], count]);
      count = 1;
    }
  }
  return result;
};

export const stringNumberWithZeroPadding = (value: number, paddingMaxLength: number) =>
  value.toString().padStart(paddingMaxLength, '0');

export const getGroupingContainerSizes = (groupingPattern: number[][]) => {
  const groupingContainerSizeList: number[] = [];
  groupingPattern.forEach(([groupIDs, repeatCount]) => {
    if (groupIDs === -1) {
      for (let i = 0; i < repeatCount; i++) {
        const containerSize = CARD_HEIGHT;
        groupingContainerSizeList.push(containerSize);
      }
    } else {
      const containerSize = CARD_HEIGHT * repeatCount + CARD_GAP * (repeatCount - 1);
      groupingContainerSizeList.push(containerSize);
    }
  });
  return groupingContainerSizeList;
};

export const getNoRepeatConsecutiveList = (array: number[]) => {
  const result: number[] = [];
  array.forEach((value) => {
    if (value === -1) result.push(-1);
    else if (!result.includes(value)) result.push(value);
  });
  return result;
};

export const isDecreasing = (array: number[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < array[i + 1]) {
      return false;
    }
  }
  return true;
};

export const isArrayOf13Digits = (array: number[]) => {
  let result = true;
  array.forEach((number) => {
    if (number.toString().length !== 13) result = false;
  });
  return result;
};

export const convertSSToHHMMSS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
};
