/* eslint-disable no-param-reassign */
const suits = ['speads', 'hearts', 'diamond', 'club'];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const deckCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'qeen', 'king', 'ace'];
const playersName = ['ajay', 'vijay', 'sanjay', 'ramesh'];

const createDeck = (suit, val, deckCard) => suit.map((suitElem, suitIndex) => (
  val.map((valElem, valIndex) => (
    ({
      suit: suits[suitIndex],
      card: deckCard[valIndex],
      value: values[valIndex],
    })))));

// createDeck(suits, values, deckCards);
// console.log(createDeck(suits, values, deckCards));

function changeAcePoints(createdDeck) {
  createdDeck.forEach((item, index, arr) => {
    const aceObj = item.find((elem) => elem.card === 'ace');
    const aceIndex = item.indexOf(aceObj);
    const temp = item[aceIndex];
    temp.value = 1;
    arr[index].splice(aceIndex, 1);
    arr[index].unshift(temp);
  });
  return createdDeck;
}

// changeAcePoints(createDeck(suits, values, deckCards));
// console.log(deck);

function removeCard(createdDeck) {
  const cardSuit = 'diamond';
  const cardVal = 7;
  let cardInd;
  createdDeck.forEach((item, index, arr) => {
    item.forEach((elem) => {
      if (elem.suit === cardSuit && elem.card === cardVal) {
        cardInd = item.indexOf(elem);
        arr[index].splice(cardInd, 1);
        return arr;
      }
    });
  });
  console.log(createdDeck);
}
// removeCard(createDeck(suits, values, deckCards));
// console.log(deck);
function allInOneArr(createdDeck) {
  const oneArr = [];
  createdDeck.forEach((item) => {
    item.forEach((elem) => {
      oneArr.push(elem);
    });
  });
  return oneArr;
}
// allInOneArr(createDeck(suits, values, deckCards))
function suffulDeck(createdDeck) {
  const oneArr = allInOneArr(createdDeck);
  oneArr.forEach((item, index, arr) => {
    const rand = Math.trunc(Math.random() * 52);
    const temp = arr[index];
    arr[index] = arr[rand];
    arr[rand] = temp;
  });
  return oneArr;
}
const shuffledDeck = suffulDeck(createDeck(suits, values, deckCards));
console.log(shuffledDeck);
function distributeCards(players, playerCards, sffledDeck) {
  players.forEach((elem) => {
    const tempCard = [];
    for (let cardInd = 0; cardInd < 3; cardInd += 1) {
      tempCard.push(sffledDeck[cardInd]);
      const tempInd = sffledDeck.indexOf(sffledDeck[cardInd]);
      sffledDeck.splice(tempInd, 1);
    }
    playerCards.push({ name: elem, cards: tempCard });
  });
  console.log(players);
}
// const playersCards = [];
// distributeCards(playersName, playersCards, shuffledDeck);
const playersCards = [
  {
    name: 'ajay',
    cards: [
      { suit: 'diamond', card: 9, value: 9 },
      { suit: 'speads', card: 4, value: 4 },
      { suit: 'speads', card: 9, value: 9 },
    ],
  },
  {
    name: 'vijay',
    cards: [
      { suit: 'hearts', card: 9, value: 9 },
      { suit: 'hearts', card: 10, value: 10 },
      { suit: 'hearts', card: 8, value: 8 },
    ],
  },
  {
    name: 'sanjay',
    cards: [
      { suit: 'club', card: 4, value: 4 },
      { suit: 'club', card: 6, value: 6 },
      { suit: 'club', card: 5, value: 5 },
    ],
  },
];
playersCards.forEach((elem) => console.log(elem));

function mapping(players) {
  return players.map((player) => {
    const mappedValues = player.cards.map(({ value }) => value).sort((a, b) => b - a);
    const [highCard, secondHigh, thirdHigh] = mappedValues;
    return {
      ...player,
      mappedValues,
      highCard,
      secondHigh,
      thirdHigh,
    };
  });
}

