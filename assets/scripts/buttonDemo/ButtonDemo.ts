import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonDemo')
export class ButtonDemo extends Component {


    @property({type: Node})
    buttonWrap = null

    btnList: Array<Node> = []

    isHide = true

    start() {
        console.log('----start', this);
        this.btnList = this.buttonWrap.children;
        console.log(this.btnList);
        
    }


    triggerShowAndHide() {
        this.btnList.forEach(node => {
            if (this.isHide) {
                node.active = false;
            } else {
                node.active = true;
            }
        });

        this.isHide = !this.isHide;
    }

    update(deltaTime: number) {
        
    }

    backHome() {
        director.loadScene("home");
    }
}

