import { _decorator, Component, Node, TiledUserNodeData, find, AudioSource, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayMusic')
export class PlayMusic extends Component {

    @property({type: SpriteFrame})
    iconOff = null

    @property({type: SpriteFrame})
    iconOn = null

    isMute: Boolean = true;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.playBGM, this)
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    playBGM() {
        // 获取音频组件
        const audioSource: AudioSource = find("Canvas").getComponent(AudioSource);

        // 当前开关组件
        const sprite: Sprite = this.node.getComponent(Sprite)

        if (this.isMute) {
            // spriteFrame 图片帧
            sprite.spriteFrame = this.iconOff;
            audioSource.pause();
        } else {
            sprite.spriteFrame = this.iconOn;
            audioSource.play();
        }

        this.isMute = !this.isMute;

    }
}

