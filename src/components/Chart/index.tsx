import { ScrollView, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { ICON_PLAY, ICON_SPADES } from '../../assets';
import { Image } from 'expo-image';
import { secondaryColor } from '../../styles/common';
import { isArrayOf13Digits, isDecreasing } from '../../utils';

// latest to past
type ChartProps = { utcTimestamps: number[] };

const reverseMonthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
].reverse();

const Chart = ({ utcTimestamps = [] }: ChartProps) => {
  if (!isArrayOf13Digits(utcTimestamps) && !isDecreasing(utcTimestamps))
    throw new Error('invalid utcTimeStamp');

  const getMonth = (utcTimestamp: number) => new Date(utcTimestamp).getUTCMonth();
  const getYear = (utcTimestamp: number) => new Date(utcTimestamp).getUTCFullYear();
  const yearStart = getYear(utcTimestamps[utcTimestamps.length - 1]);
  const yearLatest = getYear(utcTimestamps[0]);

  const yearList = Array.from(
    { length: yearLatest - yearStart + 1 },
    (_, index) => yearStart + index
  ).reverse();

  const getDatesByYearAndMonth = (timeStamps: number[], yearRange: number[]) => {
    const result: number[][][] = [];
    let currentIndex = 0;
    yearRange.forEach((year, yearIndex) => {
      result.push([[], [], [], [], [], [], [], [], [], [], [], []]); // pre-populate arrays representing the year and the 12 months
      for (let index = currentIndex; index < timeStamps.length; index++) {
        const currentTimeStamp = timeStamps[index];
        if (getYear(currentTimeStamp) === year) {
          result[yearIndex][getMonth(currentTimeStamp)].push(currentTimeStamp);
          currentIndex = index + 1;
        } else return;
      }
    });
    return result;
  };

  const groupOfDatesByYearAndMonth = getDatesByYearAndMonth(utcTimestamps, yearList);

  return (
    <View style={styles.container}>
      <View style={styles.spadesTop}>
        <Image style={styles.spadesTop} source={ICON_SPADES} alt={'icon-spades'} />
      </View>
      <View style={styles.content}>
        <View style={styles.verticalLine} />
        <ScrollView style={styles.scrollContent}>
          {yearList.map((year, yearIndex) => {
            return (
              <View key={yearIndex}>
                <View style={styles.line}>
                  <View style={styles.milestone} />
                  <View style={styles.textContainer}>
                    <Text style={styles.yearText}>{year}</Text>
                  </View>
                </View>
                {groupOfDatesByYearAndMonth[yearIndex].reverse().map((timestamps, monthIndex) => {
                  return (
                    <View key={monthIndex} style={styles.line}>
                      <View style={styles.point} />
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>{reverseMonthNames[monthIndex]}</Text>
                      </View>
                      <View style={styles.plays}>
                        {timestamps.map((_, index) => {
                          return (
                            <Image
                              key={index}
                              style={styles.play}
                              source={ICON_PLAY}
                              alt={'icon-play'}
                            />
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.spadesBottomContainer}>
        <Image style={styles.spadesBottom} source={ICON_SPADES} alt={'icon-spades-flip'} />
      </View>
      <View style={styles.buffer} />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollContent: {
    minWidth: '100%',
  },
  buffer: {
    height: 50,
  },
  content: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  textContainer: {},
  text: {
    color: secondaryColor,
    minWidth: 35,
  },
  yearText: {
    fontSize: 20,
    fontWeight: '500',
    color: secondaryColor,
  },
  verticalLine: {
    position: 'absolute',
    borderColor: secondaryColor,
    backgroundColor: secondaryColor,
    height: '100%',
    width: 3,
    left: 23,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  point: {
    width: 10,
    aspectRatio: 1,
    backgroundColor: secondaryColor,
    borderRadius: 50,
    marginLeft: 20,
  },
  milestone: {
    width: 20,
    aspectRatio: 1,
    backgroundColor: secondaryColor,
    borderRadius: 50,
    marginLeft: 14,
  },
  plays: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    paddingRight: 80,
    flexWrap: 'wrap',
  },
  spadesTop: {
    width: 50,
    aspectRatio: 21 / 23,
  },
  spadesBottomContainer: {
    width: 50,
    aspectRatio: 21 / 23,
  },
  spadesBottom: {
    width: 50,
    aspectRatio: 21 / 23,
    transform: [{ rotate: '180deg' }],
  },
  play: {
    width: 35,
    aspectRatio: 25 / 22,
  },
});
