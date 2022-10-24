import { _decorator, Component, Node, Prefab, instantiate, input, Input } from 'cc';
const { ccclass, property } = _decorator;

import { Fruit } from './Fruit';

@ccclass('PrefabScene')
export class PrefabScene extends Component {

    @property({type: Prefab})
    fruitPre: Prefab = null


    @property({type: Node})
    fruitBlockNode: Node = null

    private fruitNode: Node = null

    start() {
      this.createFruitBlock();
      this.fruitBlockNode.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
      this.fruitBlockNode.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
      this.fruitBlockNode.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    createFruitBlock() {
      for (let i = 0; i < 10; i++) {
        const xx = Math.random() * 720 - 360;
        const yy = Math.random() * 1280 - 640;

        const fruitNode = instantiate(this.fruitPre);

        fruitNode.setPosition(xx, yy, 0);

        this.fruitBlockNode.addChild(fruitNode);
  
      }
       

        
    }


  createBlocksOld() {
    // for (let i = 0; i < 20; i++) {
    
    //   // 实例化
    //   const node_block = instantiate(this.preBlock);
    //   node_block.setPosition(xx_random, yy_random);
    //   //this.node.addChild(node_block);
    //   this.parentBlocks.addChild(node_block);

    //   // 生成各个水果模块

    //   const ts_block = node_block.getComponent(block);
    //   let num_random = Math.floor(Math.random() * 30);
    //   ts_block.init(num_random);
    // }
  }

    onTouchStart() {
      console.log(11111);
      
      const fruitBlock = this.fruitNode.getComponent(Fruit)
      fruitBlock.maskNode.active = false
    }

    onTouchMove() {
 
    }

    onTouchEnd() {
      console.log(2222);
      const fruitBlock = this.fruitNode.getComponent(Fruit)
      fruitBlock.maskNode.active = true

    }

    update(deltaTime: number) {
        
    }
    
}

