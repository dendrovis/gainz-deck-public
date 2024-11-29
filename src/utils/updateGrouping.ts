export const grouping = (
  ids: number[],
  selectedIndex: number,
  repeats: { [id: string]: number }
) => {
  // use top index as the gap references
  const isNextIndexExist = ids[selectedIndex + 2] !== undefined ? true : false;
  const isPrevIndexExist = ids[selectedIndex - 1] !== undefined ? true : false;

  const isBottomSideConnected = () => {
    if (!isNextIndexExist) return false;
    if (
      ids[selectedIndex + 2] === ids[selectedIndex + 1] &&
      (ids[selectedIndex + 2] !== -1 || ids[selectedIndex + 1] !== -1)
    )
      return true;
    return false;
  };

  const isTopSideConnected = () => {
    if (!isPrevIndexExist) return false;
    if (
      ids[selectedIndex - 1] === ids[selectedIndex] &&
      (ids[selectedIndex - 1] !== -1 || ids[selectedIndex] !== -1)
    )
      return true;
    return false;
  };

  //check if it is top index
  if (selectedIndex === 0) {
    const currentTimeStamp = Date.now();
    //check if bottom side connected
    if (isBottomSideConnected()) return { ids: [ids[1], ...ids.slice(1)], repeats };
    const newRepeater = { [`${currentTimeStamp}`]: 1, ...repeats };
    return { ids: [currentTimeStamp, currentTimeStamp, ...ids.slice(2)], repeats: newRepeater };
  }

  //check if it is bottom index
  else if (selectedIndex === ids.length - 2) {
    const currentTimeStamp = Date.now();
    if (isTopSideConnected()) {
      const currentID = ids[selectedIndex];
      return { ids: [...ids.slice(0, -1), currentID], repeats };
    }
    const newRepeater = { [`${currentTimeStamp}`]: 1, ...repeats };
    return { ids: [...ids.slice(0, -2), currentTimeStamp, currentTimeStamp], repeats: newRepeater };
  }

  //check if both side are connected
  else if (isTopSideConnected() && isBottomSideConnected()) {
    const currentTimeStamp = Date.now();
    const newRepeater = { [`${currentTimeStamp}`]: 1, ...repeats };
    const currentTopID = ids[selectedIndex];
    const currentBottomID = ids[selectedIndex + 1];
    const newIDs = ids.map((id) =>
      id === currentBottomID || id === currentTopID ? currentTimeStamp : id
    );
    return { ids: newIDs, repeats: newRepeater };
  }

  //check if only top side connected
  else if (isTopSideConnected() && !isBottomSideConnected()) {
    const currentID = ids[selectedIndex];
    ids[selectedIndex + 1] = currentID;
    return { ids, repeats };
  }

  //check if only bottom side connected
  else if (!isTopSideConnected() && isBottomSideConnected()) {
    const currentID = ids[selectedIndex + 1];
    ids[selectedIndex] = currentID;
    return { ids, repeats };
  }

  //check if no side are connected
  else if (!isTopSideConnected() && !isBottomSideConnected()) {
    const currentTimeStamp = Date.now();
    const newRepeater = { [`${currentTimeStamp}`]: 1, ...repeats };
    ids[selectedIndex] = currentTimeStamp;
    ids[selectedIndex + 1] = currentTimeStamp;
    return { ids, repeats: newRepeater };
  } else return { ids, repeats };
};

export const ungrouping = (
  ids: number[],
  selectedIndex: number,
  repeats: { [id: string]: number }
) => {
  const newRepeater = { ...repeats };
  const isNextIndexExist = ids[selectedIndex + 2] !== undefined ? true : false;
  const isPrevIndexExist = ids[selectedIndex - 1] !== undefined ? true : false;

  const isBottomSideConnected = () => {
    if (!isNextIndexExist) return false;
    if (
      ids[selectedIndex + 2] === ids[selectedIndex + 1] &&
      (ids[selectedIndex + 2] !== -1 || ids[selectedIndex + 1] !== -1)
    )
      return true;
    return false;
  };

  const isTopSideConnected = () => {
    if (!isPrevIndexExist) return false;
    if (
      ids[selectedIndex - 1] === ids[selectedIndex] &&
      (ids[selectedIndex - 1] !== -1 || ids[selectedIndex] !== -1)
    )
      return true;
    return false;
  };

  // if top is connected only then remove bottom to -1 only and no delete id repeater as group still exist
  if (!isBottomSideConnected() && isTopSideConnected()) {
    ids[selectedIndex + 1] = -1;
    return { ids, repeats: newRepeater };
  }
  // if bottom is connected only then remove top to -1 only and no delete id repeater as group still exist
  if (isBottomSideConnected() && !isTopSideConnected()) {
    ids[selectedIndex] = -1;
    return { ids, repeats: newRepeater };
  }
  // if both is connected, create 2 id seperatedly
  if (isBottomSideConnected() && isTopSideConnected()) {
    const currentTimeStamp = Date.now();
    const currentID = ids[selectedIndex];
    const newFirstGroupID = currentTimeStamp;
    const newSecondGroupID = currentTimeStamp + 1;
    const newFirstHalfIDs = ids
      .slice(0, selectedIndex + 1)
      .map((id) => (id === currentID ? newFirstGroupID : id));
    const newSecondHalfIDs = ids
      .slice(selectedIndex + 1)
      .map((id) => (id === currentID ? newSecondGroupID : id));
    const newRepeater = { [`${currentTimeStamp}`]: 1, [`${currentTimeStamp + 1}`]: 1, ...repeats };
    return { ids: [...newFirstHalfIDs, ...newSecondHalfIDs], repeats: newRepeater };
  }

  // else remove both into -1 and delete group ids in repeater
  const deleteRepeaterIDs = (repeatID: string) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newRepeater[repeatID];
  };
  deleteRepeaterIDs(`${ids[selectedIndex]}`);
  ids[selectedIndex] = -1;
  ids[selectedIndex + 1] = -1;
  return { ids, repeats: newRepeater };
};
