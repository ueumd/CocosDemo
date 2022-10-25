import {
  _decorator,
  Component,
  Node,
  v3,
  resources,
  SpriteFrame,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemyCtrl")
export class EnemyCtrl extends Component {
  private speed: number = 250;

  public isDestory = false;

  start() {}

  update(deltaTime: number) {
    // 敌机移动
    this.node.setWorldPosition(
      v3(
        this.node.getWorldPosition().x,
        this.node.getWorldPosition().y - this.speed * deltaTime
      )
    );

    // 离开屏幕
    if (this.node.getPosition().y <= -1280) {
      this.node.destroy();
    }
  }
  // 死亡销毁
  die(): void {
    if (!this.isDestory) {
      this.isDestory = true;
      resources.load(
        "enemy0_die/spriteFrame",
        SpriteFrame,
        (err: Error, data: SpriteFrame) => {
          if (!err) {
            this.node.getComponent(Sprite).spriteFrame = data;
          }
          // 300ms后销毁
          setTimeout(() => {
            this.node?.destroy();
          }, 200);
        }
      );
    }
  }

  vectory(): void {
    resources.load(
      "enemy0_die/spriteFrame",
      SpriteFrame,
      (err: Error, data: SpriteFrame) => {
        if (!err) {
          this.node.getComponent(Sprite).spriteFrame = data;
        }
      }
    );
  }
}
