class VariableDef{
    constructor(){
        this.test2();
    }

    //
    test2(): void{
       //let const 是js相对较新的变量声明方式，
       // const 能阻值变量再次赋值
       // ts 是 js的超集， 
       
       //var 声明变量详解
       function f(x: boolean){
           if(x) var y = 10;
           
           return y;
       }

       //var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
       //
       f(true) //ok
       f(false) //undefined
      
      //块级作用域
      //函数作用域
      //全局作用域
      //模块
      //命名空间
     
      //仔细体会 var let const 声明变量之间的区别
     
      // 解构，
      //数组的结构赋值
      let input = [1, 2];
      let [first, second] = input;
      console.log(first)

      // 对象解构
      let o = {
          a: 'foo',
          b: 12,
          c: 'bar'
      }
      let {a, b} = o;
      console.log(a+b)

      //解构在函数声明的利用
      
    }
}
new VariableDef();