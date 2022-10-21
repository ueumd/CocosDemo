import { _decorator, Component, Node, Input, UITransform, Label, tween, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 获取当前组件下的子组件
 */

@ccclass('HelloTest')
export class HelloTest extends Component {

    onLoad() {
        this.node.on(Input.EventType.MOUSE_DOWN, this.moveLeft, this);
    }

    start() {
      
    }

    update(deltaTime: number) {
    }

    moveLeft(event){
        console.log(event, this.node);
        
        // this.node.setPosition(-200, 0, 0);

        // 并发动作
        // tween(this.node)
        // .to(1, {rotation: new Quat(Math.sin(360)), position: new Vec3(-50, 0, 0)})
        // .start()

        tween(this.node)
        .to(0.2, {position: new Vec3(-50, 0, 0)})
        .to(1, {rotation: new Quat(Math.sin(360))})
        .start()
    
        
        // 坐标
        const UI = this.node.getComponent(UITransform);
        console.log(UI);

        // 脚本组件
        const ts = this.node.getComponent(HelloTest)
        // console.log(ts);
        ts.test();
        
        // 子组件
        // 递归查找所有子节点中第一个匹配指定类型的组件。
        const label = this.node.getComponentInChildren(Label)
        console.log('label =====', label);
        label.string = "点击事件" + Date.now();

        // 根据节点名称查找到当前节点，再从当前节点查找子节点
        const labelTest = this.node.getChildByName("LabelTest").getComponent(Label)
        console.log('labelTest =====', labelTest);

        labelTest.string = "labelTest" + Date.now();
    }


    test() {
        console.log('HelloTest.test()');
    }
}

