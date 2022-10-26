import { _decorator, Component, Node, director, EventTouch, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonDemo')
export class ButtonDemo extends Component {


    @property({type: Node})
    buttonWrap = null

    btnList: Array<Node> = []

    isHide = true

    start() {
        console.log('----start', this);
        this.btnList = this.buttonWrap.children;
        console.log(this.btnList);

        this.node.on(Input.EventType.TOUCH_START, this.onTouchDown, this);
        
    }

    onTouchDown(event: EventTouch) {
        // 世界坐标 屏幕分辨率
        console.log(event.getLocationX() + '- ' + event.getLocationY());

        console.log(this.node.getWorldPosition().x, this.node.getWorldPosition().y);
        
        
    }


    triggerShowAndHide() {
        this.btnList.forEach(node => {
            if (this.isHide) {
                node.active = false;
            } else {
                node.active = true;
            }
        });

        this.isHide = !this.isHide;
    }

    update(deltaTime: number) {
        
    }

    backHome() {
        director.loadScene("home");
    }
}

