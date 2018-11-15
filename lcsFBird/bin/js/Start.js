//程序入口
var GameMain = /** @class */ (function () {
    //pipe_distance: number = 450;
    function GameMain() {
        this.landHeight = 50;
        this.pipeups = [];
        this.pipedowns = [];
        this.isLive = false;
        this.yspeed = 0;
        this.score = 0;
        this.g = 0.98;
        // 设置该变量是为了，新增的管道和 前两个未被画面淹没的管道 距离保持均匀 160
        // 只要记录了最后一个管道在Array 的下标i， 就可以通过array[i].x+160 计算新增管道的x
        this.lastPipeIndex = 0;
        Laya.MiniAdpter.init();
        // webGL 3D绘图协议
        Laya.init(288, 512, Laya.WebGL);
        // 调用DebugPanel调试面板
        //Laya.DebugPanel.init();  
        // 屏幕自适应
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        // 自动 
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        // 每秒30帧
        Laya.stage.frameRate = 'slow';
        Laya.loader.load("res/atlas/bird.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    GameMain.prototype.onLoaded = function () {
        //加载背景图
        var bg = new Laya.Sprite();
        bg.graphics.drawTexture(Laya.loader.getRes('bird/bg_day.png'));
        Laya.stage.addChild(bg);
        //加载陆地
        this.land = new Land(this.landHeight);
        this.land.zOrder = 10; //把陆地设置为最前， 不然会被管道覆盖，但是必须在主角之下
        Laya.stage.addChild(this.land);
        //加载主角 '2' 是代表 第3种类型的小鸟 动画
        this.bird = new Bird("2");
        this.bird.pos(50, 200);
        // pivot 怎么知道是24? 因为bird 像素是 48*48
        this.bird.pivot(24, 24);
        this.bird.zOrder = 20;
        Laya.stage.addChild(this.bird);
        //添加管道
        this.addPipe();
        //显示分数"
        this.uiscore = new Laya.Sprite();
        var score1 = new Laya.Sprite();
        var score2 = new Laya.Sprite();
        score1.loadImage('bird/number_score_00.png', 120, 0);
        score2.loadImage('bird/number_score_00.png', 140, 0);
        this.uiscore.addChild(score1);
        this.uiscore.addChild(score2);
        Laya.stage.addChild(this.uiscore);
        //处理点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
        // 每帧事件，基于帧率 30次/每秒
        Laya.stage.frameLoop(1, this, this.onLoop);
    };
    // 定义管道
    GameMain.prototype.addPipe = function () {
        for (var i = 0; i < 3; i++) {
            var y = -(Math.random() * 250);
            var x = 160 * (i + 1);
            // 添加上面管道
            var p = new Laya.Sprite();
            //这个和 Sprite.graphics.drawTexture() 有区别？
            p.loadImage("bird/pipe_down.png");
            console.log('x,y' + x + ',' + y);
            p.pos(x, y);
            // pipeups 是一个list 
            this.pipeups.push(p);
            Laya.stage.addChild(p);
            // 添加下面管道                                                                
            p = new Laya.Sprite();
            p.loadImage("bird/pipe_up.png");
            p.pos(x, y + Math.floor(Math.random() * 40 + 400));
            this.pipedowns.push(p);
            Laya.stage.addChild(p);
            // 最后是哪根管道，这里用来记录一下，最左边管道消失后，可以作为参考
            this.lastPipeIndex = i;
        }
    };
    GameMain.prototype.onClick = function () {
        if (!this.isLive) {
            console.log('islive' + this.isLive);
            this.isLive = true;
            return;
        }
        this.yspeed = -8; //向上蹦多少
        this.bird.rotation = -45; //向上旋转一下
        Laya.SoundManager.playSound("sound/sfx_wing.wav", 1);
    };
    // 循环函数，基于帧率，onLoop
    GameMain.prototype.onLoop = function () {
        if (!this.isLive)
            return;
        // 下落
        this.yspeed += this.g;
        this.bird.y += this.yspeed;
        // 为什么 写了以下if代码之后，bird的翅膀就不动了
        // 下落是否碰到地板
        if (Laya.stage.height - this.landHeight - 16 <= this.bird.y) {
            //否则，看到bird 进入land
            this.bird.y = Laya.stage.height - this.landHeight - 16;
            //发生了碰撞
            this.yspeed = 0;
            this.death();
        }
        // 一旦未点击鼠标，每下降一次（onloop执行一次），调整旋转角
        // 顺时针，正角度，逆时针，负角度
        if (this.bird.rotation <= 90)
            this.bird.rotation += 3;
        // 使得管道移动
        for (var i = 0; i < this.pipeups.length; i++) {
            // 保持管道向后移动
            this.pipeups[i].x -= 2;
            this.pipedowns[i].x -= 2;
            // 判断管道是否移动出画面， pipe图像width = 52
            if (this.pipeups[i].x < -54) {
                // 为i 生成新坐标
                this.pipeups[i].y = -(Math.random() * 250);
                this.pipedowns[i].y = this.pipeups[i].y + Math.floor(Math.random() * 40 + 400);
                this.pipeups[i].x = this.pipeups[this.lastPipeIndex].x + 160;
                this.pipedowns[i].x = this.pipeups[i].x;
                this.lastPipeIndex = i;
            }
        }
        // 判断是否 碰撞
        for (var i = 0; i < this.pipeups.length; i++) {
            var up = this.pipeups[i].getBounds();
            var down = this.pipedowns[i].getBounds();
            //这里不用 intersects 检测碰撞原因是， 图片素材 有许多空白的地方，比如 小鸟只有20的像素，但是图片有30的像素
            //误差较大， 所有自己检测了，顺便调整了一下
            if ((this.bird.x + 10 >= up.x && (this.bird.y - 15 <= up.bottom || this.bird.y >= down.y - 18) && this.bird.x <= up.right)) {
                this.death();
                return;
            }
            // 判断是否加分，只要判断上面的管道（该矩形的右侧的x坐标，是否和bird.x）是否有相等的时刻
            // 该判断每秒执行30次, 只要出现了就会判断到，并且加分
            if (up.right == this.bird.x) {
                Laya.SoundManager.playSound("sound/sfx_point.wav", 1);
                //this.uiscore 是一个Sprite 
                //score 两位数
                var score;
                if (++this.score < 10) {
                    score = '0' + this.score;
                }
                else {
                    score = this.score + '';
                }
                this.uiscore._childs[0].graphics.clear();
                this.uiscore._childs[1].graphics.clear();
                this.uiscore._childs[0].loadImage('bird/number_score_0' + score[0] + '.png', 120, 0);
                this.uiscore._childs[1].loadImage('bird/number_score_0' + score[1] + '.png', 140, 0);
            }
        }
    };
    //death() 
    GameMain.prototype.death = function () {
        if (!this.isLive)
            return; //死一次就够了，不用死透了
        this.isLive = false;
        this.land.isMove = this.isLive; //停止管道移动
        this.bird.bird.stop(); //停止播放动画()
        Laya.SoundManager.playSound("sound/sfx_hit.wav", 1);
        //画面调出之前，取消
        Laya.stage.off(Laya.Event.CLICK, this, this.onClick);
        //画面调出 
        this.game_over();
    };
    //
    GameMain.prototype.game_over = function () {
        this.spe_g_over_reset = new Laya.Sprite();
        var g_over = new Laya.Sprite();
        var g_reset = new Laya.Sprite();
        g_over.loadImage('bird/text_game_over.png');
        g_reset.loadImage('bird/game_restart.png');
        g_over.pos(38, 210);
        g_reset.pos(77, 280);
        // on
        g_reset.on(Laya.Event.CLICK, this, this.reset_game);
        this.spe_g_over_reset.addChild(g_over);
        this.spe_g_over_reset.addChild(g_reset);
        Laya.stage.addChild(this.spe_g_over_reset);
    };
    //reset
    GameMain.prototype.reset_game = function (e) {
        e.stopPropagation();
        //删除，如果想通过 node_name 怎么实现呢？
        Laya.stage.removeChild(this.spe_g_over_reset);
        // 初始化管道
        for (var i = 0; i < this.pipeups.length; i++) {
            this.pipeups[i].y = -(Math.random() * 250);
            this.pipedowns[i].y = this.pipeups[i].y + Math.floor(Math.random() * 40 + 400);
            this.pipeups[i].x = 160 * (i + 1);
            this.pipedowns[i].x = this.pipeups[i].x;
            this.lastPipeIndex = i;
        }
        // 初始化分数
        this.score = 0;
        this.uiscore._childs[0].graphics.clear();
        this.uiscore._childs[1].graphics.clear();
        this.uiscore._childs[0].loadImage('bird/number_score_00.png', 120, 0);
        this.uiscore._childs[1].loadImage('bird/number_score_00.png', 140, 0);
        this.bird.pos(50, 200);
        this.bird.rotation = 0;
        this.land.isMove = true;
        this.bird.bird.play(0, true, "bird" + Math.floor(Math.random() * 3)); //停止播放动画
        this.yspeed = 0; //把下落速度归零，不然一复活 就会瞬间摔死
        // 添加事件
        console.log('重新添加点击事件');
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=Start.js.map