import { _decorator, Component, Node, director, ProgressBar, find } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Home")
export class Home extends Component {
  progressBar: ProgressBar = null;
  progressNode: Node | null = null;

  onLoad() {
    this.progressNode = find("Canvas/ProgressBar");
    this.progressBar = this.progressNode.getComponent(ProgressBar);
    this.loadScnen();
  }

  start() {
    console.log("============api===========");

    this.getListData();
  }

  update(deltaTime: number) {}

  startBtn() {
    // director.loadScene("buttonDemo");
    director.loadScene("schedule");
  }

  loadScnen() {
    director.preloadScene(
      "buttonDemo",
      (count, total, item) => {
        this.showProgress(count, total);
        console.log("预加载场景：" + count + "/" + total);
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
    );
  }

  showProgress(count, total) {
    this.progressBar.progress = count / total;
  }

  getListData() {
    //访问地址
    let url = "http://127.0.0.1:5173/v1/common/getSystemDate";
    //新建Http
    let xhr = new XMLHttpRequest();
    //接收数据
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = xhr.responseText;
        console.log(JSON.parse(response));
      }
    };
    //错误处理
    xhr.onerror = function (evt) {
      console.log(evt);
    };
    //初始化一个请求，GET方式，true异步请求
    xhr.open("GET", url, true);
    //发送请求
    xhr.send();
  }
}
