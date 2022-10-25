import { _decorator, Component, Node, v3, EventTouch } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ColliderEnemy")
export class ColliderEnemy extends Component {
  private speed: number = 250;

  public isDestory = false;
  start() {
    this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
      this.node.setWorldPosition(
        touch.getUILocation().x,
        touch.getUILocation().y,
        0
      );
    });
  }

  update(deltaTime: number) {
    // 敌机移动
    // this.node.setWorldPosition(
    //   v3(
    //     this.node.getWorldPosition().x,
    //     this.node.getWorldPosition().y - this.speed * deltaTime
    //   )
    // );

    // // 离开屏幕
    // if (this.node.getPosition().y <= -1280) {
    //   this.node.destroy();
    // }
  }
}