function checkHighCard(players) {
  const mapped = mapping(players);
  const firstHighCards = mapped.map((elem) => elem.highCard);
  const secHighCards = mapped.map((elem) => elem.secondHigh);
  const thirdHighCards = mapped.map((elem) => elem.thirdHigh);
  const firstMax = Math.max(...firstHighCards);
  let secMax;
  const indFirHigCard = firstHighCards.indexOf(firstMax);
  const firstHighCardArrInd = [];
  const secHighCardArrInd = [];
  firstHighCards.forEach((elem, index) => {
    if (elem === firstMax) {
      firstHighCardArrInd.push(index);
    }
  });
  if (firstHighCardArrInd.length > 1) {
    for (let i = 0; i < firstHighCardArrInd.length - 1; i += 1) {
      if (secHighCards[firstHighCardArrInd[i]] > secHighCards[firstHighCardArrInd[i + 1]]) {
        secMax = secHighCards[firstHighCardArrInd[i]];
        // console.log(`first + sec highCard inner if part: ${mapped[firstHighCardArrInd[i]].name}`);
        return mapped[firstHighCardArrInd[i]].name;
      } else {
        secMax = secHighCards[firstHighCardArrInd[i + 1]];
        // console.log(`first + sec highCard inner else part: ${mapped[firstHighCardArrInd[i + 1]].name}`);
        return mapped[firstHighCardArrInd[i + 1]].name;
      }
    }
    secHighCards.map((elem, index) => {
      if (elem === secMax) {
        secHighCardArrInd.push(index);
      }
    });
    if (secHighCardArrInd.length > 1) {
      for (let i = 0; i < secHighCardArrInd.length - 1; i += 1) {
        if (thirdHighCards[secHighCardArrInd[i]] > thirdHighCards[secHighCardArrInd[i + 1]]) {
          // console.log(`first + sec + third highCard if part: ${mapped[secHighCardArrInd[i]].name}`);
          return mapped[secHighCardArrInd[i]].name;
        } else {
          secMax = secHighCards[firstHighCardArrInd[i + 1]];
          // console.log(`first + sec + third highCard else part: ${mapped[secHighCardArrInd[i + 1]].name}`);
          return mapped[secHighCardArrInd[i + 1]].name;
        }
      }
    } else {
      // console.log(`first + sec highCard outer else part: ${mapped[secHighCardArrInd].name}`);
      return mapped[secHighCardArrInd].name;
    }
  } else {
    // console.log(`highcard else most outer part: ${mapped[indFirHigCard].name}`);
    return mapped[indFirHigCard].name;
  }
}

function checkPair(players) {
  const mapped = mapping(players);
  let highPairValue = 0;
  const indPair = [];
  mapped.map((elem) => {
    if (elem.highCard === elem.secondHigh) {
      if (highPairValue < elem.highCard) {
        highPairValue = elem.highCard;
      }
    } else if (elem.secondHigh === elem.thirdHigh) {
      if (highPairValue < elem.thirdHigh) {
        highPairValue = elem.secondHigh;
      }
    }
  });
  mapped.map((elem) => {
    if (elem.highCard === highPairValue && elem.secondHigh === highPairValue) {
      indPair.push(mapped.indexOf(elem));
    } else if (elem.secondHigh === highPairValue && elem.thirdHigh === highPairValue) {
      indPair.push(mapped.indexOf(elem));
    }
  });
  if (indPair.length > 1) {
    for (let i = 0; i < indPair.length - 1; i += 1) {
      if (mapped[indPair[i]].highCard === highPairValue
        && mapped[indPair[i]].secondHigh === highPairValue) {
        if (mapped[indPair[i]].highCard === highPairValue
        && mapped[indPair[i]].secondHigh === highPairValue) {
          // console.log(`Pair : ${mapped[indPair[i]].name}`);
          return mapped[indPair[i]].name;
        } else if (mapped[indPair[i + 1]].highCard === highPairValue
          && mapped[indPair[i + 1]].secondHigh === highPairValue) {
          // console.log(`Pair : ${mapped[indPair[i + 1]].name}`);
          return mapped[indPair[i + 1]].name;
        }
        if (mapped[indPair[i + 1]].highCard === highPairValue
            && mapped[indPair[i + 1]].secondHigh === highPairValue) {
          const filteredArr = playersCards.filter((elem, index) => index === indPair[i]
            || index === indPair[i + 1]);
          return (`Pair: ${checkHighCard(filteredArr)}`);
        } else if (mapped[indPair[i + 1]].secondHigh === highPairValue
          && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
          const filteredArr = playersCards.filter((elem, index) => index === indPair[i]
          || index === indPair[i + 1]);
          return (`Pair: ${checkHighCard(filteredArr)}`);
        }
      } else if (mapped[indPair[i]].secondHigh === highPairValue
        && mapped[indPair[i]].thirdHigh === highPairValue) {
        if (mapped[indPair[i]].secondHigh === highPairValue
          && mapped[indPair[i]].thirdHigh === highPairValue) {
          // console.log(`High Pair : ${mapped[indPair[i]].name}`);
          return mapped[indPair[i]].name;
        } else if (mapped[indPair[i + 1]].secondHigh === highPairValue
          && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
          // console.log(`Pair : ${mapped[indPair[i + 1]].name}`);
          return mapped[indPair[i + 1]].name;
        }
        if (mapped[indPair[i + 1]].highCard === highPairValue
            && mapped[indPair[i + 1]].secondHigh === highPairValue) {
          const filteredArr = playersCards.filter((elem, index) => index === indPair[i]
          || index === indPair[i + 1]);
          return (`Pair: ${checkHighCard(filteredArr)}`);
        } else if (mapped[indPair[i + 1]].secondHigh === highPairValue
          && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
          const filteredArr = playersCards.filter((elem, index) => index === indPair[i]
          || index === indPair[i + 1]);
          return (`Pair: ${checkHighCard(filteredArr)}`);
        }
      } else if (mapped[indPair[i + 1]].highCard === highPairValue
        && mapped[indPair[i + 1]].secondHigh === highPairValue) {
        // console.log(`Pair : ${mapped[indPair[i + 1]].name}`);
        return mapped[indPair[i + 1]].name;
      } else if (mapped[indPair[i + 1]].secondHigh === highPairValue
        && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
        // console.log(`Pair : ${mapped[indPair[i + 1]].name}`);
        return mapped[indPair[i + 1]].name;
      }
    }
  } else if (indPair.length === 1) {
    // console.log(`Pair : ${mapped[indPair[0]].name}
    // ${mapped[indPair[0]].mappedValues}`);
    return mapped[indPair[0]].name;
  } else {
    return (`High Card: ${checkHighCard(playersCards)}`);
  }
}

