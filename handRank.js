const handRankData = [
    {
        name : {
            ko : '로열 스트레이트 플러쉬',
            en : 'Royal Straight flush'
        },
    },
    {
        name : {
            ko : '스트레이트 플러시',
            en : 'Straight flush'
        },
    },
    {
        name : {
            ko : '포카드',
            en : 'Four of a kind'
        },
    },
    {
        name : {
            ko : '풀 하우스',
            en : 'Full house'
        },
    },
    {
        name : {
            ko : '플러시',
            en : 'Flush'
        },
    },
    {
        name : {
            ko : '스트레이트',
            en : 'Straight'
        },
    },
    {
        name : {
            ko : '트리플',
            en : 'Triple'
        },
    },
    {
        name : {
            ko : '투 페어',
            en : 'Two pair'
        },
    },
    {
        name : {
            ko : '원 페어',
            en : 'One pair'
        },
    },
    {
        name : {
            ko : '하이 카드',
            en : 'High card'
        },
    },
]
function _cardsSort(a, b) {
    if (a[0] > b[0]) { return -1 }
    if (a[0] < b[0]) { return 1 }

    if (a[1] > b[1]) { return -1 }
    return 1
}
function _printResult(rank, cards, compareData) {
    return {
        rank: Number(rank),
        name: handRankData[rank - 1].name,
        cards: cards,
        compareArray: compareData
    }
}
/**
 * @typedef { Array<[string, Number]> } Cards
 */
/**
 * ## 카드 그림
 * - ♠ : s  
 * - ♥ : h  
 * - ♣ : c  
 * - ♦ : d  
 * ## 카드 숫자
 * - 일반 숫자 : 2 ~ 10
 * - J : 11
 * - Q : 12
 * - K : 13
 * - A : 14
 * @param { Cards } cards
 * @param { undefined | boolean } type 재귀함수 채크
 * @returns {{
 *     rank: Number,
 *     name: Object.<string, String>,
 *     cards: Cards,
 *     compareArray: Array<>
 * }}
 */
