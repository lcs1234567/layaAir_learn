class Interface{
    constructor(){
        this.test3();
    }

    //js 匹配接口，只会注意它的外形， 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
    //类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
    test3(): void{
        interface LabelledValue {
            label: string;
        }

        function printLabel(labelledObj: LabelledValue) {
            console.log(labelledObj.label);
        }

        let myObj = {size: 10, label: "Size 10 Object"};
        printLabel(myObj);
    }
}
new Interface();