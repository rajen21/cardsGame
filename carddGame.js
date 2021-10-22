const suits = ['speads', 'hearts', 'diamond', 'club'];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const deckCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'qeen', 'king', 'ace'];
const cardsToEach = 3;

const createDeck = (suit, val, cards) => suit.map((suitElem) => val.map((valElem, valIndex) => ({
  suit: suitElem,
  card: cards[valIndex],
  value: valElem,
})));

// function changeAcePoint(createdDeck) {
//   createdDeck.forEach((item, index, arr) => {
//     const aceObj = item.find((elem) => elem.card === 'ace');
//     aceObj.value = 1;
//     const aceIndex = item.indexOf(aceObj);
//     arr[index].splice(aceIndex, 1);
//     arr[index].unshift(aceObj);
//   });
// }
// changeAcePoint(createDeck(suits, values, deckCards));
// console.log(createDeck(suits, values, deckCards));

// function removeCard(cards) {
//   const suit = 'club'; const card = 7;
//   cards.forEach((elem, index, arr) => {
//     elem.forEach((item) => {
//       if (item.suit === suit && item.card === card) {
//         arr[index].splice(elem.indexOf(item), 1);
//       }
//     });
//   });
//   return cards;
// }
// console.log(removeCard(createDeck(suits, values, deckCards)));

const allInOneArr = (cards) => [].concat(...cards);
// console.log(allInOneArr(createDeck(suits, values, deckCards)));

function suffulDeck(cards) {
  const oneArr = allInOneArr(cards);
  oneArr.forEach((elem, index, arr) => {
    const rand = Math.trunc(Math.random() * 52);
    const temp = arr[index];
    // eslint-disable-next-line no-param-reassign
    arr[index] = arr[rand];
    // eslint-disable-next-line no-param-reassign
    arr[rand] = temp;
  });
  return oneArr;
}
const shuffledDeck = suffulDeck(createDeck(suits, values, deckCards));
// exports.shuffledDeck = shuffledDeck;

const playersCards = (cards, players, totalCards) => {
  const plrCards = players.map((elem) => {
    const onePlayerCards = [];
    for (let cardInd = 0; cardInd < totalCards; cardInd += 1) {
      onePlayerCards.push(cards[cardInd]);
      cards.splice(cards.indexOf(cards[cardInd]), 1);
    }
    return { name: elem, cards: onePlayerCards };
  });
  return plrCards;
};
// const plrCards = playersCards(shuffledDeck, playersName, cardsToEach);
// plrCards.forEach((elem) => console.log(elem.name, elem.cards));

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

function checkHighCard(players, cardtype = 'Highcard') {
  const mapped = mapping(players);
  const [firstHighCards,
    secHighCards,
    thirdHighCards] = [mapped.map((elem) => elem.highCard), mapped.map((elem) => elem.secondHigh),
    mapped.map((elem) => elem.thirdHigh),
  ];
  const firstMax = Math.max(...firstHighCards);
  let secMax = Math.max(...secHighCards);
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
        return { winnerName: mapped[firstHighCardArrInd[i]].name, cardType: cardtype };
      }
      if (secHighCards[firstHighCardArrInd[i]] < secHighCards[firstHighCardArrInd[i + 1]]) {
        secMax = secHighCards[firstHighCardArrInd[i + 1]];
        return { winnerName: mapped[firstHighCardArrInd[i + 1]].name, cardType: cardtype };
      }
    }
    secHighCards.forEach((elem, index) => {
      if (elem === secMax) {
        secHighCardArrInd.push(index);
      }
    });
    if (secHighCardArrInd.length > 1) {
      for (let i = 0; i < secHighCardArrInd.length - 1; i += 1) {
        if (thirdHighCards[secHighCardArrInd[i]] > thirdHighCards[secHighCardArrInd[i + 1]]) {
          return { winnerName: mapped[secHighCardArrInd[i]].name, cardType: cardtype };
        }
        if (thirdHighCards[secHighCardArrInd[i]] < thirdHighCards[secHighCardArrInd[i + 1]]) {
          secMax = secHighCards[firstHighCardArrInd[i + 1]];
          return { winnerName: mapped[secHighCardArrInd[i + 1]].name, cardType: cardtype };
        }
      }
    } else {
      return { winnerName: mapped[secHighCardArrInd].name, cardType: cardtype };
    }
  } else {
    return { winnerName: mapped[indFirHigCard].name, cardType: cardtype };
  }
  return null;
}

