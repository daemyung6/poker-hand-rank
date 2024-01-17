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


const Room = require('./Room.js')

const room = new Room()
room.newCardDeck()
console.log('newCardDeck', room.cardDeck)


let playerCards1 = room.cardDeck.splice(0, 5)
console.log('result2', handRank(playerCards1))


let playerCards2 = room.cardDeck.splice(0, 4)
try {
    console.log('result4', handRank(playerCards2))
} catch (error) {
    console.log(error)
}