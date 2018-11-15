/*
* name;
*/
class Bird extends Laya.Sprite {
    // Animation 动画类
    public bird: Laya.Animation;
    constructor(type: string) {
        super();
        // 创建3个动画，这不用解释吧。。
        // 创建动画模板
        Laya.Animation.createFrames(["bird/bird0_0.png", "bird/bird0_1.png", "bird/bird0_2.png"], "bird0");
        Laya.Animation.createFrames(["bird/bird1_0.png", "bird/bird1_1.png", "bird/bird1_2.png"], "bird1");
        Laya.Animation.createFrames(["bird/bird2_0.png", "bird/bird2_1.png", "bird/bird2_2.png"], "bird2");

        this.bird = new Laya.Animation();

        this.addChild(this.bird);

        this.playAction(type);
    }

    playAction(type: string): void {
        // Animation 对象的play 方法
        // loop 是环，ture 是否循环播放动画
        this.bird.play(0, true, "bird" + type);
    }
}