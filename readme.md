# poker-hand-rank

옛날에 텍사스 홀덤 게임 만들다가 만든 핸드카드 순위 계산 함수 임당.  
5장 이상의 카드를 입력하면 핸드 카드 순위를 계산하며 같은 순위시 비교를 위한 비교 배열을 리턴합니다.  

## 예시
```js
const handRank = require('./handRank.js')

console.log('result1', 
    handRank([
        [ "s", 3 ],
        [ "d", 4 ],
        [ "s", 8 ],
        [ "d", 13],
        [ "h", 5 ],
        [ "c", 2 ],
        [ "h", 14]
    ]
))
/*
result1 {
  rank: 6,
  name: { ko: '스트레이트', en: 'Straight' },
  cards: [ [ 'h', 5 ], [ 'd', 4 ], [ 's', 3 ], [ 'c', 2 ], [ 'h', 14 ] ],
  compareArray: [ 5 ]
}
*/


const Room = require('./Room.js')

const room = new Room()
room.newCardDeck()
console.log('newCardDeck', room.cardDeck)
/*
newCardDeck [
  [ 'd', 8 ],  [ 'h', 5 ],  [ 'd', 6 ],  [ 's', 12 ],
  [ 'c', 10 ], [ 'h', 3 ],  [ 'h', 14 ], [ 'h', 2 ],
  [ 'c', 14 ], [ 's', 10 ], [ 's', 11 ], [ 'd', 12 ],

  ...
]
*/


let playerCards1 = room.cardDeck.splice(0, 5)
console.log('result2', handRank(playerCards1))
/*
result2 {
  rank: 10,
  name: { ko: '하이 카드', en: 'High card' },
  cards: [ [ 's', 12 ], [ 'c', 10 ], [ 'd', 8 ], [ 'd', 6 ], [ 'h', 5 ] ],
  compareArray: [ 12, 10, 8, 6, 5 ]
}
*/

let playerCards2 = room.cardDeck.splice(0, 4)
try {
    console.log('result4', handRank(playerCards2))
} catch (error) {
    console.log(error)
}
// Error: 최소 5장의 카드가 필요 합니다.
```

## 카드 네이밍

  일반숫자 : 2 ~ 10  
  J : 11  
  Q : 12  
  K : 13  
  A : 14  

  ♠ : s  
  ♥ : h  
  ♣ : c  
  ♦ : d  


## 참고
>[https://mackenziechoi.tistory.com/entry/9-텍사스-홀덤-All-in-계산](https://mackenziechoi.tistory.com/entry/9-텍사스-홀덤-All-in-계산) 