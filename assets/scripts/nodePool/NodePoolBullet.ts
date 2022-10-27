import { _decorator, Component, Node, v3 } from 'cc';
import { NodePoolPlayer } from './NodePoolPlayer';
const { ccclass, property } = _decorator;

@ccclass('NodePoolBullet')
export class NodePoolBullet extends Component {

    private speed = 800;

    start() {

    }

    update(deltaTime: number) {
        
        // 子弹发射
        this.node?.setWorldPosition(
            v3(
                this.node.getWorldPosition().x, 
                this.node.getWorldPosition().y + this.speed * deltaTime
            )
        )

        // this.node.setWorldPosition(e.getUILocation().x, e.getUILocation().y, 0)

        if (this.node?.getPosition().y >= 1280) {

            // 销毁
            // this.node?.destroy()


            // 将节点放回到池子，就可以被重新利用了 
            NodePoolPlayer.bulletPool.put(this.node);
        }
        
    }

    
}

