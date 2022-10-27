import { _decorator, Component, Node, PhysicsSystem2D, Contact2DType, IPhysics2DContact, v3, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 
 * CocosCreator-3.6 三步解决2D碰撞监听
 * https://blog.csdn.net/qq_44695727/article/details/126944258
 */

@ccclass('ColliderPlayer')
export class ColliderPlayer extends Component {

    onLoad() {

      // 注册碰撞检测
        PhysicsSystem2D.instance.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this
        )
    }

    onBeginContact(otherCollider, selfCollider,contact:  IPhysics2DContact | null){
        console.log('selfCollider:', selfCollider);
        console.log('otherCollider:', otherCollider);

        // 好人组不碰撞
        // console.log('碰撞');

        if(otherCollider.tag === 100 && selfCollider.tag === 100) {
          console.log('友军相撞', Date.now());
          
        }

        
        if(otherCollider.tag === 100 && selfCollider.tag === 250) {
          console.log('与敌机相撞1~~~~~~~~~~~~~' + Date.now());
        }

        if (selfCollider.tag === 100 && otherCollider.tag === 250) {
            console.log('与敌机相撞2~~~~~~~~~~~~~' + Date.now());
            
        }
    }
    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
          this.node.setWorldPosition(touch.getUILocation().x, touch.getUILocation().y, 0);
        });
      }

    update(deltaTime: number) {
        
    }
}

