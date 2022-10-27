import { _decorator, Component, Node, BoxCollider2D, Contact2DType, PhysicsSystem2D, Collider2D, IPhysics2DContact, RigidBody2D, Vec2, v2, UITransform, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('Ball')
export class Ball extends Component {

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this)
    }
 
    start() {
 
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            // Builtin 2D 物理模块只会发送 BEGIN_CONTACT 和 END_CONTACT 回调消息。
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            // collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            // collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
 
        // 注册全局碰撞回调函数
        // if (PhysicsSystem2D.instance) {
        //     // Builtin 2D 物理模块只会发送 BEGIN_CONTACT 和 END_CONTACT 回调消息。
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     // PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     // PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }
    }
 
    /**
     * 只在两个碰撞体开始接触时被调用一次
     * @param selfCollider 指的是回调脚本的节点上的碰撞体
     * @param otherCollider 指的是发生碰撞的另一个碰撞体
     * @param contact 碰撞主要的信息, 位置和法向量, 带有刚体的本地坐标来， 
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('onBeginContact');
 
        // contact.getWorldManifold在 Builtin 物理模块这个参数为空
        // const worldManifold = contact.getWorldManifold();
        // // 碰撞点数组
        // const points = worldManifold.points;
        // // 碰撞点上的法向量
        // const normal = worldManifold.normal;
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact');
    }
    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        console.log('onPreSolve');
    }
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        console.log('onPostSolve');
    }


    // https://www.jianshu.com/p/1eb9697a3c2a
    touchStart(){
        let rigidbody = this.node.getComponent(RigidBody2D);

        let impulse = v2(0, 200); // 一个冲量
        let wp = new Vec2()
     
        rigidbody.getWorldPoint(v2(0, 0), wp)


        rigidbody.applyLinearImpulse(impulse, wp, true);
        // rigid.applyLinearImpulse(impulse, point);
    }
}
 