import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(600,400, WebGL);
        this.test1()
    }

    //ts 语法
    //基础类型
    test1(): void{
       // let 块变量
       let isDo: boolean = false;

       // ts/js 所有数字都是浮点数
       let a: number = 23
       let b: number = 23.90
       let name: string = 'xx'
       
       //使用模板字符串, 使用反引号
       let sents: string = `I'm a student, my name is ${name}, ${a} years old!`
       
       console.log(sents)

       //数组
       let list: number[] = [1, 2, 3]
       let list2: Array<number> = [1, 2, 3]

       //tuple
       let x: [string, number]
       x = ['xx', 12]
       
       // enum, 枚举类型是对js 的补充 
       // 默认给week 元素赋值 0, 1, 2, 3, 4....  
       // 也可以手动赋值
       enum week{mon=0, tues=1, wen=2, thu=3, fri, the, sun}
       let c : week = week.thu;
       console.log(c)

       //任意值
       let notSure: any = 4;
       notSure = 'xxxxxxxxx';
       notSure = false;
       console.log(notSure)

       //any 和 object 还是有区别的

       // 空值 void
       function xx(): void{

       }

       //Null/Undefined
       
       //Object 非原始类型，指number/string/boolean/symbol/null/undefined 之外的类型
       function create(o: Object | null): void{
           
       }
       create({xx: 0}); //ok
       create(null) //ok
       
       create(1) //error
       create('xxx') //error

      // 类型断言，类似java 类型强制转换
      // 知道 someValue 是 string 类型
      let someValue: any = "this is a string";
      let strLength: number = (<string>someValue).length;

    }
}
new GameMain();

