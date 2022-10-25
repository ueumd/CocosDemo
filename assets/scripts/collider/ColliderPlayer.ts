import { _decorator, Component, Node, PhysicsSystem2D, Contact2DType, IPhysics2DContact, v3, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColliderPlayer')
export class ColliderPlayer extends Component {

    onLoad() {
        PhysicsSystem2D.instance.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this
        )
    }

    onBeginContact(selfCollider, otherCollider, contact:  IPhysics2DContact | null){
        console.log('selfCollider:', selfCollider);
        console.log('otherCollider:', otherCollider);

        if (selfCollider.tag === 1 && otherCollider.tag === 2) {
            console.log('敌机碰撞了我~~~~~~~~~~~~~');
            
        }
    }
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
        
    }
}

