import { _decorator, Component, Node, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColliderPlayer2')
export class ColliderPlayer2 extends Component {
    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
            this.node.setWorldPosition(touch.getUILocation().x, touch.getUILocation().y, 0);
          });
    }

    update(deltaTime: number) {
        
    }
}

