class ThisApply{
    constructor(){
        this.test4()
    }

    // this 的应用，在函数式编程里面变得复杂起来了，返回一个函数或者将函数当做参数传递时。
    test4(): void{
        //this 的情况
        // let deck = {
        //     suits: ["hearts", "spades", "clubs", "diamonds"],
        //     cards: Array(52),
        //     createCardPicker: function() {
        //         return function() {
        //             let pickedCard = Math.floor(Math.random() * 52);
        //             let pickedSuit = Math.floor(pickedCard / 13);

        //             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        //         }
        //     }
        // }

        // let cardPicker = deck.createCardPicker();
        // let pickedCard = cardPicker();

        // alert("card: " + pickedCard.card + " of " + pickedCard.suit);

        // 可以看到createCardPicker是个函数，并且它又返回了一个函数。 如果我们尝试运行这个程序，
        // 会发现它并没有弹出对话框而是报错了。 因为createCardPicker返回的函数里的this被设置成了window而不是deck对象。
        // 因为我们只是独立的调用了cardPicker()。 顶级的非方法式调用会将this视为window。 
        // (注意：在严格模式下，this为undefined而不是window）。

        //利用 es6的箭头 语法，
        let deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker: function() {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return {suit: this.suits[pickedSuit], card: pickedCard % 13};
                }
            }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        alert("card: " + pickedCard.card + " of " + pickedCard.suit);
    
    }
}
new ThisApply()