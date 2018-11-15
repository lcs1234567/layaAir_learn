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
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird(type) {
        var _this = _super.call(this) || this;
        // 创建3个动画，这不用解释吧。。
        // 创建动画模板
        Laya.Animation.createFrames(["bird/bird0_0.png", "bird/bird0_1.png", "bird/bird0_2.png"], "bird0");
        Laya.Animation.createFrames(["bird/bird1_0.png", "bird/bird1_1.png", "bird/bird1_2.png"], "bird1");
        Laya.Animation.createFrames(["bird/bird2_0.png", "bird/bird2_1.png", "bird/bird2_2.png"], "bird2");
        _this.bird = new Laya.Animation();
        _this.addChild(_this.bird);
        _this.playAction(type);
        return _this;
    }
    Bird.prototype.playAction = function (type) {
        // Animation 对象的play 方法
        // loop 是环，ture 是否循环播放动画
        this.bird.play(0, true, "bird" + type);
    };
    return Bird;
}(Laya.Sprite));
//# sourceMappingURL=Bird.js.map