function handRank(cards, type) {
    if(cards.length < 5) {
        throw Error('최소 5장의 카드가 필요 합니다.');
    }

    if(typeof type === 'undefined') {
        let Acards = [];
        let isInclueA = false;
        for (let i = 0; i < cards.length; i++) {
            if(cards[i][1] === 14) {
                Acards.push([cards[i][0], 1]);
                isInclueA = true;
                continue;
            } 
            Acards.push(cards[i])
        }
    
        if(isInclueA) {
            function compare() {
                let A_14_cardsResult = handRank(cards, true);
                let A_1_cardsResult = handRank(Acards, true);
    
                if(A_14_cardsResult.rank < A_1_cardsResult.rank) {
                    return A_14_cardsResult;
                }
                else if( A_1_cardsResult.rank < A_14_cardsResult.rank) {
                    return A_1_cardsResult;
                }
    
                for (let i = 0; i < A_14_cardsResult.compareArray.length; i++) {
                    if(A_14_cardsResult.compareArray[i] > A_1_cardsResult.compareArray[i]) {
                        return A_14_cardsResult;
                    }
                    if(A_1_cardsResult.compareArray[i] > A_14_cardsResult.compareArray[i]) {
                        return A_1_cardsResult;
                    }
                }
                return A_14_cardsResult;
            }
            let result = compare();
            for (let i = 0; i < result.cards.length; i++) {
                if(result.cards[i][1] === 1) {
                    result.cards[i][1] = 14;
                }
            }
            return result;
        }
    }
    
    //카드 정렬
    cards.sort(_cardsSort);

    //패턴끼리 구별
    let cardsPat = {
        s : [],
        h : [],
        d : [],
        c : [],
    };

    for (let i = 0; i < cards.length; i++) {
        cardsPat[ cards[i][0] ].push(cards[i][1]);
    }

    //5장의 같은 무늬가 있는가
    let isFlushCards = null;
    var keys = Object.keys(cardsPat);
    for (let i = 0; i < keys.length; i++) {
        if(cardsPat[keys[i]].length >= 5) {
            if(
                (cardsPat[keys[i]].indexOf(14) !== -1) &&
                (cardsPat[keys[i]].indecxOf(13) !== -1) &&
                (cardsPat[keys[i]].indexOf(12) !== -1) &&
                (cardsPat[keys[i]].indexOf(11) !== -1) &&
                (cardsPat[keys[i]].indexOf(10) !== -1)
            ) {
            /* 
            1. 로열 스트레이트 플러쉬
            5장 같은 무늬
            10, 11, 12, 13, 14

            동점시 동점 처리
            */
                return _printResult(1, 
                    [
                        [keys[i], 10],
                        [keys[i], 11],
                        [keys[i], 12],
                        [keys[i], 13],
                        [keys[i], 14],
                    ],
                    [ 14 ]
                );
            }

            if(
                (cardsPat[keys[i]][0] === cardsPat[keys[i]][1] + 1) &&
                (cardsPat[keys[i]][0] === cardsPat[keys[i]][2] + 2) &&
                (cardsPat[keys[i]][0] === cardsPat[keys[i]][3] + 3) &&
                (cardsPat[keys[i]][0] === cardsPat[keys[i]][4] + 4)
            ) {
                /* 
                2. 스트레이트 플러시
                5장 같은 무늬
                연속된 숫자

                동점시 가장 높은 숫자로 비교
                같으면 동점 처리*/

                cards.sort(function(a, b) {return b[1] - a[1]});

                return _printResult(2, 
                    [
                        [keys[i], cardsPat[keys[i]][0]],
                        [keys[i], cardsPat[keys[i]][1]],
                        [keys[i], cardsPat[keys[i]][2]],
                        [keys[i], cardsPat[keys[i]][3]],
                        [keys[i], cardsPat[keys[i]][4]],
                    ],
                    [ cardsPat[keys[i]][0] ]
                );
            }

            isFlushCards = [
                [keys[i], cardsPat[keys[i]][0]],
                [keys[i], cardsPat[keys[i]][1]],
                [keys[i], cardsPat[keys[i]][2]],
                [keys[i], cardsPat[keys[i]][3]],
                [keys[i], cardsPat[keys[i]][4]],
            ]
        }
    }

    //숫자별 구별
    let cardNumbers = {};
    for (let i = 0; i < cards.length; i++) {
        if(typeof cardNumbers[ cards[i][1] ] === 'undefined') {
            cardNumbers[ cards[i][1] ] = [];
        }
        cardNumbers[ cards[i][1] ].push(cards[i]);
    }

    let cardNumbersKeys = Object.keys(cardNumbers);
    var sameNumberCard = {};

    for (let i = 0; i < cardNumbersKeys.length; i++) {
        //숫자가 같은 4장
        /* 
            3. 포카드
            숫자가 같은 카드 4장

            동점시 4장 세트 숫자 비교
            나머지 가장 높은 카드와 비교
            같으면 동점
        */
        if(cardNumbers[cardNumbersKeys[i]].length >= 4) {
            //전달 할 카드 패
            let arr = [];

            //4장 세트 숫자 추출
            let maxLen4 = 0;
            let maxLen1 = 0;
            for (let j = 0; j < cardNumbers[cardNumbersKeys[i]].length; j++) {
                arr.push(cardNumbers[cardNumbersKeys[i]][j]);
            }
            //4장 세트 숫자
            maxLen4 = arr[0][1];

            //4장 세트 이외 가장 큰 숫자 추출
            cardNumbersKeys.sort(function(a, b) { return b - a });

            for (let j = 0; j < cardNumbersKeys.length; j++) {
                if(cardNumbersKeys[j] === maxLen4) { continue }
                cardNumbers[cardNumbersKeys[j]].sort(function(a, b) { return b[1] - a[1] })

                maxLen1 = cardNumbers[cardNumbersKeys[j]][0][1];
                arr.push(cardNumbers[cardNumbersKeys[j]][0]);
                break;
            }

            return _printResult(3, arr, [maxLen4, maxLen1]);
        }

        //숫자가 같은 2장 이상 세트 모으기
        if(cardNumbers[cardNumbersKeys[i]].length >= 2) {
            if(typeof sameNumberCard[ cardNumbers[cardNumbersKeys[i]][0][1] ] === 'undefined') {
                sameNumberCard[ cardNumbers[cardNumbersKeys[i]][0][1] ] = [];
            }
            for (let j = 0; j < cardNumbers[cardNumbersKeys[i]].length; j++) {
                sameNumberCard[ cardNumbers[cardNumbersKeys[i]][0][1] ].push(
                    cardNumbers[cardNumbersKeys[i]][j]
                )
            }
        }
    }

    
    let sameNumberCardKeys = Object.keys(sameNumberCard);

    //키 길이기 긴순으로 정렬
    //길이 같을 시 숫자가 큰 순
    sameNumberCardKeys.sort(function(a, b) {
        if(sameNumberCard[b].length == sameNumberCard[a].length) {
            return Number(b) - Number(a);
        }
        return sameNumberCard[b].length - sameNumberCard[a].length
    })


    /* 
        4. 풀 하루스
        숫자가 같은 카드 2 + 3장

        동점시 3장 세트의 숫자 비교
        같으면 2장 세트 숫자 비교
        같으면 동점 처리
    */
    //숫자 같은 세트 3 + 3일때 
    if(
        (sameNumberCardKeys.length >= 2) &&
        (sameNumberCard[sameNumberCardKeys[0]].length >= 3) &&
        (sameNumberCard[sameNumberCardKeys[1]].length >= 3)
    ) {
        //전달할 카드페
        let arr = [];

        //숫자가 큰쪽이 3장 으로
        let flag = Number(sameNumberCardKeys[0]) > Number(sameNumberCardKeys[1])

        arr[0] = sameNumberCard[sameNumberCardKeys[ flag ? 0 : 1 ]][0];
        arr[1] = sameNumberCard[sameNumberCardKeys[ flag ? 0 : 1 ]][1];
        arr[2] = sameNumberCard[sameNumberCardKeys[ flag ? 0 : 1 ]][2];
        arr[3] = sameNumberCard[sameNumberCardKeys[ flag ? 1 : 0 ]][0];
        arr[4] = sameNumberCard[sameNumberCardKeys[ flag ? 1 : 0 ]][1];
    

        return _printResult(4, arr, [
            flag ? Number(sameNumberCardKeys[0]) : Number(sameNumberCardKeys[1]),
            flag ? Number(sameNumberCardKeys[1]) : Number(sameNumberCardKeys[0])
        ]);
    }
    //숫자 같은 세트 3 + 2일때 
    if(
        (sameNumberCardKeys.length >= 2) &&
        (sameNumberCard[sameNumberCardKeys[0]].length >= 3) &&
        (sameNumberCard[sameNumberCardKeys[1]].length >= 2)
    ) {
        //전달할 카드페
        let arr = [];

        arr[0] = sameNumberCard[sameNumberCardKeys[0]][0];
        arr[1] = sameNumberCard[sameNumberCardKeys[0]][1];
        arr[2] = sameNumberCard[sameNumberCardKeys[0]][2];
        arr[3] = sameNumberCard[sameNumberCardKeys[1]][0];
        arr[4] = sameNumberCard[sameNumberCardKeys[1]][1];
    

        return _printResult(4, arr, [
            Number(sameNumberCardKeys[0]),
            Number(sameNumberCardKeys[1])
        ]);
    }

    /* 
        5. 플러시
        단순 무늬가 같은 5장

        동점시 가장 높은 숫자로 비교
        같으면 동점 처리
    */
    if(isFlushCards !== null) {
        //숫자 크기로 정렬
        isFlushCards.sort(function(a, b) {
            return b[1] - b[1];
        })

        return _printResult(5, isFlushCards, [ isFlushCards[0][1]] );
    }

    //숫자별 모음중 포함된 숫자 배열 정렬
    let cardNumbersKeysTemp = [];
    for (let i = 0; i < cardNumbersKeys.length; i++) {
        cardNumbersKeysTemp.push(Number(cardNumbersKeys[i]));
    }
    cardNumbersKeysTemp.sort(function(a, b) { return a - b  });
    
    let sameCount = 0;
    let sameCountIdx = 0;
    let maxSameCount = 0;
    for (let i = 0; i < cardNumbersKeysTemp.length; i++) {
        if(cardNumbersKeysTemp[i] + 1 === cardNumbersKeysTemp[i + 1] ) {
            if(sameCount === 0) { sameCountIdx = i }
            sameCount++;
        }
        else {
            if(maxSameCount < sameCount) { maxSameCount = sameCount }
            sameCount = 0;
        }
    }

    let gradationNumberscards = []; 
    let gCards = [];
    for (let i = 0; i < cards.length; i++) {
        gCards.push(cards[i]);
    }

    gCards.sort(function(a, b) {
        return b[1] - a[1];
    })


    let gCardsTemp = [gCards[0]];
    for (let i = 1; i < gCards.length; i++) {
        if(gCardsTemp[gCardsTemp.length - 1][1] === gCards[i][1]) {
            continue;
        }
        if(gCardsTemp[gCardsTemp.length - 1][1] === gCards[i][1] + 1) {
            gCardsTemp.push(gCards[i]);
            continue;
        }

        gradationNumberscards.push(gCardsTemp);
        gCardsTemp = [gCards[i]];
    }
    gradationNumberscards.push(gCardsTemp);
    
    /* 
        6. 스트레이트
        숫자가 이어지는 카드 5장

        동점시 가장 높은 숫자로 비교
        같으면 동점 처리
    */
    for (let i = 0; i < gradationNumberscards.length; i++) {
        if(gradationNumberscards[i].length >= 5) {
            let arr = [];
            for (let j = 0; j < 5; j++) {
                arr.push(gradationNumberscards[i][j])
            }
    
            return _printResult(6, arr, [ arr[0][1] ]);
        }
    }

    /* 
        7. 트리플
        숫자가 같은 카드 3장

        동점시 3장 세트 비교 
        그다음 큰 숫자
        그다음 큰 숫자
        동점 처리
    */
    if(
        (sameNumberCardKeys.length === 1) &&
        (sameNumberCard[sameNumberCardKeys[0]].length >= 3)
    ) {
        //전달할 카드페
        let arr = [];

        //카드 숫자 크기로 정렬
        cards.sort(function(a, b) {
            return b[1] - a[1]
        })

        arr[0] = sameNumberCard[sameNumberCardKeys[0]][0];
        arr[1] = sameNumberCard[sameNumberCardKeys[0]][1];
        arr[2] = sameNumberCard[sameNumberCardKeys[0]][2];

        for (let i = 0; i < cards.length; i++) {
            if(cards[i][1] === arr[0][1]) { continue }
            arr.push(cards[i]);
            if(arr.length >= 5) { break }
        }

        return _printResult(7, arr, [
            arr[0][1],
            arr[3][1],
            arr[4][1],
        ]);
    }

    /* 
        8. 투 페어
        숫자가 같은 카드 2장이 2세트

        동점시 2장 세트중 큰 숫자 비교
        같으면 2장 세트 두번째 숫자 비교
        같으면 나머지 하나 비교
        동일하면 동점 처리
    */
    if(
        (sameNumberCardKeys.length >= 2) &&
        (sameNumberCard[sameNumberCardKeys[0]].length === 2) &&
        (sameNumberCard[sameNumberCardKeys[1]].length === 2)
    ) {
        //전달할 카드페
        let arr = [];

        //카드 숫자 크기로 정렬
        cards.sort(function(a, b) {
            return b[1] - a[1]
        })

        arr[0] = sameNumberCard[sameNumberCardKeys[0]][0];
        arr[1] = sameNumberCard[sameNumberCardKeys[0]][1];
        arr[2] = sameNumberCard[sameNumberCardKeys[1]][0];
        arr[3] = sameNumberCard[sameNumberCardKeys[1]][1];

        

        for (let i = 0; i < cards.length; i++) {
            if(
                arr.indexOf(cards[i]) !== -1
            ) { continue }

            arr.push(cards[i]);
            if(arr.length >= 5) { break }
        }

        return _printResult(8, arr, [
            arr[0][1],
            arr[2][1],
            arr[4][1],
        ]);
    }

    /* 
        9. 원 페어
        숫자가 같은 카드 2장이 1세트

        동점시 같은 카드 2장 숫자 비교
        그다음 큰 숫자 비교  
        그다음 큰 숫자 비교  
        그다음 큰 숫자 비교  
        같으면 동점 처리
    */
    if(
        (sameNumberCardKeys.length === 1) &&
        (sameNumberCard[sameNumberCardKeys[0]].length === 2)
    ) {
        //전달할 카드페
        let arr = [];

        //카드 숫자 크기로 정렬
        cards.sort(function(a, b) {
            return b[1] - a[1]
        })

        arr[0] = sameNumberCard[sameNumberCardKeys[0]][0];
        arr[1] = sameNumberCard[sameNumberCardKeys[0]][1];

        for (let i = 0; i < cards.length; i++) {
            if(
                (arr.indexOf(cards[i]) !== -1)
            ) { continue }

            arr.push(cards[i]);
            if(arr.length >= 5) { break }
        }

        return _printResult(9, arr, [
            arr[0][1],
            arr[2][1],
            arr[3][1],
            arr[4][1],
        ]);
    }

    /* 
        10. 하이 카드
        숫자가 높은 카드 1장

        동점시 가장 높은 숫자로 비교
        같으면 동점 처리
    */

    //카드 숫자 크기로 정렬
    cards.sort(function(a, b) {
        return b[1] - a[1]
    })

    let arr = [];
    let compareArr = [];
    for (let i = 0; i < 5; i++) {
        arr.push( cards[i] )
        compareArr.push( cards[i][1] )
    }

    return _printResult(10, arr, compareArr);
}
module.exports = handRank