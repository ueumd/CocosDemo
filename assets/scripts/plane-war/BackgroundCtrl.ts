import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundCtrl")
export class BackgroundCtrl extends Component {
  private symbol: Boolean = true;

  start() {}

  update(deltaTime: number) {
    if (this.symbol) {
      for (let bgItem of this.node.children) {
        bgItem.setPosition(0, bgItem.getPosition().y - 130 * deltaTime, 0);

        // console.log(bgItem.getPosition().y);

        if (bgItem.getPosition().y <= -1275) {
          bgItem.setPosition(0, bgItem.getPosition().y + 1278 * 2);
        }
      }
    }
  }

  restart(): void {
    this.symbol = false;
  }

  pause(): void {
    this.symbol = false;
  }
}
