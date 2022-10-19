import { _decorator, Component, Node, director, ProgressBar, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Home')
export class Home extends Component {

    progressBar: ProgressBar = null;
    progressNode: Node | null = null

    onLoad() {
        this.progressNode = find("Canvas/ProgressBar");
        this.progressBar = this.progressNode.getComponent(ProgressBar)
        this.loadScnen();
    }

    update(deltaTime: number) {
        
    }


    startBtn() {
        director.loadScene("buttonDemo");
    }

    loadScnen() {
       director.preloadScene("buttonDemo", 
        (count, total, item) => {
            this.showProgress(count, total);
            console.log("预加载场景：" + count + '/' + total);
        },
        (error: Error) => {
            if (error != null) {
                console.log(error.message);
            } else {
                this.schedule(() => {
                    this.progressNode.active = false;
                }, 0.2);
                console.log("预加载完成");
            }
        }
       ) 
    }

    showProgress(count, total) {
        this.progressBar.progress = count / total;
    }
}

