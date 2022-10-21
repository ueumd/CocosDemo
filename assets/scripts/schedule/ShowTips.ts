import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowTips')
export class ShowTips extends Component {
    label: Label;
    text: string;
    index: number = 0;

    onLoad() {
        this.label = this.node.getComponentInChildren(Label);
        this.text = this.label.string;
        this.label.string = '';

        this.schedule(this.onTimer, 0.3)
    }

    onTimer() {
        this.index ++;
        let str = this.text.substring(0, this.index);
        this.label.string = str;
        console.log('显示Lable=', str);

        if (this.index >= this.text.length) {
            this.unschedule(this.onTimer)
        }
        
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

