var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Land = /** @class */ (function (_super) {
    __extends(Land, _super);
    // 传入地面的高度，
    function Land(landHeight) {
        var _this = _super.call(this) || this;
        // 2个地板 接起来，向左移动    
        _this.land_1 = new Laya.Sprite();
        _this.land_2 = new Laya.Sprite();
        _this.isMove = true; // 陆地是否滚动， 如果主角死了，就不滚动了
        _this.te = Laya.loader.getRes("bird/land.png");
        // 绘制2个地板图片   
        // sprite对象调用 graphics 画纹理，添加 纹理对象
        _this.land_1.graphics.drawTexture(_this.te);
        _this.land_2.graphics.drawTexture(_this.te);
        // 初始坐标， 把第2个地板 放到第一个地板左边， 而不是 舞台的宽度， 因为 地板宽度大于舞台宽度
        console.log('Laya.stage.height: ' + Laya.stage.height);
        console.log('this.te.width: ' + _this.te.width);
        _this.land_1.pos(0, Laya.stage.height - landHeight);
        _this.land_2.pos(_this.te.width, Laya.stage.height - landHeight);
        // sprite 对象可以添加 sprite 对象
        _this.addChild(_this.land_1);
        _this.addChild(_this.land_2);
        //
        Laya.stage.frameLoop(1, _this, _this.MoveLand);
        return _this;
    }
    Land.prototype.MoveLand = function () {
        //这里就是 轮流向左移动， 消失就放右边了        
        if (!this.isMove)
            return;
        // console.log('this.land_1.x:'+this.land_1.x)
        // console.log('this.land_2.x:'+this.land_2.x)  
        this.land_1.x -= 2;
        this.land_2.x -= 2;
        //这个逻辑写得是 一塌糊涂，不正确
        // 记住 舞台width = 512
        // land width = 336, 两个land 合在一起其实width 超过512
        if (this.land_1.x <= -this.te.width) {
            this.land_1.x = this.te.width + this.land_2.x;
        }
        else if (this.land_2.x <= -this.te.width) {
            this.land_2.x = this.te.width + this.land_1.x;
        }
    };
    return Land;
}(Laya.Sprite));
//# sourceMappingURL=Land.js.map