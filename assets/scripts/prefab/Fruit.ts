import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fruit')
export class Fruit extends Component {

    @property({type: Node})
    maskNode: Node = null

    @property({ type: Sprite })
    fruitsSp: Sprite = null

    private isCanTouch =  true;

    start() {

    }

    update(deltaTime: number) {
        
    }


  setTouch(isCanTouch) {
    this.isCanTouch = isCanTouch;
 
    // 可以点击 阴影影藏
    if (this.isCanTouch) {
      this.maskNode.active = false;
    } else {
      this.maskNode.active = true;
    }
  }
}

