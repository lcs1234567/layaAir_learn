/*
* name;
*/
class Land extends Laya.Sprite {

    // 2个地板 接起来，向左移动    
    public land_1: Laya.Sprite = new Laya.Sprite();
    public land_2: Laya.Sprite = new Laya.Sprite();

    public isMove: boolean = true;  // 陆地是否滚动， 如果主角死了，就不滚动了
    // texture 是
    private te: Laya.Texture;       // 这里主要为了获取 一张陆地图片的宽度， 后来发现根本没必要， 不如写死算了，因为 代码量要多些 - -。。
    // 传入地面的高度，
    constructor(landHeight: number) {
        super();

        this.te = Laya.loader.getRes("bird/land.png");

        // 绘制2个地板图片   
        // sprite对象调用 graphics 画纹理，添加 纹理对象
        this.land_1.graphics.drawTexture(this.te);
        this.land_2.graphics.drawTexture(this.te);

        // 初始坐标， 把第2个地板 放到第一个地板左边， 而不是 舞台的宽度， 因为 地板宽度大于舞台宽度
        console.log('Laya.stage.height: '+ Laya.stage.height)
        console.log('this.te.width: '+ this.te.width)

        this.land_1.pos(0, Laya.stage.height - landHeight);
        this.land_2.pos(this.te.width, Laya.stage.height - landHeight);

        // sprite 对象可以添加 sprite 对象
        this.addChild(this.land_1);
        this.addChild(this.land_2);
        //
        Laya.stage.frameLoop(1, this, this.MoveLand);
   
    }

    MoveLand(): void {
        //这里就是 轮流向左移动， 消失就放右边了        
        if (!this.isMove) return;
                
        // console.log('this.land_1.x:'+this.land_1.x)
        // console.log('this.land_2.x:'+this.land_2.x)  
        
        this.land_1.x -= 2;
        this.land_2.x -= 2;

        //这个逻辑写得是 一塌糊涂，不正确
        // 记住 舞台width = 512
        // land width = 336, 两个land 合在一起其实width 超过512
        if (this.land_1.x <= -this.te.width) {
            this.land_1.x = this.te.width + this.land_2.x;
        } else if (this.land_2.x <= -this.te.width) {
            this.land_2.x = this.te.width + this.land_1.x;
        }
    }

}