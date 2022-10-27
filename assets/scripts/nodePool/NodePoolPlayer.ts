import { _decorator, Component, Node, NodePool, Prefab, instantiate, find, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodePoolPlayer')
export class NodePoolPlayer extends Component {

    // 对象池
    static bulletPool: NodePool = new NodePool();

    @property({type: Prefab})
    bulletPrefab : Prefab = null;

    canvasNode : Node = null;

    interval : number = 0.2;


    onLoad() {

        // 创建100个子弹 并 放在对象池里
        for(let i=0; i<100; i++) {
            let node = instantiate(this.bulletPrefab);
            NodePoolPlayer.bulletPool.put(node);
        }
 
        this.canvasNode = find('Canvas');
        this.schedule(this.onTimer, this.interval);
    }

    start() {
        
        // 鼠标跟随
        this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
            this.node.setWorldPosition(
                // v3(touch.getUILocation().x, touch.getUILocation().y)
                new Vec3(touch.getUILocation().x, touch.getUILocation().y, 0)
            )
        })

    }

    update(deltaTime: number) {
        
    }

    onTimer () {

        // 这里不停的创建和差在预制体内不停的销毁，耗费性能
        //  const bullet: Node = instantiate(this.bulletPrefab);
        //  bullet.setParent(this.node.parent)
        //  bullet.setPosition(this.node.getPosition().x, this.node.getPosition().y + 80)


             // 从池子里取得现成的节点
         let bulletNode = NodePoolPlayer.bulletPool.get();

         // 池子里的节点如果不够多，就创建一个
         if (bulletNode === null) {
            bulletNode = instantiate(this.bulletPrefab);
         }

         // 使用这个节点

         bulletNode.parent = this.canvasNode; // 挂在canvas下面
         bulletNode.setPosition(this.node.getPosition().x, this.node.getPosition().y + 80)

    }
}

