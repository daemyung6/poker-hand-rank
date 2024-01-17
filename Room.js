module.exports = class Room {
    constructor() {
        this.cardDeck = []
    }

    newCardDeck() {
        let cardPatterns = [
            'h', 'd', 's', 'c'
        ]
        
        //덱 초기화
        this.cardDeck.splice(0, this.cardDeck.length);
    
        let idx = 0
        for (let Pat = 0; Pat < cardPatterns.length; Pat++) {
            // 2 ~ 14
            for (let num = 2; num < 14 + 1; num++) {
                this.cardDeck[idx++] = [
                    cardPatterns[Pat],
                    num
                ]
            }
        }
        for (let i = 0; i < 7; i++) {
            this.cardDeck.sort(function (a, b) {
                return Math.random() - 0.5
            });
        }
    
    }
}