function checkFlush(players) {
  const indFlushPlr = [];
  players.map((elem) => {
    if (elem.cards[0].suit === elem.cards[1].suit
      && elem.cards[1].suit === elem.cards[2].suit) {
      indFlushPlr.push(players.indexOf(elem));
    }
  });
  const tempArr = indFlushPlr.map((elem) => players[elem]);
  if (indFlushPlr.length > 1) {
    return (`Flush: ${checkHighCard(tempArr)}`);
  } else if (indFlushPlr.length === 1) {
    // console.log(`Flush : ${players[indFlushPlr[0]].name}`);
    return players[indFlushPlr[0]].name;
  } else {
    return (`Pair: ${checkPair(players)}`);
  }
}

function checkRun(players) {
  const mapped = mapping(players);
  let thirdHg = 0;
  let secHg = 0;
  let hg = 0;
  let indRunArr = [];
  mapped.map((elem, index, arr) => {
    thirdHg = elem.thirdHigh;
    secHg = thirdHg + 1;
    hg = secHg + 1;
    if (elem.thirdHigh === thirdHg
      && elem.secondHigh === secHg
      && elem.highCard === hg) {
      indRunArr.push(arr.indexOf(elem));
    }
  });
  const tempArr = indRunArr.map((elem) => players[elem]);
  const indRunFlush = [];
  tempArr.map((elem) => {
    if (elem.cards[0].suit === elem.cards[1].suit
      && elem.cards[1].suit === elem.cards[2].suit) {
      indRunFlush.push(players.indexOf(elem));
    }
  });
  if (indRunFlush.length > 1) {
    return (`Run Flush: ${checkHighCard(tempArr)}`);
  } else if (indRunFlush.length === 1) {
    // console.log(`Straight Flush : ${mapped[indRunFlush[0]].name}`);
    return mapped[indRunFlush[0]].name;
  } else {
    if (indRunArr.length > 1) {
      return (`Run: ${checkHighCard(tempArr)}`);
    } else if (indRunArr.length === 1) {
      return players[indRunArr[0]].name;
      // console.log(`Sequence : ${players[indRunArr[0]].name}`);
    } else {
      return (`Flush: ${checkFlush(players)}`);
    }
  }
}

function checkThreeOfKind(players) {
  const mapped = mapping(players);
  const indThreeOfKind = [];
  mapped.map((elem, index, arr) => {
    if (elem.highCard === elem.secondHigh && elem.secondHigh === elem.thirdHigh) {
      indThreeOfKind.push(arr.indexOf(elem));
    }
  });
  const tempArr = indThreeOfKind.map((elem) => players[elem]);
  if (indThreeOfKind.length > 1) {
    return (`Three Of Kind: ${checkHighCard(tempArr)}`);
  } else if (indThreeOfKind.length === 1) {
    return players[indThreeOfKind[0]].name;
    // console.log(`Three Of Kind : ${players[indThreeOfKind[0]].name}`);
  } else {
    return (`Run: ${checkRun(players)}`);
  }
}

function checkWin(plrCards) {
  // return checkHighCard(plrCards);
  // return checkPair(plrCards);
  // return checkFlush(plrCards);
  // return checkRun(plrCards);
  console.log(`Winner: ${checkThreeOfKind(plrCards)}`);
  // checkThreeOfKind(plrCards);
}

checkWin(playersCards);
