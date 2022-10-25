import { _decorator, Component, Node, v3 } from 'cc';
import { EnemyCtrl } from './EnemyCtrl';
const { ccclass, property } = _decorator;

@ccclass('BulletCtrl')
export class BulletCtrl extends Component {

    private speed = 800;

    start() :void {}

    update(deltaTime: number) {

        // 子弹发射
        this.node?.setWorldPosition(
            v3(
                this.node.getWorldPosition().x, 
                this.node.getWorldPosition().y + this.speed * deltaTime
            )
        )

        if (this.node?.getPosition().y >= 1280) {
            this.node?.destroy()
        }
    }

    miss() {
        try {
            this.node?.destroy()
        } catch (error) {
            
        }
    }

    // 碰到敌人
    onCollisonEnter(other) {
        try {
            if (other.tag === 1) {

                // 敌机销毁
                other.getComponent(EnemyCtrl).die();
                
                // 销毁
                this.node?.destroy()
            }
            
            
        } catch (error) {
            
        }
    }
}

