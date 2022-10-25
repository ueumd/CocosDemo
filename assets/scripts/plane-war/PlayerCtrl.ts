import { _decorator, Component, Node, v3, EventTouch, Vec3, Prefab, instantiate, PhysicsSystem2D, Contact2DType, resources, Sprite, SpriteFrame, find, Collider2D, IPhysics2DContact } from 'cc';
import { BackgroundCtrl } from './BackgroundCtrl';
import { BulletCtrl } from './BulletCtrl';
import { EnemyCtrl } from './EnemyCtrl';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {

    @property({ type: Prefab })
    private bulletPrefab: Prefab = null;

    @property({ type: Prefab })
    private enemyPrefab: Prefab = null;


    onLoad() {
        // 注册全局碰撞回调函数
        PhysicsSystem2D.instance?.on(
          Contact2DType.BEGIN_CONTACT,
          this.onBeginContact,
          this
        );
      }
    
      onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
      ) {
        // 子弹和敌人碰撞
        if (
          (selfCollider.tag === 0 && otherCollider.tag === 1) ||
          (selfCollider.tag === 1 && otherCollider.tag === 0)
        ) {
          selfCollider.tag === 0
            ? selfCollider.getComponent(BulletCtrl).miss()
            : selfCollider.getComponent(EnemyCtrl).die();
          otherCollider.tag === 1
            ? otherCollider.getComponent(EnemyCtrl).die()
            : otherCollider.getComponent(BulletCtrl).miss();
        }
    
        // 敌人和英雄碰撞
        if (
          (selfCollider.tag === 1 && otherCollider.tag === 2 && !selfCollider.getComponent(EnemyCtrl).isDestory) ||
          (selfCollider.tag === 2 && otherCollider.tag === 1 && !otherCollider.getComponent(EnemyCtrl).isDestory)
        ) {
          find("Canvas/bg").getComponent(BackgroundCtrl)?.pause();
          selfCollider.tag === 1
            ? selfCollider.getComponent(EnemyCtrl).vectory()
            : otherCollider.getComponent(EnemyCtrl).vectory();
          this.lose();
        }
      }

    start() {
        console.log(this.node.parent);
        

        // 鼠标跟随
        this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
            this.node.setWorldPosition(
                // v3(touch.getUILocation().x, touch.getUILocation().y)
                new Vec3(touch.getUILocation().x, touch.getUILocation().y, 0)
            )
        })

        // 创建敌机
        this.schedule(() => {
            let aNumber: number = 175 * Math.random() + 1;
            let xPos: number = Math.floor(aNumber);
            let symbol: boolean = Math.random() > 0.5;
            if (!symbol && xPos !== 0) {
            xPos = -xPos;
            }

            let enemy: Node = instantiate(this.enemyPrefab);
            enemy.setParent(this.node.parent);
            enemy.setPosition(xPos, 640);
        }, 0.1);


        // 创建子弹
        this.schedule(() => {

            // 子弹实例化
            const bullet: Node = instantiate(this.bulletPrefab);
            bullet.setParent(this.node.parent)
            
            // 子弹坐标跟随player
            bullet.setPosition(
                this.node.getPosition().x,
                this.node.getPosition().y + 80
            )
        }, 0.1)

    }

    update(deltaTime: number) {
        
    }
    
  lose(): void {
    // 暂停所有计时器
    this.unscheduleAllCallbacks();
    resources.load(
      "hero1_die/spriteFrame",
      SpriteFrame,
      (err: Error, data: SpriteFrame) => {
        if (!err) {
          this.node.getComponent(Sprite).spriteFrame = data;
        }
      }
    );
  }

  onDestroy(): void {
    this.node.destroy();
    // 暂停所有计时器
    this.unscheduleAllCallbacks();
  }
}

