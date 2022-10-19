import { _decorator, Component, Node, Vec3, Input, tween, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonScaler')
export class ButtonScaler extends Component {

    @property
    scaleTo = new Vec3(1.2, 1.2, 1.2)

    @property
    transDuration = 0.2

    initScale = new Vec3();

    button: Button | null = null;

    private _scale = new Vec3(1, 1, 1);
    private _lastScale = new Vec3()
    private _start = new Vec3()


    onLoad() {
        this.initScale = this.node.scale;

        // this.button = this.getComponent(Button);

        const tweenDown = tween(this._scale);    
        const tewenUp = tween(this._scale);    

        this.node.getScale(this._start)

        tweenDown.to(this.transDuration, this.scaleTo, { easing: 'cubicInOut'});

        tewenUp.to(this.transDuration, this._start, { easing: 'cubicInOut' });

        this._lastScale.set(this._scale);

        function onTouchDown(event: EventTouch) {
            console.log(1111);
            
            tweenDown.start();
        }

        function onTouchUp(event: EventTouch) {
            console.log(22222);
            
            tweenDown.stop();
            tewenUp.start();
        }

        this.node.on(Input.EventType.TOUCH_START, onTouchDown, this);
        this.node.on(Input.EventType.TOUCH_END, onTouchUp, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, onTouchUp, this);
    }



    update(deltaTime: number) {
        if(!this._scale.equals(this._lastScale)){
            this.node.setScale(this._scale);
            this._lastScale.set(this._scale);
        }
    }
}