function checkPair(players) {
  const mapped = mapping(players);
  let highPairValue = 0;
  const indPair = [];
  mapped.forEach((elem) => {
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
  mapped.forEach((elem) => {
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
        if (mapped[indPair[i + 1]].highCard === highPairValue
            && mapped[indPair[i + 1]].secondHigh === highPairValue) {
          const filteredArr = players.filter((elem, index) => index === indPair[i]
            || index === indPair[i + 1]);
          return checkHighCard(filteredArr, 'Pair');
        }
        if (mapped[indPair[i + 1]].secondHigh === highPairValue
          && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
          const filteredArr = players.filter((elem, index) => index === indPair[i]
          || index === indPair[i + 1]);
          return checkHighCard(filteredArr, 'Pair');
        }
        return { winnerName: mapped[indPair[i]].name, cardType: 'Pair' };
      }
      if (mapped[indPair[i]].secondHigh === highPairValue
        && mapped[indPair[i]].thirdHigh === highPairValue) {
        if (mapped[indPair[i + 1]].highCard === highPairValue
            && mapped[indPair[i + 1]].secondHigh === highPairValue) {
          const filteredArr = players.filter((elem, index) => index === indPair[i]
          || index === indPair[i + 1]);
          return checkHighCard(filteredArr, 'Pair');
        }
        if (mapped[indPair[i + 1]].secondHigh === highPairValue
          && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
          const filteredArr = players.filter((elem, index) => index === indPair[i]
          || index === indPair[i + 1]);
          return checkHighCard(filteredArr, 'Pair');
        }
        return { winnerName: mapped[indPair[i]].name, cardType: 'Pair' };
      }
      if (mapped[indPair[i + 1]].highCard === highPairValue
        && mapped[indPair[i + 1]].secondHigh === highPairValue) {
        return { winnerName: mapped[indPair[i + 1]].name, cardType: 'Pair' };
      }
      if (mapped[indPair[i + 1]].secondHigh === highPairValue
        && mapped[indPair[i + 1]].thirdHigh === highPairValue) {
        return { winnerName: mapped[indPair[i + 1]].name, cardType: 'Pair' };
      }
    }
  } else if (indPair.length === 1) {
    return { winnerName: mapped[indPair[0]].name, cardType: 'Pair' };
  }
  return null;
}

function checkFlush(players) {
  const indFlushPlr = [];
  players.forEach((elem) => {
    if (elem.cards[0].suit === elem.cards[1].suit
      && elem.cards[1].suit === elem.cards[2].suit) {
      indFlushPlr.push(players.indexOf(elem));
    }
  });
  const onlyFlushPlayers = indFlushPlr.map((elem) => players[elem]);
  if (indFlushPlr.length > 1) {
    return checkHighCard(onlyFlushPlayers, 'Flush');
  }
  if (indFlushPlr.length === 1) {
    return { winnerName: players[indFlushPlr[0]].name, cardType: 'Flush' };
  }
  return null;
}

function checkRun(players) {
  const mapped = mapping(players);
  mapped.map((elem) => {
    if (elem.highCard === 14 && elem.secondHigh === 3 && elem.thirdHigh === 2) {
      elem.cards.map((item) => {
        if (item.card === 'ace') {
          const tempAce = item;
          tempAce.value = 1;
          return tempAce;
        }
        return 0;
      });
      const temp = elem;
      temp.highCard = 3;
      temp.secondHigh = 2;
      temp.thirdHigh = 1;
      return temp;
    }
    return 0;
  });
  let thirdHg = 0;
  let secHg = 0;
  let hg = 0;
  const indRunArr = [];
  mapped.forEach((elem, index, arr) => {
    [thirdHg, secHg, hg] = [elem.thirdHigh, elem.thirdHigh + 1, elem.thirdHigh + 2];
    if (elem.thirdHigh === thirdHg
      && elem.secondHigh === secHg
      && elem.highCard === hg) {
      indRunArr.push(arr.indexOf(elem));
    }
  });
  const onlyRunPlayers = indRunArr.map((elem) => players[elem]);
  const indRunFlush = [];
  onlyRunPlayers.forEach((elem) => {
    if (elem.cards[0].suit === elem.cards[1].suit
      && elem.cards[1].suit === elem.cards[2].suit) {
      indRunFlush.push(players.indexOf(elem));
    }
  });
  if (indRunArr.length > 1) {
    if (indRunFlush.length > 1) {
      return checkHighCard(onlyRunPlayers, 'Run Flush');
    }
    if (indRunFlush.length === 1) {
      return { winnerName: mapped[indRunFlush[0]].name, cardType: 'Run Flush' };
    }
    return checkHighCard(onlyRunPlayers, 'Run');
  }
  if (indRunArr.length === 1) {
    return { winnerName: players[indRunArr[0]].name, cardType: 'Run' };
  }
  return null;
}

function checkThreeOfKind(players) {
  const mapped = mapping(players);
  const indThreeOfKind = [];
  mapped.forEach((elem, index, arr) => {
    if (elem.highCard === elem.secondHigh && elem.secondHigh === elem.thirdHigh) {
      indThreeOfKind.push(arr.indexOf(elem));
    }
  });
  const onlyThreeOfKindPlayers = indThreeOfKind.map((elem) => players[elem]);
  if (indThreeOfKind.length > 1) {
    return checkHighCard(onlyThreeOfKindPlayers, 'Three of Kind');
  }
  if (indThreeOfKind.length === 1) {
    return { winnerName: players[indThreeOfKind[0]].name, cardType: 'Three of Kind' };
  }
  return null;
}

const checkWin = (players) => {
  let plrCards;
  if (players.name) {
    plrCards = playersCards(shuffledDeck, players.name, cardsToEach);
  } else {
    plrCards = players;
  }
  plrCards.forEach((elem) => console.log(elem));
  let winner;
  const rulesCheckers = [checkThreeOfKind, checkRun, checkFlush, checkPair, checkHighCard];
  rulesCheckers.forEach((ruleChecker) => {
    if (!winner) {
      winner = ruleChecker(plrCards);
    }
  });
  console.log('winner', winner);
  return { plrCards, winner };
  //
};
exports.checkWin = checkWin;
